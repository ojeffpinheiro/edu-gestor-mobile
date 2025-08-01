import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, Animated, Alert, Linking } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';

import { useTheme } from '../../context/ThemeContext';

import { useFadeAnimation } from '../../hooks/useAnimation';
import { createCameraBaseStyles } from '../../styles/componentStyles';
import AppButton from './AppButton';
import { triggerHapticFeedback } from '../../utils/hapticUtils';

interface CameraCaptureProps {
  onPhotoCaptured: (uri: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onPhotoCaptured }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const { colors } = useTheme();
  const { fadeAnim, fadeIn, fadeOut } = useFadeAnimation(0);
  const cameraStyles = createCameraBaseStyles(colors);

  useEffect(() => {
    fadeIn(500);
    return () => fadeOut(300);
  }, [fadeIn, fadeOut]);

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
        {
          cancelable: true
        }
      );
      return;
    }

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
      });

      if (!photo.uri) {
        throw new Error('Foto capturada sem URI');
      }

      // Feedback visual de sucesso
      triggerHapticFeedback('success');
      fadeOut(300);
      setTimeout(() => onPhotoCaptured(photo.uri), 300);
    } catch (error) {
      console.error('Failed to take picture:', error);
      triggerHapticFeedback('error');

      let errorMessage = 'Erro desconhecido ao capturar foto';
      if (error.message.includes('permission')) {
        errorMessage = 'Permissão da câmera negada. Por favor, conceda permissão nas configurações.';
      } else if (error.message.includes('URI')) {
        errorMessage = 'A foto foi capturada mas não pôde ser salva. Tente novamente.';
      }

      Alert.alert('Erro na Captura', errorMessage, [
        { text: 'Entendi' },
        error.message.includes('permission')
          ? {
            text: 'Abrir Configurações',
            onPress: () => Linking.openSettings()
          }
          : {
            text: 'Tentar Novamente',
            onPress: handleTakePicture
          }
      ]);
    } finally {
      setIsCapturing(false);
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