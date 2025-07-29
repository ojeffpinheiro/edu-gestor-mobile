// useImageProcessing.ts
import { useState, useCallback, useEffect } from 'react';
import { Alert, Dimensions } from 'react-native';
import { CameraCapturedPicture } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as tf from '@tensorflow/tfjs';
import * as jpeg from 'jpeg-js';
import { Buffer } from 'buffer';

import { ExamTemplate } from '../types/newTypes';
import { CorrectionResult } from '../types/newTypes';
import { validateImageFile, validateImageQuality, validateLightingConditions } from '../utils/validationUtils';
import { useResultCalculations } from './useCorrectionState';
import useErrorHandling from './useErrorHandling';

interface ImageProcessingResult {
  uri: string;
  tensor?: tf.Tensor3D;
  processedData?: CorrectionResult;
  pointsAnalysis?: {
    pointsStatus: Record<number, boolean>;
    pointsColors: Record<number, { r: number; g: number; b: number }>;
    correctPoints: number;
    totalPoints: number;
  };
}

interface PointAnalysisResult {
  pointsStatus: Record<number, boolean>;
  pointsColors: Record<number, { r: number; g: number; b: number }>;
  correctPoints: number;
  totalPoints: number;
  shouldCapture: boolean;
}

const BLACK_THRESHOLD = 80;

export const useImageProcessing = (examTemplate: ExamTemplate | null) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [processingResult, setProcessingResult] = useState<ImageProcessingResult | null>(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const [autoCaptureMode, setAutoCaptureMode] = useState<'OFF' | 'FAST' | 'SLOW'>('OFF');
  
  const { showError } = useErrorHandling();
  const { generateRandomAnswers, calculateResults } = useResultCalculations();

  // Solicitar permissões
  useEffect(() => {
    const requestPermissions = async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(cameraStatus === 'granted' && mediaStatus === 'granted');
    };
    requestPermissions();

    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);
    updateOrientation();

    return () => subscription?.remove();
  }, []);

  // Análise de pontos de referência na imagem
  const analyzePoints = async (imageUri: string): Promise<PointAnalysisResult> => {
    try {
      setIsProcessing(true);
      
      // Validações iniciais
      const fileValidation = validateImageFile({ uri: imageUri });
      if (!fileValidation.isValid) throw new Error(fileValidation.message);

      const qualityValidation = await validateImageQuality(imageUri);
      if (!qualityValidation.isValid) throw new Error(qualityValidation.message);

      const base64String = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const rawImageData = Buffer.from(base64String, 'base64');
      const imageData = jpeg.decode(rawImageData, { useTArray: true });
      let imageTensor = tf.tensor3d(imageData.data, [imageData.height, imageData.width, 4], 'float32');

      const lightingValidation = validateLightingConditions(imageTensor);
      if (!lightingValidation.isValid) {
        tf.dispose(imageTensor);
        throw new Error(lightingValidation.message);
      }

      // Processamento da imagem
      const referencePoints = isLandscape ? [
        { id: 1, x: 0.26, y: 0.1 }, { id: 2, x: 0.26, y: 0.85 },
        { id: 3, x: 0.35, y: 0.1 }, { id: 4, x: 0.5, y: 0.85 },
        { id: 5, x: 0.8, y: 0.1 }, { id: 6, x: 0.8, y: 0.85 }
      ] : [
        { id: 1, x: 0.1, y: 0.2 }, { id: 2, x: 1, y: 0.2 },
        { id: 3, x: 0.1, y: 0.55 }, { id: 4, x: 1, y: 0.55 },
        { id: 5, x: 0.1, y: 0.84 }, { id: 6, x: 1, y: 0.84 }
      ];

      const newPointsStatus: Record<number, boolean> = {};
      const newPointsColors: Record<number, { r: number; g: number; b: number }> = {};
      let correctPoints = 0;

      for (const point of referencePoints) {
        const x = Math.round(point.x * imageTensor.shape[1]);
        const y = Math.round(point.y * imageTensor.shape[0]);

        const region = imageTensor.slice([y-5, x-5, 0], [10, 10, 4]);
        const means = region.mean(0).mean(0);
        const [r, g, b] = Array.from(means.dataSync());
        tf.dispose([means, region]);

        const grayValue = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
        const isBlack = grayValue < BLACK_THRESHOLD;

        newPointsStatus[point.id] = isBlack;
        newPointsColors[point.id] = { r: grayValue, g: grayValue, b: grayValue };
        if (isBlack) correctPoints++;
      }

      tf.dispose(imageTensor);

      return {
        pointsStatus: newPointsStatus,
        pointsColors: newPointsColors,
        correctPoints,
        totalPoints: referencePoints.length,
        shouldCapture: correctPoints === referencePoints.length
      };
    } catch (error) {
      showError('image_validation', error instanceof Error ? error : undefined);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  // Processar imagem capturada
  const processCapturedImage = async (imageUri: string): Promise<CorrectionResult> => {
    try {
      setIsProcessing(true);
      await tf.ready();
      
      const tensor = await getTensorFromURI(imageUri);
      const pointsAnalysis = await analyzePoints(imageUri);
      
      if (!examTemplate) {
        throw new Error('Exam template not loaded.');
      }
      
      const detectedAnswers = generateRandomAnswers(examTemplate.questions);
      const results = calculateResults(detectedAnswers, examTemplate.answerKey);
      
      setProcessingResult({
        uri: imageUri,
        tensor,
        processedData: results,
        pointsAnalysis
      });

      return results;
    } catch (error) {
      showError('image_processing', error instanceof Error ? error : undefined);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  // Capturar imagem da câmera
  const captureImage = async (cameraRef: React.RefObject<any>): Promise<boolean> => {
    if (isProcessing || !cameraRef.current) return false;

    setIsProcessing(true);
    try {
      const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
        exif: false
      });

      const pointsAnalysis = await analyzePoints(photo.uri);
      if (!pointsAnalysis.shouldCapture) {
        showError('point_analysis_failed', new Error(`Pontos identificados: ${pointsAnalysis.correctPoints}/${pointsAnalysis.totalPoints}`));
        return false;
      }

      await processCapturedImage(photo.uri);
      return true;
    } catch (error) {
      showError('capture_failed', error instanceof Error ? error : undefined);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  // Selecionar imagem da galeria
  const selectFromGallery = async (): Promise<boolean> => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8
      });

      if (!result.canceled && result.assets.length > 0) {
        await processCapturedImage(result.assets[0].uri);
        return true;
      }
      return false;
    } catch (error) {
      showError('gallery_access_failed', error instanceof Error ? error : undefined);
      return false;
    }
  };

  // Alternar modo de captura automática
  const toggleAutoCaptureMode = useCallback(() => {
    setAutoCaptureMode(prev => {
      switch (prev) {
        case 'OFF': return 'FAST';
        case 'FAST': return 'SLOW';
        case 'SLOW': return 'OFF';
        default: return 'OFF';
      }
    });
  }, []);

  return {
    // Estados
    hasPermission,
    isProcessing,
    capturedImage,
    processingResult,
    autoCaptureMode,
    isLandscape,

    // Métodos de captura
    captureImage,
    selectFromGallery,

    // Métodos de processamento
    processCapturedImage,
    analyzePoints,

    // Controles
    toggleAutoCaptureMode,
    setCapturedImage
  };
};

// Helper function para criar tensor a partir de URI
async function getTensorFromURI(uri: string): Promise<tf.Tensor3D> {
  const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
  const rawImageData = Buffer.from(base64, 'base64');
  const imageData = jpeg.decode(rawImageData, { useTArray: true });
  return tf.tensor3d(imageData.data, [imageData.height, imageData.width, 4], 'float32');
}