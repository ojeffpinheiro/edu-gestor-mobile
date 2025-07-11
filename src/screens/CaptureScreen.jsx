import React, { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import ProcessingScreen from '../components/capture/ProcessingScreen';
import CameraScreen from '../components/capture/CameraCaptureScreen';
import GalleryScreen from '../components/capture/GalleryScreen';
import ResultsScreen from '../components/capture/ResultsScreen';
import WelcomeScreen from '../components/capture/WelcomeScreen';

const MainScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [capturedImages, setCapturedImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos da permissão da câmera para funcionar.');
      }
    })();
  }, []);

  const captureImage = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.9,
          base64: true,
          skipProcessing: true
        });
        
        const newImage = {
          id: Date.now(),
          uri: photo.uri,
          timestamp: new Date().toLocaleString()
        };
        
        setCapturedImages([...capturedImages, newImage]);
        Alert.alert('Sucesso', 'Imagem capturada com sucesso!');
      } catch (err) {
        console.error('Erro ao capturar imagem:', err);
        Alert.alert('Erro', 'Falha ao capturar imagem.');
      }
    }
  };

  const processImages = async () => {
    if (capturedImages.length === 0) {
      Alert.alert('Aviso', 'Nenhuma imagem capturada para processar.');
      return;
    }

    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResults = {
      totalQuestions: 20,
      correctAnswers: 15,
      incorrectAnswers: 5,
      score: 75,
      details: Array.from({ length: 20 }, (_, i) => ({
        question: i + 1,
        studentAnswer: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
        correctAnswer: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
        isCorrect: Math.random() > 0.25
      }))
    };
    
    setResults(mockResults);
    setIsProcessing(false);
    setCurrentScreen('results');
  };

  const clearData = () => {
    setCapturedImages([]);
    setResults(null);
    setIsCameraActive(false);
  };

  if (isProcessing) {
    return <ProcessingScreen />;
  }

  switch (currentScreen) {
    case 'capture':
      return (
        <CameraScreen
          isCameraActive={isCameraActive}
          setIsCameraActive={setIsCameraActive}
          capturedImages={capturedImages}
          captureImage={captureImage}
          cameraRef={cameraRef}
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