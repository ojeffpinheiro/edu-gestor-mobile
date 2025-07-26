import { StyleSheet } from "react-native";
import { BorderRadius, Spacing, Typography } from "../../styles/designTokens";
import { ColorScheme } from "../../styles/colors";
import { createCardStyles, createTextStyles } from "../../styles/globalStyles";

export const createStatsCardStyles = (colors: ColorScheme) => {
  const cards = createCardStyles(colors);
  const text = createTextStyles(colors);

  return StyleSheet.create({
    statsCard: {
      ...cards.base,
      ...cards.stats,
      borderColor: colors.border.light,
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
      ...text.bold
    },
  });
};