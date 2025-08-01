import React, { forwardRef, useRef, useEffect, useCallback, useState, useImperativeHandle } from 'react';
import { View, StyleSheet, Animated, Alert, Linking, Image, Dimensions, ActivityIndicator, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';

import { useTheme } from '../../context/ThemeContext';
import { useFadeAnimation } from '../../hooks/useAnimation';
import { createCameraBaseStyles } from '../../styles/componentStyles';
import AppButton from './AppButton';
import { triggerHapticFeedback } from '../../utils/hapticUtils';
import { detectPoints, getReferencePoints, ReferencePoint } from '../../utils/coordinateUtils';
import AlignmentGuide from '../features/capture/AlignmentGuide';
import CaptureControls from '../features/capture/CaptureControls';
import PreviewOverlay from '../features/capture/PreviewOverlay';

interface CameraCaptureProps {
  onPhotoCaptured: (uri: string) => void;
}

export interface CameraCaptureRef {
  retakePicture: () => void;
  startAnalysis: () => void;
}

interface AlignmentPoint {
  x: number;
  y: number;
  matched: boolean;
}

type CaptureStep = 'positioning' | 'captured' | 'analyzing' | 'results';

const CameraCapture = forwardRef<CameraCaptureRef, CameraCaptureProps>(({ onPhotoCaptured }, ref) => {
  const [currentStep, setCurrentStep] = useState<CaptureStep>('positioning');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [alignmentPoints, setAlignmentPoints] = useState<AlignmentPoint[]>([]);
  const cameraRef = useRef<CameraView>(null);
  const { colors } = useTheme();
  const { fadeAnim, fadeIn, fadeOut } = useFadeAnimation(0);
  const cameraStyles = createCameraBaseStyles(colors);

  const [referencePoints, setReferencePoints] = useState<ReferencePoint[]>([]);
  const [isLandscape, setIsLandscape] = useState(false);

  useImperativeHandle(ref, () => ({
    retakePicture,
    startAnalysis,
  }));

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
      setReferencePoints(getReferencePoints(width > height));
    };

    updateOrientation();
    const subscription = Dimensions.addEventListener('change', updateOrientation);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    fadeIn(500);
    return () => fadeOut(300);
  }, [fadeIn, fadeOut]);

  const detectAlignmentPoints = async (uri: string) => {
    setCurrentStep('analyzing');
    try {
      const detectedPoints = await detectPoints(uri);
      const pointsWithStatus = detectedPoints.map(point => ({
        x: point.position.x,
        y: point.position.y,
        matched: point.matched || false
      }));
      setAlignmentPoints(pointsWithStatus);
      setReferencePoints(detectedPoints);
      setCurrentStep('results');
    } catch (error) {
      console.error('Error detecting points:', error);
      setCurrentStep('captured');
    }
  };

  const handleTakePicture = useCallback(async () => {
    if (!cameraRef.current) {
      Alert.alert(
        'Câmera não disponível',
        'Não foi possível acessar a câmera. Verifique se:',
        [
          { text: 'OK' },
          {
            text: 'Configurações',
            onPress: () => Linking.openSettings()
          }
        ],
        { cancelable: true }
      );
      return;
    }

    try {
      setCurrentStep('captured');
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
      });

      if (!photo.uri) {
        throw new Error('Foto capturada sem URI');
      }

      setCapturedImage(photo.uri);
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
          <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing='back' />
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
          <Image source={{ uri: capturedImage || '' }} style={styles.previewImage} />
          {currentStep === 'results' && <PreviewOverlay alignmentPoints={alignmentPoints} />}
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