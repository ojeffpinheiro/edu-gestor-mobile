import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { BorderRadius, Spacing, Typography } from "../../styles/designTokens";
import { createListStyles, createTextStyles } from "../../styles/globalStyles";


export const createQuestionItemStyles = (colors: ColorScheme) => {
  const lists = createListStyles(colors);
  const text = createTextStyles(colors);

  return StyleSheet.create({
    card: {
      ...lists.item
    },
    correct: {
      ...lists.item,
      backgroundColor: colors.feedback.success + '20',
      borderLeftWidth: 4,
      borderLeftColor: colors.feedback.success,
    },
    incorrect: {
      ...lists.item,
      backgroundColor: colors.feedback.error + '20',
      borderLeftWidth: 4,
      borderLeftColor: colors.feedback.error,
    },
    questionNumber: {
      ...text.body,
      ...text.semibold,
      minWidth: Spacing.lg,
    },
    answers: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
    },
    answerText: {
      ...text.caption,
    },
    answerValue: {
      ...text.caption,
      ...text.semibold,
    },
    successBox: {
      backgroundColor: colors.feedback.success + '20',
      borderLeftWidth: 4,
      borderLeftColor: colors.feedback.success,
    },
    errorBox: {
      backgroundColor: colors.feedback.error + '20',
      borderLeftWidth: 4,
      borderLeftColor: colors.feedback.error,
    },
  });
}