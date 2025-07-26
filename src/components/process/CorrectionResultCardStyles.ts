import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { createCardStyles, createTextStyles } from "../../styles/globalStyles";
import { Spacing } from "../../styles/designTokens";

export const createCorrectionResultCardStyles = (colors: ColorScheme) => {
  const cards = createCardStyles(colors);
  const text = createTextStyles(colors);

  return StyleSheet.create({
    card: {
      ...cards.base,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    title: {
      ...text.heading3,
    },
    score: {
      ...text.heading2,
      ...text.bold,
    },
    details: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: Spacing.md,
    },
    detailText: {
      ...text.caption,
    },
    statsCardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    statsTitle: {
      ...text.caption,
      marginBottom: Spacing.xs,
    },
    statsValue: {
      ...text.heading2,
      ...text.bold,
    },
  });
};