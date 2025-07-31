// src/hooks/useImageCapture.ts
import { useState, useEffect, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { CameraCapturedPicture } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as tf from '@tensorflow/tfjs';
import * as jpeg from 'jpeg-js';
import chroma from 'chroma-js';
import { Buffer } from 'buffer';
import { validateImageFile, validateImageQuality, validateLightingConditions } from '../utils/validationUtils';
import useErrorSystem from './useErrorSystem';

interface ImageCaptureResult {
  uri: string;
  width?: number;
  height?: number;
}

interface PointAnalysisResult {
  pointsStatus: Record<number, boolean>;
  pointsColors: Record<number, { r: number; g: number; b: number; percentage?: number }>;
  correctPoints: number;
  totalPoints: number;
  shouldCapture: boolean;
}

const BLACK_THRESHOLD = 80;

const useImageCapture = (onPhotoCaptured: (uri: string) => void) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [pointsStatus, setPointsStatus] = useState<Record<number, boolean>>({});
  const [pointsColors, setPointsColors] = useState<Record<number, { r: number; g: number; b: number; percentage?: number }>>({});
  const [analysisResult, setAnalysisResult] = useState<{ correctPoints: number; totalPoints: number } | null>(null);
  const [autoCaptureMode, setAutoCaptureMode] = useState<'OFF' | 'FAST' | 'SLOW'>('OFF');
  const [isLandscape, setIsLandscape] = useState(false);
  
  const { showError } = useErrorSystem();

  // Solicitar permissões da câmera e galeria
  useEffect(() => {
    const requestPermissions = async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(cameraStatus === 'granted' && mediaStatus === 'granted');
    };

    requestPermissions();
  }, []);

  // Monitorar orientação
  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);
    updateOrientation();

    return () => subscription?.remove();
  }, []);

  const analyzeColor = (r: number, g: number, b: number) => {
    const grayValue = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    const normalizedR = r / 255;
    const normalizedG = g / 255;
    const normalizedB = b / 255;
    const color = chroma(normalizedR, normalizedG, normalizedB);
    const blackDistance = chroma.distance(color, '#000000');
    const MIN_BRIGHTNESS = 10;
    const isBlack = blackDistance < BLACK_THRESHOLD && grayValue < MIN_BRIGHTNESS;
    const percentage = Math.max(0, 100 - (blackDistance / BLACK_THRESHOLD) * 100);

    return { isBlack, grayValue, percentage };
  };

  const extractFirstNumber = (value: any): number => {
    while (Array.isArray(value)) {
      value = value[0];
    }
    return typeof value === 'number' ? value : 0;
  };

  const analyzePoints = async (imageUri: string, landscape: boolean): Promise<PointAnalysisResult> => {
    try {
      setIsProcessing(true);
      
      // Validação do arquivo de imagem
      const fileValidation = validateImageFile({ uri: imageUri });
      if (!fileValidation.isValid) {
        throw new Error(fileValidation.message);
      }

      // Validação da qualidade da imagem
      const qualityValidation = await validateImageQuality(imageUri);
      if (!qualityValidation.isValid) {
        throw new Error(qualityValidation.message);
      }

      const base64String = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const rawImageData = Buffer.from(base64String, 'base64');
      const imageData = jpeg.decode(rawImageData, { useTArray: true });
      const pixelBuffer = new Uint8Array(imageData.data);
      let imageTensor = tf.tensor3d(pixelBuffer, [imageData.height, imageData.width, 4], 'float32');

      // Validação das condições de iluminação
      const lightingValidation = validateLightingConditions(imageTensor);
      if (!lightingValidation.isValid) {
        tf.dispose(imageTensor);
        throw new Error(lightingValidation.message);
      }

      // Redimensionar se necessário
      const MAX_SIZE = 1024;
      const scaleFactor = Math.min(MAX_SIZE / imageData.width, MAX_SIZE / imageData.height);

      if (scaleFactor < 1) {
        const resizedTensor = tf.image.resizeBilinear(imageTensor, [
          Math.floor(imageData.height * scaleFactor),
          Math.floor(imageData.width * scaleFactor)
        ]);
        tf.dispose(imageTensor);
        imageTensor = resizedTensor;
      }

      const referencePoints = landscape ? [
        { id: 1, x: 0.26, y: 0.1 },
        { id: 2, x: 0.26, y: 0.85 },
        { id: 3, x: 0.35, y: 0.1 },
        { id: 4, x: 0.5, y: 0.85 },
        { id: 5, x: 0.8, y: 0.1 },
        { id: 6, x: 0.8, y: 0.85 }
      ]
        : [
          { id: 1, x: 0.1, y: 0.2 },
          { id: 2, x: 1, y: 0.2 },
          { id: 3, x: 0.1, y: 0.55 },
          { id: 4, x: 1, y: 0.55 },
          { id: 5, x: 0.1, y: 0.84 },
          { id: 6, x: 1, y: 0.84 }
        ];

      const newPointsStatus: Record<number, boolean> = {};
      const newPointsColors: Record<number, { r: number; g: number; b: number; percentage?: number }> = {};
      let correctPoints = 0;

      for (const point of referencePoints) {
        const x = Math.round(point.x * imageTensor.shape[1]);
        const y = Math.round(point.y * imageTensor.shape[0]);

        const startX = Math.max(0, x - 5);
        const startY = Math.max(0, y - 5);
        const sliceWidth = Math.min(10, imageTensor.shape[1] - startX);
        const sliceHeight = Math.min(10, imageTensor.shape[0] - startY);

        const region = imageTensor.slice([startY, startX, 0], [sliceHeight, sliceWidth, 4]);

        const getChannelMean = async (channel: number) => {
          const channelSlice = region.slice([0, 0, channel], [sliceHeight, sliceWidth, 1]);
          const meanTensor = channelSlice.mean();
          const value = await meanTensor.array();
          tf.dispose([channelSlice, meanTensor]);
          return extractFirstNumber(value);
        };

        const r = await getChannelMean(0);
        const g = await getChannelMean(1);
        const b = await getChannelMean(2);

        const color = chroma(r, g, b);
        const blackDistance = chroma.distance(color, '#000000');
        const isCorrect = blackDistance < BLACK_THRESHOLD;
        const { grayValue, percentage } = analyzeColor(r, g, b);

        newPointsStatus[point.id] = isCorrect;
        newPointsColors[point.id] = {
          r: grayValue,
          g: grayValue,
          b: grayValue,
          percentage,
        };

        if (isCorrect) correctPoints++;
        tf.dispose(region);
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
      const errorObj = error instanceof Error ? error : new Error('Falha na validação da imagem');
      showError('image_validation', errorObj);
      throw errorObj;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageCapture = useCallback(async (imageResult: ImageCaptureResult) => {
    try {
      setCapturedImage(imageResult.uri);
      onPhotoCaptured(imageResult.uri);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Falha ao processar imagem');
      showError('image_processing', errorObj);
    }
  }, [onPhotoCaptured, showError]);

  const handleCapture = useCallback(async (cameraRef: React.RefObject<any>) => {
    if (isProcessing || !cameraRef.current) return;

    setIsProcessing(true);

    try {
      const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
        exif: false
      });

      const result = await analyzePoints(photo.uri, isLandscape);
      setAnalysisResult({ correctPoints: result.correctPoints, totalPoints: result.totalPoints });
      setPointsStatus(result.pointsStatus);
      setPointsColors(result.pointsColors);

      if (result.correctPoints < result.totalPoints) {
        const errorMessage = `Pontos identificados: ${result.correctPoints}/${result.totalPoints}`;
        showError('point_analysis_failed', new Error(errorMessage));
        return;
      }

      await handleImageCapture({ uri: photo.uri });
    } catch (error) {
      if (error instanceof Error && error.message.includes('permission')) {
        showError('camera_permission_denied');
      } else {
        showError('capture_failed', error instanceof Error ? error : undefined);
      }
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, isLandscape, handleImageCapture, showError]);

  const handleGalleryOpen = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8
      });

      if (!result.canceled && result.assets.length > 0) {
        await handleImageCapture({
          uri: result.assets[0].uri,
          width: result.assets[0].width,
          height: result.assets[0].height
        });
      }

    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Falha ao abrir galeria');
      showError('gallery_permission', errorObj);
    }
  }, [handleImageCapture, showError]);

  const handleAutoCaptureToggle = useCallback(() => {
    setAutoCaptureMode(prevMode => {
      switch (prevMode) {
        case 'OFF': return 'FAST';
        case 'FAST': return 'SLOW';
        case 'SLOW': return 'OFF';
        default: return 'OFF';
      }
    });
  }, []);

  return {
    hasPermission,
    isProcessing,
    capturedImage,
    pointsStatus,
    pointsColors,
    analysisResult,
    autoCaptureMode,
    isLandscape,
    handleCapture,
    handleGalleryOpen,
    handleAutoCaptureToggle,
    setCapturedImage
  };
};

export default useImageCapture;