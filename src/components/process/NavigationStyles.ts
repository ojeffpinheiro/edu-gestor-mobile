import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { BorderRadius, Shadow, Spacing, Typography } from "../../styles/designTokens";

const createNavigationStyles = (colors: ColorScheme) => StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Shadow(colors).strong
  },
  title: {
    color: colors.card,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  navButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  button: {
    padding: Spacing.md,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#1d4ed8',
  },
});

export default createNavigationStyles;