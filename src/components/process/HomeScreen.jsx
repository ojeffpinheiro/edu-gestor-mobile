import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { Camera, Upload, CheckCircle, FileText, Save, Eye } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = ({
  examTemplate,
  capturedImage,
  processingStatus,
  correctionResults,
  onImageCapture,
  onSaveCorrection,
  onViewDetails,
}) => {
  const pickImage = async () => {
    // Verificar permissões
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos da permissão para acessar sua galeria de fotos.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onImageCapture(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Correção</Text>
      
      {examTemplate && (
        <View style={styles.examInfo}>
          <Text style={styles.examTitle}>Prova Selecionada</Text>
          <Text style={styles.examText}>{examTemplate.name}</Text>
          <Text style={styles.examText}>{examTemplate.questions} questões</Text>
        </View>
      )}

      <View style={styles.captureArea}>
        {capturedImage ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: capturedImage }} style={styles.image} />
            {processingStatus === 'processing' && (
              <View style={styles.processingIndicator}>
                <ActivityIndicator size="small" color="#2563eb" />
                <Text style={styles.processingText}>Processando imagem...</Text>
              </View>
            )}
            {processingStatus === 'completed' && (
              <View style={styles.successIndicator}>
                <CheckCircle size={20} color="#16a34a" />
                <Text style={styles.successText}>Processamento concluído!</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.emptyCapture}>
            <Camera size={48} color="#9ca3af" />
            <Text style={styles.captureText}>Capture ou selecione uma imagem da folha de resposta</Text>
            <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
              <Upload size={20} color="white" />
              <Text style={styles.selectButtonText}>Selecionar Imagem</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {correctionResults && (
        <View style={styles.resultsCard}>
          <View style={styles.resultsHeader}>
            <FileText size={20} color="#2563eb" />
            <Text style={styles.resultsTitle}>Resultado da Correção</Text>
          </View>
          
          <View style={styles.resultsContent}>
            <View style={styles.resultRow}>
              <Text>Estudante:</Text>
              <Text style={styles.resultValue}>{correctionResults.studentName}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text>Acertos:</Text>
              <Text style={styles.resultValue}>
                {correctionResults.correctAnswers}/{correctionResults.totalQuestions}
              </Text>
            </View>
            <View style={styles.resultRow}>
              <Text>Nota:</Text>
              <Text style={[
                styles.resultValue, 
                correctionResults.score >= 70 ? styles.successText : styles.errorText
              ]}>
                {correctionResults.score}%
              </Text>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.saveButton]}
              onPress={onSaveCorrection}
            >
              <Save size={16} color="white" />
              <Text style={styles.actionButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.detailsButton]}
              onPress={onViewDetails}
            >
              <Eye size={16} color="white" />
              <Text style={styles.actionButtonText}>Detalhes</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  examInfo: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  examTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  examText: {
    color: '#6b7280',
    fontSize: 14,
  },
  captureArea: {
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyCapture: {
    alignItems: 'center',
    gap: 16,
  },
  captureText: {
    color: '#6b7280',
    textAlign: 'center',
  },
  selectButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  imageContainer: {
    alignItems: 'center',
    gap: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  processingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  processingText: {
    color: '#2563eb',
  },
  successIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultsCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  resultsTitle: {
    fontWeight: '600',
    color: '#2563eb',
  },
  resultsContent: {
    gap: 12,
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultValue: {
    fontWeight: '500',
  },
  successText: {
    color: '#16a34a',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#dc2626',
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#16a34a',
  },
  detailsButton: {
    backgroundColor: '#4b5563',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default HomeScreen;