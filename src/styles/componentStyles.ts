import { StyleSheet } from 'react-native';
import { ColorScheme } from './colors';
import { Spacing, BorderRadius, Typography, Shadow } from './designTokens';

const POINT_RADIUS = 10;

export const getScannerStyles = (colors: ColorScheme) => StyleSheet.create({
  scannerContainer: {
    width: '100%',
    height: 250,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.background.tertiary,
    marginBottom: Spacing.lg,
  },
  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scannerCorner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: colors.primary.main,
    borderWidth: 3,
  },
});

export const getStudentItemStyles = (colors: ColorScheme) => StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    backgroundColor: colors.background.secondary,
    borderColor: colors.border.light,
  },
  selected: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.main + '10',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: Spacing.xxs,
  },
  metaText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});

export const cameraStyles = (colors: ColorScheme) => StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.background.primary,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    padding: Spacing.xl,
  },
  permissionText: {
    color: colors.text.primary,
    fontSize: Typography.fontSize.lg,
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
  dashedBorder: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderStyle: 'dashed',
    width: '80%',
    height: '80%',
    borderRadius: 10
  },
  point: {
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
    backgroundColor: 'rgba(0, 255, 0, 0.7)'
  },
  statusBar: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#FFF'
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  controlButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  galleryButton: {
    backgroundColor: '#4285F4'
  },
  autoButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#FFF'
  },
  autoButtonActive: {
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
    borderColor: '#0F0'
  },
  captureButton: {
    backgroundColor: '#EA4335',
    width: 70,
    height: 70,
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
    backgroundColor: '#000'
  },
  previewControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  retryButton: {
    backgroundColor: '#EA4335',
  },
  confirmButton: {
    backgroundColor: '#34A853',
  },
  previewButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  }
});

export const createListItemStyles = (colors: ColorScheme) => StyleSheet.create({
  base: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  selectable: {
    borderColor: colors.border.light,
    ...Shadow(colors).xs,
  },
  selected: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.main + '10',
  },
  correct: {
    borderLeftWidth: 4,
    borderLeftColor: colors.feedback.success,
    backgroundColor: colors.feedback.success + '20',
  },
  incorrect: {
    borderLeftWidth: 4,
    borderLeftColor: colors.feedback.error,
    backgroundColor: colors.feedback.error + '20',
  }
});

export const createCameraBaseStyles = (colors: ColorScheme) => StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.background.primary,
  },
  // Overlay base
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Frame base
  frame: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.primary.main,
    backgroundColor: 'transparent',
  },
  // Pontos de referência
  referencePoint: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: BorderRadius.round,
    borderWidth: 2,
    borderColor: colors.border.medium,
  },
  // Linha de varredura
  scanLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: colors.feedback.success + 'B3',
  },
  // Botões de controle
  controlButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: BorderRadius.round,
    marginHorizontal: Spacing.sm,
    ...Shadow(colors).xs,
  }
});

export const createAnalysisStyles = (colors: ColorScheme) => StyleSheet.create({
  // Container base para análise
  analysisContainer: {
    flex: 1,
    position: 'relative',
  },
  // Estilo base para imagens de análise
  analysisImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  // Overlay de análise
  analysisOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  // Célula/base de marcação
  analysisCell: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Tooltip base
  analysisTooltip: {
    position: 'absolute',
    bottom: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  // Texto do tooltip
  analysisTooltipText: {
    color: colors.text.onPrimary,
    fontSize: Typography.fontSize.xs,
  }
});

export const createReferenceBaseStyles = (colors: ColorScheme) => StyleSheet.create({
  // Frame base para guias
  guideFrame: {
    width: '95%',
    height: '65%',
    borderWidth: 1,
    position: 'relative',
    borderColor: colors.border.medium,
  },
  // Estilo base para cantos
  guideCorner: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderColor: colors.feedback.success,
  },
  // Ponto de referência base
  referencePoint: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.border.medium,
    transform: [{ translateX: -15 }, { translateY: -15 }]
  },
  // Texto do ponto
  pointText: {
    color: colors.text.onPrimary,
    fontWeight: Typography.fontWeight.bold,
    fontSize: Typography.fontSize.xs,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  // Linha de varredura base
  scanLine: {
    position: 'absolute',
    width: '80%',
    height: 2,
    backgroundColor: colors.feedback.success + 'B3',
  }
});

export const createHeaderBaseStyles = (colors: ColorScheme) => StyleSheet.create({
  // Estilo base para cabeçalho
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  // Estilo base para título
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  // Estilo base para área de ações
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  // Estilo base para botões
  headerButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.round,
  }
});

export const createTabBaseStyles = (colors: ColorScheme) => StyleSheet.create({
  tabContainer: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: colors.background.primary,
  },
  sectionHeader: {
    marginBottom: Spacing.lg,
  },
  gridContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  }
});

export const createModalBaseStyles = (colors: ColorScheme) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.background.overlay.main,
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
  }
});

export const createSettingsBaseStyles = (colors: ColorScheme) => StyleSheet.create({
  settingsSection: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  }
});