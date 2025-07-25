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
  useColorScheme
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import CameraCapture from '../components/capture/CameraCapture';
import BlueColorDetector from '../components/capture/BlueColorDetector';
import AppButton from '../components/capture/AppButton';

const CaptureScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('main'); // 'main', 'camera', 'colorDetector'
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const colorScheme = useColorScheme();
  
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
      [{ text: 'OK', onPress: () => {} }]
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
    <View style={[
      styles.container, 
      colorScheme === 'dark' && styles.darkContainer
    ]}>
      <Text style={[
        styles.title,
        colorScheme === 'dark' && styles.darkTitle
      ]}>
        Selecione uma imagem
      </Text>

      {!selectedImage && !isProcessing && (
        <View style={[
          styles.imagePlaceholder, 
          colorScheme === 'dark' && styles.darkImagePlaceholder
        ]}>
          <Text style={colorScheme === 'dark' && styles.darkText}>
            Nenhuma imagem selecionada
          </Text>
        </View>
      )}

      {isProcessing ? (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color="#4285F4" />
          <Text style={[
            styles.processingText,
            colorScheme === 'dark' && styles.darkText
          ]}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  darkTitle: {
    color: '#fff',
  },
  darkText: {
    color: '#fff',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginVertical: 20,
    backgroundColor: '#f0f0f0',
  },
  darkImagePlaceholder: {
    backgroundColor: '#1e1e1e',
    borderColor: '#444',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  cameraButton: {
    backgroundColor: '#4285F4',
  },
  galleryButton: {
    backgroundColor: '#34A853',
  },
  colorDetectorButton: {
    backgroundColor: '#1a73e8',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  darkImageContainer: {
    borderColor: '#444',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  processingContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  processingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
  },
  navButton: {
    padding: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  backButtonNav: {
    backgroundColor: '#EA4335',
  },
  nextButton: {
    backgroundColor: '#FBBC05',
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(234, 67, 53, 0.8)',
    borderRadius: 5,
    zIndex: 10,
  },
});

export default CaptureScreen;