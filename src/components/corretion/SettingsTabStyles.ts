import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { BorderRadius, Spacing, Typography } from "../../styles/designTokens";
import { createSettingsBaseStyles, createTabBaseStyles } from "../../styles/componentStyles";
import { createButtonStyles, createTextStyles } from "../../styles/globalStyles";

export const createSettingsTabStyles = (colors: ColorScheme) => {
  const tabs = createTabBaseStyles(colors);
  const text = createTextStyles(colors);
  const buttons = createButtonStyles(colors);
  const settings = createSettingsBaseStyles(colors);

  return StyleSheet.create({
    // Base container
    tabContent: {
      ...tabs.tabContainer,
    },

    // Section title
    sectionTitle: {
      ...text.heading2,
      marginBottom: Spacing.lg,
    },

    // Settings section container
    settingsSection: {
      ...settings.settingsSection,
      backgroundColor: colors.background.secondary,
      borderColor: colors.border.light,
    },

    // Settings item row
    settingsItem: {
      ...settings.settingsItem,
      justifyContent: 'space-between',
    },

    // Text styles
    settingsLabel: {
      ...text.heading3,
      flex: 1,
    },
    settingsValue: {
      ...text.body,
      color: colors.text.secondary,
    },
    descriptionText: {
      ...text.caption,
      marginBottom: Spacing.md,
      lineHeight: Typography.lineHeight.sm,
    },

    // Action button
    actionButton: {
      ...buttons.secondary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      gap: Spacing.sm,
      borderColor: colors.border.medium,
    },
    actionButtonText: {
      ...buttons.text,
      color: colors.text.secondary,
    },

    // Dangerous action variant
    dangerAction: {
      borderColor: colors.feedback.error,
    },
    dangerText: {
      color: colors.feedback.error,
    },
    answerKeyText: {
      fontSize: Typography.fontSize.sm,
      color: colors.text.secondary,
      marginBottom: Spacing.md,
      lineHeight: Typography.lineHeight.sm,
    },
    settingsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      borderRadius: BorderRadius.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border.medium,
      gap: Spacing.sm,
    },
    settingsButtonText: {
      fontSize: Typography.fontSize.md,
      color: colors.text.secondary,
    },
  });
}

export default createSettingsTabStyles;