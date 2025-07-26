// CorrectionTabStyles.ts
import { StyleSheet } from "react-native";
import { BorderRadius, Spacing } from "../../styles/designTokens";
import { ColorScheme } from "../../styles/colors";
import { createTabBaseStyles } from "../../styles/componentStyles";
import { createButtonStyles, createListStyles, createTextStyles } from "../../styles/globalStyles";


export const createCorrectionTabStyles = (colors: ColorScheme) => {
  const tabs = createTabBaseStyles(colors);
  const buttons = createButtonStyles(colors);
  const text = createTextStyles(colors);
  const lists = createListStyles(colors);

  return StyleSheet.create({
    // Base container
    tabContent: {
      ...tabs.tabContainer,
    },

    // Section title
    sectionTitle: {
      ...text.heading2,
      ...tabs.sectionHeader,
    },

    // Action buttons container
    actionButtons: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginBottom: Spacing.lg,
    },

    // Primary action button
    primaryButton: {
      ...buttons.primary,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      gap: Spacing.sm,
    },

    // Button text
    buttonText: {
      ...buttons.text,
    },

    // Exam list container
    examList: {
      gap: Spacing.sm,
    },

    // Loading state text
    loadingText: {
      ...text.body,
      textAlign: 'center',
      marginTop: Spacing.xl,
    },

    // Custom styles for correction items
    correctionItem: {
      ...lists.item,
      padding: Spacing.lg,
    },

    // Status indicator
    statusIndicator: {
      width: Spacing.sm,
      height: Spacing.sm,
      borderRadius: BorderRadius.round,
      marginRight: Spacing.sm,
    },
    pendingStatus: {
      backgroundColor: colors.feedback.warning,
    },
    completedStatus: {
      backgroundColor: colors.feedback.success,
    }
  });
};