// src/components/Button.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
  View,
  Platform,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Shadow, Spacing, Typography } from '../../styles/designTokens';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'info';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode; // Para adicionar ícones
}

const Button = ({
  onPress,
  title,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}: ButtonProps) => {
  const { colors } = useTheme();
  const shadows = Shadow(colors);

  const buttonStyles = StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.md,
      ...shadows.button, // Sombra para botões
    },
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
    },
    success: {
      backgroundColor: colors.success,
    },
    danger: {
      backgroundColor: colors.error,
    },
    info: {
      backgroundColor: colors.info,
    },
    disabled: {
      opacity: 0.6,
      backgroundColor: colors.textSecondary, // Cor mais neutra para desabilitado
      ...Platform.select({
        ios: { shadowOpacity: 0 }, // Remover sombra quando desabilitado
        android: { elevation: 0 },
      }),
    },
    textBase: {
      fontSize: Typography.fontSize.md,
      fontWeight: Typography.fontWeight.semibold,
      textAlign: 'center',
    },
    textPrimary: {
      color: colors.card, // Texto branco/claro para botões coloridos
    },
    textSecondary: {
      color: colors.textSecondary, // Texto escuro/neutro para botões secundários
    },
    textSuccess: {
      color: colors.card,
    },
    textDanger: {
      color: colors.card,
    },
    textInfo: {
      color: colors.card,
    },
    iconContainer: {
      marginRight: Spacing.xs,
    },
  });

  const getButtonVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return buttonStyles.primary;
      case 'secondary':
        return buttonStyles.secondary;
      case 'success':
        return buttonStyles.success;
      case 'danger':
        return buttonStyles.danger;
      case 'info':
        return buttonStyles.info;
      default:
        return buttonStyles.primary;
    }
  };

  const getButtonTextVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return buttonStyles.textPrimary;
      case 'secondary':
        return buttonStyles.textSecondary;
      case 'success':
        return buttonStyles.textSuccess;
      case 'danger':
        return buttonStyles.textDanger;
      case 'info':
        return buttonStyles.textInfo;
      default:
        return buttonStyles.textPrimary;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        buttonStyles.base,
        getButtonVariantStyle(),
        disabled || loading ? buttonStyles.disabled : {},
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getButtonTextVariantStyle().color} />
      ) : (
        <>
          {icon && <View style={buttonStyles.iconContainer}>{icon}</View>}
          <Text style={[buttonStyles.textBase, getButtonTextVariantStyle(), textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
