import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { BorderRadius, Spacing, Typography } from "../../styles/designTokens";

export const createExamItemStyles = (colors: ColorScheme) => StyleSheet.create({
  examItem: {
    backgroundColor: colors.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: Spacing.sm,
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  studentName: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  studentId: {
    fontSize: Typography.fontSize.sm,
    color: colors.textSecondary,
  },
  examDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md
  },
  examSubject: {
    fontSize: Typography.fontSize.sm,
    color: colors.border,
  },
  examDate: {
    fontSize: Typography.fontSize.sm,
    color: colors.textSecondary,
  },
  examScore: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
  examStatus: {
    marginLeft: Spacing.xs,
  },
});