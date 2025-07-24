import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { XCircle, CheckCircle } from 'lucide-react-native';
import { correctExam } from '../../utils/examUtils';
import { createExamDetailModalStyles } from './ExamDetailModalStyles';
import { useTheme } from '../../context/ThemeContext';

const ExamDetailModal = ({ visible, exam, answerKey, onClose }) => {
  const { colors } = useTheme();
  const styles = createExamDetailModalStyles(colors);

  // Retorno early se não estiver visível ou dados faltando
  if (!visible || !exam || !answerKey) return null;

  // Validação robusta dos dados de entrada
  const safeExam = {
    ...exam,
    answers: Array.isArray(exam.answers) ? exam.answers : [],
    score: typeof exam.score === 'number' ? exam.score : null
  };

  const safeAnswerKey = Array.isArray(answerKey) ? answerKey : [];

  // Calcula correções de forma segura
  const calculateCorrections = () => {
    try {
      const result = correctExam(safeExam.answers, safeAnswerKey);
      return {
        score: safeExam.score !== null ? safeExam.score : result.score, // Mantém o score existente se disponível
        corrections: result.corrections || []
      };
    } catch (error) {
      console.error("Erro ao calcular correções:", error);
      return { score: 0, corrections: [] };
    }
  };

  const { score, corrections } = calculateCorrections();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Cabeçalho */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Detalhes da Prova</Text>
            <TouchableOpacity onPress={onClose}>
              <XCircle size={24} color={colors} />
            </TouchableOpacity>
          </View>

          {/* Corpo */}
          <ScrollView style={styles.modalBody}>
            <View style={styles.studentInfo}>
              <Text style={styles.studentNameModal}>{safeExam.studentName}</Text>
              <Text style={styles.studentIdModal}>ID: {safeExam.studentId}</Text>
              <Text style={styles.examSubjectModal}>{safeExam.subject}</Text>
              <Text style={[styles.scoreModal, { color: score >= 6 ? colors.secondary : colors.error }]}>
                Nota: {score.toFixed(1)}
              </Text>
            </View>

            <View style={styles.correctionsContainer}>
              <Text style={styles.correctionsTitle}>Correções por Questão</Text>
              {corrections.map((item, index) => (
                <View key={`correction-${index}`} style={styles.correctionItem}>
                  <Text style={styles.questionNumber}>Q{item.question}</Text>
                  <Text style={styles.studentAnswerText}>Resposta: {item.studentAnswer}</Text>
                  <Text style={styles.correctAnswerText}>Gabarito: {item.correctAnswer}</Text>
                  {item.isCorrect ? (
                    <CheckCircle size={16} color={colors.secondary} />
                  ) : (
                    <XCircle size={16} color={colors.error} />
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ExamDetailModal;