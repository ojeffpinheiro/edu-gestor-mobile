import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckCircle, XCircle } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { createExamItemStyles } from './ExamItemStyles';

const ExamItem = ({ exam, onPress }) => {
  const { colors } = useTheme();
  const styles = createExamItemStyles(colors);

  return(
  <TouchableOpacity style={styles.examItem} onPress={onPress}>
    <View style={styles.examHeader}>
      <View>
        <Text style={styles.studentName}>{exam.studentName}</Text>
        <Text style={styles.studentId}>ID: {exam.studentId}</Text>
      </View>
      <View style={styles.examStatus}>
        {exam.status === 'corrected' ? (
          <CheckCircle size={20} color={colors.secondary} />
        ) : (
          <XCircle size={20} color={colors.error} />
        )}
      </View>
    </View>
    <View style={styles.examDetails}>
      <Text style={styles.examSubject}>{exam.subject}</Text>
      <Text style={styles.examDate}>{exam.examDate}</Text>
      {exam.score !== null && (
        <Text style={[styles.examScore, { color: exam.score >= 6 ? colors.success : colors.error }]}>
          Nota: {exam.score}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);
}

export default ExamItem;