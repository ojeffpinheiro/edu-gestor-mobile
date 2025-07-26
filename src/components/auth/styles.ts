import { StyleSheet } from 'react-native';
import { ColorScheme } from '../../styles/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '../../styles/designTokens';

export const createHomeScreenStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    ...createStyles,
    centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: Spacing.lg,
      backgroundColor: colors.background.primary,
    },
    card: {
      padding: Spacing.xxl,
    },
    header: {
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    iconContainer: {
      backgroundColor: colors.primary.main + '20',
      borderRadius: BorderRadius.round,
      width: Spacing.xxxl + Spacing.xs,
      height: Spacing.xxxl + Spacing.xs,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    title: {
      fontSize: Typography.fontSize.xxl,
      fontWeight: Typography.fontWeight.bold,
      color: colors.text.primary,
      marginBottom: Spacing.sm,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: Typography.fontSize.md,
      color: colors.text.secondary,
      textAlign: 'center',
      marginBottom: Spacing.xxl,
      lineHeight: Typography.lineHeight.md,
    },
    infoBox: {
      backgroundColor: colors.primary.main + '10',
      borderRadius: BorderRadius.lg,
      padding: Spacing.sm,
      marginBottom: Spacing.xxl,
      borderWidth: 1,
      borderColor: colors.primary.main,
    },
    button: {
      marginTop: Spacing.md,
    },
  });
};

export const createScannerScreenStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    ...createStyles,
    screenContainer: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    scrollContainer: {
      flex: 1,
    },
    scannerContainer: {
      height: 300,
      borderRadius: BorderRadius.lg,
      overflow: 'hidden',
      marginBottom: Spacing.xl,
    },
    cameraContainer: {
      flex: 1,
      position: 'relative',
    },
    camera: {
      flex: 1,
    },
    scannerPlaceholder: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.tertiary,
    },
    scannerIconContainer: {
      backgroundColor: colors.primary.main + '20',
      padding: Spacing.lg,
      borderRadius: BorderRadius.round,
    },
    scannerReadyText: {
      color: colors.text.primary,
      marginTop: Spacing.md,
      fontWeight: Typography.fontWeight.semibold,
    },
    scannerHintText: {
      color: colors.text.secondary,
      marginTop: Spacing.xs,
    },
  });
};

export const createStudentsScreenStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    ...createStyles,
    screenContainer: {
      flex: 1,
      padding: Spacing.md,
      backgroundColor: colors.background.primary,
    },
    infoBox: {
      backgroundColor: colors.primary.main + '10',
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      marginBottom: Spacing.lg,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary.main,
    },
    infoText: {
      fontSize: Typography.fontSize.sm,
      color: colors.text.primary,
    },
    boldText: {
      fontWeight: Typography.fontWeight.bold,
    },
    sectionTitle: {
      fontSize: Typography.fontSize.sm,
      fontWeight: Typography.fontWeight.semibold,
      color: colors.text.secondary,
      marginBottom: Spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    listContainer: {
      marginBottom: Spacing.lg,
    },
    buttonsContainer: {
      marginTop: Spacing.md,
      gap: Spacing.sm,
    },
    continueButton: {
      marginBottom: Spacing.sm,
    },
  });
};

export const createSelectableListItemStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    ...createStyles,
    listItem: {
      borderWidth: 1,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.component.card,
      borderColor: colors.border.light,
      ...Shadow(colors).xs,
    },
    selectedListItem: {
      borderColor: colors.primary.main,
      backgroundColor: colors.primary.main + '10',
    },
    listItemContent: {
      flex: 1,
    },
    listItemPrimaryText: {
      fontSize: Typography.fontSize.md,
      fontWeight: Typography.fontWeight.semibold,
      color: colors.text.primary,
      marginBottom: Spacing.xxs,
    },
    listItemSecondaryText: {
      fontSize: Typography.fontSize.sm,
      color: colors.text.secondary,
      lineHeight: Typography.lineHeight.sm,
    },
  });
};

export const createPermissionRequestCardStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    ...createStyles,
    permissionCard: {
      padding: Spacing.xxl,
      alignItems: 'center',
    },
    contentContainer: {
      width: '100%',
      alignItems: 'center',
    },
    title: {
      fontSize: Typography.fontSize.xl,
      fontWeight: Typography.fontWeight.bold,
      color: colors.text.primary,
      marginTop: Spacing.lg,
      marginBottom: Spacing.sm,
      textAlign: 'center',
    },
    message: {
      fontSize: Typography.fontSize.md,
      color: colors.text.secondary,
      textAlign: 'center',
      marginBottom: Spacing.xl,
      lineHeight: Typography.lineHeight.md,
    },
    buttonsContainer: {
      width: '100%',
      gap: Spacing.sm,
    },
    mainButton: {
      marginBottom: Spacing.sm,
    },
  });
};

export const createScannerControlsStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    ...createStyles,
    scannerControlsContainer: {
      position: 'relative',
      marginTop: Spacing.lg,
    },
    buttonGroup: {
      gap: Spacing.sm,
    },
    mainButton: {
      marginBottom: Spacing.xs,
    },
    secondaryButton: {
      marginBottom: Spacing.xs,
    },
    backButton: {
      marginTop: Spacing.sm,
    },
    closeButton: {
      position: 'absolute',
      top: Spacing.md,
      right: Spacing.md,
      backgroundColor: colors.feedback.error + 'CC',
      zIndex: 10,
    },
    torchButton: {
      position: 'absolute',
      bottom: Spacing.md,
      right: Spacing.md,
      backgroundColor: colors.background.secondary + 'CC',
    },
    torchButtonActive: {
      backgroundColor: colors.feedback.warning + 'CC',
    },
  });
};

export const createScannerOverlayStyles = (colors: ColorScheme, scannerSize: number) => {
  return StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    frameContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    frame: {
      width: scannerSize,
      height: scannerSize,
      borderWidth: 2,
      borderColor: colors.primary.main,
      backgroundColor: 'transparent',
      position: 'relative',
    },
    corner: {
      position: 'absolute',
      width: 24,
      height: 24,
      borderWidth: 3,
      borderColor: colors.primary.main,
    },
    topLeft: {
      top: -3,
      left: -3,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    topRight: {
      top: -3,
      right: -3,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
    },
    bottomLeft: {
      bottom: -3,
      left: -3,
      borderRightWidth: 0,
      borderTopWidth: 0,
    },
    bottomRight: {
      bottom: -3,
      right: -3,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    scanLine: {
      position: 'absolute',
      width: '80%',
      height: 2,
      backgroundColor: colors.primary.main,
      alignSelf: 'center',
      left: '10%',
      top: '50%',
      marginTop: -1,
      borderRadius: 1,
    },
    instructionsContainer: {
      alignItems: 'center',
      marginTop: Spacing.xl,
    },
    instructionText: {
      fontSize: Typography.fontSize.md,
      color: colors.text.onPrimary,
      textAlign: 'center',
      fontWeight: Typography.fontWeight.medium,
      marginBottom: Spacing.sm,
    },
    statusContainer: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: BorderRadius.md,
    },
    statusText: {
      fontSize: Typography.fontSize.sm,
      color: colors.text.onPrimary,
      textAlign: 'center',
    },
  });
};

export const createScanResultCardStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    // ... outros estilos existentes ...

    scanResultCard: {
      padding: Spacing.lg,
      marginVertical: Spacing.md,
    },
    content: {
      alignItems: 'center',
      marginTop: Spacing.md,
    },
    codeText: {
      fontSize: Typography.fontSize.xl,
      fontWeight: Typography.fontWeight.bold,
      color: colors.text.primary,
      marginBottom: Spacing.lg,
      letterSpacing: 1,
    },
    button: {
      marginTop: Spacing.md,
      width: '100%',
    },

    // ... outros estilos existentes ...
  });
};

export const createAuthFormStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: Spacing.xxl,
      justifyContent: 'center',
      backgroundColor: colors.background.primary,
    },
    card: {
      backgroundColor: colors.component.card,
      borderRadius: BorderRadius.xl,
      padding: Spacing.xxl,
      margin: Spacing.lg,
      ...Shadow(colors).md,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
  });
};

export const createStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    // Containers
    container: {
      flex: 1,
      padding: Spacing.md,
      backgroundColor: colors.background.primary,
      justifyContent: 'center',
      width: '100%',
    },

    // Cards
    card: {
      backgroundColor: colors.component.card,
      borderRadius: BorderRadius.xl,
      padding: Spacing.xxl,
      margin: Spacing.lg,
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
      color: 'red',
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