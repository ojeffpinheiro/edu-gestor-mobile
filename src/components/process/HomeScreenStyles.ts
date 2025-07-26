import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { Spacing, BorderRadius, Shadow, Typography } from "../../styles/designTokens";

export const createHomeScreenStyles = (colors: ColorScheme) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: colors.background.primary,
  },
  heading1: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    color: colors.text.primary,
  },
  heading2: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
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
  imageContainer: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.md,
  },
  processingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  processingText: {
    color: colors.primary.main,
    fontSize: Typography.fontSize.sm,
  },
  successIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  successStatusText: {  // Renomeado de successText para evitar duplicação
    color: colors.feedback.success,
    fontSize: Typography.fontSize.sm,
  },
  emptyCapture: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  captureText: {
    color: colors.text.secondary,
    textAlign: 'center',
    fontSize: Typography.fontSize.sm,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  resultsContent: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultValue: {
    fontWeight: Typography.fontWeight.medium,
    color: colors.text.primary,
  },
  successText: {
    color: colors.feedback.success,
    fontWeight: Typography.fontWeight.bold,
  },
  errorText: {
    color: colors.feedback.error,
    fontWeight: Typography.fontWeight.bold,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
});