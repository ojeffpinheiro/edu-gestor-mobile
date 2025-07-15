import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckCircle, XCircle } from 'lucide-react-native';
import { Exam } from '../../types/examTypes';
import styles from './ExamItemStyles';

const ExamItem = ({ exam, onPress }) => (
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

export default ExamItem;