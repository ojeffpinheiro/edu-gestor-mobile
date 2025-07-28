import { StyleSheet } from "react-native";
import chroma from 'chroma-js';
import { ColorScheme } from "../../styles/colors";
import { BorderRadius, Shadow, Spacing, Typography } from "../../styles/designTokens";
import { createButtonStyles, createTextStyles } from "../../styles/globalStyles";

// Estilos base que podem ser reutilizados em outros componentes de câmera
export const createCameraBaseStyles = (colors: ColorScheme) => {
  const POINT_RADIUS = 10;
  
  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: colors.background.primary,
    },
    processingOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.overlay.main,
    },
    permissionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.primary,
      padding: Spacing.xl,
    },
    permissionText: {
      ...createTextStyles(colors).heading2,
      textAlign: 'center',
    },
    cameraContainer: {
      flex: 1,
      position: 'relative'
    },
    camera: {
      flex: 1
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center'
    },
    frame: {
      position: 'absolute',
      borderWidth: 2,
      borderColor: colors.primary.main,
      backgroundColor: 'transparent',
    },
    dashedBorder: {
      borderStyle: 'dashed',
      width: '80%',
      height: '80%',
      borderRadius: BorderRadius.lg,
    },
    referencePoint: {
      position: 'absolute',
      width: POINT_RADIUS * 2,
      height: POINT_RADIUS * 2,
      borderRadius: POINT_RADIUS,
      transform: [{ translateX: -POINT_RADIUS }, { translateY: -POINT_RADIUS }]
    },
    scanLine: {
      position: 'absolute',
      width: '80%',
      height: 2,
      backgroundColor: colors.feedback.success + 'B3',
    },
    controlButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: 60,
      borderRadius: BorderRadius.round,
      marginHorizontal: Spacing.sm,
      ...Shadow(colors).xs,
    },
  });
};

// Estilos específicos para controles de captura
export const createCaptureControlsStyles = (colors: ColorScheme) => {
  const buttons = createButtonStyles(colors);
  const text = createTextStyles(colors);

  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: Spacing.xl,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
    },
    button: {
      ...buttons.round,
      width: 50,
      height: 50,
      padding: 0,
    },
    galleryButton: {
      ...buttons.primary,
    },
    captureButton: {
      ...buttons.danger,
      width: 70,
      height: 70,
      borderWidth: 2,
    },
    disabledButton: {
      ...buttons.primary,
      opacity: 0.6,
      backgroundColor: colors.gray[400],
    },
    autoCaptureText: {
      ...text.caption,
      marginTop: Spacing.xxs,
    },
    indicator: {
      position: 'absolute',
      top: 4,
      right: 4,
      width: 8,
      height: 8,
      borderRadius: BorderRadius.round,
    },
    autoCaptureContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
  });
};

// Estilos para análise de marcação
export const createMarkAnalysisStyles = (colors: ColorScheme) => {
  const text = createTextStyles(colors);

  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    cell: {
      position: 'absolute',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    markedCell: {
      backgroundColor: chroma(colors.feedback.success).alpha(0.3).css(),
      borderColor: colors.feedback.success,
    },
    tooltip: {
      position: 'absolute',
      bottom: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: Spacing.xs,
      borderRadius: BorderRadius.sm,
    },
    tooltipText: {
      ...text.caption,
      color: colors.text.onPrimary,
    },
    pointContainer: {
      position: 'absolute',
      alignItems: 'center',
      transform: [{ translateX: -20 }, { translateY: -25 }],
    },
    percentageText: {
      ...text.caption,
      color: colors.text.onPrimary,
      marginTop: 2,
      fontWeight: Typography.fontWeight.bold,
      textShadowColor: 'rgba(0,0,0,0.8)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    pointsFeedback: {
      position: 'absolute',
      top: 20,
      alignSelf: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: Spacing.sm,
      borderRadius: BorderRadius.lg,
    },
    pointsText: {
      ...text.caption,
      color: colors.text.onPrimary,
      fontWeight: Typography.fontWeight.bold,
    }
  });
};

// Estilos para pontos de referência
export const createReferencePointsStyles = (colors: ColorScheme) => {
  const text = createTextStyles(colors);

  return StyleSheet.create({
    guideFrame: {
      width: '95%',
      height: '65%',
      borderWidth: 1,
      position: 'relative',
      borderColor: colors.border.medium,
    },
    corner: {
      position: 'absolute',
      width: 25,
      height: 25,
      borderColor: colors.feedback.success,
    },
    cornerTL: {
      top: -1,
      left: -1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    cornerTR: {
      top: -1,
      right: -1,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
    },
    cornerBL: {
      bottom: -1,
      left: -1,
      borderRightWidth: 0,
      borderTopWidth: 0,
    },
    cornerBR: {
      bottom: -1,
      right: -1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    point: {
      position: 'absolute',
      width: 30,
      height: 30,
      borderRadius: BorderRadius.round,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.border.medium,
      transform: [{ translateX: -15 }, { translateY: -15 }]
    },
    pointText: {
      color: colors.text.onPrimary,
      fontWeight: Typography.fontWeight.bold,
      fontSize: Typography.fontSize.xs,
      textShadowColor: 'rgba(0,0,0,0.8)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    scanLine: {
      position: 'absolute',
      width: '80%',
      height: 2,
      backgroundColor: colors.feedback.success + 'B3',
    },
    pointsFeedback: {
      position: 'absolute',
      top: Spacing.lg,
      alignSelf: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: Spacing.sm,
      borderRadius: BorderRadius.lg,
    },
    pointsText: {
      ...text.caption,
      color: colors.text.onPrimary,
      fontWeight: Typography.fontWeight.bold,
    },
    pointContainer: {
      position: 'absolute',
      alignItems: 'center',
      transform: [{ translateX: -20 }, { translateY: -25 }],
    },
    percentageText: {
      ...text.caption,
      fontSize: 10,
      marginTop: 2,
    }
  });
};