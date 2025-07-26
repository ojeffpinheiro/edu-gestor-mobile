import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { Spacing, Typography } from "../../styles/designTokens";
import { createNavigationBaseStyles, createTextStyles } from "../../styles/globalStyles";

export const createTabNavigationStyles = (colors: ColorScheme) => {
  const nav = createNavigationBaseStyles(colors);
  const text = createTextStyles(colors);

  return StyleSheet.create({
    // Base tab bar
    bottomNav: {
      ...nav.tabBar,
      borderTopColor: colors.border.light,
    },

    // Individual tab item
    navItem: {
      ...nav.tabItem,
    },
    activeNavItem: {
      opacity: 1,
    },
    inactiveNavItem: {
      opacity: 0.6,
    },

    // Tab label text
    navText: {
      ...text.caption,
      ...nav.tabLabel,
      fontWeight: Typography.fontWeight.medium,
    },
    activeNavText: {
      color: colors.primary.main,
    },
    inactiveNavText: {
      color: colors.text.secondary,
    },

    // Icon styling
    navIcon: {
      width: 24,
      height: 24,
    },
    activeNavIcon: {
      tintColor: colors.primary.main,
    },
    inactiveNavIcon: {
      tintColor: colors.text.secondary,
    }
});
}