import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckCircle, XCircle } from 'lucide-react-native';
import { Exam } from '../../types/examTypes';

interface ExamItemProps {
  exam: Exam;
  onPress: () => void;
}

const ExamItem: React.FC<ExamItemProps> = ({ exam, onPress }) => (
  <TouchableOpacity style={styles.examItem} onPress={onPress}>
    <View style={styles.examHeader}>
      <View>
        <Text style={styles.studentName}>{exam.studentName}</Text>
        <Text style={styles.studentId}>ID: {exam.studentId}</Text>
      </View>
      <View style={styles.examStatus}>
        {exam.status === 'corrected' ? (
          <CheckCircle size={20} color="#10B981" />
        ) : (
          <XCircle size={20} color="#EF4444" />
        )}
      </View>
    </View>
    <View style={styles.examDetails}>
      <Text style={styles.examSubject}>{exam.subject}</Text>
      <Text style={styles.examDate}>{exam.examDate}</Text>
      {exam.score !== null && (
        <Text style={[styles.examScore, { color: exam.score >= 6 ? '#10B981' : '#EF4444' }]}>
          Nota: {exam.score}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  examItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  studentId: {
    fontSize: 14,
    color: '#6B7280',
  },
  examDetails: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  examSubject: {
    fontSize: 14,
    color: '#374151',
  },
  examDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  examScore: {
    fontSize: 14,
    fontWeight: '600',
  },
  examStatus: {
    marginLeft: 8,
  },
});

export default ExamItem;