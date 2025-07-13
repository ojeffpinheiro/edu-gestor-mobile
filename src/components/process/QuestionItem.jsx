import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle, AlertCircle } from 'lucide-react-native';

const QuestionItem = ({ result }) => {
  return (
    <View style={[
      styles.container,
      result.isCorrect ? styles.correct : styles.incorrect
    ]}>
      <Text style={styles.questionNumber}>Questão {result.question}</Text>
      <View style={styles.answers}>
        <Text style={styles.answerText}>
          Resposta: <Text style={styles.answerValue}>{result.studentAnswer}</Text>
        </Text>
        <Text style={styles.answerText}>
          Gabarito: <Text style={styles.answerValue}>{result.correctAnswer}</Text>
        </Text>
        {result.isCorrect ? (
          <CheckCircle size={20} color="#16a34a" />
        ) : (
          <AlertCircle size={20} color="#dc2626" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  correct: {
    backgroundColor: '#dcfce7',
  },
  incorrect: {
    backgroundColor: '#fee2e2',
  },
  questionNumber: {
    fontWeight: '500',
  },
  answers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  answerText: {
    fontSize: 12,
  },
  answerValue: {
    fontWeight: 'bold',
  },
});

export default QuestionItem;