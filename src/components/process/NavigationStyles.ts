import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { BorderRadius, Shadow, Spacing, Typography } from "../../styles/designTokens";

export const createNavigationStyles = (colors: ColorScheme) => StyleSheet.create({
  container: {
    backgroundColor: colors.primary.main,
    padding: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Shadow(colors).md,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary.dark
  },
  title: {
    color: colors.text.onPrimary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  navButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  button: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.round,
  },
  activeButton: {
    backgroundColor: colors.primary.dark,
  },
});