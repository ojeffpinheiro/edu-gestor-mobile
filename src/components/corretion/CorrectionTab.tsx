import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import ExamItem from './ExamItem';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import { createCorrectionTabStyles } from './CorrectionTabStyles';

interface CorrectionTabProps {
  exams?: Array<{
    id: string;
    studentName: string;
    studentId: string;
    subject: string;
    examDate: string;
    score?: number;
    status?: string;
  }>;
  isLoading: boolean;
  answerKey?: any[];
  onExamPress?: (exam: any) => void;
  onProcessAll?: () => void;
}

const CorrectionTab: React.FC<CorrectionTabProps> = ({ 
  exams = [], 
  isLoading,
  answerKey = [], 
  onExamPress = () => {}, 
  onProcessAll = () => {} 
}) => {
  const { colors } = useTheme();
  const styles = createCorrectionTabStyles(colors);

  if (!exams || !answerKey) return null;

  return (
    <View style={styles.tabContent}>
      <View style={styles.actionButtons}>
        <Button
          variant="primary"
          onPress={onProcessAll}
          disabled={isLoading}
          icon={
            isLoading ? (
              <ActivityIndicator size="small" color={colors.text.onPrimary} />
            ) : (
              <CheckCircle size={20} color={colors.text.onPrimary} />
            )
          }
          title={isLoading ? "Processando..." : "Corrigir Todas"}
          style={styles.primaryButton}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

export default CorrectionTab;