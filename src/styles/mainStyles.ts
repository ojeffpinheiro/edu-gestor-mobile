import { StyleSheet } from 'react-native';
import { ColorScheme } from './colors';
import { Spacing, BorderRadius, Shadow, Typography } from './designTokens';

export const createMainStyles = (colors: ColorScheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: Spacing.md,
            backgroundColor: colors.background,
            justifyContent: 'center',
        },
        card: {
            backgroundColor: colors.card,
            borderRadius: BorderRadius.xxl,
            padding: Spacing.lg,
            ...Shadow(colors).default,
        },
        title: {
            fontSize: Typography.fontSize.xxl,
            fontWeight: Typography.fontWeight.bold,
            color: colors.textPrimary,
            marginBottom: Spacing.xs,
            textAlign: 'center',
        },
        subtitle: {
            fontSize: Typography.fontSize.md,
            color: colors.textSecondary,
            textAlign: 'center',
        },
        primaryButton: {
            backgroundColor: colors.primary,
            paddingVertical: Spacing.sm,
            paddingHorizontal: Spacing.lg,
            borderRadius: BorderRadius.md,
            alignItems: 'center',
            marginBottom: Spacing.sm,
        },
        secondaryButton: {
            backgroundColor: 'transparent',
            borderColor: colors.border,
            borderWidth: 1,
            paddingVertical: Spacing.sm,
            paddingHorizontal: Spacing.lg,
            borderRadius: BorderRadius.md,
            alignItems: 'center',
            marginBottom: Spacing.sm,
        },
        buttonText: {
            color: colors.card,
            fontSize: Typography.fontSize.md,
            fontWeight: Typography.fontWeight.semibold,
        },
        secondaryButtonText: {
            color: colors.textSecondary,
            fontSize: Typography.fontSize.md,
            fontWeight: Typography.fontWeight.semibold,
        },
        disabledButton: {
            opacity: 0.6,
            backgroundColor: colors.gray[400],
        },
    }
);