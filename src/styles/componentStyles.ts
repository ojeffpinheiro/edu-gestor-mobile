import { StyleSheet } from 'react-native';
import { ColorScheme } from './colors';
import { Spacing, BorderRadius } from './designTokens';

export const getScannerStyles = (colors: ColorScheme) => StyleSheet.create({
  scannerContainer: {
    width: '100%',
    height: 250,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.background.tertiary,
    marginBottom: Spacing.lg,
  },
  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scannerCorner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: colors.primary.main,
    borderWidth: 3,
  },
});

export const getStudentItemStyles = (colors: ColorScheme) => StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    backgroundColor: colors.background.secondary,
    borderColor: colors.border.light,
  },
  selected: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.main + '10',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: Spacing.xxs,
  },
  metaText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});