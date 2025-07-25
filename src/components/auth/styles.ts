import { StyleSheet } from 'react-native';
import { ColorScheme } from '../../styles/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '../../styles/designTokens';

export const createStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    // Containers
    container: {
      flex: 1,
      padding: Spacing.md,
      backgroundColor: colors.background.primary,
      justifyContent: 'center',
    },

    // Cards
    card: {
      backgroundColor: colors.component.card,
      borderRadius: BorderRadius.xl,
      padding: Spacing.xxl,
      margin: Spacing.md,
      ...Shadow(colors).md,
      borderWidth: 1,
      borderColor: colors.border.light,
    },

    // Header
    header: {
      alignItems: 'center',
      marginBottom: Spacing.xxl,
    },

    iconContainer: {
      marginBottom: Spacing.lg,
    },

    iconGradient: {
      backgroundColor: colors.primary.main,
      borderRadius: BorderRadius.lg,
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      ...Shadow(colors).md,
    },

    // Typography
    title: {
      fontSize: Typography.fontSize.xxl,
      fontWeight: Typography.fontWeight.bold,
      color: colors.text.primary,
      marginBottom: Spacing.xs,
      textAlign: 'center',
      letterSpacing: -0.5,
    },

    subtitle: {
      fontSize: Typography.fontSize.md,
      color: colors.text.secondary,
      textAlign: 'center',
      lineHeight: Typography.lineHeight.md,
      fontWeight: Typography.fontWeight.regular,
    },

    // Inputs
    inputSection: {
      marginBottom: Spacing.xxl,
    },

    inputLabel: {
      fontSize: Typography.fontSize.sm,
      fontWeight: Typography.fontWeight.semibold,
      color: colors.text.primary,
      marginBottom: Spacing.xs,
      marginLeft: Spacing.xxs,
    },

    inputContainer: {
      position: 'relative',
    },

    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.border.light,
      borderRadius: BorderRadius.lg,
      backgroundColor: colors.background.secondary,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xxs,
    },

    inputIcon: {
      marginRight: Spacing.sm,
    },

    input: {
      flex: 1,
      fontSize: Typography.fontSize.md,
      color: colors.text.primary,
      paddingVertical: Spacing.md,
      paddingHorizontal: 0,
      fontWeight: Typography.fontWeight.medium,
    },

    inputFocused: {
      borderColor: colors.primary.main,
      backgroundColor: colors.background.secondary,
      ...Shadow(colors).xs,
    },

    inputActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
    },

    actionButton: {
      padding: Spacing.sm,
      borderRadius: BorderRadius.md,
      backgroundColor: 'transparent',
    },

    // Buttons
    buttonSection: {
      marginBottom: Spacing.lg,
    },

    primaryButton: {
      backgroundColor: colors.primary.main,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.lg,
      alignItems: 'center',
      marginBottom: Spacing.md,
      ...Shadow(colors).md,
    },

    disabledButton: {
      backgroundColor: colors.gray[400],
      opacity: 0.6,
      shadowOpacity: 0.1,
    },

    secondaryButton: {
      backgroundColor: 'transparent',
      borderColor: colors.border.light,
      borderWidth: 2,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.lg,
      alignItems: 'center',
    },

    buttonText: {
      color: colors.text.onPrimary,
      fontSize: Typography.fontSize.md,
      fontWeight: Typography.fontWeight.semibold,
      letterSpacing: 0.5,
    },

    secondaryButtonText: {
      color: colors.text.secondary,
      fontSize: Typography.fontSize.md,
      fontWeight: Typography.fontWeight.semibold,
      letterSpacing: 0.5,
    },

    // Feedback/Demo boxes
    demoBox: {
      backgroundColor: colors.feedback.warning + '20',
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      borderWidth: 1,
      borderColor: colors.feedback.warning,
      marginTop: Spacing.xs,
    },

    demoHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },

    demoBadge: {
      backgroundColor: colors.feedback.warning,
      paddingHorizontal: Spacing.xs,
      paddingVertical: Spacing.xxs,
      borderRadius: BorderRadius.md,
      marginRight: Spacing.xs,
    },

    demoBadgeText: {
      color: colors.text.onPrimary,
      fontSize: Typography.fontSize.xs,
      fontWeight: Typography.fontWeight.bold,
      letterSpacing: 0.5,
    },

    demoText: {
      color: colors.feedback.warning,
      fontSize: Typography.fontSize.sm,
      lineHeight: Typography.lineHeight.sm,
      fontWeight: Typography.fontWeight.medium,
    },

    demoPassword: {
      fontWeight: Typography.fontWeight.bold,
      backgroundColor: colors.feedback.warning,
      color: colors.text.onPrimary,
      paddingHorizontal: Spacing.xs,
      paddingVertical: 2,
      borderRadius: BorderRadius.sm,
      fontSize: 13,
      letterSpacing: 0.5,
    },

    // Student list
    studentsList: {
      maxHeight: 300,
      marginBottom: Spacing.lg,
    },

    studentItem: {
      borderWidth: 2,
      borderColor: colors.border.light,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      backgroundColor: colors.background.secondary,
    },

    selectedStudent: {
      borderColor: colors.primary.main,
      backgroundColor: colors.primary.main + '10',
    },

    studentName: {
      fontWeight: Typography.fontWeight.semibold,
      color: colors.text.primary,
      fontSize: Typography.fontSize.md,
    },

    studentClass: {
      color: colors.text.secondary,
      fontSize: Typography.fontSize.sm,
    },

    studentId: {
      color: colors.text.tertiary,
      fontSize: Typography.fontSize.sm,
    },

    // Info box
    infoBox: {
      backgroundColor: colors.primary.main + '10',
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing.lg,
      borderWidth: 1,
      borderColor: colors.primary.main,
    },

    infoTitle: {
      fontWeight: Typography.fontWeight.semibold,
      color: colors.primary.dark,
      marginBottom: Spacing.sm,
      fontSize: Typography.fontSize.md,
    },

    infoText: {
      color: colors.primary.dark,
      fontSize: Typography.fontSize.sm,
      lineHeight: Typography.lineHeight.sm,
    },

    eyeIcon: {
      position: 'absolute',
      right: Spacing.md,
      top: Spacing.md,
    },
  });
};