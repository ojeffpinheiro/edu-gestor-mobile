import React, { useState, useRef, useEffect } from 'react';
import { Alert, View } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import ProcessingScreen from '../components/capture/ProcessingScreen';
import CameraScreen from '../components/capture/CameraCaptureScreen';
import GalleryScreen from '../components/capture/GalleryScreen';
import ResultsScreen from '../components/capture/ResultsScreen';
import WelcomeScreen from '../components/capture/WelcomeScreen';
import MarkerDetector from '../components/capture/MarkerDetector';

/**
 * Componente principal que gerencia a navegação entre telas e o estado da aplicação
 */
const CaptureScreen = () => {
  const [currentView, setCurrentView] = useState('camera');
  const [imageUri, setImageUri] = useState(null);
  const [results, setResults] = useState(null);
  
  const handlePhotoCaptured = (uri) => {
    setImageUri(uri);
    setCurrentView('processing');
  };

  const handleDetectionComplete = (detectionResults) => {
    setResults(detectionResults);
    setCurrentView('results');
  };

  const handleRetake = () => {
    setCurrentView('camera');
    setImageUri(null);
    setResults(null);
  };

  return (
    <View style={{ flex: 1 }}>
      {currentView === 'camera' && (
        <CameraScreen onPhotoCaptured={handlePhotoCaptured} />
      )}
      
      {currentView === 'processing' && imageUri && (
        <MarkerDetector 
          imageUri={imageUri} 
          onDetection={handleDetectionComplete} 
        />
      )}
      
      {currentView === 'results' && results && (
        <ResultsScreen 
          results={results} 
          onRetake={handleRetake} 
        />
      )}
    </View>
  );
};

export default CaptureScreen;