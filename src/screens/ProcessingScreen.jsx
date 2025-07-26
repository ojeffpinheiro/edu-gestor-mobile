import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

import { getTensorFromURI } from '../utils/imageUtils';

import HomeScreen from '../components/process/HomeScreen';
import DetailsScreen from '../components/process/DetailsScreen';
import ResultsScreen from '../components/process/ResultsScreen';
import SettingsScreen from '../components/process/SettingsScreen';
import Navigation from '../components/process/Navigation';
import { useTheme } from '../context/ThemeContext';

const ProcessingScreen = () => {
  const { colors } = useTheme();
  const styles = createProcessingScreenStyles(colors);

  const [currentScreen, setCurrentScreen] = useState('home');
  const [capturedImage, setCapturedImage] = useState(null);
  const [processingStatus, setProcessingStatus] = useState('idle');
  const [correctionResults, setCorrectionResults] = useState(null);
  const [examTemplate, setExamTemplate] = useState(null);
  const [students, setStudents] = useState([]);
  const [corrections, setCorrections] = useState([]);

  // Simulação de dados de exemplo
  const sampleExamTemplate = {
    id: '001',
    name: 'Prova de Matemática - 3º Ano',
    questions: 20,
    alternatives: ['A', 'B', 'C', 'D', 'E'],
    answerKey: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D']
  };

  const sampleStudents = [
    { id: '001', name: 'Ana Silva', class: '3ºA' },
    { id: '002', name: 'Carlos Santos', class: '3ºA' },
    { id: '003', name: 'Maria Oliveira', class: '3ºB' },
    { id: '004', name: 'João Pereira', class: '3ºB' }
  ];

  useEffect(() => {
    setExamTemplate(sampleExamTemplate);
    setStudents(sampleStudents);
  }, []);

  const processImage = async (imageUri) => {
  try {
    // Inicializar o TensorFlow
    await tf.ready();
    
    const tensor = await getTensorFromURI(imageUri);
    console.log('Tensor criado com sucesso:', tensor.shape);
    
    setProcessingStatus('processing');
    await new Promise(resolve => setTimeout(resolve, 3000));

    const detectedAnswers = generateRandomAnswers(examTemplate.questions);
    const results = calculateResults(detectedAnswers, examTemplate.answerKey);
    setCorrectionResults(results);
    setProcessingStatus('completed');
    
    // Liberar memória
    tf.dispose(tensor);
  } catch (error) {
    console.error('Falha ao processar imagem:', error);
    setProcessingStatus('failed');
  }
};

  const generateRandomAnswers = (numQuestions) => {
    const alternatives = ['A', 'B', 'C', 'D', 'E'];
    return Array.from({ length: numQuestions }, () => 
      alternatives[Math.floor(Math.random() * alternatives.length)]
    );
  };

  const calculateResults = (studentAnswers, answerKey) => {
    let correctAnswers = 0;
    const detailedResults = studentAnswers.map((answer, index) => {
      const isCorrect = answer === answerKey[index];
      if (isCorrect) correctAnswers++;
      return {
        question: index + 1,
        studentAnswer: answer,
        correctAnswer: answerKey[index],
        isCorrect
      };
    });

    return {
      studentId: '001',
      studentName: 'Ana Silva',
      totalQuestions: answerKey.length,
      correctAnswers,
      score: Math.round((correctAnswers / answerKey.length) * 100),
      detailedResults,
      timestamp: new Date().toISOString()
    };
  };

  const handleImageCapture = (imageUri) => {
    setCapturedImage(imageUri);
    processImage(imageUri);
  };

  const saveCorrection = () => {
    if (correctionResults) {
      const newCorrection = {
        id: Date.now().toString(),
        ...correctionResults,
        savedAt: new Date().toISOString()
      };
      setCorrections([...corrections, newCorrection]);
      setCapturedImage(null);
      setCorrectionResults(null);
      setProcessingStatus('idle');
      setCurrentScreen('home');
    }
  };

  const resetProcessing = () => {
    setCapturedImage(null);
    setCorrectionResults(null);
    setProcessingStatus('idle');
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            examTemplate={examTemplate}
            capturedImage={capturedImage}
            processingStatus={processingStatus}
            correctionResults={correctionResults}
            onImageCapture={handleImageCapture}
            onSaveCorrection={saveCorrection}
            onViewDetails={() => setCurrentScreen('details')}
          />
        );
      case 'details':
        return (
          <DetailsScreen
            correctionResults={correctionResults}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'results':
        return <ResultsScreen corrections={corrections} />;
      case 'settings':
        return (
          <SettingsScreen
            examTemplate={examTemplate}
            onExamTemplateChange={setExamTemplate}
          />
        );
      default:
        return <HomeScreen />;
    } 
  };

  return (
    <View style={styles.screenContainer}>
      <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      {renderScreen()}
    </View>
  );
};

const createProcessingScreenStyles = (colors) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});

export default ProcessingScreen;