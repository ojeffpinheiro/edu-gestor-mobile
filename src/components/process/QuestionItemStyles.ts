import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { BorderRadius, Spacing, Typography } from "../../styles/designTokens";

export const createQuestionItemStyles = (colors: ColorScheme) => StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.light
  },
  correct: {
    backgroundColor: colors.feedback.success + '20',
    borderLeftWidth: 4,
    borderLeftColor: colors.feedback.success,
  },
  incorrect: {
    backgroundColor: colors.feedback.error + '20',
    borderLeftWidth: 4,
    borderLeftColor: colors.feedback.error,
  },
  questionNumber: {
    fontWeight: Typography.fontWeight.medium,
    color: colors.text.primary,
    fontSize: Typography.fontSize.md,
  },
  answers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  answerText: {
    fontSize: Typography.fontSize.sm,
    color: colors.text.secondary,
  },
  answerValue: {
    fontWeight: Typography.fontWeight.semibold,
    color: colors.text.primary,
  },
});