// src/components/capture/CameraCapture.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions, TextInput, Text } from 'react-native';
import { CameraView } from 'expo-camera';
import { useTheme } from '../../context/ThemeContext';
import { createCameraBaseStyles } from '../../styles/componentStyles';
import { createContainerStyles, createTextStyles } from '../../styles/globalStyles';
import { Spacing } from '../../styles/designTokens';
import LoadingOverlay from '../LoadingOverlay';
import ReferencePoints from './ReferencePoints';
import CaptureControls from './CaptureControls';
import ImagePreview from './ImagePreview';
import MarkAnalysis from './MarkAnalysis';
import ScreenTransition from '../common/ScreenTransition';
import ProgressIndicator from '../common/ProgressIndicator';
import SkeletonLoader from '../common/SkeletonLoader';
import useImageCapture from '../../hooks/useImageCapture';
import { validateQuestionCount } from '../../utils/validationUtils';

const CameraCapture: React.FC<{ onPhotoCaptured: (uri: string) => void }> = ({ onPhotoCaptured }) => {
  const { colors } = useTheme();
  const cameraStyles = createCameraBaseStyles(colors);
  const containers = createContainerStyles(colors);
  const text = createTextStyles(colors);
  const cameraRef = useRef<any>(null);

  const {
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
  } = useImageCapture(onPhotoCaptured);

  const [isInitializing, setIsInitializing] = useState(true);
  const [analysisMode, setAnalysisMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [questionCount, setQuestionCount] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Efeito para inicialização
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const animateCapture = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.elastic(1)),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleImageCaptureWrapper = async (cameraRef: React.RefObject<any>) => {
    if (isProcessing || !cameraRef.current) return;

    animateCapture();
    setStatusText('Preparando captura...');
    setProgress(10);

    try {
      await handleCapture(cameraRef);
    } catch (error) {
      console.error('Erro na captura:', error);
    }
  };

  const handleQuestionCountChange = (text: string) => {
    setQuestionCount(text);
    const count = parseInt(text, 10);
    const validation = validateQuestionCount(count);

    if (!validation.isValid) {
      setValidationError(validation.message);
    } else {
      setValidationError(null);
    }
  };

  const handleCaptureWithValidation = async () => {
    const count = parseInt(questionCount, 10);
    const validation = validateQuestionCount(count);

    if (!validation.isValid) {
      setValidationError(validation.message || 'Valor inválido');
      return;
    }

    // Restante da lógica de captura
    await handleImageCaptureWrapper(cameraRef);
  };

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
    captureAnimation: {
      transform: [{ scale: scaleAnim }],
    },
    inputContainer: {
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 12,
      fontSize: 16,
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      marginTop: 4,
    },
  });

  if (isInitializing) {
    return (
      <ScreenTransition>
        <SkeletonLoader />
      </ScreenTransition>
    );
  }

  if (capturedImage) {
    return analysisMode ? (
      <ScreenTransition>
        <MarkAnalysis
          imageUri={capturedImage}
          onBack={() => setAnalysisMode(false)}
        />
      </ScreenTransition>
    ) : (
      <ScreenTransition>
        <ImagePreview
          imageUri={capturedImage}
          onRetry={() => setCapturedImage(null)}
          onConfirm={() => setAnalysisMode(true)}
        />
      </ScreenTransition>
    );
  }

  return (
    <ScreenTransition>
      <View style={[cameraStyles.container, isLandscape && styles.landscapeContainer]}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.captureAnimation]}>
          <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing='back' />
        </Animated.View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={questionCount}
            onChangeText={handleQuestionCountChange}
            placeholder="Número de questões"
          />
          {validationError && <Text style={styles.errorText}>{validationError}</Text>}
        </View>

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
            <ProgressIndicator progress={progress} statusText={statusText} />
          </View>
        )}

        <CaptureControls
          onCapture={() => handleImageCaptureWrapper(cameraRef)}
          onGalleryOpen={handleGalleryOpen}
          autoCaptureMode={autoCaptureMode}
          onAutoCaptureToggle={handleAutoCaptureToggle}
          isProcessing={isProcessing}
        />
      </View>
    </ScreenTransition>
  );
};

export default CameraCapture;