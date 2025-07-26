import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { Spacing } from "../../styles/designTokens";
import { createCardStyles, createTextStyles } from "../../styles/globalStyles";
import { createListItemStyles } from "../../styles/componentStyles";

export const createExamItemStyles = (colors: ColorScheme) => {
  const cards = createCardStyles(colors);
  const text = createTextStyles(colors);
  const listItems = createListItemStyles(colors);

  return StyleSheet.create({
    examItem: {
      ...cards.examItem,
      ...listItems.base
    },
    examHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    studentName: {
      ...text.heading3
    },
    studentId: {
      ...text.caption
    },
    examDetails: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: Spacing.md,
      marginTop: Spacing.xs,
    },
    examSubject: {
      ...text.caption
    },
    examDate: {
      ...text.caption
    },
    examScore: {
      ...text.body,
      ...text.semibold,
      marginLeft: 'auto'
    },
    examStatus: {
      marginLeft: Spacing.sm,
    },
  })
};