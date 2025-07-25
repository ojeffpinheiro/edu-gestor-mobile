import { StyleSheet } from 'react-native';
import { ColorScheme } from './colors';
import { Spacing, BorderRadius, Shadow, Typography } from './designTokens';

export const createThemeStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    // Containers
    screenContainer: {
      flex: 1,
      padding: Spacing.md,
      backgroundColor: colors.background.primary,
    },
    centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: Spacing.md,
      backgroundColor: colors.background.primary,
    },
    
    // Cards
    card: {
      backgroundColor: colors.component.card,
      borderRadius: BorderRadius.xl,
      padding: Spacing.lg,
      margin: Spacing.md,
      ...Shadow(colors).sm,
    },
    elevatedCard: {
      ...Shadow(colors).md,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    
    // Textos
    heading1: {
      fontSize: Typography.fontSize.xxl,
      fontWeight: Typography.fontWeight.bold,
      color: colors.text.primary,
      lineHeight: Typography.lineHeight.xxl,
      marginBottom: Spacing.sm,
    },
    heading2: {
      fontSize: Typography.fontSize.xl,
      fontWeight: Typography.fontWeight.semibold,
      color: colors.text.primary,
      lineHeight: Typography.lineHeight.xl,
      marginBottom: Spacing.xs,
    },
    bodyText: {
      fontSize: Typography.fontSize.md,
      color: colors.text.secondary,
      lineHeight: Typography.lineHeight.md,
    },
    
    // Botões
    primaryButton: {
      backgroundColor: colors.primary.main,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      ...Shadow(colors).xs,
    },
    secondaryButton: {
      backgroundColor: colors.background.secondary,
      borderWidth: 1,
      borderColor: colors.border.medium,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    // Inputs
    inputContainer: {
      borderWidth: 1,
      borderColor: colors.border.light,
      borderRadius: BorderRadius.md,
      backgroundColor: colors.background.secondary,
      paddingHorizontal: Spacing.md,
    },
    inputFocused: {
      borderColor: colors.primary.main,
      ...Shadow(colors).xs,
    },
    
    // Feedback
    successBox: {
      backgroundColor: colors.feedback.success + '20',
      borderLeftWidth: 4,
      borderLeftColor: colors.feedback.success,
      padding: Spacing.md,
      borderRadius: BorderRadius.sm,
    },
    errorBox: {
      backgroundColor: colors.feedback.error + '20',
      borderLeftWidth: 4,
      borderLeftColor: colors.feedback.error,
      padding: Spacing.md,
      borderRadius: BorderRadius.sm,
    },
  });
};