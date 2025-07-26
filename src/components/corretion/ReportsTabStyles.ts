import { StyleSheet } from "react-native";
import { BorderRadius, Spacing, Typography } from "../../styles/designTokens";
import { ColorScheme } from "../../styles/colors";
import { createTabBaseStyles } from "../../styles/componentStyles";
import { createButtonStyles, createCardStyles, createTextStyles } from "../../styles/globalStyles";

export const createReportsTabStyles = (colors: ColorScheme) => {
  const tabs = createTabBaseStyles(colors);
  const buttons = createButtonStyles(colors);
  const text = createTextStyles(colors);
  const cards = createCardStyles(colors);

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

    // Stats grid layout
    statsGrid: {
      ...tabs.gridContainer,
    },

    // Report cards
    statCard: {
      ...cards.base,
      padding: Spacing.lg,
      alignItems: 'center',
    },
    statValue: {
      ...text.heading1,
      marginVertical: Spacing.sm,
    },
    statLabel: {
      ...text.caption,
      textAlign: 'center',
    },

    // Primary action button
    primaryButton: {
      ...buttons.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      gap: Spacing.sm,
    },

    // Button text
    buttonText: {
      ...buttons.text,
    },

    // Report actions container
    reportActions: {
      alignItems: 'center',
      marginTop: Spacing.lg,
    },

    // Loading state
    loadingText: {
      ...text.body,
      textAlign: 'center',
      marginTop: Spacing.xl,
    },

    // Status indicators
    successIndicator: {
      color: colors.feedback.success,
    },
    warningIndicator: {
      color: colors.feedback.warning,
    }
  });
}

export default createReportsTabStyles;