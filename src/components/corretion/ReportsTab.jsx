import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Download, FileText, Target, Trophy, TrendingUp } from 'lucide-react-native';
import StatsCard from './StatsCard';
import { useTheme } from '../../context/ThemeContext';
import createReportsTabStyles from './ReportsTabStyles';

const ReportsTab = ({ report }) => {
  const { colors } = useTheme();
  const styles = createReportsTabStyles(colors);

  if (!report) {
    return <Text>Carregando relatório...</Text>;
  }

  return (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Relatório de Desempenho</Text>

      <View style={styles.statsGrid}>
        <StatsCard
          title="Total de Provas"
          value={report.totalExams}
          icon={FileText}
          color={colors.primary}
        />
        <StatsCard
          title="Média Geral"
          value={report.averageScore}
          icon={Target}
          color={colors.secondary}
        />
        <StatsCard
          title="Aprovados"
          value={report.passedStudents}
          icon={Trophy}
          color={colors.warning}
        />
        <StatsCard
          title="Taxa de Aprovação"
          value={`${report.passRate}%`}
          icon={TrendingUp}
          color={colors.accent}
        />
      </View>

      <View style={styles.reportActions}>
        <TouchableOpacity style={styles.primaryButton}>
          <Download size={20} color={colors.card} />
          <Text style={styles.buttonText}>Exportar Relatório</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportsTab;