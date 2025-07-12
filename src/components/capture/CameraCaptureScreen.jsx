import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { CameraView } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import GridDetectionOverlay from './GridDetectionOverlay';

const CameraScreen = ({ onPhotoCaptured, setCurrentScreen }) => {
  const cameraRef = useRef(null);
  const [isAligned, setIsAligned] = useState(false);

  const handleCapture = async () => {
    if (!isAligned || !cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true
      });
      
      if (onPhotoCaptured) {
        onPhotoCaptured(photo.uri);
      } else {
        Alert.alert('Erro', 'Função de captura não disponível');
      }
    } catch (error) {
      console.error('Erro na captura:', error);
      Alert.alert('Erro', 'Falha ao capturar imagem');
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing="back"
      />
      
      <View style={styles.overlay}>
        <GridDetectionOverlay onAlignmentStatusChange={setIsAligned} />
        
        {/* Botão de voltar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentScreen('home')}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Controles da câmera */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            onPress={handleCapture}
            disabled={!isAligned}
            style={[
              styles.captureButton,
              isAligned && styles.captureButtonActive
            ]}
          >
            <MaterialIcons name="camera" size={32} color="white" />
          </TouchableOpacity>
          
          <Text style={styles.statusText}>
            {isAligned ? 'Pronto para capturar' : 'Ajuste o alinhamento'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent'
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 20
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  captureButtonActive: {
    backgroundColor: '#3B82F6'
  },
  statusText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 8
  }
});

export default CameraScreen;