import React, { forwardRef, useRef, useEffect, useCallback, useState, useImperativeHandle } from 'react';
import { View, StyleSheet, Animated, Alert, Linking, Image, Dimensions, Platform } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { ImageManipulator, manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as jpeg from 'jpeg-js';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import chroma from 'chroma-js';

import { useTheme } from '../../context/ThemeContext';
import { useFadeAnimation } from '../../hooks/useAnimation';
import { useCameraPermission } from '../../hooks/useCameraPermission';

import { debugLog, DetectedPoint, detectPoints, detectRealEdges, getReferencePoints, ReferencePoint } from '../../utils/coordinateUtils';
import { convertBlobToBase64 } from '../../utils/markUtils';

import AlignmentGuide from '../features/capture/AlignmentGuide';
import CaptureControls from '../features/capture/CaptureControls';
import PreviewOverlay from '../features/capture/PreviewOverlay';

import ProcessingOverlay from '../common/ProcessingOverlay';

import { createCameraBaseStyles } from '../../styles/componentStyles';

interface CameraCaptureProps {
  onPhotoCaptured: (uri: string) => void;
}

export interface CameraCaptureRef {
  retakePicture: () => void;
  startAnalysis: () => void;
}

type CaptureStep = 'positioning' | 'captured' | 'analyzing' | 'results';

const BLACK_COLOR_THRESHOLD = 30; // Valor máximo para considerar como preto (0-255)
const POINT_SAMPLE_SIZE = 3; // Tamanho da região ao redor do ponto para análise (3x3 pixels)

const CameraCapture = forwardRef<CameraCaptureRef, CameraCaptureProps>(({ onPhotoCaptured }, ref) => {
  const [referencePoints, setReferencePoints] = useState<ReferencePoint[]>(getReferencePoints());
  const [alignmentPoints, setAlignmentPoints] = useState<DetectedPoint[]>(() => {
    return getReferencePoints().map(p => ({
      id: p.id,
      position: { x: 0, y: 0 },
      cell: { row: 0, col: 0 },
      color: { r: 0, g: 0, b: 0 },
      confidence: 0,
      success: false,
      matched: false
    }));
  });
  const [currentStep, setCurrentStep] = useState<CaptureStep>('positioning');
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [pointsStatus, setPointsStatus] = useState<{ [key: number]: boolean }>({});
  const [pointsColors, setPointsColors] = useState<{ [key: number]: { r: number, g: number, b: number } }>({});

  const cameraRef = useRef<CameraView>(null);
  const { colors } = useTheme();
  const { fadeAnim, fadeIn, fadeOut } = useFadeAnimation(0);
  const cameraStyles = createCameraBaseStyles(colors);

  const {
    status,
    hasPermission,
    requestPermission,
    openSettings
  } = useCameraPermission();

  useImperativeHandle(ref, () => ({
    retakePicture,
    startAnalysis,
  }));

  useEffect(() => {
    console.log('Current alignmentPoints:', alignmentPoints);
  }, [alignmentPoints]);

  useEffect(() => {
    fadeIn(500);
    return () => fadeOut(300);
  }, [fadeIn, fadeOut]);

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
      setReferencePoints(getReferencePoints()); // Remova o parâmetro isLandscape
    };

    updateOrientation();
    const subscription = Dimensions.addEventListener('change', updateOrientation);
    return () => subscription.remove();
  }, []);

  // Novo método para ajustar a câmera
  const checkCameraPermissions = async () => {
    try {
      const permission = await Camera.requestCameraPermissionsAsync();

      if (permission.granted) {
        setCameraReady(true);
      } else {
        Alert.alert(
          'Permissão necessária',
          'Este aplicativo precisa de acesso à câmera para funcionar',
          [{
            text: 'Abrir Configurações',
            onPress: () => Linking.openSettings()
          },
          { text: 'Cancelar', style: 'cancel' }
          ]
        );
      }
    } catch (error) {
      console.error('Erro ao solicitar permissões:', error);
      Alert.alert('Erro', 'Não foi possível acessar as permissões da câmera');
    }
  };

  useEffect(() => {
    checkCameraPermissions();
  }, []);

  const prepareCamera = async () => {
    try {
      const permission = await Camera.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permissão negada',
          'Você precisa conceder permissão para usar a câmera',
          [
            {
              text: 'Configurações',
              onPress: () => Linking.openSettings()
            },
            {
              text: 'Cancelar',
              style: 'cancel'
            }
          ]
        );
        return;
      }

      setCameraReady(true);
    } catch (error) {
      console.error('Erro ao configurar câmera:', error);
      Alert.alert('Erro', 'Não foi possível configurar a câmera');
    }
  };


  const detectBlackColor = async (uri: string, points: ReferencePoint[]) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const base64 = await convertBlobToBase64(blob);
      const base64Data = base64.split(',')[1];
      const rawImageData = Buffer.from(base64Data, 'base64');
      const imageData = jpeg.decode(rawImageData, { useTArray: true });

      // Aumente a região de análise para pegar os pontos numerados
      const SAMPLE_SIZE = 15; // Aumente para pegar a área do número

      return await Promise.all(points.map(async (point) => {
        const x = Math.round(point.position.x * imageData.width);
        const y = Math.round(point.position.y * imageData.height);

        // Analisar uma área maior ao redor do ponto
        let blackPixels = 0;
        let totalPixels = 0;

        for (let dy = -SAMPLE_SIZE; dy <= SAMPLE_SIZE; dy++) {
          for (let dx = -SAMPLE_SIZE; dx <= SAMPLE_SIZE; dx++) {
            const px = x + dx;
            const py = y + dy;

            if (px >= 0 && px < imageData.width && py >= 0 && py < imageData.height) {
              const idx = (py * imageData.width + px) * 4;
              const r = imageData.data[idx];
              const g = imageData.data[idx + 1];
              const b = imageData.data[idx + 2];
              const darkness = (r + g + b) / 3;

              if (darkness < BLACK_COLOR_THRESHOLD) {
                blackPixels++;
              }
              totalPixels++;
            }
          }
        }

        const blackRatio = blackPixels / totalPixels;
        const isBlack = blackRatio > 0.3; // Pelo menos 30% de pixels pretos na área

        return {
          ...point,
          status: isBlack,
          color: { r: 0, g: 0, b: 0 }, // Cor padrão
          percentage: Math.round(blackRatio * 100)
        };
      }));

    } catch (error) {
      console.error('Erro na detecção:', error);
      return points.map(p => ({ ...p, status: false, percentage: 0 }));
    }
  };

  const handleTakePicture = async () => {
    if (!cameraRef.current) return; // Adicione esta verificação

    try {
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.5, // Reduz a qualidade para 50%
        skipProcessing: true,
        base64: true,
      });

      if (!photo?.uri) throw new Error('Foto sem URI');

      const correctedUri = Platform.OS === 'android'
        ? photo.uri
        : photo.uri.replace('file://', '');

      // Redimensione a imagem antes de processar
      const resizedImage = await manipulateAsync(
        correctedUri,
        [{ resize: { width: 800 } }], // Reduz para 800px de largura
        { compress: 0.7, format: SaveFormat.JPEG }
      );

      setCapturedImage(resizedImage.uri);
      await detectBlackColor(resizedImage.uri, referencePoints);

    } catch (error) {
      console.error('Erro ao capturar:', error);
      if (error.message.includes('unmounted')) {
        Alert.alert('Aviso', 'A câmera foi fechada durante a captura');
      } else {
        Alert.alert('Erro', 'Falha ao processar imagem');
      }
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setAlignmentPoints([]);
    setCurrentStep('positioning');
  };


  interface EdgeCheckResult {
    isValid: boolean;
    darkestCorner?: number;
    averageDarkness?: number;
  }

  const checkEdgesQuick = async (uri: string): Promise<EdgeCheckResult> => {
    try {
      // Verifique se a função existe
      if (!ImageManipulator.manipulateAsync) {
        throw new Error('ImageManipulator não disponível');
      }
      // 1. Carrega apenas uma versão reduzida da imagem
      const resizedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 400 } }], // Reduz para 400px de largura
        { compress: 0.8, format: 'jpeg' }
      );

      // 2. Amostra apenas os 4 cantos
      const response = await fetch(resizedImage.uri);
      const blob = await response.blob();
      const base64 = await convertBlobToBase64(blob);
      const base64Data = base64.split(',')[1];
      const rawImageData = Buffer.from(base64Data, 'base64');
      const imageData = jpeg.decode(rawImageData, {
        maxMemoryUsageInMB: 20,
        maxResolutionInMP: 1
      });

      const corners = [
        { x: 0.05, y: 0.05 },    // Canto superior esquerdo
        { x: 0.95, y: 0.05 },    // Canto superior direito
        { x: 0.05, y: 0.95 },    // Canto inferior esquerdo
        { x: 0.95, y: 0.95 }     // Canto inferior direito
      ];

      let totalDarkness = 0;
      let darkestValue = 255;
      let darkestCorner = 0;

      corners.forEach((corner, index) => {
        const x = Math.round(corner.x * imageData.width);
        const y = Math.round(corner.y * imageData.height);
        const idx = (y * imageData.width + x) * 4;

        const r = imageData.data[idx];
        const g = imageData.data[idx + 1];
        const b = imageData.data[idx + 2];
        const darkness = (r + g + b) / 3; // Média RGB (0-255)

        totalDarkness += darkness;

        if (darkness < darkestValue) {
          darkestValue = darkness;
          darkestCorner = index + 1;
        }
      });

      const averageDarkness = totalDarkness / corners.length;
      const isValid = averageDarkness < 100; // Limite para considerar "escuro"

      return {
        isValid,
        darkestCorner,
        averageDarkness
      };

    } catch (error) {
      console.error('Erro na verificação rápida:', error);
      return fallbackEdgeCheck(uri);
    }
  };

  // Implementação de fallback sem ImageManipulator
  const fallbackEdgeCheck = async (uri: string): Promise<EdgeCheckResult> => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const base64 = await convertBlobToBase64(blob);
      const base64Data = base64.split(',')[1];
      const rawImageData = Buffer.from(base64Data, 'base64');
      const imageData = jpeg.decode(rawImageData, {
        maxMemoryUsageInMB: 20,
        maxResolutionInMP: 1
      });

      // Amostra mínima (apenas 1 pixel por canto)
      const corners = [
        Math.round(0.05 * imageData.width) + Math.round(0.05 * imageData.height) * imageData.width,
        Math.round(0.95 * imageData.width) + Math.round(0.05 * imageData.height) * imageData.width,
        Math.round(0.05 * imageData.width) + Math.round(0.95 * imageData.height) * imageData.width,
        Math.round(0.95 * imageData.width) + Math.round(0.95 * imageData.height) * imageData.width
      ];

      let total = 0;
      corners.forEach(offset => {
        const idx = offset * 4;
        total += (imageData.data[idx] + imageData.data[idx + 1] + imageData.data[idx + 2]) / 3;
      });

      const avgDarkness = total / corners.length;
      return {
        isValid: avgDarkness < 100,
        averageDarkness: avgDarkness
      };
    } catch (error) {
      console.error('Erro no fallback:', error);
      return {
        isValid: false,
        averageDarkness: 255
      };
    }
  };

  // Substitua a função startAnalysis por esta versão simplificada
  const startAnalysis = async () => {
    if (!capturedImage) return;

    setCurrentStep('analyzing');
    setIsProcessing(true);

    try {
      // 1. Verificação básica de bordas
      const edges = await detectRealEdges(capturedImage);

      // 2. Detecção simplificada de pontos
      const detectedPoints = await detectPoints(capturedImage);

      // 3. Atualização do estado
      const pointsStatus: { [key: number]: boolean } = {};
      const pointsColors: { [key: number]: { r: number, g: number, b: number } } = {};

      detectedPoints.forEach(point => {
        pointsStatus[point.id] = point.success || false;
        pointsColors[point.id] = point.color || { r: 0, g: 0, b: 0 };
      });

      setPointsStatus(pointsStatus);
      setPointsColors(pointsColors);
      setAlignmentPoints(detectedPoints);
      setCurrentStep('results');

    } catch (error) {
      console.error('Análise falhou:', error);
      Alert.alert('Erro', 'Não foi possível analisar a imagem');
      setCurrentStep('captured');
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmPicture = () => {
    if (capturedImage) {
      fadeOut(300);
      setTimeout(() => onPhotoCaptured(capturedImage), 300);
    }
  };

  debugLog('CameraCapture - alignmentPoints', alignmentPoints);
  debugLog('CameraCapture - rendering points', {
    referencePoints,
    pointsStatus,
    pointsColors,
    correctPoints: Object.values(pointsStatus).filter(Boolean).length,
    totalPoints: referencePoints.length
  });

  return (
    <Animated.View style={[cameraStyles.container, { opacity: fadeAnim }]}>
      {hasPermission && currentStep === 'positioning' ? (
        <>
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing='back'
            onCameraReady={prepareCamera}
          />
          <AlignmentGuide
            referencePoints={referencePoints}
            isLandscape={isLandscape}
            pointsStatus={pointsStatus}
            pointsColors={pointsColors}
            correctPoints={Object.values(pointsStatus).filter(Boolean).length}
            totalPoints={referencePoints.length}
          />

          <CaptureControls
            currentStep={currentStep}
            onTakePicture={handleTakePicture}
            onRetake={retakePicture}
            onAnalyze={startAnalysis}
            onConfirm={confirmPicture}
            isProcessing={isProcessing}
          />
        </>
      ) : (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: capturedImage || '' }}
            style={styles.previewImage}
            resizeMode="contain"
          />
          {currentStep === 'results' && capturedImage && (
            <PreviewOverlay
              alignmentPoints={alignmentPoints}
              imageUri={capturedImage}
            />
          )}
          <CaptureControls
            currentStep={currentStep}
            onTakePicture={handleTakePicture}
            onRetake={retakePicture}
            onAnalyze={startAnalysis}
            onConfirm={confirmPicture}
          />
        </View>
      )}

      {isProcessing && <ProcessingOverlay />}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    position: 'relative',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
    backgroundColor: 'black',
  },
});

export default CameraCapture;