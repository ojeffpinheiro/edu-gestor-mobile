import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Alert, StyleSheet } from 'react-native';

import { correctExam, generateReport } from '../utils/examUtils';
import { useTheme } from '../context/ThemeContext';
import { useExams } from '../hooks/useExams';

import { Exam } from '../types/examTypes';

import StatusMessage from '../components/common/StatusMessage';

import ReportsTab from '../components/corretion/ReportsTab';
import SettingsTab from '../components/corretion/SettingsTab';
import AppHeader from '../components/corretion/AppHeader';
import TabNavigation from '../components/corretion/TabNavigation';
import ExamDetailModal from '../components/corretion/ExamDetailModal';
import CorrectionTab from '../components/corretion/CorrectionTab';

import { Spacing } from '../styles/designTokens';
import SkeletonLoader from '../components/common/SkeletonLoader';

const CorrectionScreen = () => {
  const { exams, processAllPendingExams, isLoading, error } = useExams();
  const [processing, setProcessing] = useState(false);
  const [answerKey, setAnswerKey] = useState(['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B']);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [activeTab, setActiveTab] = useState('correction');
  const [validationError, setValidationError] = useState('');

  const { colors } = useTheme();
  const styles = createCorrectionScreenStyles(colors);
  const report = generateReport(exams);

  const handleAnswerKeyChange = (newAnswerKey) => {
    setAnswerKey(newAnswerKey);
    setValidationError('');
  };

  const handleProcessAll = async () => {
    if (answerKey.length === 0) {
      setValidationError('O gabarito não pode estar vazio');
      return;
    }

    await processAllPendingExams(answerKey);
  };


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
        return report ? (
          <ReportsTab report={report} />
        ) : (
          <SkeletonLoader />
        );
      case 'settings':
        return <SettingsTab answerKey={answerKey} onAnswerKeyChange={handleAnswerKeyChange} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      {processing && <LoadingOverlay />}

      {validationError && (
        <StatusMessage
          type="error"
          title="Erro de validação"
          message={validationError}
          onDismiss={() => setValidationError('')}
        />
      )}

      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <AppHeader />

      {/* Feedback de erro/sucesso */}
      {error && (
        <StatusMessage
          type="error"
          title="Erro de validação"
          message={error}
          onDismiss={() => setLocalError(null)}
        />
      )}

      {error && (
        <StatusMessage
          type="error"
          title={error.title}
          message={error.message}
          actions={error.actions?.map(action => ({
            label: action.text,
            onPress: action.onPress
          }))}
        />
      )}

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

const createCorrectionScreenStyles = (colors) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
});

export default CorrectionScreen;