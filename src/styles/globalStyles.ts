import { StyleSheet } from "react-native";
import { ColorScheme } from "./colors";
import { BorderRadius, Shadow, Spacing, Typography } from "./designTokens";

export const createCardStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    base: {
      backgroundColor: colors.component.card,
      borderRadius: BorderRadius.xl,
      borderWidth: 1,
      borderColor: colors.border.medium,
      padding: Spacing.lg,
      margin: Spacing.md,
      ...Shadow(colors).sm,
    },
    elevated: {
      ...Shadow(colors).md,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    success: {
      backgroundColor: colors.feedback.success + '20',
      borderLeftWidth: 4,
      borderLeftColor: colors.feedback.success,
      padding: Spacing.md,
      borderRadius: BorderRadius.sm,
    },
    error: {
      backgroundColor: colors.feedback.error + '20',
      borderLeftWidth: 4,
      borderLeftColor: colors.feedback.error,
      padding: Spacing.md,
      borderRadius: BorderRadius.sm,
    },
    stats: {
      borderLeftWidth: 4,
      padding: Spacing.lg,
    },
    examItem: {
      padding: Spacing.lg,
      marginBottom: Spacing.sm,
    },
    correctionResult: {
      padding: Spacing.lg,
    }
  });
};

export const getListStyles = (colors: ColorScheme) => ({
  borderWidth: 1,
  borderRadius: BorderRadius.lg,
  padding: Spacing.md,
  marginBottom: Spacing.sm,
  borderColor: colors.border,
  backgroundColor: colors.component.card,
});

export const createButtonStyles = (colors: ColorScheme) => {
  const base = StyleSheet.create({
    primary: {
      backgroundColor: colors.primary.main,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: Spacing.sm,
      ...Shadow(colors).xs,
    },
    secondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border.medium,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    round: {
      borderRadius: BorderRadius.round,
      padding: Spacing.sm,
    }
  });
  return {
    ...base,
    text: {
      color: colors.text.onPrimary,
      fontSize: Typography.fontSize.md,
      fontWeight: Typography.fontWeight.semibold,
    },
    secondaryText: {
      color: colors.text.primary,
    },
    icon: {
      marginRight: Spacing.sm,
    },
    disabled: {
      opacity: 0.6,
    },
    danger: {
      ...base.primary,
      backgroundColor: colors.feedback.error,
    },
    success: {
      ...base.primary,
      backgroundColor: colors.feedback.success,
    },
    small: {
      ...base.primary,
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
    }
  };
};

export const createBaseStyles = (colors: ColorScheme) => {
  return StyleSheet.create({
    // Containers
    screenContainer: {
      flex: 1,
      padding: Spacing.md,
      backgroundColor: colors.background.primary,
    },
    centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: Spacing.md,
      backgroundColor: colors.background.primary,
    },
    fullScreenOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },

    // Text styles
    heading1: {
      fontSize: Typography.fontSize.xxl,
      fontWeight: Typography.fontWeight.bold,
      color: colors.text.primary,
      lineHeight: Typography.lineHeight.xxl,
      marginBottom: Spacing.sm,
    },
    heading2: {
      fontSize: Typography.fontSize.xl,
      fontWeight: Typography.fontWeight.semibold,
      color: colors.text.primary,
      lineHeight: Typography.lineHeight.xl,
      marginBottom: Spacing.xs,
    },
    bodyText: {
      fontSize: Typography.fontSize.md,
      color: colors.text.secondary,
      lineHeight: Typography.lineHeight.md,
    },
  });
};

export const createTextStyles = (colors: ColorScheme) => StyleSheet.create({
  heading1: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: Spacing.md,
  },
  heading2: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: Spacing.sm,
  },
  heading3: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: Spacing.xs,
  },
  body: {
    fontSize: Typography.fontSize.md,
    color: colors.text.secondary,
    lineHeight: Typography.lineHeight.md,
  },
  caption: {
    fontSize: Typography.fontSize.sm,
    color: colors.text.secondary,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: Spacing.xs,
  },
  // Variantes
  centered: {
    textAlign: 'center',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  success: {
    color: colors.feedback.success,
  },
  error: {
    color: colors.feedback.error,
  },
  bold: {
    fontWeight: Typography.fontWeight.bold,
  },
  semibold: {
    fontWeight: Typography.fontWeight.semibold,
  }

});

export const createListStyles = (colors: ColorScheme) => StyleSheet.create({
  item: {
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
  selected: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.main + '10',
  }
});

export const createNavigationBaseStyles = (colors: ColorScheme) => StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.background.secondary,
  },
  tabItem: {
    alignItems: 'center',
    padding: Spacing.sm,
  },
  tabLabel: {
    marginTop: Spacing.xs,
  }
});