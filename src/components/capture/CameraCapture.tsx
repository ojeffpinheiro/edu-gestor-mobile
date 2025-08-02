import React, { forwardRef, useRef, useEffect, useCallback, useState, useImperativeHandle } from 'react';
import { View, StyleSheet, Animated, Alert, Linking, Image, Dimensions, Platform } from 'react-native';
import { Camera, CameraCapturedPicture, CameraView } from 'expo-camera';

import { useTheme } from '../../context/ThemeContext';
import { useFadeAnimation } from '../../hooks/useAnimation';

import { triggerHapticFeedback } from '../../utils/hapticUtils';
import { DetectedPoint, detectPoints, getReferencePoints, ReferencePoint } from '../../utils/coordinateUtils';

import AlignmentGuide from '../features/capture/AlignmentGuide';
import CaptureControls from '../features/capture/CaptureControls';
import PreviewOverlay from '../features/capture/PreviewOverlay';

import { createCameraBaseStyles } from '../../styles/componentStyles';

interface CameraCaptureProps {
  onPhotoCaptured: (uri: string) => void;
}

export interface CameraCaptureRef {
  retakePicture: () => void;
  startAnalysis: () => void;
}

type CaptureStep = 'positioning' | 'captured' | 'analyzing' | 'results';

const CameraCapture = forwardRef<CameraCaptureRef, CameraCaptureProps>(({ onPhotoCaptured }, ref) => {
  const [referencePoints, setReferencePoints] = useState<ReferencePoint[]>(getReferencePoints());
  const [alignmentPoints, setAlignmentPoints] = useState<DetectedPoint[]>([]);
  const [currentStep, setCurrentStep] = useState<CaptureStep>('positioning');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  const cameraRef = useRef<CameraView>(null);
  const { colors } = useTheme();
  const { fadeAnim, fadeIn, fadeOut } = useFadeAnimation(0);
  const cameraStyles = createCameraBaseStyles(colors);

  useImperativeHandle(ref, () => ({
    retakePicture,
    startAnalysis,
  }));

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

  const detectAlignmentPoints = async (uri: string) => {
    setCurrentStep('analyzing');
    try {
      const detectedPoints = await detectPoints(uri);
      setAlignmentPoints(detectedPoints); // Já está no formato correto
      setCurrentStep('results');
    } catch (error) {
      console.error('Error detecting points:', error);
      setCurrentStep('captured');
    }
  };

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
    if (!cameraRef.current || !cameraReady) {
      Alert.alert(
        'Câmera não disponível',
        'Não foi possível acessar a câmera. Verifique se:',
        [
          { text: 'OK' },
          { text: 'Configurações', onPress: () => Linking.openSettings() }
        ],
        { cancelable: true }
      );
      return;
    }

    try {
      setCurrentStep('captured');
      const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true, // Importante para manter a orientação original
        exif: true, // Preserva metadados de orientação
      });

      if (!photo.uri) throw new Error('Foto capturada sem URI');

      // Corrige a URI se necessário (para Android)
      const correctedUri = Platform.OS === 'android'
        ? photo.uri
        : photo.uri.replace('file://', '');

      setCapturedImage(correctedUri);
      triggerHapticFeedback('success');
    } catch (error) {
      console.error('Failed to take picture:', error);
      triggerHapticFeedback('error');
      Alert.alert('Erro na Captura', 'Não foi possível capturar a imagem. Tente novamente.');
      setCurrentStep('positioning');
    }
  }, [fadeOut, onPhotoCaptured]);

  const retakePicture = () => {
    setCapturedImage(null);
    setAlignmentPoints([]);
    setCurrentStep('positioning');
  };

  const startAnalysis = () => {
    if (capturedImage) {
      detectAlignmentPoints(capturedImage);
    }
  };

  const confirmPicture = () => {
    if (capturedImage) {
      fadeOut(300);
      setTimeout(() => onPhotoCaptured(capturedImage), 300);
    }
  };

  return (
    <Animated.View style={[cameraStyles.container, { opacity: fadeAnim }]}>
      {currentStep === 'positioning' ? (
        <>
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing='back'
            onCameraReady={prepareCamera}
          />
          <AlignmentGuide referencePoints={referencePoints} isLandscape={isLandscape} />
          <CaptureControls
            currentStep={currentStep}
            onTakePicture={handleTakePicture}
            onRetake={retakePicture}
            onAnalyze={startAnalysis}
            onConfirm={confirmPicture}
          />
        </>
      ) : (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: capturedImage || '' }}
            style={styles.previewImage}
            resizeMode="contain"
          />
          {currentStep === 'results' && (
            <PreviewOverlay
              alignmentPoints={alignmentPoints}
              imageUri={capturedImage || ''}
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
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
    backgroundColor: 'black',
  },
});

export default CameraCapture;