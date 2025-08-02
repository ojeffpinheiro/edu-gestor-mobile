import React, { useState, useCallback } from 'react';
import { Alert, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';
import useOrientation from '../hooks/useOrientation';
import useImagePicker from '../hooks/useImagePicker';

import CameraCapture from '../components/capture/CameraCapture';
import BlueColorDetector from '../components/capture/BlueColorDetector';
import AppButton from '../components/capture/AppButton';
import MainScreen from '../components/capture/MainScreen';

import MarkAnalysis from '../components/capture/MarkAnalysis';
import { createCaptureScreenStyles } from './styles';

const CaptureScreen = () => {
  const [currentScreen, setCurrentScreen] = useState<'main' | 'camera' | 'colorDetector' | 'analysis'>('main');
  const [selectedImage, setSelectedImage] = useState<{ uri: string } | null>(null);

  const orientation = useOrientation();
  const { colors } = useTheme();
  const { openGallery, isProcessing } = useImagePicker();
  const styles = createCaptureScreenStyles(colors);

  const handlePhotoCaptured = useCallback((uri: string) => {
    setSelectedImage({ uri });
    setCurrentScreen('main');
  }, []);

  const handleNextStudent = useCallback(() => {
    setSelectedImage(null);
    Alert.alert('Próximo aluno', 'Pronto para capturar o próximo aluno', [{ text: 'OK' }]);
  }, []);

  const handleSelectImage = useCallback(async () => {
    const image = await openGallery();
    if (image) setSelectedImage(image);
  }, [openGallery]);
  
  const renderBackButton = (onPress: () => void) => (
    <AppButton
      onPress={onPress}
      style={styles.backButton}
      icon={<Ionicons name="close-outline" size={50} color={colors.gray[500]} />}
      accessibilityLabel="Voltar para tela anterior"
      accessibilityHint="Retorna para a tela de seleção de imagem"
    />
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'colorDetector':
        return (
          <View style={{ flex: 1 }}>
            <BlueColorDetector />
            {renderBackButton(() => setCurrentScreen('main'))}
          </View>
        );
      case 'camera':
        return (
          <View style={{ flex: 1 }}>
            <CameraCapture onPhotoCaptured={handlePhotoCaptured} />
            {renderBackButton(() => setCurrentScreen('main'))}
          </View>
        );
      case 'analysis': 
        return (<MarkAnalysis image={selectedImage || null} />);
      default:
        return (
          <MainScreen
            selectedImage={selectedImage}
            isProcessing={isProcessing}
            onScreenChange={setCurrentScreen}
            onSelectImage={handleSelectImage}
            onResetImage={() => setSelectedImage(null)}
            onNextStudent={handleNextStudent}
            orientation={orientation}
          />
        );
    }
  };

  return renderScreen();
};

export default CaptureScreen;