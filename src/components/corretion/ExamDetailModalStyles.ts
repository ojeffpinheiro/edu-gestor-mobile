import { StyleSheet } from "react-native";
import { BorderRadius, Spacing, Typography } from "../../styles/designTokens";
import { ColorScheme } from "../../styles/colors";

export const createExamDetailModalStyles = (colors: ColorScheme) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.gray[900] + '80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background.secondary,
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
    color: colors.text.primary,
  },
  modalBody: {
    flex: 1,
  },
  studentInfo: {
    marginBottom: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: colors.background.tertiary,
    borderRadius: BorderRadius.md,
  },
  studentNameModal: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: colors.text.primary,
  },
  studentIdModal: {
    fontSize: Typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: Spacing.xxs,
  },
  examSubjectModal: {
    fontSize: Typography.fontSize.md,
    color: colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  scoreModal: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  correctionsContainer: {
    gap: Spacing.sm,
  },
  correctionsTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: Spacing.sm,
  },
  correctionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    backgroundColor: colors.background.secondary,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border.light,
  },
  questionNumber: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: colors.feedback.info,
    minWidth: Spacing.lg,
  },
  studentAnswerText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: colors.text.primary,
  },
  correctAnswerText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: colors.text.secondary,
  },
});