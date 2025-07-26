import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { Spacing, BorderRadius, Shadow, Typography } from "../../styles/designTokens";

export const createDetailsScreenStyles = (colors: ColorScheme) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  heading1: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: colors.text.primary,
    marginLeft: Spacing.md,
  },
  heading2: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  heading3: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: colors.text.primary,
  },
  bodyText: {
    fontSize: Typography.fontSize.sm,
    color: colors.text.secondary,
  },
  card: {
    backgroundColor: colors.component.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadow(colors).xs,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginTop: Spacing.md,
  },
  summaryItem: {
    flex: 1,
  },
  success: {
    color: colors.feedback.success,
  },
  error: {
    color: colors.feedback.error,
  },
  content: {
    paddingBottom: Spacing.xl,
  },
  questionsList: {
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
});