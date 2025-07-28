import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { createContainerStyles, createCardStyles, createTextStyles } from "../../styles/globalStyles";
import { Spacing } from "../../styles/designTokens";

export const createHomeScreenStyles = (colors: ColorScheme) => {
  const containers = createContainerStyles(colors);
  const cards = createCardStyles(colors);
  const text = createTextStyles(colors);

  return StyleSheet.create({
    screenContainer: {
      ...containers.screenContainer,
    },
    emptyCapture:{
      ...containers.buttonContainer
    },
    heading1: {
      ...text.heading1,
      textAlign: 'center',
      marginBottom: Spacing.xl,
    },
    heading2: {
      ...text.heading2,
    },
    bodyText: {
      ...text.body,
    },
    captureText: {
      ...text.caption,
    },
    card: {
      ...cards.base,
      marginBottom: Spacing.lg,
    },
    imageContainer: {
      alignItems: 'center',
      gap: Spacing.md,
    },
    processingIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
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
    actions: {
      flexDirection: 'row',
      gap: Spacing.md,
    },
  });
};