import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import * as jpeg from 'jpeg-js';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import chroma from 'chroma-js';

const BlueColorDetector = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef(null);
  const [isBlue, setIsBlue] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [avgColor, setAvgColor] = useState<{r: number, g: number, b: number} | null>(null);

  useEffect(() => {
    (async () => {
      await tf.ready();
      console.log('TensorFlow.js está pronto');
      
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const checkCentralBlue = async () => {
  if (!cameraRef.current) return;
  
  setIsProcessing(true);
  setIsBlue(null);
  
  try {
    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
      base64: true,
    });

    // Decodificar a imagem base64 manualmente
    const base64Data = photo.base64?.replace(/^data:image\/\w+;base64,/, '');
    const rawImageData = Buffer.from(base64Data || '', 'base64');
    const imageData = jpeg.decode(rawImageData, { useTArray: true });

    // Criar tensor a partir dos pixels
    const buffer = new Uint8Array(imageData.data);
    const imageTensor = tf.tensor3d(buffer, [imageData.height, imageData.width, 4]);

    // Calcular cor média
    const mean = imageTensor.mean(0).mean(0);
    const meanValues = mean.arraySync();
    const r = meanValues[0];
    const g = meanValues[1];
    const b = meanValues[2];
    setAvgColor({r, g, b});
      
      const color = chroma(r, g, b);
      const blueDistance = chroma.distance(color, '#0000FF');
      const isBlueColor = blueDistance < 50;
      setIsBlue(isBlueColor);
      
      tf.dispose([imageTensor, mean]);
  } catch (error) {
    console.error('Erro na detecção:', error);
    Alert.alert('Erro', 'Falha ao processar imagem');
  } finally {
    setIsProcessing(false);
  }
};

  if (hasPermission === null) {
    return <View style={styles.container} />;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Sem acesso à câmera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={'back'}
      />
      
      <TouchableOpacity
        style={styles.detectButton}
        onPress={checkCentralBlue}
        disabled={isProcessing}
      >
        <Text style={styles.buttonText}>
          {isProcessing ? 'Processando...' : 'Detectar Azul'}
        </Text>
      </TouchableOpacity>
      
      {avgColor && (
        <View style={styles.resultContainer}>
          <View style={[
            styles.colorPreview, 
            { backgroundColor: `rgb(${avgColor.r}, ${avgColor.g}, ${avgColor.b})` }
          ]} />
          <Text style={styles.resultText}>
            {isBlue ? '✅ Azul detectado' : '❌ Não é azul'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  detectButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultContainer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  colorPreview: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  resultText: {
    color: 'white',
    marginVertical: 2,
  },
});

export default BlueColorDetector;