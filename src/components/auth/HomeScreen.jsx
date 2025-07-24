import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, BorderRadius, Typography } from '../../styles/designTokens';
import { Card, PrimaryButton } from '../common/sharedComponents';

const HomeScreen = ({ setCurrentView }) => {
  const { colors } = useTheme();

  if (!colors) return <Text>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}20` }]}>
            <BookOpen size={32} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Correção Automatizada</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Sistema para correção de provas via scanner
          </Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: `${colors.primary}10` }]}>
          <Text style={[styles.infoTitle, { color: colors.primary }]}>Como funciona:</Text>
          {[
            'Autentique-se com sua senha',
            'Escaneie o código da prova',
            'Identifique o aluno',
            'Capture a folha de resposta'
          ].map((item, index) => (
            <Text key={index} style={[styles.infoItem, { color: colors.primary }]}>
              • {item}
            </Text>
          ))}
        </View>

        <PrimaryButton 
          title="Iniciar Correção" 
          onPress={() => setCurrentView('auth')} 
          style={styles.button}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  card: {
    padding: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  iconContainer: {
    borderRadius: BorderRadius.round,
    width: Spacing.xxxl + Spacing.xs,
    height: Spacing.xxxl + Spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  infoBox: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  infoTitle: {
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.sm,
    fontSize: Typography.fontSize.md,
  },
  infoItem: {
    fontSize: Typography.fontSize.sm,
    marginBottom: Spacing.xs,
  },
  button: {
    marginTop: Spacing.md,
  },
});

export default HomeScreen;