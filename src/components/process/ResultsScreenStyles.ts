import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { Spacing, Typography } from "../../styles/designTokens";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  emptyText: {
    color: '#6b7280',
  },
  resultsList: {
    gap: 12,
    paddingBottom: 16,
  },
});

const createResultsScreenStyles = (colors: ColorScheme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xl,
    color: colors.textPrimary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  resultsList: {
    gap: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: Typography.fontSize.md,
  },
});

export default createResultsScreenStyles;