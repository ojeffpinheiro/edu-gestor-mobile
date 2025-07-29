import React, { useRef, useEffect } from 'react';
import { Animated, Easing, View, Text, Modal, ScrollView } from 'react-native';
import { XCircle, CheckCircle } from 'lucide-react-native';
import { calculateCorrections, correctExam } from '../../utils/examUtils';
import { createExamDetailModalStyles } from './ExamDetailModalStyles';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import QuestionCorrectionItem from './QuestionCorrectionItem';

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

  if (!visible || !exam || !answerKey) return null;

  const renderCorrections = () => {
    return corrections.map((item, index) => (
      <QuestionCorrectionItem
        key={`correction-${index}`}
        question={item.question}
        studentAnswer={item.studentAnswer}
        correctAnswer={item.correctAnswer}
        isCorrect={item.isCorrect}
      />
    ));
  };

  const safeExam = {
    ...exam,
    answers: Array.isArray(exam.answers) ? exam.answers : [],
    score: typeof exam.score === 'number' ? exam.score : null
  };

  const safeAnswerKey = Array.isArray(answerKey) ? answerKey : [];

  const { score, corrections } = calculateCorrections(exam, answerKey);

  return (
    <Modal
      animationType="none"
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
              {renderCorrections()}
            </View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default ExamDetailModal;