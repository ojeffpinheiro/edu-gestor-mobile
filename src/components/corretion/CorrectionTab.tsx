import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import ExamItem from './ExamItem';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import { createCorrectionTabStyles } from './CorrectionTabStyles';
import StatusMessage from '../common/StatusMessage';

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
  onExamPress = () => { },
  onProcessAll = () => { }
}) => {
  const { colors } = useTheme();
  const styles = createCorrectionTabStyles(colors);

  const hasPendingExams = exams.some(exam => exam.status === 'pending');

  if (!exams || !answerKey) return null;

  return (
    <View style={styles.tabContent}>
      {!hasPendingExams && (
        <StatusMessage
          type="info"
          title="Nenhuma prova pendente"
          message="Todas as provas já foram corrigidas."
        />
      )}
      <View style={styles.actionButtons}>
        <Button
          variant="primary"
          onPress={onProcessAll}
          disabled={isLoading || !hasPendingExams}
          icon={isLoading
            ? (<ActivityIndicator size="small" color={colors.text.onPrimary} />)
            : (<CheckCircle size={20} color={colors.text.onPrimary} />)}
          title={isLoading ? "Processando..." : "Corrigir Todas"}
          style={[
            styles.primaryButton,
            (isLoading || !hasPendingExams) && styles.primaryButtonDisabled
          ]}
          textStyle={styles.buttonText}
        />
      </View>

      {/* Lista de exames */}
      <View style={styles.examList}>
        {exams.map((exam) => (
          <ExamItem
            key={exam.id}
            exam={exam}
            onPress={() => onExamPress(exam)}
          />
        ))}
      </View>
    </View>
  );
};

export default CorrectionTab;