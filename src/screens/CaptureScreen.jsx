import React, { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import ProcessingScreen from '../components/capture/ProcessingScreen';
import CameraScreen from '../components/capture/CameraCaptureScreen';
import GalleryScreen from '../components/capture/GalleryScreen';
import ResultsScreen from '../components/capture/ResultsScreen';
import WelcomeScreen from '../components/capture/WelcomeScreen';

/**
 * Componente principal que gerencia a navegação entre telas e o estado da aplicação
 */
const MainScreen = () => {
  // Estados da aplicação
  const [currentScreen, setCurrentScreen] = useState('home'); // Tela atual
  const [capturedImages, setCapturedImages] = useState([]); // Imagens capturadas
  const [isProcessing, setIsProcessing] = useState(false); // Estado de processamento
  const [results, setResults] = useState(null); // Resultados do processamento
  const [isCameraActive, setIsCameraActive] = useState(false); // Câmera ativa
  const [permission, requestPermission] = useCameraPermissions(); // Permissão da câmera
  const cameraRef = useRef(null); // Referência para o componente de câmera

  // Solicita permissão para a câmera quando o componente é montado
  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos da permissão da câmera para funcionar.');
      }
    })();
  }, []);


  const handlePhotoCaptured = (imageUri) => {
    const newImage = {
      id: Date.now(),
      uri: imageUri,
      timestamp: new Date().toLocaleString(),
      hasValidGrid: true,
      gridQuality: 100
    };

    setCapturedImages([...capturedImages, newImage]);
    setCurrentScreen('gallery'); // Ou mantenha na câmera para mais capturas
  };

  /**
   * Captura uma imagem usando a câmera
   */
  const captureImage = async () => {
    const options = {
      quality: 0.7, // Qualidade da imagem
      skipProcessing: true, // Pula processamento adicional
      exif: false, // Não inclui dados EXIF
      base64: false, // Não retorna base64
      width: 1024 // Largura máxima
    };

    if (cameraRef.current) {
      try {
        // Tira uma foto com a câmera
        const photo = await cameraRef.current.takePictureAsync(options);

        // Cria um objeto com informações da imagem
        const newImage = {
          id: Date.now(), // ID único baseado no timestamp
          uri: photo.uri, // URI da imagem
          timestamp: new Date().toLocaleString(), // Data e hora
          hasValidGrid: true, // Assume que a grade é válida inicialmente
          gridQuality: 100 // Qualidade inicial da grade
        };

        // Adiciona a nova imagem ao estado
        setCapturedImages([...capturedImages, newImage]);
        Alert.alert('Sucesso', 'Imagem capturada com sucesso!');
      } catch (err) {
        console.error('Erro ao capturar imagem:', err);
        Alert.alert('Erro', 'Falha ao capturar imagem.');
      }
    }
  };

  /**
   * Processa as imagens capturadas
   */
  const processImages = async () => {
    if (capturedImages.length === 0) {
      Alert.alert('Aviso', 'Nenhuma imagem capturada para processar.');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Pré-processamento: Verifica qualidade das imagens
      const invalidImages = capturedImages.filter(img => !img.hasValidGrid);
      if (invalidImages.length > 0) {
        Alert.alert(
          'Aviso',
          `${invalidImages.length} imagens têm grade inválida. Deseja continuar?`,
          [
            { text: 'Cancelar', onPress: () => setIsProcessing(false) },
            { text: 'Continuar', onPress: () => startProcessing() }
          ]
        );
        return;
      }

      await startProcessing();
    } catch (error) {
      console.error('Erro no processamento:', error);
      Alert.alert('Erro', 'Falha ao processar imagens.');
      setIsProcessing(false);
    }
  };

  /**
   * Inicia o processamento das imagens
   */
  const startProcessing = async () => {
    // Simula o envio para um serviço de processamento
    const processedResults = await simulateProcessingService(capturedImages);

    // Armazena os resultados
    setResults({
      ...processedResults,
      imagesUsed: capturedImages.map(img => img.id)
    });

    setIsProcessing(false);
    setCurrentScreen('results');
  };

  /**
   * Simula o processamento das imagens
   */
  const simulateProcessingService = async (images) => {
    // Simula um tempo de processamento
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Gera resultados simulados
    return {
      score: Math.floor(Math.random() * 40) + 60, // Nota entre 60 e 100
      correctAnswers: Math.floor(Math.random() * 15) + 5, // Entre 5 e 20 acertos
      totalQuestions: 20,
      details: Array.from({ length: 20 }, (_, i) => ({
        question: i + 1,
        studentAnswer: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
        correctAnswer: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
        isCorrect: Math.random() > 0.5
      }))
    };
  };

  /**
   * Limpa todos os dados da aplicação
   */
  const clearData = () => {
    setCapturedImages([]);
    setResults(null);
    setIsCameraActive(false);
    Alert.alert('Sucesso', 'Todos os dados foram limpos.');
  };

  // Mostra tela de processamento se estiver processando
  if (isProcessing) {
    return <ProcessingScreen />;
  }

  // Renderiza a tela atual com base no estado
  switch (currentScreen) {
    case 'capture':
      return (
        <CameraScreen
          onPhotoCaptured={handlePhotoCaptured}
          setCurrentScreen={setCurrentScreen}
        />
      );
    case 'gallery':
      return (
        <GalleryScreen
          capturedImages={capturedImages}
          setCapturedImages={setCapturedImages}
          setCurrentScreen={setCurrentScreen}
        />
      );
    case 'results':
      return (
        <ResultsScreen
          results={results}
          setCurrentScreen={setCurrentScreen}
        />
      );
    default:
      return (
        <WelcomeScreen
          setCurrentScreen={setCurrentScreen}
          capturedImages={capturedImages}
          processImages={processImages}
          results={results}
          clearData={clearData}
        />
      );
  }
};

export default MainScreen;