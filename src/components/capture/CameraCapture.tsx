import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, Animated, Alert, Linking, Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';

import { useTheme } from '../../context/ThemeContext';

import { useFadeAnimation } from '../../hooks/useAnimation';
import { createCameraBaseStyles } from '../../styles/componentStyles';
import AppButton from './AppButton';
import { triggerHapticFeedback } from '../../utils/hapticUtils';
import { detectPoints, getReferencePoints, ReferencePoint } from '../../utils/coordinateUtils';

interface CameraCaptureProps {
  onPhotoCaptured: (uri: string) => void;
}

interface AlignmentPoint {
  x: number;
  y: number;
  matched: boolean;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onPhotoCaptured }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [alignmentPoints, setAlignmentPoints] = useState<AlignmentPoint[]>([]);
  const cameraRef = useRef<CameraView>(null);
  const { colors } = useTheme();
  const { fadeAnim, fadeIn, fadeOut } = useFadeAnimation(0);
  const cameraStyles = createCameraBaseStyles(colors);

  const [referencePoints, setReferencePoints] = useState<ReferencePoint[]>([]);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
      setReferencePoints(getReferencePoints(width > height));
    };

    updateOrientation();
    Dimensions.addEventListener('change', updateOrientation);


    const subscription = Dimensions.addEventListener('change', updateOrientation);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    fadeIn(500);
    return () => fadeOut(300);
  }, [fadeIn, fadeOut]);

  const detectAlignmentPoints = async (uri: string) => {
    const detectedPoints = await detectPoints(uri);
    setReferencePoints(detectedPoints);
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
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
      });

      if (!photo.uri) {
        throw new Error('Foto capturada sem URI');
      }

      // Solução simplificada - removendo a manipulação inicialmente
      setCapturedImage(photo.uri);
      await detectAlignmentPoints(photo.uri);
      triggerHapticFeedback('success');

    } catch (error) {
      console.error('Failed to take picture:', error);
      triggerHapticFeedback('error');
      Alert.alert('Erro na Captura', 'Não foi possível capturar a imagem. Tente novamente.');
    } finally {
      setIsCapturing(false);
    }
  }, [fadeOut, onPhotoCaptured]);

  const retakePicture = () => {
    setCapturedImage(null);
    setAlignmentPoints([]);
  };

  const confirmPicture = () => {
    if (capturedImage) {
      fadeOut(300);
      setTimeout(() => onPhotoCaptured(capturedImage), 300);
    }
  };

  const AlignmentGuide = () => (
    <View style={styles.alignmentContainer}>
      {referencePoints.map((point) => (
        <View
          key={point.id}
          style={[
            styles.alignmentPoint,
            {
              left: `${point.position.x * 100}%`,
              top: `${point.position.y * 100}%`,
              backgroundColor: point.matched ? '#4CAF50' : '#F44336',
            }
          ]}
        />
      ))}
      <View style={styles.centerPoint} />
    </View>
  );

  const PreviewOverlay = () => (
    <View style={styles.previewOverlay}>
      {alignmentPoints.map((point, index) => (
        <View
          key={index}
          style={[
            styles.detectedPoint,
            {
              left: `${point.x * 100}%`,
              top: `${point.y * 100}%`,
              backgroundColor: point.matched ? '#4CAF50' : '#F44336',
            }
          ]}
        />
      ))}
    </View>
  );

  return (
    <Animated.View style={[cameraStyles.container, { opacity: fadeAnim }]}>
      {capturedImage ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
          <PreviewOverlay />

          <View style={styles.previewButtons}>
            <AppButton
              title="Tirar Novamente"
              onPress={retakePicture}
              style={[styles.captureButton, { backgroundColor: '#F44336' }]}
              icon={<MaterialIcons name="replay" size={24} color="white" />}
            />
            <AppButton
              title="Confirmar"
              onPress={confirmPicture}
              style={[styles.captureButton, { backgroundColor: '#4CAF50' }]}
              icon={<MaterialIcons name="check" size={24} color="white" />}
            />
          </View>
        </View>
      ) : (
        <>
          <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing='back' />
          <AlignmentGuide />

          <View style={styles.controls}>
            <AppButton
              title="Capturar"
              onPress={handleTakePicture}
              style={styles.captureButton}
              icon={<MaterialIcons name="camera" size={24} color="white" />}
              disabled={isCapturing}
            />
          </View>
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alignmentContainer: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '20%',
    borderWidth: 2,
    borderColor: 'rgba(0, 150, 255, 0.6)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignmentBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: 'rgba(0, 150, 255, 0.3)',
    borderRadius: 8,
  },
  alignmentPoint: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 150, 255, 0.8)',
    borderWidth: 3,
    borderColor: 'white',
  },
  topLeftPoint: {
    top: -8,
    left: -8,
  },
  topRightPoint: {
    top: -8,
    right: -8,
  },
  bottomLeftPoint: {
    bottom: -8,
    left: -8,
  },
  bottomRightPoint: {
    bottom: -8,
    right: -8,
  },
  middleLeftPoint: {
    top: '50%',
    left: -8,
    marginTop: -8,
  },
  middleRightPoint: {
    top: '50%',
    right: -8,
    marginTop: -8,
  },
  centerPoint: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(0, 150, 255, 0.8)',
  },
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
  previewOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  detectedPoint: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: -8,
    marginTop: -8,
    borderWidth: 2,
    borderColor: 'white',
  },
  previewButtons: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
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