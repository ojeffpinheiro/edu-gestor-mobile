import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { Spacing, Typography } from "../../styles/designTokens";

export const createTabNavigationStyles = (colors: ColorScheme) => StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.secondary,
  },
  navItem: {
    alignItems: 'center',
    padding: Spacing.sm,
  },
  navText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: colors.text.secondary,
    marginTop: Spacing.xs,
  },
});