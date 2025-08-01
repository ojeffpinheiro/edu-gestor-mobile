import { StyleSheet } from 'react-native';
import { BorderRadius, Shadow, Spacing, Typography } from '../styles/designTokens';
import { createContainerStyles, createButtonStyles, createTextStyles, createCardStyles } from '../styles/globalStyles';
import { ColorScheme } from '../styles/colors';


export const createCaptureScreenStyles = (colors: ColorScheme) => {
  const containers = createContainerStyles(colors);
  const buttons = createButtonStyles(colors);
  const text = createTextStyles(colors);
  const cards = createCardStyles(colors);

  return StyleSheet.create({
    screenContainer: {
      ...containers.screenContainer,
    },
    title: {
      ...text.heading1,
      textAlign: 'center',
      marginBottom: Spacing.xl,
    },
    imagePlaceholder: {
      ...cards.base,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: Spacing.lg,
    },
    placeholderText: {
      color: colors.text.primary
    },
    buttonContainer: {
      ...containers.buttonContainer,
    },
    button: {
      ...buttons.primary,
      width: '100%',
      marginBottom: Spacing.md,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      minWidth: 160,
      alignItems: 'center',
    },
    cameraButton: {
      backgroundColor: colors.primary.main,
    },
    galleryButton: {
      backgroundColor: colors.secondary.main,
      color: colors.text.card
    },
    colorDetectorButton: {
      backgroundColor: colors.primary.light,
      marginTop: Spacing.md,
    },
    buttonText: {
      color: colors.text.onPrimary,
      fontWeight: Typography.fontWeight.bold,
      fontSize: Typography.fontSize.md,
    },
    imageContainer: {
      width: '100%',
      height: 300,
      marginVertical: Spacing.lg,
      borderRadius: BorderRadius.md,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    processingContainer: {
      marginTop: Spacing.xl,
      alignItems: 'center',
    },
    processingText: {
      marginTop: Spacing.md,
      fontSize: Typography.fontSize.md,
      color: colors.text.secondary,
    },
    navigationButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: Spacing.xl,
    },
    navButton: {
      padding: Spacing.lg,
      borderRadius: BorderRadius.md,
      width: '45%',
      alignItems: 'center',
      ...Shadow(colors).xs,
    },
    backButtonNav: {
      backgroundColor: colors.feedback.error,
    },
    nextButton: {
      backgroundColor: colors.feedback.warning,
    },
    navButtonText: {
      color: colors.text.onPrimary,
      fontWeight: Typography.fontWeight.bold,
      fontSize: Typography.fontSize.md,
    },
    backButton: {
      position: 'absolute',
      top: Spacing.xxl,
      left: Spacing.lg,
      padding: Spacing.md,
      backgroundColor: colors.feedback.error + 'CC',
      borderRadius: BorderRadius.sm,
      zIndex: 10,
    },
  });
};