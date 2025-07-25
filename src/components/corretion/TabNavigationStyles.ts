import { StyleSheet } from "react-native";
import { Spacing, Typography } from "../../styles/designTokens";
import { ColorScheme } from "../../styles/colors";

const createTabNavigationStyles  = (colors: ColorScheme) => StyleSheet.create({
  bottomNav: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
    paddingVertical: Spacing.sm,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: 16,
  },
  navItemActive: {
    backgroundColor: colors.gray[200],
  },
  navText: {
    fontSize: Typography.fontSize.sm,
    color: colors.gray[500],
    marginTop: Spacing.xs,
  },
  navTextActive: {
    color: colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
});

export default createTabNavigationStyles;