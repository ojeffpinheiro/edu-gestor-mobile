import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Animated, Alert } from 'react-native';
import { CameraView } from 'expo-camera';
import { useTheme } from '../../context/ThemeContext';
import { useFadeAnimation } from '../../hooks/useAnimation';
import AppButton from './AppButton';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createCameraBaseStyles } from '../../styles/componentStyles';

interface CameraCaptureProps {
  onPhotoCaptured: (uri: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onPhotoCaptured }) => {
  const cameraRef = useRef<CameraView>(null);
  const { colors } = useTheme();
  const { fadeAnim, fadeIn, fadeOut } = useFadeAnimation(0);
  const cameraStyles = createCameraBaseStyles(colors);

  useEffect(() => {
    fadeIn(500);
    return () => fadeOut(300);
  }, [fadeIn, fadeOut]);

  const handleTakePicture = useCallback(async () => {
    if (!cameraRef.current) return;
    
    try {
      const photo = await cameraRef.current.takePictureAsync();
      fadeOut(300);
      setTimeout(() => onPhotoCaptured(photo.uri), 300);
    } catch (error) {
      console.error('Failed to take picture:', error);
      Alert.alert('Erro', 'Não foi possível capturar a foto');
    }
  }, [fadeOut, onPhotoCaptured]);

  return (
    <Animated.View style={[cameraStyles.container, { opacity: fadeAnim }]}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing='back' />

      <View style={styles.controls}>
        <AppButton
          title="Capturar"
          onPress={handleTakePicture}
          style={styles.captureButton}
          icon={<MaterialIcons name="camera" size={24} color="white" />}
        />

        <AppButton
          title="Voltar"
          onPress={() => {
            fadeOut(300);
            setTimeout(() => onPhotoCaptured(''), 300);
          }}
          style={styles.backButton}
          icon={<Ionicons name="arrow-back" size={20} color="white" />}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  captureButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
  },
  backButton: {
    backgroundColor: '#F44336',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
  },
});

export default CameraCapture;