import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Alert, Dimensions, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { CameraCapturedPicture, CameraView } from 'expo-camera';
import chroma from 'chroma-js';
import { Buffer } from 'buffer';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import * as jpeg from 'jpeg-js';
import * as tf from '@tensorflow/tfjs';
import * as FileSystem from 'expo-file-system';
import { useTheme } from '../../context/ThemeContext';

import ImagePreview from './ImagePreview';
import ReferencePoints from './ReferencePoints';
import CaptureControls from './CaptureControls';
import MarkAnalysis from './MarkAnalysis';
import { createCameraBaseStyles } from '../../styles/componentStyles';
import { createContainerStyles, createTextStyles } from '../../styles/globalStyles';
import { Spacing } from '../../styles/designTokens';

interface PointsStatus {
  [key: number]: boolean;
}

interface PointColor {
  r: number;
  g: number;
  b: number;
  percentage?: number;
}

interface PointsColors {
  [key: number]: PointColor;
}

const AUTO_CAPTURE_MODES = {
  OFF: null,
  FAST: 1500, // 1.5 segundos
  SLOW: 3000  // 3 segundos
};
const BLACK_THRESHOLD = 80; // Distância máxima para considerar como preto

const CameraCapture: React.FC<{ onPhotoCaptured: (uri: string) => void }> = ({ onPhotoCaptured }) => {
  const { colors } = useTheme();
  const cameraStyles = createCameraBaseStyles(colors);
  const containers = createContainerStyles(colors);
  const text = createTextStyles(colors);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [analysisMode, setAnalysisMode] = useState(false);
  const [autoCaptureMode, setAutoCaptureMode] = useState<keyof typeof AUTO_CAPTURE_MODES>('OFF');
  const [analysisResult, setAnalysisResult] = useState<{
    correctPoints: number;
    totalPoints: number;
  } | null>(null);
  const isLandscape = dimensions.width > dimensions.height;
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [pointsStatus, setPointsStatus] = useState<PointsStatus>({});
  const [pointsColors, setPointsColors] = useState<PointsColors>({});
  const cameraRef = useRef<any>(null);

  // Auto capture effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const executeCapture = async () => {
      if (!isProcessing && hasPermission) {
        setIsProcessing(true);
        try {
          await handleCapture();
        } finally {
          // Adiciona um pequeno delay após o processamento
          timeout = setTimeout(() => setIsProcessing(false), 500);
        }
      }
    };

    if (autoCaptureMode !== 'OFF') {
      interval = setInterval(executeCapture, AUTO_CAPTURE_MODES[autoCaptureMode]);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [autoCaptureMode, isProcessing, hasPermission]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const handleAutoCaptureToggle = useCallback(() => {
    setAutoCaptureMode(prevMode => {
      let newMode: keyof typeof AUTO_CAPTURE_MODES;

      switch (prevMode) {
        case 'OFF':
          newMode = 'FAST';
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'FAST':
          newMode = 'SLOW';
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          break;
        case 'SLOW':
          newMode = 'OFF';
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
        default:
          newMode = 'OFF';
      }

      return newMode;
    });
  }, []);

  const getAlignmentColor = (percentage: number) => {
    return percentage >= 90 ? '#00FF00' : '#FF0000';
  };

  const analyzeColor = (r: number, g: number, b: number) => {
    // Convert to grayscale
    const grayValue = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

    // Calculate distance to pure black (#000000)
    const normalizedR = r / 255;
    const normalizedG = g / 255;
    const normalizedB = b / 255;
    const color = chroma(normalizedR, normalizedG, normalizedB);
    const blackDistance = chroma.distance(color, '#000000');
    const MIN_BRIGHTNESS = 10; // Minimum value to consider (0-255)
    const isBlack = blackDistance < BLACK_THRESHOLD && grayValue < MIN_BRIGHTNESS;

    // Calculate "blackness" percentage (0-100)
    const percentage = Math.max(0, 100 - (blackDistance / BLACK_THRESHOLD) * 100);

    return {
      isBlack,
      grayValue,
      percentage
    };
  };

  const analyzePoints = async (imageUri: string) => {
    try {
      console.log('Iniciando análise da imagem:', imageUri);
      const base64String = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const rawImageData = Buffer.from(base64String, 'base64');
      const imageData = jpeg.decode(rawImageData, { useTArray: true });
      console.log('Imagem decodificada:', imageData.width, 'x', imageData.height);

      const pixelBuffer = new Uint8Array(imageData.data);
      let imageTensor = tf.tensor3d(pixelBuffer, [imageData.height, imageData.width, 4], 'float32');
      console.log('Tensor criado:', imageTensor.shape);

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
        console.log('Tensor redimensionado:', imageTensor.shape);
      }

      const referencePoints = isLandscape
        ? [
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

      const newPointsStatus: PointsStatus = {};
      const newPointsColors: PointsColors = {};
      let correctPoints = 0;

      for (const point of referencePoints) {
        const x = Math.round(point.x * imageTensor.shape[1]);
        const y = Math.round(point.y * imageTensor.shape[0]);

        const startX = Math.max(0, x - 5);
        const startY = Math.max(0, y - 5);
        const sliceWidth = Math.min(10, imageTensor.shape[1] - startX);
        const sliceHeight = Math.min(10, imageTensor.shape[0] - startY);

        const region = imageTensor.slice([startY, startX, 0], [sliceHeight, sliceWidth, 4]);
        console.log(`Região ${point.id}:`, { x, y, startX, startY, sliceWidth, sliceHeight });

        function extractFirstNumber(value: any): number {
          while (Array.isArray(value)) {
            value = value[0];
          }
          return typeof value === 'number' ? value : 0;
        }

        // Cálculo corrigido das médias
        const getChannelMean = async (channel: number) => {
          const channelSlice = region.slice([0, 0, channel], [sliceHeight, sliceWidth, 1]);
          const meanTensor = channelSlice.mean();
          const value = await meanTensor.array();

          console.log(`Canal ${channel} - Valor bruto:`, value);

          const extractedValue = extractFirstNumber(value);
          console.log(`Canal ${channel} - Valor extraído:`, extractedValue);

          tf.dispose([channelSlice, meanTensor]);
          return extractedValue;
        };

        const r = await getChannelMean(0);
        const g = await getChannelMean(1);
        const b = await getChannelMean(2);

        const color = chroma(r, g, b);
        const blackDistance = chroma.distance(color, '#000000');
        const isCorrect = blackDistance < BLACK_THRESHOLD;

        console.log(`Distância do preto: ${blackDistance}`, `É preto? ${isCorrect}`);

        const { grayValue, percentage } = analyzeColor(r, g, b);

        console.log(`Valores RGB - R: ${r}, G: ${g}, B: ${b}, Cinza: ${grayValue}`);

        newPointsStatus[point.id] = false; // Não usamos mais a cor para status
        newPointsColors[point.id] = {
          r: grayValue,
          g: grayValue,
          b: grayValue,
          percentage: percentage,
        };

        if (isCorrect) correctPoints++;
        tf.dispose(region);
      }

      tf.dispose(imageTensor);
      return {
        status: newPointsStatus,
        colors: newPointsColors,
        correctPoints,
        totalPoints: referencePoints.length,
        shouldCapture: correctPoints === referencePoints.length
      };
    } catch (error) {
      console.error('Erro detalhado:', error);
      throw error;
    }
  };

  const handleCapture = useCallback(async () => {
    console.log('Iniciando captura...');

    if (!cameraRef.current) {
      console.log('Referência da câmera não disponível');
      return;
    }
    if (isProcessing) {
      console.log('Já está processando');
      return;
    }

    setIsProcessing(true);
    console.log('Processamento iniciado');

    setIsProcessing(true);
    try {
      const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
        exif: false
      });

      const { status, colors, correctPoints, totalPoints, shouldCapture } = await analyzePoints(photo.uri);
      setAnalysisResult({ correctPoints, totalPoints });

      setPointsStatus(status);
      setPointsColors(colors);

      if (shouldCapture) {
        await handleImageCapture(photo.uri);
      }
    } catch (error) {
      console.error('Erro completo:', {
        error,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        stack: error instanceof Error ? error.stack : undefined
      });
      showError('Erro de Captura', 'Falha ao processar a imagem');
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, isLandscape]);

  const handleImageCapture = useCallback(async (uri: string) => {
    try {
      setCapturedImage(uri);
      onPhotoCaptured(uri);
    } catch (error) {
      showError('Processing Error', error instanceof Error ? error.message : 'Failed to process image');
    }
  }, [onPhotoCaptured]);

  const handleGalleryOpen = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8
      });

      if (!result.canceled && result.assets.length > 0) {
        onPhotoCaptured(result.assets[0].uri);
      }
    } catch (error) {
      showError('Gallery Error', error instanceof Error ? error.message : 'Failed to open gallery');
    }
  }, [onPhotoCaptured]);

  const showError = useCallback((title: string, message: string) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
    console.error(`${title}: ${message}`);
  }, []);

  const styles = StyleSheet.create({
    processingOverlay: {
      ...containers.centeredContainer,
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    processingText: {
      ...text.body,
      color: colors.text.onPrimary,
      marginTop: Spacing.md,
    },
    landscapeContainer: {
      flexDirection: 'row',
    },
  });

  if (capturedImage) {
    return analysisMode ? (
      <MarkAnalysis
        imageUri={capturedImage}
        onBack={() => setAnalysisMode(false)}
      />
    ) : (
      <ImagePreview
        imageUri={capturedImage}
        onRetry={() => setCapturedImage(null)}
        onConfirm={() => setAnalysisMode(true)}
      />
    );
  }

  return (
    <View style={[cameraStyles.container, isLandscape && styles.landscapeContainer]}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing='back' />

      <View style={cameraStyles.overlay}>
        <ReferencePoints
          pointsStatus={pointsStatus}
          pointsColors={pointsColors}
          isLandscape={isLandscape}
          correctPoints={analysisResult?.correctPoints || 0}
          totalPoints={analysisResult?.totalPoints || 6}
        />
      </View>

      {isProcessing && (
        <View style={styles.processingOverlay}>
          <ActivityIndicator size="large" color={colors.primary.main} />
          <Text style={styles.processingText}>
            Processando imagem...
          </Text>
        </View>
      )}

      <CaptureControls
        onCapture={handleCapture}
        onGalleryOpen={handleGalleryOpen}
        autoCaptureMode={autoCaptureMode}
        onAutoCaptureToggle={handleAutoCaptureToggle}
        isProcessing={isProcessing}
      />
    </View>
  );
};

export default CameraCapture;