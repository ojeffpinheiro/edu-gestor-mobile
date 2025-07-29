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
    tabContent: {
      ...tabs.tabContainer,
    },
    sectionTitle: {
      ...text.heading2,
      ...tabs.sectionHeader,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginBottom: Spacing.lg,
    },
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
    primaryButtonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      ...buttons.text,
    },
    examList: {
      gap: Spacing.sm,
    },
    loadingText: {
      ...text.body,
      textAlign: 'center',
      marginTop: Spacing.xl,
    },
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