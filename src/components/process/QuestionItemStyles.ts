import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { createListStyles, createTextStyles } from "../../styles/globalStyles";
import { Spacing } from "../../styles/designTokens";

export const createQuestionItemStyles = (colors: ColorScheme) => {
  const lists = createListStyles(colors);
  const text = createTextStyles(colors);

  return StyleSheet.create({
    card: {
      ...lists.item,
    },
    correct: {
      ...lists.correct,
    },
    incorrect: {
      ...lists.incorrect,
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
  });
};