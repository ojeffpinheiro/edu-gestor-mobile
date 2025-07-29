import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { CheckCircle, Clock, XCircle } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { createExamItemStyles } from './ExamItemStyles';
import Button from '../common/Button';

interface ExamItemProps {
  exam: {
    id: string;
    studentName: string;
    studentId: string;
    subject: string;
    examDate: string;
    status?: string;
    score?: number | null;
  };
  onPress: () => void;
}

const ExamItem: React.FC<ExamItemProps> = ({ exam, onPress }) => {
  const { colors } = useTheme();
  const styles = createExamItemStyles(colors);
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start()
  };

  const statusStyle = exam.status === 'corrected'
    ? styles.examItemCorrected
    : exam.status === 'pending'
      ? styles.examItemPending
      : null;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.examItem, statusStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={0.7} >
        <View style={styles.examHeader}>
          <View>
            <Text style={styles.studentName}>{exam.studentName}</Text>
            <Text style={styles.studentId}>ID: {exam.studentId}</Text>
          </View>
          <View style={styles.examStatus}>
            {exam.status === 'corrected' ? (
              <CheckCircle size={20} color={colors.feedback.success} />
            ) : exam.status === 'pending' ? (
              <Clock size={20} color={colors.feedback.warning} />
            ) : (
              <XCircle size={20} color={colors.feedback.error} />
            )}
          </View>
        </View>
        <View style={styles.examDetails}>
          <Text style={styles.examSubject}>{exam.subject}</Text>
          <Text style={styles.examDate}>{exam.examDate}</Text>
          {exam.score !== null && exam.score !== undefined && (
            <Text style={[
              styles.examScore,
              {
                color: exam.score >= 6 ? colors.feedback.success : colors.feedback.error
              }
            ]}>
              Nota: {exam.score}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ExamItem;