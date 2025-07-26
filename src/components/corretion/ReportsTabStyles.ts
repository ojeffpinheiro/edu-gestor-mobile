import { StyleSheet } from "react-native";
import { BorderRadius, Spacing, Typography } from "../../styles/designTokens";
import { ColorScheme } from "../../styles/colors";

const createReportsTabStyles = (colors: ColorScheme) => StyleSheet.create({
  tabContent: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: colors.background.primary,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: Spacing.lg,
  },
  statsGrid: {
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.main,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  buttonText: {
    color: colors.text.onPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },
  reportActions: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  loadingText: {
    fontSize: Typography.fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: Spacing.xl,
  },
});

export default createReportsTabStyles;