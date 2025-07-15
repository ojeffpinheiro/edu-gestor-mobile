import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import ExamItem from './ExamItem';
import styles from './CorrectionTab';


const CorrectionTab = (props) => {
  if (!props) return null;
  const { exams, answerKey, onExamPress, onProcessAll } = props;
  
  return (
    <View style={styles.tabContent}>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.primaryButton} onPress={onProcessAll}>
          <CheckCircle size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Corrigir Todas</Text>
        </TouchableOpacity>
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