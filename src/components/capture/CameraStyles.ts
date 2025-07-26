import { StyleSheet } from "react-native";
import { BorderRadius, Spacing, Typography, Shadow } from "../../styles/designTokens";
import { ColorScheme } from "../../styles/colors";
import chroma from 'chroma-js';
import { createAnalysisStyles, createCameraBaseStyles, createReferenceBaseStyles } from "../../styles/componentStyles";
import { createButtonStyles, createTextStyles } from "../../styles/globalStyles";

export const createCameraStyles = (colors: ColorScheme) => {
  const base = createCameraBaseStyles(colors);
  const text = createTextStyles(colors);

  return StyleSheet.create({
    // Herda o container base
    container: {
      ...base.container,
    },

    // Container para mensagem de permissão
    permissionContainer: {
      ...base.container,
      justifyContent: 'center',
      padding: Spacing.lg,
    },
    permissionText: {
      ...text.heading2,
      color: colors.text.onPrimary,
      textAlign: 'center',
    },

    // Visualização da câmera
    cameraContainer: {
      ...base.container,
    },
    camera: {
      flex: 1,
    },

    // Overlays
    overlay: {
      ...base.overlay,
    },
    dashedBorder: {
      ...base.frame,
      borderColor: colors.text.onPrimary + 'B3',
      borderStyle: 'dashed',
      width: '80%',
      height: '80%',
      borderRadius: BorderRadius.lg,
    },

    // Pontos de referência
    point: {
      ...base.referencePoint,
      transform: [{ translateX: -10 }, { translateY: -10 }],
    },

    // Linha de varredura
    scanLine: {
      ...base.scanLine,
      width: '80%',
    },

    // Barra de status
    statusBar: {
      position: 'absolute',
      top: Spacing.xl,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: Spacing.sm,
      backgroundColor: colors.background.primary + 'B3',
    },
    statusDot: {
      width: 12,
      height: 12,
      borderRadius: BorderRadius.round,
      marginHorizontal: Spacing.xs,
      borderWidth: 1,
      borderColor: colors.text.onPrimary,
    },

    // Controles da câmera
    controls: {
      position: 'absolute',
      bottom: Spacing.lg,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
    },
    galleryButton: {
      ...base.controlButton,
      backgroundColor: colors.primary.main,
    },
    autoButton: {
      ...base.controlButton,
      backgroundColor: colors.text.onPrimary + '33',
      borderWidth: 1,
      borderColor: colors.text.onPrimary,
    },
    autoButtonActive: {
      backgroundColor: colors.feedback.success + '80',
      borderColor: colors.feedback.success,
    },
    captureButton: {
      ...base.controlButton,
      backgroundColor: colors.feedback.error,
      width: 70,
      height: 70,
    },

    // Overlay de processamento
    processingOverlay: {
      ...base.overlay,
      backgroundColor: colors.background.primary + '80',
    },

    // Pré-visualização da imagem
    previewImage: {
      flex: 1,
      resizeMode: 'contain',
      backgroundColor: colors.background.primary,
    },
    previewControls: {
      position: 'absolute',
      bottom: Spacing.xl,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    previewButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.xxl,
      ...Shadow(colors).sm,
    },
    retryButton: {
      backgroundColor: colors.feedback.error,
    },
    confirmButton: {
      backgroundColor: colors.feedback.success,
    },
    previewButtonText: {
      color: colors.text.onPrimary,
      marginLeft: Spacing.xs,
      fontWeight: Typography.fontWeight.semibold,
    },

    // Elementos adicionais
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
    cornerTL: {
      top: -1,
      left: -1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderColor: colors.feedback.success,
    },
    cornerTR: {
      top: -1,
      right: -1,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
      borderColor: colors.feedback.success,
    },
    cornerBL: {
      bottom: -1,
      left: -1,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderColor: colors.feedback.success,
    },
    cornerBR: {
      bottom: -1,
      right: -1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderColor: colors.feedback.success,
    },
  });
};

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
  })
};

export const createMarkAnalysisStyles = (colors: ColorScheme) => {
  const analysis = createAnalysisStyles(colors);
  const text = createTextStyles(colors);

  return StyleSheet.create({
    container: {
      ...analysis.analysisContainer,
    },
    image: {
      ...analysis.analysisImage,
    },
    overlay: {
      ...analysis.analysisOverlay,
    },
    cell: {
      ...analysis.analysisCell,
    },
    markedCell: {
      ...analysis.analysisCell,
      backgroundColor: chroma(colors.feedback.success).alpha(0.3).css(),
      borderColor: colors.feedback.success,
    },
    tooltip: {
      ...analysis.analysisTooltip,
    },
    tooltipText: {
      ...analysis.analysisTooltipText,
      ...text.caption,
      color: colors.text.onPrimary,
    },
    // Estilos específicos que não são reutilizáveis
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

export const createReferencePointsStyles = (colors: ColorScheme) => {
  const reference = createReferenceBaseStyles(colors);
  const text = createTextStyles(colors);

  return StyleSheet.create({
    guideFrame: {
      ...reference.guideFrame,
    },
    corner: {
      ...reference.guideCorner,
    },
    cornerTL: {
      ...reference.guideCorner,
      top: -1,
      left: -1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    cornerTR: {
      ...reference.guideCorner,
      top: -1,
      right: -1,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
    },
    cornerBL: {
      ...reference.guideCorner,
      bottom: -1,
      left: -1,
      borderRightWidth: 0,
      borderTopWidth: 0,
    },
    cornerBR: {
      ...reference.guideCorner,
      bottom: -1,
      right: -1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    point: {
      ...reference.referencePoint,
    },
    pointText: {
      ...reference.pointText,
    },
    scanLine: {
      ...reference.scanLine,
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
      ...reference.pointText,
      fontSize: 10,
      marginTop: 2,
    }
});
};