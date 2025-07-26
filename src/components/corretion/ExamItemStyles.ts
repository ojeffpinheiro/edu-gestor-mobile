import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { BorderRadius, Spacing, Typography } from "../../styles/designTokens";

export const createExamItemStyles = (colors: ColorScheme) => StyleSheet.create({
  examItem: {
    backgroundColor: colors.background.secondary,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border.light,
    marginBottom: Spacing.sm,
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  studentName: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  studentId: {
    fontSize: Typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: Typography.lineHeight.sm,
  },
  examDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  examSubject: {
    fontSize: Typography.fontSize.sm,
    color: colors.text.secondary,
  },
  examDate: {
    fontSize: Typography.fontSize.sm,
    color: colors.text.secondary,
  },
  examScore: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: 'auto',
  },
  examStatus: {
    marginLeft: Spacing.sm,
  },
});