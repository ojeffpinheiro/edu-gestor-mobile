import React from 'react';
import { View, Text } from 'react-native';
import { Download, FileText, Target, Trophy, TrendingUp } from 'lucide-react-native';
import StatsCard from './StatsCard';
import { useTheme } from '../../context/ThemeContext';
import createReportsTabStyles from './ReportsTabStyles';
import Button from '../common/Button';

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

      <View style={styles.statsGrid}>
        <StatsCard
          title="Total de Provas"
          value={report.totalExams}
          icon={FileText}
          color={colors.primary.main}
        />
        <StatsCard
          title="Média Geral"
          value={report.averageScore.toFixed(1)}
          icon={Target}
          color={colors.feedback.info}
        />
        <StatsCard
          title="Aprovados"
          value={report.passedStudents}
          icon={Trophy}
          color={colors.feedback.success}
        />
        <StatsCard
          title="Taxa de Aprovação"
          value={`${report.passRate}%`}
          icon={TrendingUp}
          color={colors.secondary.main}
        />
      </View>

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