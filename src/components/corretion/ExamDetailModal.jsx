import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { XCircle, CheckCircle } from 'lucide-react-native';
import { correctExam } from '../../utils/examUtils';
import styles from './ExamDetailModalStyles';

const ExamDetailModal = ({ visible, exam, answerKey, onClose }) => {
  if (!visible) return null;

  if (!exam || !answerKey) {
    console.warn("ExamDetailModal: Dados essenciais faltando");
    return null;
  }

  const isValidArrays = Array.isArray(exam.answers) && Array.isArray(answerKey);
  if (!isValidArrays) {
    console.warn("ExamDetailModal: answers ou answerKey não são arrays");
    return null;
  }

  let corrections = [];

  try {
    const correctionResult = correctExam(exam.answers, answerKey);
    corrections = Array.isArray(correctionResult?.corrections)
      ? correctionResult.corrections
      : [];
  } catch (e) {
    console.error("Erro ao corrigir exame:", e);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Detalhes da Prova</Text>
            <TouchableOpacity onPress={onClose}>
              <XCircle size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.studentInfo}>
              <Text style={styles.studentNameModal}>{exam.studentName}</Text>
              <Text style={styles.studentIdModal}>ID: {exam.studentId}</Text>
              <Text style={styles.examSubjectModal}>{exam.subject}</Text>
              {exam.score !== null && (
                <Text style={[styles.scoreModal, { color: exam.score >= 6 ? '#10B981' : '#EF4444' }]}>
                  Nota Final: {exam.score}
                </Text>
              )}
            </View>

            <View style={styles.correctionsContainer}>
              <Text style={styles.correctionsTitle}>Correções por Questão</Text>
              {corrections.length > 0 ? (
                corrections.map((correction, index) => (
                  <View key={index} style={styles.correctionItem}>
                    <View key={index} style={styles.correctionItem}>
                      <Text style={styles.questionNumber}>Q{correction.question}</Text>
                      <Text style={styles.studentAnswerText}>
                        Resposta: {correction.studentAnswer}
                      </Text>
                      <Text style={styles.correctAnswerText}>
                        Gabarito: {correction.correctAnswer}
                      </Text>
                      {correction.isCorrect ? (
                        <CheckCircle size={16} color="#10B981" />
                      ) : (
                        <XCircle size={16} color="#EF4444" />
                      )}
                    </View>
                  </View>
                ))
              ) : (
                <Text>Nenhuma correção disponível</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};


export default ExamDetailModal;