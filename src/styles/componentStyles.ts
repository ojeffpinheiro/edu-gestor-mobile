import { StyleSheet } from 'react-native';
import { ColorScheme } from './colors';
import { Spacing, BorderRadius, Typography, Shadow } from './designTokens';

// Headers
export const createHeaderBaseStyles = (colors: ColorScheme) => StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border.light,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: colors.text.primary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  headerButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.round,
  },
  // Variants
  navHeader: {
    backgroundColor: colors.primary.main,
    borderBottomColor: colors.primary.dark,
    ...Shadow(colors).md,
  },
  compactHeader: {
    paddingVertical: Spacing.sm,
  },
});

// Section Headers
export const createSectionHeaderStyles = (colors: ColorScheme) => StyleSheet.create({
  sectionHeader: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: Spacing.lg,
  },
});

// Tabs
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
  },
});

// Modals
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
  },
  modalBody: {
    flex: 1,
  },
});

// Camera
export const createCameraBaseStyles = (colors: ColorScheme) => {
  const POINT_RADIUS = 10;
  
  return StyleSheet.create({
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

// List Items
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
  },
});

// Analysis
export const createAnalysisStyles = (colors: ColorScheme) => StyleSheet.create({
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
    backgroundColor: colors.feedback.success + '30',
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
    color: colors.text.onPrimary,
    fontSize: Typography.fontSize.xs,
  },
});

// Reference Points
export const createReferenceBaseStyles = (colors: ColorScheme) => StyleSheet.create({
  guideFrame: {
    width: '95%',
    height: '65%',
    borderWidth: 1,
    position: 'relative',
    borderColor: colors.border.medium,
  },
  guideCorner: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderColor: colors.feedback.success,
  },
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
  }
});

// Settings
export const createSettingsBaseStyles = (colors: ColorScheme) => StyleSheet.create({
  settingsSection: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.background.secondary,
    borderColor: colors.border.light,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  dangerItem: {
    borderColor: colors.feedback.error,
  },
});