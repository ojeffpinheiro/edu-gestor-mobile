import { View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import { Camera, Upload, CheckCircle, FileText, Save, Eye } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../context/ThemeContext';
import { createHomeScreenStyles } from './HomeScreenStyles';
import Button from '../common/Button';

const HomeScreen = ({
  examTemplate,
  capturedImage,
  processingStatus,
  correctionResults,
  onImageCapture,
  onSaveCorrection,
  onViewDetails,
}) => {
  const { colors } = useTheme();
  const styles = createHomeScreenStyles(colors);

  const pickImage = async () => {
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
    <View style={styles.screenContainer}>
      <Text style={styles.heading1}>Nova Correção</Text>
      
      {examTemplate && (
        <View style={styles.card}>
          <Text style={styles.heading2}>Prova Selecionada</Text>
          <Text style={styles.bodyText}>{examTemplate.name}</Text>
          <Text style={styles.bodyText}>{examTemplate.questions} questões</Text>
        </View>
      )}

      <View style={styles.card}>
        {capturedImage ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: capturedImage }} style={styles.image} />
            {processingStatus === 'processing' && (
              <View style={styles.processingIndicator}>
                <ActivityIndicator size="small" color={colors.primary.main} />
                <Text style={styles.processingText}>Processando imagem...</Text>
              </View>
            )}
            {processingStatus === 'completed' && (
              <View style={styles.successIndicator}>
                <CheckCircle size={20} color={colors.feedback.success} />
                <Text style={styles.successText}>Processamento concluído!</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.emptyCapture}>
            <Camera size={48} color={colors.icons.secondary} />
            <Text style={styles.captureText}>Capture ou selecione uma imagem da folha de resposta</Text>
            <Button
              title="Selecionar Imagem"
              onPress={pickImage}
              variant="primary"
              icon={<Upload size={20} color={colors.text.onPrimary} />}
              iconPosition="left"
            />
          </View>
        )}
      </View>

      {correctionResults && (
        <View style={[styles.card, styles.resultsCard]}>
          <View style={styles.resultsHeader}>
            <FileText size={20} color={colors.primary.main} />
            <Text style={styles.heading2}>Resultado da Correção</Text>
          </View>
          
          <View style={styles.resultsContent}>
            <View style={styles.resultRow}>
              <Text style={styles.bodyText}>Estudante:</Text>
              <Text style={styles.resultValue}>{correctionResults.studentName}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.bodyText}>Acertos:</Text>
              <Text style={styles.resultValue}>
                {correctionResults.correctAnswers}/{correctionResults.totalQuestions}
              </Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.bodyText}>Nota:</Text>
              <Text style={[
                styles.resultValue, 
                correctionResults.score >= 70 ? styles.successText : styles.errorText
              ]}>
                {correctionResults.score}%
              </Text>
            </View>
          </View>

          <View style={styles.actions}>
            <Button
              title="Salvar"
              onPress={onSaveCorrection}
              variant="primary"
              icon={<Save size={16} color={colors.text.onPrimary} />}
              iconPosition="left"
            />
            <Button
              title="Detalhes"
              onPress={onViewDetails}
              variant="secondary"
              icon={<Eye size={16} color={colors.primary.main} />}
              iconPosition="left"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;