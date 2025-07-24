import { StyleSheet } from 'react-native';
import { Shadow, Spacing, Typography } from './designTokens';

// Remove the hook call from the top level and make these style creators
export const createCardStyles = (colors: any) => StyleSheet.create({
  base: {
    backgroundColor: colors.background,
    borderRadius: Spacing.md,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadow(colors).default,
  },
  elevated: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  success: {
    backgroundColor: colors.success + '10',
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  error: {
    backgroundColor: colors.error + '10',
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
});

export const createButtonStyles = (colors: any) => StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Shadow(colors).button,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: colors.card,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },
  secondaryText: {
    color: colors.textSecondary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
  },
  icon: {
    marginRight: Spacing.sm,
  },
});