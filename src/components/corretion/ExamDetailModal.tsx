import React, { useRef, useEffect } from 'react';
import { Animated, Easing, View, Text, Modal, ScrollView } from 'react-native';
import { XCircle, CheckCircle } from 'lucide-react-native';
import { correctExam } from '../../utils/examUtils';
import { createExamDetailModalStyles } from './ExamDetailModalStyles';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

interface ExamDetailModalProps {
  visible: boolean;
  exam: {
    answers: any[];
    score: number | null;
    studentName: string;
    studentId: string;
    subject: string;
  };
  answerKey: any[];
  onClose: () => void;
}

const ExamDetailModal: React.FC<ExamDetailModalProps> = ({
  visible,
  exam,
  answerKey,
  onClose
}) => {
  const { colors } = useTheme();
  const styles = createExamDetailModalStyles(colors);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // Early return deve vir DEPOIS de todos os Hooks
  if (!visible || !exam || !answerKey) {
    return null;
  }

  const safeExam = {
    ...exam,
    answers: Array.isArray(exam.answers) ? exam.answers : [],
    score: typeof exam.score === 'number' ? exam.score : null
  };

  const safeAnswerKey = Array.isArray(answerKey) ? answerKey : [];

  const calculateCorrections = () => {
    try {
      // Validação antes de calcular
      if (!Array.isArray(exam.answers)) {
        console.warn('Exam answers is not an array', exam.answers);
        return { score: 0, corrections: [] };
      }

      if (!Array.isArray(answerKey)) {
        console.warn('Answer key is not an array', answerKey);
        return { score: 0, corrections: [] };
      }

      const validAnswers = exam.answers
        .map(a => typeof a === 'string' ? a.trim().toUpperCase() : '')
        .filter(a => ['A', 'B', 'C', 'D', ''].includes(a));

      const validAnswerKey = answerKey
        .map(a => typeof a === 'string' ? a.trim().toUpperCase() : '')
        .filter(a => ['A', 'B', 'C', 'D'].includes(a));

      if (validAnswers.length === 0 || validAnswerKey.length === 0) {
        return { score: 0, corrections: [] };
      }

      const result = correctExam(safeExam.answers, safeAnswerKey);

      return {
        score: safeExam.score !== null ? safeExam.score : result.score,
        corrections: result.corrections || []
      };
    } catch (error) {
      console.error("Error calculating corrections:", error);
      return { score: 0, corrections: [] };
    }
  };

  const { score, corrections } = calculateCorrections();

  return (
    <Modal
      animationType="none" // Desativa a animação padrão pois usaremos Animated
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Animated.View
        style={[
          styles.modalOverlay,
          { opacity: fadeAnim }
        ]}
      >
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Detalhes da Prova</Text>
            <Button
              variant="text"
              onPress={onClose}
              icon={<XCircle size={24} color={colors.text.primary} />}
            />
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.studentInfo}>
              <Text style={styles.studentNameModal}>{safeExam.studentName}</Text>
              <Text style={styles.studentIdModal}>ID: {safeExam.studentId}</Text>
              <Text style={styles.examSubjectModal}>{safeExam.subject}</Text>
              <Text style={[
                styles.scoreModal,
                {
                  color: score >= 6 ? colors.feedback.success : colors.feedback.error
                }
              ]}>
                Nota: {score.toFixed(1)}
              </Text>
            </View>

            <View style={styles.correctionsContainer}>
              <Text style={styles.correctionsTitle}>Correções por Questão</Text>
              {corrections.map((item, index) => (
                <View key={`correction-${index}`}
                  style={[
                    styles.correctionItem,
                    !item.isCorrect && styles.incorrectAnswer
                  ]}>
                  <Text style={styles.questionNumber}>Q{item.question}</Text>
                  <Text style={styles.studentAnswerText}>Resposta: {item.studentAnswer}</Text>
                  <Text style={styles.correctAnswerText}>Gabarito: {item.correctAnswer}</Text>
                  {item.isCorrect ? (
                    <CheckCircle size={16} color={colors.feedback.success} />
                  ) : (
                    <XCircle size={16} color={colors.feedback.error} />
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default ExamDetailModal;