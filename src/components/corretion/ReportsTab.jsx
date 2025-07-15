import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Download, FileText, Target, Trophy, TrendingUp } from 'lucide-react-native';
import StatsCard from './StatsCard';
import { ExamReport } from '../../types/examTypes';
import styles from './ReportsTabStyles';

const ReportsTab = ({ report }) => {
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
          color="#3B82F6"
        />
        <StatsCard
          title="Média Geral"
          value={report.averageScore}
          icon={Target}
          color="#10B981"
        />
        <StatsCard
          title="Aprovados"
          value={report.passedStudents}
          icon={Trophy}
          color="#F59E0B"
        />
        <StatsCard
          title="Taxa de Aprovação"
          value={`${report.passRate}%`}
          icon={TrendingUp}
          color="#8B5CF6"
        />
      </View>

      <View style={styles.reportActions}>
        <TouchableOpacity style={styles.primaryButton}>
          <Download size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Exportar Relatório</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportsTab;