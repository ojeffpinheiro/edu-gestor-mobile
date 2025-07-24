import { StyleSheet } from "react-native";
import { BorderRadius, Spacing, Typography } from "../../styles/designTokens";

export const createCameraStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.background,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
    backgroundColor: colors.black,
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
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xl,
  },
  retryButton: {
    backgroundColor: colors.error,
  },
  confirmButton: {
    backgroundColor: colors.success,
  },
  previewButtonText: {
    color: colors.white,
    marginLeft: Spacing.xs,
    fontWeight: Typography.fontWeight.bold,
  }
});