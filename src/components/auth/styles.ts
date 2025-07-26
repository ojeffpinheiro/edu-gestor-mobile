// styles.ts
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { ColorScheme } from '../../styles/colors';
import { Spacing, BorderRadius, Shadow } from '../../styles/designTokens';
import { 
  createContainerStyles,
  createCardStyles,
  createButtonStyles,
  createTextStyles,
  createListStyles
} from '../../styles/globalStyles';
import { createHeaderBaseStyles } from '../../styles/componentStyles';

// Definir tipos para nossos estilos
type BaseStyles = {
  iconContainer: ViewStyle;
  demoBox: ViewStyle;
  demoHeader: ViewStyle;
  demoBadge: ViewStyle;
  demoBadgeText: TextStyle;
  demoText: TextStyle;
  [key: string]: ViewStyle | TextStyle | ImageStyle;
};

// Função para criar estilos base com tipagem adequada
export const createBaseStyles = (colors: ColorScheme): BaseStyles => {
  const containerStyles = createContainerStyles(colors);
  const cardStyles = createCardStyles(colors);
  const buttonStyles = createButtonStyles(colors);
  const textStyles = createTextStyles(colors);
  const listStyles = createListStyles(colors);
  const headerStyles = createHeaderBaseStyles(colors);
  const shadowStyles = Shadow(colors);

  return {
    ...containerStyles,
    ...cardStyles,
    ...buttonStyles,
    ...textStyles,
    ...listStyles,
    ...headerStyles,
    ...shadowStyles,
    iconContainer: {
      backgroundColor: `${colors.primary.main}20`,
      borderRadius: BorderRadius.round,
      width: Spacing.xxxl + Spacing.xs,
      height: Spacing.xxxl + Spacing.xs,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      marginBottom: Spacing.lg,
    },
    demoBox: {
      backgroundColor: `${colors.feedback.warning}20`,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      borderWidth: 1,
      borderColor: colors.feedback.warning,
      marginTop: Spacing.xs,
    },
    demoHeader: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
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
      fontSize: 12,
      fontWeight: 'bold' as const,
      letterSpacing: 0.5,
    },
    demoText: {
      color: colors.feedback.warning,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '500' as const,
    }
  };
};

// HomeScreen Styles
export const createHomeScreenStyles = (colors: ColorScheme) => {
  const baseStyles = createBaseStyles(colors);
  
  return StyleSheet.create({
    centeredContainer: {
      ...baseStyles.centeredContainer,
      padding: Spacing.lg,
    },
    card: {
      ...baseStyles.base,
      padding: Spacing.xxl,
    },
    header: {
      alignItems: 'center' as const,
      marginBottom: Spacing.md,
    },
    title: {
      ...baseStyles.heading1,
      textAlign: 'center' as const,
      marginBottom: Spacing.sm,
    },
    subtitle: {
      ...baseStyles.body,
      textAlign: 'center' as const,
      marginBottom: Spacing.xxl,
    },
    infoBox: {
      backgroundColor: `${colors.primary.main}10`,
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

// ScannerScreen Styles
export const createScannerScreenStyles = (colors: ColorScheme) => {
  const baseStyles = createBaseStyles(colors);
  
  return StyleSheet.create({
    screenContainer: {
      ...baseStyles.screenContainer,
      padding: 0,
    },
    scrollContainer: {
      flex: 1,
    },
    scannerContainer: {
      height: 300,
      borderRadius: BorderRadius.lg,
      overflow: 'hidden' as const,
      marginBottom: Spacing.xl,
    },
    cameraContainer: {
      flex: 1,
      position: 'relative' as const,
    },
    camera: {
      flex: 1,
    },
    scannerPlaceholder: {
      flex: 1,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      backgroundColor: colors.background.tertiary,
    },
    scannerIconContainer: {
      backgroundColor: `${colors.primary.main}20`,
      padding: Spacing.lg,
      borderRadius: BorderRadius.round,
    },
    scannerReadyText: {
      ...baseStyles.body,
      color: colors.text.primary,
      marginTop: Spacing.md,
      fontWeight: '600' as const,
    },
    scannerHintText: {
      ...baseStyles.body,
      color: colors.text.secondary,
      marginTop: Spacing.xs,
    },
  });
};

// StudentsScreen Styles
export const createStudentsScreenStyles = (colors: ColorScheme) => {
  const baseStyles = createBaseStyles(colors);
  
  return StyleSheet.create({
    screenContainer: {
      ...baseStyles.screenContainer,
    },
    infoBox: {
      backgroundColor: `${colors.primary.main}10`,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      marginBottom: Spacing.lg,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary.main,
    },
    infoText: {
      ...baseStyles.body,
      fontSize: 14,
      color: colors.text.primary,
    },
    boldText: {
      fontWeight: 'bold' as const,
    },
    sectionTitle: {
      ...baseStyles.label,
      color: colors.text.secondary,
      marginBottom: Spacing.sm,
      textTransform: 'uppercase' as const,
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

// SelectableListItem Styles
export const createSelectableListItemStyles = (colors: ColorScheme) => {
  const baseStyles = createBaseStyles(colors);
  
  return StyleSheet.create({
    listItem: {
      ...baseStyles.item,
      borderRadius: BorderRadius.lg,
      backgroundColor: colors.component.card,
      ...baseStyles.xs, // Usando a shadow do designTokens
    },
    selectedListItem: {
      ...baseStyles.selected,
    },
    listItemContent: {
      flex: 1,
    },
    listItemPrimaryText: {
      ...baseStyles.body,
      fontWeight: '600' as const,
      marginBottom: Spacing.xxs,
    },
    listItemSecondaryText: {
      ...baseStyles.caption,
      lineHeight: 20,
    },
  });
};

// AuthForm Styles
export const createAuthFormStyles = (colors: ColorScheme) => {
  const baseStyles = createBaseStyles(colors);
  
  return StyleSheet.create({
    container: {
      ...baseStyles.screenContainer,
      padding: Spacing.xxl,
      justifyContent: 'center' as const,
    },
    card: {
      ...baseStyles.base,
      padding: Spacing.xxl,
      margin: Spacing.lg,
      ...baseStyles.md, // Usando a shadow do designTokens
    },
  });
};

export const createScanResultCardStyles = (colors: ColorScheme) => {
  const baseStyles = createBaseStyles(colors);
  
  return StyleSheet.create({
    scanResultCard: {
      ...baseStyles.base,
      padding: Spacing.lg,
      marginVertical: Spacing.md,
    },
    content: {
      alignItems: 'center' as const,
      marginTop: Spacing.md,
    },
    codeText: {
      ...baseStyles.heading2,
      marginBottom: Spacing.lg,
      letterSpacing: 1,
    },
    button: {
      marginTop: Spacing.md,
      width: '100%',
    },
  });
};

export const createScannerOverlayStyles = (colors: ColorScheme, scannerSize: number) => {
  const baseStyles = createBaseStyles(colors);
  
  return StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    frameContainer: {
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    frame: {
      width: scannerSize,
      height: scannerSize,
      borderWidth: 2,
      borderColor: colors.primary.main,
      backgroundColor: 'transparent',
      position: 'relative' as const,
    },
    corner: {
      position: 'absolute' as const,
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
      position: 'absolute' as const,
      width: '80%',
      height: 2,
      backgroundColor: colors.primary.main,
      alignSelf: 'center' as const,
      left: '10%',
      top: '50%',
      marginTop: -1,
      borderRadius: 1,
    },
    instructionsContainer: {
      alignItems: 'center' as const,
      marginTop: Spacing.xl,
    },
    instructionText: {
      ...baseStyles.body,
      color: colors.text.onPrimary,
      textAlign: 'center' as const,
      fontWeight: '500' as const,
      marginBottom: Spacing.sm,
    },
    statusContainer: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: BorderRadius.md,
    },
    statusText: {
      ...baseStyles.caption,
      color: colors.text.onPrimary,
      textAlign: 'center' as const,
    },
  });
};

export const createScannerControlsStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    scannerControlsContainer: {
      position: 'relative' as const,
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
      position: 'absolute' as const,
      top: Spacing.md,
      right: Spacing.md,
      backgroundColor: `${colors.feedback.error}CC`,
      zIndex: 10,
    },
    torchButton: {
      position: 'absolute' as const,
      bottom: Spacing.md,
      right: Spacing.md,
      backgroundColor: `${colors.background.secondary}CC`,
    },
    torchButtonActive: {
      backgroundColor: `${colors.feedback.warning}CC`,
    },
  });
};

export const createPermissionRequestCardStyles = (colors: ColorScheme) => {
  const baseStyles = createBaseStyles(colors);
  
  return StyleSheet.create({
    permissionCard: {
      ...baseStyles.base,
      padding: Spacing.xxl,
      alignItems: 'center' as const,
    },
    contentContainer: {
      width: '100%',
      alignItems: 'center' as const,
    },
    title: {
      ...baseStyles.heading2,
      marginTop: Spacing.lg,
      marginBottom: Spacing.sm,
      textAlign: 'center' as const,
    },
    message: {
      ...baseStyles.body,
      textAlign: 'center' as const,
      marginBottom: Spacing.xl,
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