import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import { createMainStyles } from '../../styles/mainStyles';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, BorderRadius, Typography } from '../../styles/designTokens';

const HomeScreen = ({ setCurrentView }) => {
  const { colors } = useTheme();

  // Fallback para tema não carregado
  if (!colors) return <Text>Carregando...</Text>;

  const styles = createMainStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={localStyles.header}>
          <View style={[localStyles.iconContainer, {
            backgroundColor: `${colors.primary || '#3B82F6'}20` // Correção aqui
          }]}>
            <BookOpen size={32} color={colors.primary} />
          </View>
          <Text style={styles.title}>Correção Automatizada</Text>
          <Text style={styles.subtitle}>Sistema para correção de provas via scanner</Text>
        </View>

        {/* Adicione fallbacks similares em todas as interpolações */}
        <View style={[localStyles.infoBox, {
          backgroundColor: `${colors.primary || '#3B82F6'}10`
        }]}>
          <Text style={[localStyles.infoTitle, { color: colors.primary }]}>
            Como funciona:
          </Text>
          <View style={localStyles.infoList}>
            <Text style={[localStyles.infoItem, { color: colors.primary }]}>
              • Autentique-se com sua senha
            </Text>
            <Text style={[localStyles.infoItem, { color: colors.primary }]}>
              • Escaneie o código da prova
            </Text>
            <Text style={[localStyles.infoItem, { color: colors.primary }]}>
              • Identifique o aluno
            </Text>
            <Text style={[localStyles.infoItem, { color: colors.primary }]}>
              • Capture a folha de resposta
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={() => setCurrentView('auth')}>
          <Text style={styles.buttonText}>Iniciar Correção</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos locais para HomeScreen
const localStyles = {
  header: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  iconContainer: {
    borderRadius: BorderRadius.round,
    width: Spacing.xxxl + Spacing.xs, // 64
    height: Spacing.xxxl + Spacing.xs, // 64
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  infoBox: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  infoTitle: {
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.xs,
  },
  infoList: {
    marginTop: Spacing.xs,
  },
  infoItem: {
    fontSize: Typography.fontSize.sm,
    marginBottom: Spacing.xxs,
  },
};

export default HomeScreen;
