import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { BorderRadius, Spacing, Typography } from "../../styles/designTokens";


const createSettingsScreenStyles = (colors: ColorScheme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    gap: Spacing.xl,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  section: {
    gap: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  sectionTitle: {
    fontWeight: Typography.fontWeight.semibold,
    color: colors.primary,
    fontSize: Typography.fontSize.lg,
  },
  form: {
    gap: Spacing.md,
  },
  formGroup: {
    gap: Spacing.xs,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    backgroundColor: colors.card,
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  switchLabel: {
    flex: 1,
  },
  systemButton: {
    backgroundColor: colors.primary,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  systemButtonText: {
    color: colors.card,
    fontWeight: Typography.fontWeight.medium,
  },
  downloadButton: {
    flexDirection: 'row',
    gap: Spacing.xs,
    backgroundColor: '#4b5563',
  },
  downloadButtonText: {
    color: colors.card,
  },
});

export default createSettingsScreenStyles;