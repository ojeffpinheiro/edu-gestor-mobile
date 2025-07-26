import { StyleSheet } from "react-native";
import { BorderRadius, Spacing, Typography, Shadow } from "../../styles/designTokens";
import { ColorScheme } from "../../styles/colors";
import chroma from 'chroma-js';

export const createCameraStyles = (colors: ColorScheme) => StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.background.primary,
  },

  // Container para mensagem de permissão
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    padding: Spacing.lg,
  },
  permissionText: {
    color: colors.text.onPrimary,
    fontSize: Typography.fontSize.lg,
    textAlign: 'center',
  },

  // Visualização da câmera
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },

  // Overlays e elementos de interface
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashedBorder: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.text.onPrimary + 'B3', // Usando notação hexadecimal para alpha (B3 = 70%)
    borderStyle: 'dashed',
    width: '80%',
    height: '80%',
    borderRadius: BorderRadius.lg,
  },

  // Pontos de referência
  point: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: BorderRadius.round,
    transform: [{ translateX: -10 }, { translateY: -10 }],
    borderWidth: 2,
    borderColor: colors.border.medium,
  },

  // Linha de varredura
  scanLine: {
    position: 'absolute',
    width: '80%',
    height: 2,
    backgroundColor: colors.feedback.success + 'B3', // Usando notação hexadecimal para alpha
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
    backgroundColor: colors.background.primary + 'B3', // Usando notação hexadecimal para alpha
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
  controlButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: BorderRadius.round,
    marginHorizontal: Spacing.sm,
    ...Shadow(colors).xs,
  },
  galleryButton: {
    backgroundColor: colors.primary.main,
  },
  autoButton: {
    backgroundColor: colors.text.onPrimary + '33', // 20% de opacidade
    borderWidth: 1,
    borderColor: colors.text.onPrimary,
  },
  autoButtonActive: {
    backgroundColor: colors.feedback.success + '80', // 50% de opacidade
    borderColor: colors.feedback.success,
  },
  captureButton: {
    backgroundColor: colors.feedback.error,
    width: 70,
    height: 70,
  },

  // Overlay de processamento
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background.primary + '80', // 50% de opacidade
    justifyContent: 'center',
    alignItems: 'center',
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

export const createCaptureControlsStyles = (colors: ColorScheme) => StyleSheet.create({
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
    width: 50,
    height: 50,
    padding: 0,
    ...Shadow(colors).xs,
  },
  galleryButton: {
    backgroundColor: colors.primary.main,
  },
  captureButton: {
    width: 70,
    height: 70,
    backgroundColor: colors.feedback.error,
    borderWidth: 2,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: colors.gray[400],
  },
  autoCaptureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  autoCaptureText: {
    fontSize: 12,
    marginTop: Spacing.xxs,
    color: colors.text.primary,
  },
  indicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: BorderRadius.round,
  },
});

export const createMarkAnalysisStyles= (colors: ColorScheme) => StyleSheet.create({
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
    padding: 5,
    borderRadius: 5,
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
  },
});

export const createReferencePointsStyles = (colors: ColorScheme) => StyleSheet.create({
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scanLine: {
    position: 'absolute',
    width: '80%',
    height: 2,
    backgroundColor: 'rgba(0, 255, 0, 0.7)',
  },
  pointsFeedback: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 20,
  },
  pointsText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pointContainer: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -20 }, { translateY: -25 }],
  },
  percentageText: {
    color: 'white',
    fontSize: 10,
    marginTop: 2,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});