import React from 'react';
import { View, Text } from 'react-native';
import { Download, FileText, Target, Trophy, TrendingUp } from 'lucide-react-native';
import StatsCard from './StatsCard';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import createReportsTabStyles from './ReportsTabStyles';
import ReportStatsGrid from './ReportStatsGrid';

interface ReportData {
  totalExams: number;
  averageScore: number;
  passedStudents: number;
  passRate: number;
}

interface ReportsTabProps {
  report?: ReportData | null;
}

const ReportsTab: React.FC<ReportsTabProps> = ({ report = null }) => {
  const { colors } = useTheme();
  const styles = createReportsTabStyles(colors);

  if (!report) {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.loadingText}>Carregando relatório...</Text>
      </View>
    );
  }

  return (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Relatório de Desempenho</Text>

      <ReportStatsGrid report={report} colors={colors} />

      <View style={styles.reportActions}>
        <Button
          variant="primary"
          onPress={() => {}}
          icon={<Download size={20} color={colors.text.onPrimary} />}
          title="Exportar Relatório"
          style={styles.primaryButton}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

export default ReportsTab;