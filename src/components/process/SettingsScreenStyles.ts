import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { BorderRadius, Spacing, Shadow, Typography } from "../../styles/designTokens";

export const createSettingsScreenStyles = (colors: ColorScheme) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: Spacing.lg,
    gap: Spacing.xl,
    backgroundColor: colors.background.primary,
  },
  card: {
    backgroundColor: colors.component.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadow(colors).xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  form: {
    gap: Spacing.lg,
  },
  formGroup: {
    gap: Spacing.xs,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: colors.text.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    backgroundColor: colors.background.secondary,
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  switchLabel: {
    flex: 1,
    color: colors.text.primary,
    fontSize: Typography.fontSize.md,
  },
  button: {
    marginTop: Spacing.md,
  },
});