import { StyleSheet } from "react-native";
import { BorderRadius, Spacing, Typography } from "../../styles/designTokens";
import { ColorScheme } from "../../styles/colors";

export const createExamDetailModalStyles = (colors: ColorScheme) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.shadow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  modalBody: {
    flex: 1,
  },
  studentInfo: {
    marginBottom: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: colors.gray[100],
    borderRadius: BorderRadius.md,
  },
  studentNameModal: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  studentIdModal: {
    fontSize: Typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: Spacing.xxs,
  },
  examSubjectModal: {
    fontSize: Typography.fontSize.md,
    color: colors.border,
    marginBottom: Spacing.xs,
  },
  scoreModal: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
  },
  correctionsContainer: {
    gap: Spacing.sm,
  },
  correctionsTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  correctionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    backgroundColor: colors.card,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  questionNumber: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: colors.info,
    minWidth: Spacing.lg,
  },
  studentAnswerText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: colors.textPrimary,
  },
  correctAnswerText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: colors.textSecondary,
  },
});