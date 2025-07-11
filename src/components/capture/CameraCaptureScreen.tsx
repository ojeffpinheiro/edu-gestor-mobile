import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { CameraView } from 'expo-camera';
import { X, Camera as CameraIcon, FileText } from 'lucide-react-native';
import styles from './styles';

const { width, height } = Dimensions.get('window');

const CameraScreen = ({ 
  isCameraActive, 
  setIsCameraActive, 
  capturedImages, 
  captureImage, 
  cameraRef,
  setCurrentScreen
}) => (
  <View style={styles.cameraContainer}>
    {!isCameraActive ? (
      <View style={styles.cameraPlaceholder}>
        <TouchableOpacity
          onPress={() => setIsCameraActive(true)}
          style={[styles.button, styles.primaryButton, styles.startCameraButton]}
        >
          <CameraIcon size={24} color="white" />
          <Text style={styles.buttonText}>Iniciar Câmera</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <View style={styles.cameraWrapper}>
          <CameraView 
            ref={cameraRef}
            facing="back"
            style={styles.camera}
          />
        </View>
        
        {/* Restante do código permanece igual */}
        <View style={styles.cameraHeader}>
          <TouchableOpacity
            onPress={() => {
              setIsCameraActive(false);
              setCurrentScreen('home');
            }}
            style={styles.cameraHeaderButton}
          >
            <X size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>{capturedImages.length} fotos</Text>
          </View>
        </View>

        <View style={styles.alignmentGuide}>
          <View style={styles.alignmentBox}>
            <View style={styles.cornerCircleTopLeft} />
            <View style={styles.cornerCircleTopRight} />
            <View style={styles.cornerCircleBottomLeft} />
            <View style={styles.cornerCircleBottomRight} />
            
            <View style={styles.alignmentContent}>
              <FileText size={48} color="white" />
              <Text style={styles.alignmentText}>Alinhe a folha de resposta</Text>
              <Text style={styles.alignmentText}>dentro desta área</Text>
            </View>
          </View>
        </View>

        <View style={styles.captureButtonContainer}>
          <TouchableOpacity
            onPress={captureImage}
            style={styles.captureButton}
          >
            <View style={styles.captureButtonInner}>
              <CameraIcon size={32} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )}
  </View>
);

export default CameraScreen;