import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { Spacing, Typography } from "../../styles/designTokens";

export const createResultsScreenStyles = (colors: ColorScheme) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: colors.background.primary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  resultsList: {
    gap: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  emptyText: {
    color: colors.text.secondary,
    fontSize: Typography.fontSize.md,
    textAlign: 'center',
  },
});