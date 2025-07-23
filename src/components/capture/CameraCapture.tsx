import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Alert, Dimensions, StyleSheet } from 'react-native';
import { CameraCapturedPicture, CameraView } from 'expo-camera';
import chroma from 'chroma-js';
import { Buffer } from 'buffer';
import * as ImagePicker from 'expo-image-picker';
import * as jpeg from 'jpeg-js';
import * as tf from '@tensorflow/tfjs';
import * as FileSystem from 'expo-file-system';

import ImagePreview from './ImagePreview';
import ReferencePoints from './ReferencePoints';
import CaptureControls from './CaptureControls';

import styles from '../../screens/Camera';

interface PointsStatus {
  [key: number]: boolean;
}

interface PointColor {
  r: number;
  g: number;
  b: number;
}

interface PointsColors {
  [key: number]: PointColor;
}

const ANALYSIS_INTERVAL = 3000;
const BLUE_THRESHOLD = 50; // Distância máxima para considerar como azul

const CameraCapture: React.FC<{ onPhotoCaptured: (uri: string) => void }> = ({ onPhotoCaptured }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoCapture, setAutoCapture] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const isLandscape = dimensions.width > dimensions.height;
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [pointsStatus, setPointsStatus] = useState<PointsStatus>({});
  const [pointsColors, setPointsColors] = useState<PointsColors>({});
  const cameraRef = useRef<any>(null);

  // Auto capture effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoCapture && !isProcessing && hasPermission) {
      interval = setInterval(handleCapture, ANALYSIS_INTERVAL);
    }
    return () => clearInterval(interval);
  }, [autoCapture, isProcessing, hasPermission]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const analyzePoints = async (imageUri: string) => {
    try {
       const base64String = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Decodificar manualmente
      const rawImageData = Buffer.from(base64String, 'base64');
      const imageData = jpeg.decode(rawImageData, { useTArray: true });
      
      // Carregar a imagem - abordagem alternativa para React Native
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      // Restante do código permanece o mesmo...
      const pixelBuffer = new Uint8Array(imageData.data);
      const imageTensor = tf.tensor3d(pixelBuffer, [imageData.height, imageData.width, 4]);

      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
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

      // Analisar cada ponto de referência
      for (const point of referencePoints) {
        const x = Math.round(point.x * imageData.width);
        const y = Math.round(point.y * imageData.height);
        
        // Pegar uma região 10x10 pixels ao redor do ponto
        const region = imageTensor.slice(
          [Math.max(0, y - 5), Math.max(0, x - 5), 0],
          [10, 10, 4]
        );
        
        // Calcular cor média
        const mean = region.mean(0).mean(0);
        const meanValues = await mean.array() as number[]; // Adicionando type assertion aqui
        const [r, g, b] = meanValues;
        
        // Verificar se é azul
        const color = chroma(r, g, b);
        const blueDistance = chroma.distance(color, '#0000FF');
        const isBlue = blueDistance < BLUE_THRESHOLD;
        
        newPointsStatus[point.id] = isBlue;
        newPointsColors[point.id] = { r, g, b };
        
        tf.dispose([region, mean]);
      }

      tf.dispose([imageTensor]);

      return {
        status: newPointsStatus,
        colors: newPointsColors,
        shouldCapture: Object.values(newPointsStatus).every(Boolean)
      };
    } catch (error) {
      console.error('Erro na análise:', error);
      throw error;
    }
  };

  const handleCapture = useCallback(async () => {
    if (!cameraRef.current || isProcessing) return;

    setIsProcessing(true);
    try {
      const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
        exif: false
      });

      const { status, colors, shouldCapture } = await analyzePoints(photo.uri);

      setPointsStatus(status);
      setPointsColors(colors);
      
      if (shouldCapture) {
        await handleImageCapture(photo.uri);
      }
    } catch (error) {
      showError('Capture Error', error instanceof Error ? error.message : 'Unknown error');
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

  if (capturedImage) {
    return (
      <ImagePreview
        imageUri={capturedImage}
        onRetry={() => setCapturedImage(null)}
        onConfirm={() => onPhotoCaptured(capturedImage)}
      />
    );
  }

   return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef} style={StyleSheet.absoluteFill} facing='back' />
      <View style={styles.overlay}>
        <ReferencePoints 
          pointsStatus={pointsStatus} 
          pointsColors={pointsColors}
          isLandscape={isLandscape} 
        />
      </View>
      <CaptureControls
        onCapture={handleCapture}
        onGalleryOpen={handleGalleryOpen}
        autoCapture={autoCapture}
        onAutoCaptureToggle={() => setAutoCapture(!autoCapture)}
        isProcessing={isProcessing} />
    </View>
  );
};

export default CameraCapture;