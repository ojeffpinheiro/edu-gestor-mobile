import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { BorderRadius, Spacing, Typography } from "../../styles/designTokens";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  correct: {
    backgroundColor: '#dcfce7',
  },
  incorrect: {
    backgroundColor: '#fee2e2',
  },
  questionNumber: {
    fontWeight: '500',
  },
  answers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  answerText: {
    fontSize: 12,
  },
  answerValue: {
    fontWeight: 'bold',
  },
});

const createQuestionItemStyles = (colors: ColorScheme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
  },
  correct: {
    backgroundColor: colors.success + '20',
  },
  incorrect: {
    backgroundColor: colors.error + '20',
  },
  questionNumber: {
    fontWeight: Typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  answers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  answerValue: {
    fontWeight: Typography.fontWeight.bold,
  },
  answerText: {
    fontSize: Typography.fontSize.sm,
    color: colors.textPrimary,
  },
});

export default createQuestionItemStyles;