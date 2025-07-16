import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import GridDetectionOverlay from './GridDetectionOverlay';
import { processAnswerSheet } from '../../utils/answerSheetProcessor';
import { usePersistedImages } from '../../utils/imageUtils';
import styles from './styles';

const CameraScreen = ({ navigation }) => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);

  const [isAligned, setIsAligned] = useState(false);
  const [lastFrameUri, setLastFrameUri] = useState(null);
  const cameraRef = useRef(null);

  const { images, saveImages } = usePersistedImages();

  const captureFrame = useCallback(async () => {
    if (cameraRef.current && !isProcessing) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          skipProcessing: true,
          base64: true
        });
        setLastFrameUri(photo.uri);
      } catch (error) {
        console.warn('Frame capture error:', error);
      }
    }
  }, [isProcessing]);

  useEffect(() => {
    const interval = setInterval(captureFrame, 1000);
    return () => clearInterval(interval);
  }, []);

  // Verifica permissões da câmera
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Precisamos de permissão para acessar a câmera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Conceder permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Função para capturar e processar a imagem
  const handleCapture = async () => {
    if (!cameraRef.current || !isAligned) return;

    try {
      setIsProcessing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
      });

      // Processa a folha de respostas
      const result = await processAnswerSheet(photo.uri);

      if (result.success) {
        // Salva a imagem e navega para os resultados
        saveImages([...images, { uri: photo.uri, processedAt: new Date().toISOString() }]);
        navigation.navigate('Results', { result });
      } else {
        Alert.alert('Erro', 'Não foi possível processar a folha de respostas');
      }
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao processar a imagem');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing={facing}
      />

      {/* Overlay de detecção de grade */}
      <GridDetectionOverlay
        imageUri={lastFrameUri}
        onAlignmentStatusChange={setIsAligned}
      />

      {/* Botões */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.captureButton, (!isAligned || isProcessing) && styles.disabledButton]}
          onPress={() => onPhotoCaptured(lastFrameUri)}
          disabled={!isAligned || isProcessing}
        >
          <Text style={styles.buttonText}>
            {isProcessing ? 'Processando...' : 'Capturar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default CameraScreen;