import React from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { XCircle, CheckCircle } from 'lucide-react-native';
import { correctExam } from '../../utils/examUtils';
import { Exam } from '../../types/examTypes';

interface ExamDetailModalProps {
  visible: boolean;
  exam: Exam | null;
  answerKey: string[];
  onClose: () => void;
}

const ExamDetailModal: React.FC<ExamDetailModalProps> = ({ visible, exam, answerKey, onClose }) => {
  if (!exam) return null;

  const { corrections } = correctExam(exam.answers, answerKey);

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
              {corrections.map((correction, index) => (
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
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalBody: {
    flex: 1,
  },
  studentInfo: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  studentNameModal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  studentIdModal: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  examSubjectModal: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  scoreModal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  correctionsContainer: {
    gap: 12,
  },
  correctionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  correctionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    gap: 12,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    minWidth: 24,
  },
  studentAnswerText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  correctAnswerText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
  },
});

export default ExamDetailModal;