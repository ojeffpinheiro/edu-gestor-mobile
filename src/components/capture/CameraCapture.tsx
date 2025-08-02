import React, { forwardRef, useRef, useEffect, useCallback, useState, useImperativeHandle } from 'react';
import { View, StyleSheet, Animated, Alert, Linking, Image, Dimensions, Platform } from 'react-native';
import { Camera, CameraCapturedPicture, CameraView } from 'expo-camera';
import * as jpeg from 'jpeg-js';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import chroma from 'chroma-js';

import { useTheme } from '../../context/ThemeContext';
import { useFadeAnimation } from '../../hooks/useAnimation';

import { triggerHapticFeedback } from '../../utils/hapticUtils';
import { DetectedPoint, detectPoints, detectRealEdges, getReferencePoints, ReferencePoint } from '../../utils/coordinateUtils';

import AlignmentGuide from '../features/capture/AlignmentGuide';
import CaptureControls from '../features/capture/CaptureControls';
import PreviewOverlay from '../features/capture/PreviewOverlay';

import { createCameraBaseStyles } from '../../styles/componentStyles';
import { convertBlobToBase64 } from '../../utils/markUtils';
import ProcessingOverlay from '../common/ProcessingOverlay';
import { useCameraPermission } from '../../hooks/useCameraPermission';

interface CameraCaptureProps {
  onPhotoCaptured: (uri: string) => void;
}

export interface CameraCaptureRef {
  retakePicture: () => void;
  startAnalysis: () => void;
}

type CaptureStep = 'positioning' | 'captured' | 'analyzing' | 'results';

const BLACK_COLOR_THRESHOLD = 50; // Distância máxima para considerar como preto

const CameraCapture = forwardRef<CameraCaptureRef, CameraCaptureProps>(({ onPhotoCaptured }, ref) => {
  const [referencePoints, setReferencePoints] = useState<ReferencePoint[]>(getReferencePoints());
  const [alignmentPoints, setAlignmentPoints] = useState<DetectedPoint[]>([]);
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

  const handleTakePicture = useCallback(async () => {
    if (!hasPermission) {
      const permissionStatus = await requestPermission();
      if (permissionStatus !== 'granted') {
        openSettings();
        return;
      }
    }
    setIsProcessing(true);

    try {
      setCurrentStep('captured');
      const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
        exif: true,
        base64: true, // Adicionado para processamento de cor
      });

      if (!photo.uri) throw new Error('Foto capturada sem URI');

      const correctedUri = Platform.OS === 'android'
        ? photo.uri
        : photo.uri.replace('file://', '');

      setCapturedImage(correctedUri);

      // Chama a detecção de cor
      await detectBlackColor(correctedUri, referencePoints);
      triggerHapticFeedback('success');
    } catch (error) {
      console.error('Failed to take picture:', error);
      triggerHapticFeedback('error');
      Alert.alert('Erro na Captura', 'Não foi possível capturar a imagem. Tente novamente.');
      setCurrentStep('positioning');
    } finally {
      setIsProcessing(false);
    }
  }, [cameraReady, isProcessing, referencePoints]);

  const retakePicture = () => {
    setCapturedImage(null);
    setAlignmentPoints([]);
    setCurrentStep('positioning');
  };

  const startAnalysis = async () => {
    if (!capturedImage) return;

    setCurrentStep('analyzing');
    try {
      // 1. Detecta bordas pretas primeiro
      await detectBlackColor(capturedImage, referencePoints);

      // 2. Detecta os pontos de alinhamento
      const detectedPoints = await detectPoints(capturedImage, isLandscape);

      // Verifica se os pontos foram detectados
      if (detectedPoints.length === 0) {
        throw new Error('Nenhum ponto detectado');
      }

      setAlignmentPoints(detectedPoints);
      setCurrentStep('results');

      // Log para depuração
      console.log('Pontos detectados:', detectedPoints);
    } catch (error) {
      console.error('Error in analysis:', error);
      Alert.alert('Erro', 'Não foi possível detectar os pontos de referência');
      setCurrentStep('captured');
    }
  };

  const confirmPicture = () => {
    if (capturedImage) {
      fadeOut(300);
      setTimeout(() => onPhotoCaptured(capturedImage), 300);
    }
  };

  const detectBlackColor = async (uri: string, points: ReferencePoint[]) => {
    try {
      // 1. Carregar a imagem
      const response = await fetch(uri);
      const blob = await response.blob();
      const base64 = await convertBlobToBase64(blob);
      const base64Data = base64.split(',')[1];

      // 2. Decodificar JPEG
      const rawImageData = Buffer.from(base64Data, 'base64');
      const imageData = jpeg.decode(rawImageData, { useTArray: true });

      // 3. Analisar cada ponto de referência
      const updatedPoints = await Promise.all(points.map(async (point) => {
        // Converter coordenadas normalizadas para pixels
        const x = Math.round(point.position.x * imageData.width);
        const y = Math.round(point.position.y * imageData.height);

        // Pegar uma pequena região ao redor do ponto (5x5 pixels)
        const regionSize = 2;
        let pixelCount = 0;
        const colorSum = { r: 0, g: 0, b: 0 };

        for (let dy = -regionSize; dy <= regionSize; dy++) {
          for (let dx = -regionSize; dx <= regionSize; dx++) {
            const px = x + dx;
            const py = y + dy;

            if (px >= 0 && px < imageData.width && py >= 0 && py < imageData.height) {
              const idx = (py * imageData.width + px) * 4;
              colorSum.r += imageData.data[idx];
              colorSum.g += imageData.data[idx + 1];
              colorSum.b += imageData.data[idx + 2];
              pixelCount++;
            }
          }
        }

        // Calcular média da cor
        const avgR = colorSum.r / pixelCount;
        const avgG = colorSum.g / pixelCount;
        const avgB = colorSum.b / pixelCount;

        // Verificar se é preto
        const color = chroma(avgR, avgG, avgB);
        const blackDistance = chroma.distance(color, '#000000');
        const isBlack = blackDistance < BLACK_COLOR_THRESHOLD;

        return {
          ...point, // Mantém todas as propriedades originais
          status: isBlack,
          color: { r: avgR, g: avgG, b: avgB },
          percentage: (1 - (blackDistance / BLACK_COLOR_THRESHOLD)) * 100

        };
      }));

      return updatedPoints;
    } catch (error) {
      console.error('Erro na detecção de cor:', error);
      return points;
    }
  };

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