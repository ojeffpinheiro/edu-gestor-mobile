import React from 'react';
import { View, Text } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import ExamItem from './ExamItem';
import createCorrectionTabStyles from './CorrectionTabStyles';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

const CorrectionTab = ({ exams = [], answerKey = [], onExamPress = () => { }, onProcessAll = () => { } }) => {
  const { colors } = useTheme();
  const styles = createCorrectionTabStyles(colors);

  if (!exams || !answerKey) return null;

  return (
    <View style={styles.tabContent}>
      <View style={styles.actionButtons}>
        <Button
          variant="primary"
          onPress={onProcessAll}
          icon={<CheckCircle size={20} color={colors.textPrimary} />}
          title="Corrigir Todas"
          style={styles.primaryButton}
          textStyle={styles.buttonText}
        />
      </View>

      <View style={styles.examList}>
        <Text style={styles.sectionTitle}>Provas Recentes</Text>
        {exams.map(exam => (
          <ExamItem key={exam.id} exam={exam} onPress={() => onExamPress(exam)} />
        ))}
      </View>
    </View>
  );
};


export default CorrectionTab