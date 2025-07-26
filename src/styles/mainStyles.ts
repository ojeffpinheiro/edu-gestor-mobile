import { StyleSheet } from 'react-native';
import { ColorScheme } from './colors';
import { Spacing, BorderRadius, Shadow, Typography } from './designTokens';

export const createDesignSystem = (colors: ColorScheme) => {
  return {
    // Containers
    containers: StyleSheet.create({
      screen: {
        flex: 1,
        padding: Spacing.md,
        backgroundColor: colors.background.primary,
      },
      centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.md,
        backgroundColor: colors.background.primary,
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
      },
    }),

    // Cards
    cards: StyleSheet.create({
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
    }),

    // Text
    text: StyleSheet.create({
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
      body: {
        fontSize: Typography.fontSize.md,
        color: colors.text.secondary,
        lineHeight: Typography.lineHeight.md,
      },
    }),

    // Buttons
    buttons: StyleSheet.create({
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
      disabled: {
        opacity: 0.6,
      },
    }),

    // Feedback
    feedback: StyleSheet.create({
      success: {
        backgroundColor: `${colors.feedback.success}20`,
        borderLeftWidth: 4,
        borderLeftColor: colors.feedback.success,
        padding: Spacing.md,
        borderRadius: BorderRadius.sm,
      },
      error: {
        backgroundColor: `${colors.feedback.error}20`,
        borderLeftWidth: 4,
        borderLeftColor: colors.feedback.error,
        padding: Spacing.md,
        borderRadius: BorderRadius.sm,
      },
    }),
  };
};