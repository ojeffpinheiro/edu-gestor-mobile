import { View, Text } from 'react-native';
import { CheckCircle, AlertCircle } from 'lucide-react-native';
import styles from './QuestionItemStyles';

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

export default QuestionItem;