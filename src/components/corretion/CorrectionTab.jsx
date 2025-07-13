import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import ExamItem from './ExamItem';


const CorrectionTab = ({ exams, answerKey, onExamPress, onProcessAll }) => {
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

const styles = StyleSheet.create({
  tabContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  examList: {
    gap: 12,
  },
});

export default CorrectionTab