import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { createContainerStyles, createCardStyles, createTextStyles } from "../../styles/globalStyles";
import { Spacing } from "../../styles/designTokens";

export const createDetailsScreenStyles = (colors: ColorScheme) => {
  const containers = createContainerStyles(colors);
  const cards = createCardStyles(colors);
  const text = createTextStyles(colors);

  return StyleSheet.create({
    screenContainer: {
      ...containers.screenContainer,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.xl,
    },
    heading1: {
      ...text.heading1,
      marginLeft: Spacing.md,
    },
    heading2: {
      ...text.heading2,
    },
    card: {
      ...cards.base,
      marginBottom: Spacing.lg,
    },
    summaryGrid: {
      flexDirection: 'row',
      gap: Spacing.lg,
      marginTop: Spacing.md,
    },
    summaryItem: {
      flex: 1,
    },
    content: {
      paddingBottom: Spacing.xl,
    },
    questionsList: {
      gap: Spacing.sm,
      marginTop: Spacing.md,
    },
  });
};