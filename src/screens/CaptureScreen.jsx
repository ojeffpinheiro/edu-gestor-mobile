import { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
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
  const [permission, requestPermission] = useCameraPermissions();

  // Solicitar permissão da câmera
  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos da permissão da câmera para funcionar.');
      }
    })();
  }, []);

  const handlePhotoCaptured = (uri) => {
    setImageUri(uri);
    setCurrentView('processing');
  };

  const handleDetectionComplete = (detectionResults) => {
    setResults(detectionResults);
    setCurrentView('results');
  };

  const clearData = () => {
    setCapturedImages([]);
    setResults(null);
    setImageUri(null);
  };

  if (isProcessing) {
    return <ProcessingScreen />;
  }

  switch (currentView) {
    case 'camera':
      return (
        <CameraScreen
          onPhotoCaptured={handlePhotoCaptured}
          setCurrentScreen={setCurrentView}
        />
      );
      
    case 'processing':
      return (
        <MarkerDetector 
          imageUri={imageUri}
          onDetectionComplete={handleDetectionComplete}
        />
      );
      
    case 'results':
      return <ResultsScreen results={results} />;
      
    case 'welcome':
      return (
        <WelcomeScreen
          setCurrentView={setCurrentView}
          capturedImages={capturedImages}
          clearData={clearData}
          results={results}
        />
      );
      
    case 'gallery':
      return (
        <GalleryScreen
          capturedImages={capturedImages}
          setCapturedImages={setCapturedImages}
          setCurrentView={setCurrentView}
        />
      );
      
    default:
      return <WelcomeScreen setCurrentView={setCurrentView} />;
  }
};

export default CaptureScreen;