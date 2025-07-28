import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { Spacing } from "../../styles/designTokens";
import { createHeaderBaseStyles } from "../../styles/componentStyles";
import { createButtonStyles, createTextStyles } from "../../styles/globalStyles";

export const createNavigationStyles = (colors: ColorScheme) => {
  const header = createHeaderBaseStyles(colors);
  const buttons = createButtonStyles(colors);
  const text = createTextStyles(colors);

  return StyleSheet.create({
    container: {
      ...header.navHeader,
      padding: Spacing.md,
      backgroundColor: colors.primary.light,
    },
    title: {
      ...text.heading2,
      color: colors.text.onPrimary,
    },
    navButtons: {
      flexDirection: 'row',
      gap: Spacing.md,
    },
    button: {
      ...buttons.round,
      justifyContent: 'center',
    },
  });
};