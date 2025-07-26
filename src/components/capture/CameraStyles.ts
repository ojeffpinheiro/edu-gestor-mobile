import { StyleSheet } from "react-native";
import { BorderRadius, Spacing, Typography, Shadow } from "../../styles/designTokens";
import { ColorScheme } from "../../styles/colors";

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
    fontWeight: Typography.fontWeight.bold,
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