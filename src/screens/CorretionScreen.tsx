import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';

import { correctExam, generateReport } from '../utils/examUtils';
import { useTheme } from '../context/ThemeContext';
import { useExams } from '../hooks/useExams';

import { Exam } from '../types/examTypes';
import SkeletonLoader from '../components/common/SkeletonLoader';
import AlertComponent from '../components/common/Alert';
import LoadingOverlay from '../components/LoadingOverlay';


import ReportsTab from '../components/corretion/ReportsTab';
import SettingsTab from '../components/corretion/SettingsTab';
import AppHeader from '../components/corretion/AppHeader';
import TabNavigation from '../components/corretion/TabNavigation';
import ExamDetailModal from '../components/corretion/ExamDetailModal';
import CorrectionTab from '../components/corretion/CorrectionTab';

import { Spacing } from '../styles/designTokens';

const CorrectionScreen = () => {
  const { exams, processAllPendingExams, isLoading, error } = useExams();
  const [processing, setProcessing] = useState(false);
  const [answerKey, setAnswerKey] = useState(['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B']);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [activeTab, setActiveTab] = useState('correction');
  const [validationError, setValidationError] = useState('');
  const [localError, setLocalError] = useState(null);

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
            isLoading={isLoading}
            onExamPress={(exam) => {
              setSelectedExam(exam);
              setModalVisible(true);
            }}
            onProcessAll={() => processAllPendingExams(answerKey)}
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
      {processing && <LoadingOverlay visible={processing} />}

      {validationError && (
        <AlertComponent
          variant="error"
          style="toast"
          title="Erro de validação"
          message={validationError}
          onDismiss={() => setValidationError('')}
          visible={!!validationError}
        />
      )}

      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <AppHeader />

      {/* Feedback de erro/sucesso */}
      {error && (
        <AlertComponent
          variant="error"
          style="toast"
          title="Erro de validação"
          message={localError}
          onDismiss={() => setLocalError(null)}
          visible={!!error}
        />
      )}

      {error && (
        <AlertComponent
          variant="error"
          style="toast"
          title={error.title || "Erro"}
          message={error.message}
          onDismiss={() => setLocalError(null)}
          visible={!!error}
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