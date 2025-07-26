import { View, Text } from 'react-native';
import { CheckCircle, AlertCircle } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import createQuestionItemStyles from './QuestionItemStyles';

const QuestionItem = ({ result }) => {
  const { colors } = useTheme();
  const styles = createQuestionItemStyles(colors);

  return (
    <View style={[
      styles.card,
      result.isCorrect ? styles.successBox : styles.errorBox
    ]}>
      <Text style={styles.heading3}>Questão {result.question}</Text>
      <View style={styles.answers}>
        <Text style={styles.bodyText}>
          Resposta: <Text style={styles.answerValue}>{result.studentAnswer}</Text>
        </Text>
        <Text style={styles.bodyText}>
          Gabarito: <Text style={styles.answerValue}>{result.correctAnswer}</Text>
        </Text>
        {result.isCorrect ? (
          <CheckCircle size={20} color={colors.feedback.success} />
        ) : (
          <AlertCircle size={20} color={colors.feedback.error} />
        )}
      </View>
    </View>
  );
};

export default QuestionItem;