import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/common/Button';
import { BorderRadius, Shadow, Spacing } from '../styles/designTokens';
const ReportScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createReportScreenStyles(colors);

  // Dados de exemplo - substituir por dados reais
  const reportData = {
    totalExams: 24,
    averageScore: 78,
    bestScore: 95,
    worstScore: 42,
    bySubject: [
      { subject: 'Matemática', average: 82 },
      { subject: 'Português', average: 75 },
      { subject: 'Ciências', average: 79 },
    ],
    byClass: [
      { class: '3ºA', average: 85 },
      { class: '3ºB', average: 72 },
    ]
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Relatório de Desempenho</Text>
        <Text style={styles.subtitle}>Análise geral dos resultados</Text>

        <View style={styles.summaryCard}>
          <Text>Estatísticas Gerais</Text>
          <View style={styles.statsRow}>
            <StatItem label="Provas corrigidas" value={reportData.totalExams} />
            <StatItem label="Média geral" value={`${reportData.averageScore}%`} />
          </View>
          <View style={styles.statsRow}>
            <StatItem label="Melhor nota" value={`${reportData.bestScore}%`} />
            <StatItem label="Pior nota" value={`${reportData.worstScore}%`} />
          </View>
        </View>

        <View style={styles.section}>
          <Text>Por Matéria</Text>
          {reportData.bySubject.map((item, index) => (
            <ScoreBar 
              key={index}
              label={item.subject}
              value={item.average}
              maxValue={100}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text>Por Turma</Text>
          {reportData.byClass.map((item, index) => (
            <ScoreBar 
              key={index}
              label={item.class}
              value={item.average}
              maxValue={100}
            />
          ))}
        </View>
      </ScrollView>

      <Button
        title="Voltar ao Início"
        onPress={() => navigation.navigate('Home')}
        variant="primary"
        style={styles.backButton}
      />
    </View>
  );
};

// Componente auxiliar para exibir estatísticas
const StatItem = ({ label, value }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, margin: 8 }}>
      <Text style={{ color: colors.text.secondary }}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

// Componente auxiliar para barras de progresso
const ScoreBar = ({ label, value, maxValue }) => {
  const { colors } = useTheme();
  const percentage = (value / maxValue) * 100;
  
  return (
    <View style={{ marginVertical: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{label}</Text>
        <Text>{value}%</Text>
      </View>
      <View style={{ 
        height: 8, 
        backgroundColor: colors.background.secondary, 
        borderRadius: 4,
        marginTop: 4 
      }}>
        <View style={{ 
          width: `${percentage}%`, 
          height: '100%', 
          backgroundColor: colors.primary.main,
          borderRadius: 4
        }} />
      </View>
    </View>
  );
};

const createReportScreenStyles = (colors) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  title: {
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: Spacing.xl,
    textAlign: 'center',
    color: colors.text.secondary,
  },
  summaryCard: {
    backgroundColor: colors.component.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadow(colors).xs,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: Spacing.md,
  },
  section: {
    backgroundColor: colors.component.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadow(colors).xs,
  },
  backButton: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
});

export default ReportScreen;