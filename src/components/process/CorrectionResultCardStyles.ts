import { StyleSheet } from "react-native";
import { ColorScheme } from '../../styles/colors';
import { Spacing, BorderRadius, Shadow, Typography } from '../../styles/designTokens';

export const createCorrectionResultCardStyles = (colors: ColorScheme) => StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    ...Shadow(colors).default,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentName: {
    fontWeight: Typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  date: {
    fontSize: Typography.fontSize.sm,
    color: colors.textSecondary,
  },
  results: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  success: {
    color: colors.success,
  },
  error: {
    color: colors.error,
  },
  answers: {
    fontSize: Typography.fontSize.sm,
    color: colors.textSecondary,
  },
});