import { StyleSheet } from "react-native";
import { ColorScheme } from '../../styles/colors';
import { Spacing, BorderRadius, Shadow, Typography } from '../../styles/designTokens';

export const createCorrectionResultCardStyles = (colors: ColorScheme) => StyleSheet.create({
  card: {
    backgroundColor: colors.component.card,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadow(colors).sm,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: Spacing.xs,
  },
  date: {
    fontSize: Typography.fontSize.sm,
    color: colors.text.secondary,
  },
  results: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  success: {
    color: colors.feedback.success,
  },
  error: {
    color: colors.feedback.error,
  },
  answers: {
    fontSize: Typography.fontSize.sm,
    color: colors.text.secondary,
  },
});