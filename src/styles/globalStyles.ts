import { StyleSheet } from 'react-native';
import { ColorScheme } from './colors';
import { Spacing, BorderRadius, Shadow, Typography } from './designTokens';

export const createCardStyles = (colors: ColorScheme) => StyleSheet.create({
  // Base card
  base: {
    backgroundColor: colors.component.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    margin: Spacing.md,
    ...Shadow(colors).sm,
    borderWidth: 1,
    borderColor: colors.border.medium,
  },
  elevated: {
    ...Shadow(colors).md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  // Variantes de feedback
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
  // Variante para estatísticas
  stats: {
    borderLeftWidth: 4,
    padding: Spacing.lg,
  },
  // Variante para exames
  examItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
});

export const createButtonStyles = (colors: ColorScheme) => {
  const base = StyleSheet.create({
    // Base button styles
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
    },
    // Sizes
    sm: {
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
    },
    md: {
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
    },
    lg: {
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.xl,
    },
  });

  return {
    ...base,
    // Text styles
    text: {
      color: colors.text.onPrimary,
      fontSize: Typography.fontSize.md,
      fontWeight: Typography.fontWeight.semibold,
    },
    secondaryText: {
      color: colors.text.primary,
    },
    // Variants
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

export const createContainerStyles = (colors: ColorScheme) => StyleSheet.create({
  // Containers base
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
  scrollContainer: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    gap: Spacing.md,
  },
});

export const createTextStyles = (colors: ColorScheme) => StyleSheet.create({
  // Headings
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
  // Body text
  body: {
    fontSize: Typography.fontSize.md,
    color: colors.text.secondary,
    lineHeight: Typography.lineHeight.md,
  },
  // Captions and labels
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
  // Modifiers
  centered: {
    textAlign: 'center',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  bold: {
    fontWeight: Typography.fontWeight.bold,
  },
  semibold: {
    fontWeight: Typography.fontWeight.semibold,
  },
  // Feedback variants
  success: {
    color: colors.feedback.success,
  },
  error: {
    color: colors.feedback.error,
  },
});

export const createListStyles = (colors: ColorScheme) => StyleSheet.create({
  // Base list item
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
  // States
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

export const createNavigationBaseStyles = (colors: ColorScheme) => StyleSheet.create({
  // Tab bar
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.background.secondary,
    borderTopColor: colors.border.light,
  },
  // Tab item
  tabItem: {
    alignItems: 'center',
    padding: Spacing.sm,
  },
  tabLabel: {
    marginTop: Spacing.xs,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  // States
  activeTabLabel: {
    color: colors.primary.main,
  },
  inactiveTabLabel: {
    color: colors.text.secondary,
    opacity: 0.6,
  },
});

export const createInputStyles = (colors: ColorScheme) => StyleSheet.create({
  // Input container
  container: {
    position: 'relative',
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: Spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: BorderRadius.md,
    backgroundColor: colors.background.secondary,
    paddingHorizontal: Spacing.md,
  },
  input: {
    flex: 1,
    fontSize: Typography.fontSize.md,
    color: colors.text.primary,
    paddingVertical: Spacing.md,
    fontWeight: Typography.fontWeight.medium,
  },
  focused: {
    borderColor: colors.primary.main,
    ...Shadow(colors).xs,
  },
});