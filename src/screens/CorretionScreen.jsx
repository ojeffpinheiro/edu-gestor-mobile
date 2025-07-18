import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Alert, StyleSheet } from 'react-native';
import { correctExam, generateReport } from '../utils/examUtils';
import ReportsTab from '../components/corretion/ReportsTab';
import SettingsTab from '../components/corretion/SettingsTab';
import AppHeader from '../components/corretion/AppHeader';
import TabNavigation from '../components/corretion/TabNavigation';
import ExamDetailModal from '../components/corretion/ExamDetailModal';
import { Exam } from '../types/examTypes';
import CorrectionTab from '../components/corretion/CorrectionTab';

const CorrectionScreen = () => {
  const [activeTab, setActiveTab] = useState('correction');
  const [exams, setExams] = useState([
    {
      id: 1,
      studentName: 'João Silva',
      studentId: '2023001',
      examDate: '2024-03-15',
      subject: 'Matemática',
      answers: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B'],
      status: 'corrected',
      score: 8.5,
      totalQuestions: 10
    },
    {
      id: 2,
      studentName: 'Maria Santos',
      studentId: '2023002',
      examDate: '2024-03-15',
      subject: 'Matemática',
      answers: ['A', 'B', 'C', 'A', 'A', 'B', 'C', 'D', 'B', 'B'],
      status: 'corrected',
      score: 7.0,
      totalQuestions: 10
    },
    {
      id: 3,
      studentName: 'Pedro Costa',
      studentId: '2023003',
      examDate: '2024-03-15',
      subject: 'Matemática',
      answers: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B'],
      status: 'pending',
      score: null,
      totalQuestions: 10
    }
  ]);

  const [answerKey, setAnswerKey] = useState(['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B']);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const processAllPendingExams = () => {
    const updatedExams = exams.map(exam => {
      if (exam.status === 'pending') {
        const { score } = correctExam(exam.answers, answerKey);
        return {
          ...exam,
          score: parseFloat(score.toFixed(1)),
          status: 'corrected'
        };
      }
      return exam;
    });

    setExams(updatedExams);
    Alert.alert('Sucesso', 'Todas as provas foram corrigidas!');
  };

  const report = generateReport(exams);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'correction':
        return (
          <CorrectionTab
            exams={exams}
            answerKey={answerKey}
            onExamPress={(exam) => {
              setSelectedExam(exam);
              setModalVisible(true);
            }}
            onProcessAll={processAllPendingExams}
          />
        );
      case 'reports':
        return <ReportsTab report={report} />;
      case 'settings':
        return <SettingsTab answerKey={answerKey} />;
      default:
        return null;
    }
  };

  const handleExamPress = (exam) => {
    setSelectedExam(exam);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <AppHeader />

      <ScrollView style={styles.content}>
        {renderTabContent()}
      </ScrollView>

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <ExamDetailModal 
        visible={modalVisible}
        exam={selectedExam}
        answerKey={answerKey}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
  },
});

export default CorrectionScreen;