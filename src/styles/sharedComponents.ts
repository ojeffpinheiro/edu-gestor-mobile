import { StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Shadow, Spacing, Typography } from './designTokens';

const { colors } = useTheme();

export const CardStyles = StyleSheet.create({
  base: {
    backgroundColor: colors.background,
    borderRadius: Spacing.md,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadow,
  },
  elevated: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  success: {
    backgroundColor: colors.success[100],
    borderLeftWidth: 4,
    borderLeftColor: colors.success[500],
  },
  error: {
    backgroundColor: colors.error[100],
    borderLeftWidth: 4,
    borderLeftColor: colors.error[500],
  },
});

export const ButtonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Shadow,
  },
  secondary: {
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  text: {
    color: colors.textSecondary,
    ...Typography.button,
    fontWeight: '600',
  },
  icon: {
    marginRight: Spacing.sm,
  },
});