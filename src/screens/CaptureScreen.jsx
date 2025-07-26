import React, { useState, useEffect } from 'react';
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
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import CameraCapture from '../components/capture/CameraCapture';
import BlueColorDetector from '../components/capture/BlueColorDetector';
import AppButton from '../components/capture/AppButton';
import { Spacing } from '../styles/designTokens';
import { useTheme } from '../context/ThemeContext';
import { createContainerStyles, createButtonStyles, createTextStyles, createCardStyles } from '../styles/globalStyles';

const CaptureScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('main'); // 'main', 'camera', 'colorDetector'
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const { colors } = useTheme()

  const styles = createCaptureScreenStyles(colors)

  // Monitorar orientação do dispositivo
  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? 'LANDSCAPE' : 'PORTRAIT');
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);
    updateOrientation(); // Chamada inicial

    return () => subscription?.remove();
  }, []);

  // Abrir galeria com tratamento de erros melhorado
  const openGallery = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos da permissão para acessar sua galeria para que você possa selecionar imagens.',
          [{ text: 'OK' }]
        );
        return;
      }
    }

    setIsProcessing(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        setSelectedImage({
          uri: result.assets[0].uri,
          width: result.assets[0].width,
          height: result.assets[0].height,
        });
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert(
        'Erro',
        'Não foi possível acessar a galeria. Por favor, tente novamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePhotoCaptured = (uri) => {
    setSelectedImage({ uri });
    setCurrentScreen('main'); // Volta para a tela principal após captura
  };

  const handleNextStudent = () => {
    setSelectedImage(null);
    Alert.alert(
      'Próximo aluno',
      'Pronto para capturar o próximo aluno',
      [{ text: 'OK', onPress: () => { } }]
    );
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
  // Tela Principal
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>
        Selecione uma imagem
      </Text>

      {!selectedImage && !isProcessing && (
        <View style={styles.imagePlaceholder}>
          <Text>
            Nenhuma imagem selecionada
          </Text>
        </View>
      )}

      {isProcessing ? (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color="#4285F4" />
          <Text style={styles.processingText}>
            Processando...
          </Text>
        </View>
      ) : selectedImage && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: selectedImage.uri }}
            style={styles.image}
            resizeMode="contain"
            accessibilityLabel="Imagem selecionada"
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <AppButton
          title="Abrir Câmera"
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

export const createCaptureScreenStyles = (colors) => {
  const containers = createContainerStyles(colors);
  const buttons = createButtonStyles(colors);
  const text = createTextStyles(colors);
  const cards = createCardStyles(colors);

  return StyleSheet.create({
    screenContainer: {
      ...containers.screenContainer,
    },
    title: {
      ...text.heading1,
      textAlign: 'center',
      marginBottom: Spacing.xl,
    },
    imagePlaceholder: {
      ...cards.base,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: Spacing.lg,
    },
    buttonContainer: {
      ...containers.buttonContainer,
    },
    button: {
      ...buttons.primary,
      width: '100%',
      marginBottom: Spacing.md,
    },
    cameraButton: {
      backgroundColor: colors.primary.main,
    },
    galleryButton: {
      ...buttons.secondary,
    },
    colorDetectorButton: {
      backgroundColor: colors.primary.light,
      marginTop: Spacing.md,
    },
    buttonText: {
      color: colors.text.onPrimary,
      fontWeight: Typography.fontWeight.bold,
      fontSize: Typography.fontSize.md,
    },
    imageContainer: {
      width: '100%',
      height: 300,
      marginVertical: Spacing.lg,
      borderRadius: BorderRadius.md,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    processingContainer: {
      marginTop: Spacing.xl,
      alignItems: 'center',
    },
    processingText: {
      marginTop: Spacing.md,
      fontSize: Typography.fontSize.md,
      color: colors.text.secondary,
    },
    navigationButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: Spacing.xl,
    },
    navButton: {
      padding: Spacing.lg,
      borderRadius: BorderRadius.md,
      width: '45%',
      alignItems: 'center',
      ...Shadow(colors).xs,
    },
    backButtonNav: {
      backgroundColor: colors.feedback.error,
    },
    nextButton: {
      backgroundColor: colors.feedback.warning,
    },
    navButtonText: {
      color: colors.text.onPrimary,
      fontWeight: Typography.fontWeight.bold,
      fontSize: Typography.fontSize.md,
    },
    backButton: {
      position: 'absolute',
      top: Spacing.xxl,
      left: Spacing.lg,
      padding: Spacing.md,
      backgroundColor: colors.feedback.error + 'CC',
      borderRadius: BorderRadius.sm,
      zIndex: 10,
    },
  });
};

export default CaptureScreen;