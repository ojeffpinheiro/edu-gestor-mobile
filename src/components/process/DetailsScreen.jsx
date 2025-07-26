import { View, Text, ScrollView } from 'react-native';
import QuestionItem from './QuestionItem';
import { createDetailsScreenStyles } from './DetailsScreenStyles';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

const DetailsScreen = ({ correctionResults, onBack }) => {
  const { colors } = useTheme();
  const styles = createDetailsScreenStyles(colors);
  
  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Button 
          onPress={onBack} 
          variant="ghost"
          icon="←"
          iconColor={colors.text.primary}
        />
        <Text style={styles.heading1}>Detalhes da Correção</Text>
      </View>

      {correctionResults && (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.card}>
            <Text style={styles.heading2}>Resumo</Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.bodyText}>Estudante</Text>
                <Text style={styles.heading3}>{correctionResults.studentName}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.bodyText}>Nota Final</Text>
                <Text style={[
                  styles.heading1,
                  correctionResults.score >= 70 ? styles.success : styles.error
                ]}>
                  {correctionResults.score}%
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.heading2}>Questões Detalhadas</Text>
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