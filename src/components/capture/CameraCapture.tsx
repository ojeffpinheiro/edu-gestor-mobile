// src/components/capture/CameraCapture.tsx
import React, { useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { CameraView } from 'expo-camera';

import { useTheme } from '../../context/ThemeContext';

import useImageCapture from '../../hooks/useImageCapture';
import useErrorHandling from '../../hooks/useErrorHandling';

import { createCameraBaseStyles } from '../../styles/componentStyles';
import { createContainerStyles, createTextStyles } from '../../styles/globalStyles';
import { Spacing } from '../../styles/designTokens';

import LoadingOverlay from '../LoadingOverlay';
import ReferencePoints from './ReferencePoints';
import CaptureControls from './CaptureControls';
import ImagePreview from './ImagePreview';
import MarkAnalysis from './MarkAnalysis';

const CameraCapture: React.FC<{ onPhotoCaptured: (uri: string) => void }> = ({ onPhotoCaptured }) => {
  const { colors } = useTheme();
  const cameraStyles = createCameraBaseStyles(colors);
  const containers = createContainerStyles(colors);
  const text = createTextStyles(colors);
  const cameraRef = useRef<any>(null);
  
  const {
    hasPermission,
    isProcessing, // Usaremos isProcessing no lugar de isLoading
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
  const { showError } = useErrorHandling();

  const [analysisMode, setAnalysisMode] = useState(false);

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
        <>
          <View style={styles.processingOverlay}>
            <ActivityIndicator size="large" color={colors.primary.main} />
            <Text style={styles.processingText}>
              Processando imagem...
            </Text>
          </View>
          <LoadingOverlay /> {/* Substitui a verificação de isLoading por isProcessing */}
        </>
      )}

      <CaptureControls
        onCapture={() => handleCapture(cameraRef)}
        onGalleryOpen={handleGalleryOpen}
        autoCaptureMode={autoCaptureMode}
        onAutoCaptureToggle={handleAutoCaptureToggle}
        isProcessing={isProcessing}
      />
    </View>
  );
};

export default CameraCapture;