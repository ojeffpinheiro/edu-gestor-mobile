import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle, AlertCircle } from 'lucide-react-native';
import QuestionItem from './QuestionItem';

const DetailsScreen = ({ correctionResults, onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes da Correção</Text>
      </View>

      {correctionResults && (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Resumo</Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Estudante</Text>
                <Text style={styles.summaryValue}>{correctionResults.studentName}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Nota Final</Text>
                <Text style={[
                  styles.summaryScore,
                  correctionResults.score >= 70 ? styles.success : styles.error
                ]}>
                  {correctionResults.score}%
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.questionsCard}>
            <Text style={styles.questionsTitle}>Questões Detalhadas</Text>
            <View style={styles.questionsList}>
              {correctionResults.detailedResults.map((result, index) => (
                <QuestionItem key={index} result={result} />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  backButtonText: {
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  summaryTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontWeight: '500',
  },
  summaryScore: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  success: {
    color: '#16a34a',
  },
  error: {
    color: '#dc2626',
  },
  questionsCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
  },
  questionsTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  questionsList: {
    gap: 8,
  },
});

export default DetailsScreen;