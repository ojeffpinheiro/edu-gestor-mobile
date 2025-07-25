import { ColorScheme } from "./colors";
import { BorderRadius, Spacing } from "./designTokens";

export const getCardStyles = (colors: ColorScheme) => ({
  borderRadius: BorderRadius.xxl,
  padding: Spacing.lg,
  backgroundColor: colors.card,
  ...Shadow(colors).default,
});

export const getListStyles = (colors: ColorScheme) => ({
  borderWidth: 1,
  borderRadius: BorderRadius.lg,
  padding: Spacing.md,
  marginBottom: Spacing.sm,
  borderColor: colors.border,
  backgroundColor: colors.card,
});