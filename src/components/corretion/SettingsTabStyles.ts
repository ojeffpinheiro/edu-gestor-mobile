import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { BorderRadius, Spacing, Typography } from "../../styles/designTokens";

const createSettingsTabStyles = (colors: ColorScheme) => StyleSheet.create({
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
  settingsSection: {
    backgroundColor: colors.background.secondary,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border.light,
  },
  settingsLabel: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: Spacing.sm,
  },
  answerKeyText: {
    fontSize: Typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: Spacing.md,
    lineHeight: Typography.lineHeight.sm,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border.medium,
    gap: Spacing.sm,
  },
  settingsButtonText: {
    fontSize: Typography.fontSize.md,
    color: colors.text.secondary,
  },
});

export default createSettingsTabStyles;