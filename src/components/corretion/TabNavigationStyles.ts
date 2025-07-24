import { StyleSheet } from "react-native";
import { Spacing, Typography } from "../../styles/designTokens";
import { ColorScheme } from "../../styles/colors";

const createTabNavigationStyles  = (colors: ColorScheme) => StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: Spacing.sm,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  navItemActive: {
    backgroundColor: colors.gray[200],
  },
  navText: {
    fontSize: Typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: Spacing.xs,
  },
  navTextActive: {
    color: colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
});

export default createTabNavigationStyles;