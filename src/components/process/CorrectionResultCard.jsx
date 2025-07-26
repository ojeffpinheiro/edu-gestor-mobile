import { View, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { createCorrectionResultCardStyles } from './CorrectionResultCardStyles';
import StatusCard from '../common/StatusCard';
import { XCircle } from 'lucide-react-native';

const CorrectionResultCard = ({ correction }) => {
  const formattedDate = new Date(correction.savedAt).toLocaleString('pt-BR');
  const { colors } = useTheme();
  const styles = createCorrectionResultCardStyles(colors);

  if (!correction) {
    return (
      <StatusCard
        variant="error"
        icon={<XCircle color={colors.feedback.error} />}
        title="Erro na Correção"
      >
        <Text style={{ color: colors.text.primary }}>
          Nenhum dado de correção disponível
        </Text>
      </StatusCard>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.heading2}>{correction.studentName}</Text>
          <Text style={styles.bodyText}>{formattedDate}</Text>
        </View>
        <View style={styles.results}>
          <Text style={[
            styles.heading1,
            correction.score >= 70 ? styles.success : styles.error
          ]}>
            {correction.score}%
          </Text>
          <Text style={styles.bodyText}>
            {correction.correctAnswers}/{correction.totalQuestions} acertos
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CorrectionResultCard;