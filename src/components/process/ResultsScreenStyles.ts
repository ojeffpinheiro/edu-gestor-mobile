import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { createContainerStyles, createTextStyles } from "../../styles/globalStyles";
import { Spacing } from "../../styles/designTokens";

export const createResultsScreenStyles = (colors: ColorScheme) => {
  const containers = createContainerStyles(colors);
  const text = createTextStyles(colors);

  return StyleSheet.create({
    screenContainer: {
      ...containers.screenContainer,
    },
    emptyState: {
      ...containers.centeredContainer,
      gap: Spacing.md,
    },
    resultsList: {
      gap: Spacing.md,
      paddingBottom: Spacing.xl,
    },
    emptyText: {
      ...text.body,
      textAlign: 'center',
    },
  });
};