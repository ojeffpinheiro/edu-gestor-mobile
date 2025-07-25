import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import QuestionItem from './QuestionItem';
import { createDetailsScreenStyles } from './DetailsScreenStyles';
import { useTheme } from '../../context/ThemeContext';

const DetailsScreen = ({ correctionResults, onBack }) => {
    const { colors } = useTheme();
    const styles = createDetailsScreenStyles(colors);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes da Correção</Text>
      </View>

      {correctionResults && (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Resumo</Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Estudante</Text>
                <Text style={styles.summaryValue}>{correctionResults.studentName}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Nota Final</Text>
                <Text style={[
                  styles.summaryScore,
                  correctionResults.score >= 70 ? styles.success : styles.error
                ]}>
                  {correctionResults.score}%
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.questionsCard}>
            <Text style={styles.questionsTitle}>Questões Detalhadas</Text>
            <View style={styles.questionsList}>
              {correctionResults.detailedResults.map((result, index) => (
                <QuestionItem key={index} result={result} />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default DetailsScreen;