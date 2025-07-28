import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { createContainerStyles, createCardStyles, createTextStyles, createInputStyles } from "../../styles/globalStyles";
import { Spacing, Typography } from "../../styles/designTokens";

export const createSettingsScreenStyles = (colors: ColorScheme) => {
  const containers = createContainerStyles(colors);
  const cards = createCardStyles(colors);
  const text = createTextStyles(colors);
  const inputs = createInputStyles(colors);

  return StyleSheet.create({
    screenContainer: {
      ...containers.screenContainer,
      gap: Spacing.xl,
    },
    heading1: {
      ...text.heading1,
    },
    heading2: {
      ...text.heading2,
    },
    card: {
      ...cards.base,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      marginBottom: Spacing.md,
    },
    form: {
      gap: Spacing.lg,
    },
    formGroup: {
      gap: Spacing.xs,
    },
    label: {
      ...text.caption,
      fontWeight: Typography.fontWeight.medium,
    },
    input: {
      ...inputs.input,
    },
    switchGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: Spacing.sm,
    },
    switchLabel: {
      ...text.body,
      flex: 1,
    },
    bodyText: {
      ...text.body,
    },
    button: {
      marginTop: Spacing.md,
    },
  });
};