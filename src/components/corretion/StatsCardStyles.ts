import { StyleSheet } from "react-native";
import { BorderRadius, Spacing, Typography } from "../../styles/designTokens";
import { ColorScheme } from "../../styles/colors";

export const createStatsCardStyles = (colors: ColorScheme) => StyleSheet.create({
  statsCard: {
    backgroundColor: colors.background.secondary,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border.light,
  },
  statsCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: Typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: Spacing.xs,
    lineHeight: Typography.lineHeight.sm,
  },
  statsValue: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: colors.text.primary,
  },
});