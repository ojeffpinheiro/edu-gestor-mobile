import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';

import useOrientation from '../hooks/useOrientation';
import useImagePicker from '../hooks/useImagePicker';

import CameraCapture from '../components/capture/CameraCapture';
import BlueColorDetector from '../components/capture/BlueColorDetector';
import AppButton from '../components/capture/AppButton';

import ImagePlaceholder from '../components/features/capture/ImagePlaceholder';
import ProcessingIndicator from '../components/features/capture/ProcessingIndicator';
import { createCaptureScreenStyles } from './styles';

const CaptureScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('main'); // 'main', 'camera', 'colorDetector'
  const [selectedImage, setSelectedImage] = useState(null);
  const orientation = useOrientation();
  const { colors } = useTheme();
  const { openGallery, isProcessing } = useImagePicker();

  const styles = createCaptureScreenStyles(colors);

  const handlePhotoCaptured = (uri) => {
    setSelectedImage({ uri });
    setCurrentScreen('main');
  };

  const handleNextStudent = () => {
    setSelectedImage(null);
    Alert.alert(
      'Próximo aluno',
      'Pronto para capturar o próximo aluno',
      [{ text: 'OK' }]
    );
  };

  const handleSelectImage = async () => {
    const image = await openGallery();
    if (image) {
      setSelectedImage(image);
    }
  };

  // Tela do Detector de Cor Azul
  if (currentScreen === 'colorDetector') {
    return (
      <View style={{ flex: 1 }}>
        <BlueColorDetector />
        <AppButton
          title="Voltar"
          onPress={() => setCurrentScreen('main')}
          style={styles.backButton}
          icon={<Ionicons name="arrow-back" size={20} color="white" />}
          accessibilityLabel="Voltar para tela anterior"
          accessibilityHint="Retorna para a tela de seleção de imagem"
        />
      </View>
    );
  }

  // Tela da Câmera
  if (currentScreen === 'camera') {
    return (
      <View style={{ flex: 1 }}>
        <CameraCapture onPhotoCaptured={handlePhotoCaptured} />
        <AppButton
          title="Voltar"
          onPress={() => setCurrentScreen('main')}
          style={styles.backButton}
          icon={<Ionicons name="arrow-back" size={20} color="white" />}
          accessibilityLabel="Voltar para tela anterior"
          accessibilityHint="Retorna para a tela de seleção de imagem sem tirar foto"
        />
      </View>
    );
  }

  // Tela Principal
  return (
    <View style={styles.screenContainer}>

      <Text style={styles.title}>
        Selecione uma imagem
      </Text>

      {!selectedImage && !isProcessing && <ImagePlaceholder />}
      {isProcessing
        ? <ProcessingIndicator />
        : selectedImage && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.image}
              resizeMode="contain"
              accessibilityLabel="Imagem selecionada"
            />
          </View>
        )}
      {isProcessing && <ProcessingIndicator />}

      <View style={styles.buttonContainer}>
        <AppButton
          title="Abrir Câmera"
          textStyle={{ color: colors.text.card }}
          onPress={() => setCurrentScreen('camera')}
          style={[styles.button, styles.cameraButton]}
          icon={<MaterialIcons name="photo-camera" size={20} color="white" />}
          accessibilityLabel="Abrir câmera"
          accessibilityHint="Abre a câmera para tirar uma nova foto"
        />

        <AppButton
          title="Abrir Galeria"
          onPress={openGallery}
          style={[styles.button, styles.galleryButton]}
          disabled={isProcessing}
          icon={<MaterialIcons name="photo-library" size={20} color="white" />}
          accessibilityLabel="Abrir galeria"
          accessibilityHint="Abre a galeria para selecionar uma imagem existente"
        />

        <AppButton
          title="Detector de Azul"
          onPress={() => setCurrentScreen('colorDetector')}
          style={[styles.button, styles.colorDetectorButton]}
          icon={<FontAwesome name="tint" size={20} color="white" />}
          accessibilityLabel="Abrir detector de cor azul"
          accessibilityHint="Abre a ferramenta de detecção de cor azul"
        />
      </View>

      {selectedImage && (
        <View style={styles.navigationButtons}>
          <AppButton
            title="Voltar"
            onPress={() => setSelectedImage(null)}
            style={[styles.navButton, styles.backButtonNav]}
            textStyle={styles.navButtonText}
            icon={<Ionicons name="arrow-back" size={16} color="white" />}
            accessibilityLabel="Voltar"
            accessibilityHint="Remove a imagem selecionada"
          />

          <AppButton
            title="Próximo Aluno"
            onPress={handleNextStudent}
            style={[styles.navButton, styles.nextButton]}
            textStyle={styles.navButtonText}
            icon={<MaterialCommunityIcons name="account-arrow-right" size={16} color="white" />}
            accessibilityLabel="Próximo aluno"
            accessibilityHint="Prepara para capturar o próximo aluno"
          />
        </View>
      )}
    </View>
  );
};

export default CaptureScreen;