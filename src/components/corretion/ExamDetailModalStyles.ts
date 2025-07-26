import { StyleSheet } from "react-native";
import { Spacing, Typography } from "../../styles/designTokens";
import { ColorScheme } from "../../styles/colors";
import { createModalBaseStyles } from "../../styles/componentStyles";
import { createCardStyles, createListStyles, createTextStyles } from "../../styles/globalStyles";

export const createExamDetailModalStyles = (colors: ColorScheme) => {
  const modal = createModalBaseStyles(colors);
  const text = createTextStyles(colors);
  const lists = createListStyles(colors);
  const cards = createCardStyles(colors);

  return StyleSheet.create({
    // Modal overlay and container
    modalOverlay: {
      ...modal.modalOverlay,
    },
    modalContent: {
      ...modal.modalContent,
    },
    modalHeader: {
      ...modal.modalHeader,
    },
    modalTitle: {
      ...text.heading2,
    },

    // Student info card
    studentInfo: {
      ...cards.base,
      marginBottom: Spacing.lg,
      padding: Spacing.md,
      backgroundColor: colors.background.tertiary,
    },
    studentNameModal: {
      ...text.heading3,
    },
    studentIdModal: {
      ...text.caption,
      marginBottom: Spacing.xxs,
    },
    examSubjectModal: {
      ...text.body,
      marginBottom: Spacing.xs,
    },
    scoreModal: {
      ...text.heading1,
      fontWeight: Typography.fontWeight.bold,
    },

    // Corrections section
    correctionsContainer: {
      gap: Spacing.sm,
    },
    correctionsTitle: {
      ...text.heading3,
      marginBottom: Spacing.sm,
    },

    // Correction item
    correctionItem: {
      ...lists.item,
      padding: Spacing.sm,
      gap: Spacing.sm,
      borderWidth: StyleSheet.hairlineWidth,
    },
    questionNumber: {
      ...text.caption,
      fontWeight: Typography.fontWeight.bold,
      color: colors.feedback.info,
      minWidth: Spacing.lg,
    },
    studentAnswerText: {
      ...text.body,
      flex: 1,
    },
    correctAnswerText: {
      ...text.caption,
      flex: 1,
    },

    // Status variants
    correctAnswer: {
      borderLeftColor: colors.feedback.success,
    },
    incorrectAnswer: {
      borderLeftColor: colors.feedback.error,
    },
    modalBody: {
      flex: 1,
    }
  });
};