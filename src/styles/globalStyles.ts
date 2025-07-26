import { StyleSheet } from "react-native";
import { ColorScheme } from "./colors";
import { BorderRadius, Shadow, Spacing, Typography } from "./designTokens";

export const createCardStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    base: {
      backgroundColor: colors.component.card,
      borderRadius: BorderRadius.xl,
      padding: Spacing.lg,
      margin: Spacing.md,
      ...Shadow(colors).sm,
    },
    elevated: {
      ...Shadow(colors).md,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    success: {
      backgroundColor: colors.feedback.success + '20',
      borderLeftWidth: 4,
      borderLeftColor: colors.feedback.success,
      padding: Spacing.md,
      borderRadius: BorderRadius.sm,
    },
    error: {
      backgroundColor: colors.feedback.error + '20',
      borderLeftWidth: 4,
      borderLeftColor: colors.feedback.error,
      padding: Spacing.md,
      borderRadius: BorderRadius.sm,
    },
  });
};

export const getListStyles = (colors: ColorScheme) => ({
  borderWidth: 1,
  borderRadius: BorderRadius.lg,
  padding: Spacing.md,
  marginBottom: Spacing.sm,
  borderColor: colors.border,
  backgroundColor: colors.component.card,
});

export const createButtonStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    primary: {
      backgroundColor: colors.primary.main,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      ...Shadow(colors).xs,
    },
    secondary: {
      backgroundColor: colors.background.secondary,
      borderWidth: 1,
      borderColor: colors.border.medium,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: colors.text.onPrimary,
      fontSize: Typography.fontSize.md,
      fontWeight: Typography.fontWeight.semibold,
    },
    secondaryText: {
      color: colors.text.primary,
    },
    icon: {
      marginRight: Spacing.sm,
    },
    disabled: {
      opacity: 0.6,
    },
  });
};

export const createBaseStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    // Containers
    screenContainer: {
      flex: 1,
      padding: Spacing.md,
      backgroundColor: colors.background.primary,
    },
    centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: Spacing.md,
      backgroundColor: colors.background.primary,
    },
    fullScreenOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },

    // Text styles
    heading1: {
      fontSize: Typography.fontSize.xxl,
      fontWeight: Typography.fontWeight.bold,
      color: colors.text.primary,
      lineHeight: Typography.lineHeight.xxl,
      marginBottom: Spacing.sm,
    },
    heading2: {
      fontSize: Typography.fontSize.xl,
      fontWeight: Typography.fontWeight.semibold,
      color: colors.text.primary,
      lineHeight: Typography.lineHeight.xl,
      marginBottom: Spacing.xs,
    },
    bodyText: {
      fontSize: Typography.fontSize.md,
      color: colors.text.secondary,
      lineHeight: Typography.lineHeight.md,
    },
  });
};