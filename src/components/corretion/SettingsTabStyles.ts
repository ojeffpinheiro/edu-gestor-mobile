// SettingsTabStyles.ts
import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { createSettingsBaseStyles, createTabBaseStyles } from "../../styles/componentStyles";
import { createButtonStyles, createTextStyles } from "../../styles/globalStyles";
import { Spacing } from "../../styles/designTokens";

export const createSettingsTabStyles = (colors: ColorScheme) => {
  const { settingsSection, settingsItem } = createSettingsBaseStyles(colors);
  const { tabContainer } = createTabBaseStyles(colors);
  const { heading2, heading3, body, caption } = createTextStyles(colors);
  const { secondary, text, round } = createButtonStyles(colors);

  return StyleSheet.create({
    tabContent: {
      ...tabContainer,
    },
    sectionTitle: {
      ...heading2,
      marginBottom: Spacing.lg,
    },
    settingsSection: {
      ...settingsSection,
      backgroundColor: colors.background.secondary,
      borderColor: colors.border.light,
    },
    settingsItem: {
      ...settingsItem,
      justifyContent: 'space-between',
    },
    settingsLabel: {
      ...heading3,
      flex: 1,
    },
    settingsValue: {
      ...body,
      color: colors.text.secondary,
    },
    descriptionText: {
      ...caption,
      marginBottom: Spacing.md,
    },
    actionButton: {
      ...secondary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      gap: Spacing.sm,
      borderColor: colors.border.medium,
    },
    actionButtonText: {
      ...text,
      color: colors.text.secondary,
    },
    dangerAction: {
      borderColor: colors.feedback.error,
    },
    dangerText: {
      color: colors.feedback.error,
    },
  });
};