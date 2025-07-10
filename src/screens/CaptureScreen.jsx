import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { 
  Camera, 
  FileText, 
  CheckCircle, 
  Upload, 
  Home, 
  Settings, 
  BookOpen,
  Scan,
  X,
  RotateCcw,
  Download
} from 'lucide-react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const CaptureScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [capturedImages, setCapturedImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos da permissão da câmera para funcionar.');
      }
    })();
  }, []);

  // Capturar imagem
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

  // Processar imagens
  const processImages = async () => {
    if (capturedImages.length === 0) {
      Alert.alert('Aviso', 'Nenhuma imagem capturada para processar.');
      return;
    }

    setIsProcessing(true);
    
    // Simulação de processamento
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

  // Limpar dados
  const clearData = () => {
    setCapturedImages([]);
    setResults(null);
    setIsCameraActive(false);
  };

  const HomeScreen = () => (
    <View style={styles.homeContainer}>
      <View style={styles.maxWidthContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <FileText size={48} color="#3b82f6" />
          </View>
          <Text style={styles.title}>EduScan</Text>
          <Text style={styles.subtitle}>Correção Automatizada de Provas</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setCurrentScreen('capture')}
            style={[styles.button, styles.primaryButton]}
          >
            <Camera size={24} color="white" />
            <Text style={styles.buttonText}>Capturar Provas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCurrentScreen('gallery')}
            style={[styles.button, styles.secondaryButton]}
          >
            <BookOpen size={24} color="#374151" />
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Provas Capturadas ({capturedImages.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={processImages}
            disabled={capturedImages.length === 0}
            style={[
              styles.button,
              capturedImages.length === 0 
                ? styles.disabledButton 
                : styles.successButton
            ]}
          >
            <Scan size={24} color={capturedImages.length === 0 ? "#6b7280" : "white"} />
            <Text style={[
              styles.buttonText,
              capturedImages.length === 0 && styles.disabledButtonText
            ]}>
              Processar Provas
            </Text>
          </TouchableOpacity>

          {results && (
            <TouchableOpacity
              onPress={() => setCurrentScreen('results')}
              style={[styles.button, styles.purpleButton]}
            >
              <CheckCircle size={24} color="white" />
              <Text style={styles.buttonText}>Ver Resultados</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={clearData}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>Limpar Dados</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const CameraScreen = () => (
    <View style={styles.cameraContainer}>
      {!isCameraActive ? (
        <View style={styles.cameraPlaceholder}>
          <TouchableOpacity
            onPress={() => setIsCameraActive(true)}
            style={[styles.button, styles.primaryButton, styles.startCameraButton]}
          >
            <Camera size={24} color="white" />
            <Text style={styles.buttonText}>Iniciar Câmera</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <CameraView 
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing="back"
          />
          
          <View style={styles.cameraHeader}>
            <TouchableOpacity
              onPress={() => {
                setIsCameraActive(false);
                setCurrentScreen('home');
              }}
              style={styles.cameraHeaderButton}
            >
              <X size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.imageCounter}>
              <Text style={styles.imageCounterText}>{capturedImages.length} fotos</Text>
            </View>
          </View>

          {/* Alignment guide */}
          <View style={styles.alignmentGuide}>
            <View style={styles.alignmentBox}>
              <View style={styles.alignmentContent}>
                <FileText size={48} color="white" />
                <Text style={styles.alignmentText}>Alinhe a folha de resposta</Text>
                <Text style={styles.alignmentText}>dentro desta área</Text>
              </View>
            </View>
          </View>

          {/* Capture button */}
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity
              onPress={captureImage}
              style={styles.captureButton}
            >
              <View style={styles.captureButtonInner}>
                <Camera size={32} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  const GalleryScreen = () => (
    <View style={styles.galleryContainer}>
      <View style={styles.maxWidthContainer}>
        <View style={styles.screenHeader}>
          <TouchableOpacity
            onPress={() => setCurrentScreen('home')}
            style={styles.headerButton}
          >
            <X size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Provas Capturadas</Text>
          <View style={{ width: 32 }} />
        </View>

        {capturedImages.length === 0 ? (
          <View style={styles.emptyGallery}>
            <BookOpen size={64} color="#9ca3af" />
            <Text style={styles.emptyText}>Nenhuma prova capturada</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.galleryGrid}>
            {capturedImages.map((image) => (
              <View key={image.id} style={styles.imageCard}>
                <Image
                  source={{ uri: image.uri }}
                  style={styles.galleryImage}
                />
                <View style={styles.imageInfo}>
                  <Text style={styles.imageTimestamp}>{image.timestamp}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setCapturedImages(capturedImages.filter(img => img.id !== image.id));
                    }}
                  >
                    <Text style={styles.removeButton}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );

  const ResultsScreen = () => (
    <View style={styles.resultsContainer}>
      <View style={styles.maxWidthContainer}>
        <View style={styles.screenHeader}>
          <TouchableOpacity
            onPress={() => setCurrentScreen('home')}
            style={styles.headerButton}
          >
            <X size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Resultados</Text>
          <View style={{ width: 32 }} />
        </View>

        {results && (
          <ScrollView contentContainerStyle={styles.resultsContent}>
            <View style={styles.scoreCard}>
              <Text style={styles.scoreText}>{results.score}%</Text>
              <Text style={styles.scoreSubtext}>
                {results.correctAnswers} de {results.totalQuestions} questões
              </Text>
            </View>

            <View style={styles.detailsCard}>
              <Text style={styles.detailsTitle}>Detalhes por Questão</Text>
              <ScrollView style={styles.detailsList}>
                {results.details.map((detail, index) => (
                  <View key={index} style={styles.detailItem}>
                    <Text style={styles.detailQuestion}>Q{detail.question}</Text>
                    <View style={styles.detailAnswerContainer}>
                      <Text style={styles.detailAnswer}>
                        {detail.studentAnswer} → {detail.correctAnswer}
                      </Text>
                      {detail.isCorrect ? (
                        <CheckCircle size={16} color="#16a34a" />
                      ) : (
                        <X size={16} color="#dc2626" />
                      )}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>

            <TouchableOpacity
              onPress={() => Alert.alert('Sucesso', 'Resultados exportados com sucesso!')}
              style={[styles.button, styles.primaryButton, styles.exportButton]}
            >
              <Download size={20} color="white" />
              <Text style={styles.buttonText}>Exportar Resultados</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </View>
  );

  const ProcessingScreen = () => (
    <View style={styles.processingContainer}>
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text style={styles.processingTitle}>Processando Provas</Text>
      <Text style={styles.processingText}>Analisando as respostas...</Text>
    </View>
  );

  if (isProcessing) {
    return <ProcessingScreen />;
  }

  switch (currentScreen) {
    case 'capture':
      return <CameraScreen />;
    case 'gallery':
      return <GalleryScreen />;
    case 'results':
      return <ResultsScreen />;
    default:
      return <HomeScreen />;
  }
};

const styles = StyleSheet.create({
  // Base containers
  homeContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  galleryContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 24,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 24,
  },
  processingContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  maxWidthContainer: {
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },

  // Home screen styles
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 9999,
    padding: 16,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
  },
  secondaryButton: {
    backgroundColor: 'white',
  },
  successButton: {
    backgroundColor: '#16a34a',
  },
  purpleButton: {
    backgroundColor: '#7c3aed',
  },
  disabledButton: {
    backgroundColor: '#e5e7eb',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#374151',
  },
  disabledButtonText: {
    color: '#6b7280',
  },
  clearButton: {
    marginTop: 32,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#dc2626',
    fontWeight: '500',
  },

  // Camera screen styles
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startCameraButton: {
    paddingHorizontal: 32,
  },
  cameraHeader: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraHeaderButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 9999,
  },
  imageCounter: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  imageCounterText: {
    color: 'white',
  },
  alignmentGuide: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignmentBox: {
    width: '80%',
    height: '60%',
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed',
    borderRadius: 8,
    opacity: 0.7,
  },
  alignmentContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    padding: 16,
  },
  alignmentText: {
    color: 'white',
    textAlign: 'center',
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  captureButtonInner: {
    backgroundColor: '#3b82f6',
    width: 64,
    height: 64,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Gallery screen styles
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  emptyGallery: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    color: '#6b7280',
    marginTop: 16,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  imageCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  galleryImage: {
    width: '100%',
    height: 128,
  },
  imageInfo: {
    padding: 12,
  },
  imageTimestamp: {
    fontSize: 12,
    color: '#6b7280',
  },
  removeButton: {
    color: '#dc2626',
    fontSize: 14,
    marginTop: 8,
  },

  // Results screen styles
  resultsContent: {
    gap: 16,
  },
  scoreCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8,
  },
  scoreSubtext: {
    color: '#64748b',
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailsTitle: {
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  detailsList: {
    maxHeight: 256,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 8,
  },
  detailQuestion: {
    fontWeight: '500',
    color: '#1e293b',
  },
  detailAnswerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailAnswer: {
    fontSize: 14,
  },
  exportButton: {
    marginTop: 16,
  },

  // Processing screen styles
  processingTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    color: '#1e293b',
  },
  processingText: {
    color: '#64748b',
    marginTop: 8,
  },
});

export default CaptureScreen;