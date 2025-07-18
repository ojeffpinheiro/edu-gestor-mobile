import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useCameraPermissions } from 'expo-camera';

import { processAnswerSheet } from '../utils/answerSheetProcessor';

import ProcessingScreen from '../components/capture/ProcessingScreen';
import CameraScreen from '../components/capture/CameraCaptureScreen';
import GalleryScreen from '../components/capture/GalleryScreen';
import ResultsScreen from '../components/capture/ResultsScreen';
import WelcomeScreen from '../components/capture/WelcomeScreen';
import MarkerDetector from '../components/capture/MarkerDetector';

const CaptureScreen = () => {
  const [currentView, setCurrentView] = useState('welcome');
  const [imageUri, setImageUri] = useState(null);
  const [results, setResults] = useState(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraPermission = useCameraPermissions();

  useEffect(() => {
    (async () => {
      const { status } = await cameraPermission.requestPermission();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos da permissão da câmera para capturar a imagem.');
      }
    })();
  }, []);

  const handlePhotoCaptured = async (uri) => {
    setImageUri(uri);
    setCurrentView('processing');
    setIsProcessing(true);

    try {
      const detectionResults = await processAnswerSheet(uri);
      setResults(detectionResults);
      setCurrentView('results');
      setCapturedImages(prev => [...prev, { uri, results: detectionResults }]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível processar a imagem');
      setCurrentView('camera');
    } finally {
      setIsProcessing(false);
    }
  };

  const clearData = () => {
    setCapturedImages([]);
    setResults(null);
    setImageUri(null);
    setCurrentView('welcome');
  };

  if (isProcessing) {
    return <ProcessingScreen />;
  }

  switch (currentView) {
    case 'camera':
      return <CameraScreen
        onPhotoCaptured={handlePhotoCaptured}
        onBack={() => setCurrentView('welcome')}
      />;
    case 'processing':
      return <ProcessingScreen />;
    case 'results':
      return <ResultsScreen
        results={results}
        imageUri={imageUri}
        onBack={() => setCurrentView('welcome')}
      />;
    case 'gallery':
      return <GalleryScreen
        capturedImages={capturedImages}
        setCapturedImages={setCapturedImages}
        onSelect={(item) => {
          setImageUri(item.uri);
          setResults(item.results);
          setCurrentView('results');
        }}
        onBack={() => setCurrentView('welcome')}
      />;
    default:
      return <WelcomeScreen
        capturedImages={capturedImages}
        clearData={clearData}
        processImages={() => {
          if (capturedImages.length > 0) {
            setCurrentView('processing');
            setIsProcessing(true);
          }
        }}
        results={results}
        setCurrentView={setCurrentView}
      />;
  }
};

export default CaptureScreen;