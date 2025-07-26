import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { BorderRadius, Shadow, Spacing, Typography } from "../../styles/designTokens";

export const createModalStyles = (colors: ColorScheme) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.gray[900] + '80', // 50% opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.component.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    width: '90%',
    maxHeight: '80%',
    ...Shadow(colors).md,
  },
});

export const createCardStyles = (colors: ColorScheme) => StyleSheet.create({
  base: {
    backgroundColor: colors.component.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
    marginBottom: Spacing.md,
    ...Shadow(colors).sm,
  },
  elevated: {
    ...Shadow(colors).md,
    borderColor: colors.border.medium,
  },
});

export const createButtonStyles = (colors: ColorScheme) => StyleSheet.create({
  primary: {
    backgroundColor: colors.primary.main,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.sm,
    ...Shadow(colors).xs,
  },
  secondary: {
    backgroundColor: colors.component.secondaryButton,
    borderWidth: 1,
    borderColor: colors.border.medium,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.sm,
  },
});

export const createTextStyles = (colors: ColorScheme) => StyleSheet.create({
  heading1: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: Spacing.md,
    lineHeight: Typography.lineHeight.xxl,
  },
  heading2: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: Spacing.sm,
    lineHeight: Typography.lineHeight.xl,
  },
  bodyText: {
    fontSize: Typography.fontSize.md,
    color: colors.text.secondary,
    lineHeight: Typography.lineHeight.md,
  },
  caption: {
    fontSize: Typography.fontSize.sm,
    color: colors.text.tertiary,
    lineHeight: Typography.lineHeight.sm,
  },
});