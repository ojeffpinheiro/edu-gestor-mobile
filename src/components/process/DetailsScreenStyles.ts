import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { Spacing, BorderRadius, Typography } from "../../styles/designTokens";

export const createDetailsScreenStyles = (colors: ColorScheme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  summaryCard: {
    backgroundColor: colors.gray[100],
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
  },
  summaryTitle: {
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.md,
    color: colors.textPrimary,
  },
  summaryLabel: {
    fontSize: Typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  summaryValue: {
    fontWeight: Typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  summaryScore: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  questionsCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
  },
  backButton: {
    marginRight: Spacing.md,
    padding: Spacing.xs,
  },
  backButtonText: {
    fontSize: 20,
  },
  content: {
    paddingBottom: Spacing.md,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  summaryItem: {
    flex: 1,
  },
  success: {
    color: colors.success,
  },
  error: {
    color: colors.error,
  },
  questionsTitle: {
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.md,
  },
  questionsList: {
    gap: Spacing.xs,
  },
});