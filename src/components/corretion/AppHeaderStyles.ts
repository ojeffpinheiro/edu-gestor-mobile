import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { createHeaderBaseStyles } from "../../styles/componentStyles";
import { createButtonStyles, createTextStyles } from "../../styles/globalStyles";
import { Shadow, Spacing, Typography } from "../../styles/designTokens";

export const createHeaderStyles = (colors: ColorScheme) => {
  const header = createHeaderBaseStyles(colors);
  const buttons = createButtonStyles(colors);
  const text = createTextStyles(colors);

  return StyleSheet.create({
    // Container principal
    header: {
      ...header.headerContainer,
      backgroundColor: colors.background.secondary,
      borderBottomColor: colors.border.light,
    },
    // Variação para navegação
    navHeader: {
      ...header.headerContainer,
      backgroundColor: colors.primary.main,
      borderBottomColor: colors.primary.dark,
      ...Shadow(colors).md,
    },
    // Título padrão
    headerTitle: {
      ...header.headerTitle,
      ...text.heading2,
      color: colors.text.primary,
    },
    // Título para navegação
    navTitle: {
      ...header.headerTitle,
      ...text.heading2,
      color: colors.text.onPrimary,
    },
    // Área de ações
    headerRight: {
      ...header.headerActions,
    },
    // Botão padrão
    headerButton: {
      ...header.headerButton,
    },
    // Botão ativo
    activeHeaderButton: {
      ...header.headerButton,
      backgroundColor: colors.primary.dark,
    },
    // Botão de ícone
    iconButton: {
      ...buttons.round,
      backgroundColor: 'transparent',
    },
    // Variação compacta
    compactHeader: {
      ...header.headerContainer,
      paddingVertical: Spacing.sm,
    },
    // Título compacto
    compactTitle: {
      ...header.headerTitle,
      fontSize: Typography.fontSize.lg,
    }
  });
};