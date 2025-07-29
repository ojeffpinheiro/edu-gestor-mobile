import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { BorderRadius, Shadow, Spacing } from "../../styles/designTokens";
import { createBaseStyles } from "../auth/styles";

export const createStudentsScreenStyles = (colors: ColorScheme) => {
  const baseStyles = createBaseStyles(colors);

  return StyleSheet.create({
    screenContainer: {
      ...baseStyles.screenContainer,
      padding: Spacing.md,
    },
    scrollContent: {
      flexGrow: 1,
      paddingTop: 60,
    },

    // Header Moderno
    headerContainer: {
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 32,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      marginRight: 16,
    },
    iconGradient: {
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary.main,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    headerText: {
      flex: 1,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 4,
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text.secondary,
      fontWeight: '400',
      opacity: 0.8,
    },
    // Card do Código Escaneado
    codeCard: {
      marginHorizontal: 24,
      marginBottom: 24,
      borderRadius: 20,
      overflow: 'hidden',
      ...Shadow(colors).md,
      elevation: 6,
    },
    codeCardGradient: {
      padding: 20,
      borderWidth: 1,
      borderColor: colors.primary.main + '30',
    },
    codeHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    codeLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary.main,
      marginLeft: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },// Preview do Aluno Selecionado
    selectedPreview: {
      marginHorizontal: 24,
      marginBottom: 32,
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: colors.feedback.success,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    previewGradient: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderWidth: 1,
      borderColor: colors.feedback.success + '30',
    },
    previewContent: {
      flex: 1,
      marginLeft: 12,
    },
    previewName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: 2,
    },
    previewClass: {
      fontSize: 14,
      color: colors.text.secondary,
      fontWeight: '500',
    },

    // Seção de Alunos
    studentsSection: {
      paddingHorizontal: 24,
      marginBottom: 32,
    },
    sectionTitle: {
      ...baseStyles.label,
      marginBottom: Spacing.sm,
      textTransform: 'uppercase' as const,
      letterSpacing: 1,
    },
    studentsList: {
      // Espaçamento já definido nos items
    },
    studentCard: {
      // Animação aplicada aqui
    },

    // Botões de Ação
    actionsContainer: {
      paddingHorizontal: 24,
      paddingBottom: 40,
      gap: 16,
    },
    primaryButton: {
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: colors.primary.main,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
    disabledButton: {
      shadowOpacity: 0.1,
      elevation: 2,
    },
    buttonTransparent: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      height: 56,
    },
    primaryButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    secondaryButton: {
      backgroundColor: colors.component.card,
      borderColor: colors.border.light,
      borderWidth: 1,
      borderRadius: 16,
      height: 56,
      ...Shadow(colors)
    },

    // Estado Vazio
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.text.primary,
      textAlign: 'center',
      marginTop: 24,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 16,
      color: colors.text.secondary,
      textAlign: 'center',
      opacity: 0.7,
      lineHeight: 24,
    },
    codeValue: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text.primary,
      fontFamily: 'monospace',
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
    noStudentsText: {
      fontSize: 16,
      color: colors.text.primary,
      textAlign: 'center',
      marginTop: 20
    },
    container: {
      flex: 1,
      padding: 16,
    },
    searchInput: {
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
      borderWidth: 1,
    },
    selectAllButton: {
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 12,
    },
    listContent: {
      paddingBottom: 80,
    },
    studentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
    },
    studentInfo: {
      marginLeft: 12,
    },
    studentName: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text.primary,
    },
    studentRegNumber: {
      fontSize: 14,
    },
    selectAllText: {
      fontSize: 16,
      fontWeight: '600',
    },
    confirmText: {
      fontSize: 16,
      fontWeight: '600',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginTop: 16,
    },
    searchIcon: {
      marginRight: 8,
    },
    clearSearchButton: {
      marginLeft: 8,
      padding: 4,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: '600',
      color: colors.text.primary,
      marginLeft: 16,
    },
    studentAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: `${colors.primary.main}15`,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    studentInitial: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.primary.main,
    },
    studentInfoContainer: {
      flex: 1,
    },
    studentDetails: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    selectionBadge: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.primary.main,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedBadge: {
      backgroundColor: colors.primary.main,
    },
    floatingActionBar: {
      position: 'absolute',
      bottom: 24,
      left: 24,
      right: 24,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...Shadow(colors).md,
      elevation: 8,
    },
    selectionCountText: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    confirmButton: {
      backgroundColor: colors.primary.main,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    confirmButtonText: {
      color: colors.text.onPrimary,
      fontSize: 16,
      fontWeight: '600',
      marginRight: 8,
    }, emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyIllustration: {
      marginBottom: 24,
    },
    emptyDescription: {
      fontSize: 16,
      color: colors.text.secondary,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 24,
    },
    emptyActionButton: {
      backgroundColor: colors.primary.main,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    emptyActionText: {
      color: colors.text.onPrimary,
      fontWeight: '600',
    },
    backButton: {
      padding: 8,
      marginRight: 8,
    },
    confirmIcon: {
      marginLeft: 8,
    },
    selectedCard: {
      backgroundColor: `${colors.primary.main}15`,
      borderWidth: 1,
      borderColor: colors.primary.main,
    },
  });
};

export const createSelectableListItemStyles = (colors: ColorScheme) => {
  const baseStyles = createBaseStyles(colors);

  return StyleSheet.create({
    listItem: {
      ...baseStyles.item,
      borderRadius: BorderRadius.lg,
      backgroundColor: colors.component.card,
      ...baseStyles.xs,
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