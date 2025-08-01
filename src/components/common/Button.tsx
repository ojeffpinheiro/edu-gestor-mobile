import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  StyleProp
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, BorderRadius, Typography } from '../../styles/designTokens';
import { ColorScheme } from '../../styles/colors';
import { useAnimation } from '../../hooks/useAnimation';

type ButtonVariant =
  | 'primary'       // Ação principal
  | 'secondary'     // Ação secundária
  | 'tertiary'      // Ação terciária
  | 'danger'        // Ações destrutivas
  | 'success'       // Ações positivas
  | 'outline'       // Botões com borda
  | 'ghost'         // Botões sem fundo
  | 'text'       // Links estilizados como botões
  | 'floating';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // Escala consistente

type ButtonStyles = {
  base: ViewStyle;
  textBase: TextStyle;
  fullWidth: ViewStyle;
  rounded: ViewStyle;
  roundedFull: ViewStyle;
  disabled: ViewStyle;
  iconContainer: ViewStyle;
  iconLeft: ViewStyle;
  iconRight: ViewStyle;
  // Variantes
  primary: ViewStyle;
  primaryText: TextStyle;
  secondary: ViewStyle;
  secondaryText: TextStyle;
  tertiary: ViewStyle;
  tertiaryText: TextStyle;
  danger: ViewStyle;
  dangerText: TextStyle;
  success: ViewStyle;
  successText: TextStyle;
  outline: ViewStyle;
  outlineText: TextStyle;
  ghost: ViewStyle;
  ghostText: TextStyle;
  text: ViewStyle;
  textText: TextStyle;
  floating: ViewStyle;
  floatingText: TextStyle;
  // ... outras variantes
  // Tamanhos
  sm: ViewStyle;
  md: ViewStyle;
  lg: ViewStyle;
  xl: ViewStyle;
  xs: ViewStyle;
  // ... outros tamanhos
  // Text sizes
  xsText: TextStyle;
  smText: TextStyle;
  mdText: TextStyle;
  lgText: TextStyle;
  xlText: TextStyle;
  // ... outros tamanhos de texto
};

interface IconProps {
  color?: string;
  size?: number;
}

interface ButtonProps {
  // Hierarquia de props
  // 1. Comportamento
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;

  // 2. Conteúdo
  title?: string;
  icon?: React.ReactElement<IconProps>;
  iconPosition?: 'left' | 'right';
  accessibility?: {
    label: string;
    hint?: string;
  };

  // 3. Aparência
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  rounded?: boolean | 'full';

  // 4. Estilos customizados
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  rounded = false,
  accessibility,
  style,
  textStyle,
  iconStyle,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createButtonStyles(colors), [colors]);
  const { pressAnimation } = useAnimation({
    pressScale: 0.97,
    enableHapticFeedback: true
  });

  const handlePress = () => {
    pressAnimation({
      hapticType: 'light',
      onPress: onPress
    });
  };

  // Estilo base do botão
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    rounded && (rounded === 'full' ? styles.roundedFull : styles.rounded),
    disabled && styles.disabled,
    style,
  ];

  // Estilo do texto
  const textStyles = [
    styles.textBase,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle,
  ];

  // Cor do ícone baseada na variante
  const iconColor = {
    primary: colors.text.onPrimary,
    secondary: colors.text.onPrimary,
    danger: colors.text.onPrimary,
    success: colors.text.onPrimary,
    outline: colors.primary.main,
    ghost: colors.primary.main,
    text: colors.text.primary,
  }[variant];

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="small" color={iconColor} />;
    }

    return (
      <>
        {iconPosition === 'left' && icon && (
          <View style={[styles.iconContainer, styles.iconLeft, iconStyle]}>
            {React.cloneElement(icon, {
              color: icon.props.color || iconColor,
              size: icon.props.size || styles[`${size}Text`].fontSize,
            })}
          </View>
        )}

        {title && <Text style={textStyles}>{title}</Text>}

        {iconPosition === 'right' && icon && (
          <View style={[styles.iconContainer, styles.iconRight, iconStyle]}>
            {React.cloneElement(icon, {
              color: icon.props.color || iconColor,
              size: icon.props.size || styles[`${size}Text`].fontSize,
            })}
          </View>
        )}
      </>
    );
  };


  const renderIcon = () => {
    if (!icon || loading) return null;
    return React.cloneElement(icon, {
      color: icon.props.color || iconColor,
      size: icon.props.size || Typography.fontSize.md,
    });
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      accessibilityLabel={accessibility?.label}
      accessibilityHint={accessibility?.hint}
      accessibilityRole="button"
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const createButtonStyles = (colors: ColorScheme) => {
  const baseStyles: ButtonStyles = {
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    textBase: {
      fontWeight: Typography.fontWeight.semibold,
      color: colors.text.card,
    },
    fullWidth: {
      width: '100%',
    },
    rounded: {
      borderRadius: BorderRadius.lg,
    },
    roundedFull: {
      borderRadius: BorderRadius.xxl,
    },
    disabled: {
      opacity: 0.6,
    },
    iconContainer: {
      justifyContent: 'center',
    },
    iconLeft: {
      marginRight: Spacing.sm,
    },
    iconRight: {
      marginLeft: Spacing.sm,
    },

    // Variantes
    primary: {
      backgroundColor: colors.primary.main,
      borderColor: colors.primary.main,
    },
    primaryText: {
      color: colors.text.onPrimary,
    },
    secondary: {
      backgroundColor: colors.secondary.main,
      borderColor: colors.secondary.main,
    },
    secondaryText: {
      color: colors.text.secondary,
    },

    tertiary: {
      backgroundColor: colors.background.tertiary,
      borderColor: colors.background.tertiary,
    },
    tertiaryText: {
      color: colors.text.tertiary,
    },

    danger: {
      backgroundColor: colors.feedback.error,
      borderColor: colors.feedback.error,
    },
    dangerText: {
      color: colors.text.onPrimary,
    },

    success: {
      backgroundColor: colors.feedback.success,
      borderColor: colors.feedback.success,
    },
    successText: {
      color: colors.text.onPrimary,
    },

    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.primary.main,
    },
    outlineText: {
      color: colors.primary.main,
    },

    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    ghostText: {
      color: colors.primary.main,
    },

    text: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    textText: {
      color: colors.primary.main,
      textDecorationLine: 'underline',
    },

    floating: {
      backgroundColor: colors.background.secondary,
      borderColor: colors.border.medium,
      shadowColor: colors.border.light,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    floatingText: {
      color: colors.text.primary,
    },

    // Tamanhos
    xs: {
      paddingVertical: Spacing.xxs,
      paddingHorizontal: Spacing.xs,
      minHeight: 32,
    },
    sm: {
      paddingVertical: Spacing.xs,
      paddingHorizontal: Spacing.sm,
      minHeight: 36,
    },
    md: {
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      minHeight: 40,
    },
    lg: {
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      minHeight: 48,
    },
    xl: {
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.xl,
      minHeight: 56,
    },

    // Tamanhos de texto
    xsText: {
      fontSize: Typography.fontSize.xs,
    },
    smText: {
      fontSize: Typography.fontSize.sm,
    },
    mdText: {
      fontSize: Typography.fontSize.md,
    },
    lgText: {
      fontSize: Typography.fontSize.lg,
    },
    xlText: {
      fontSize: Typography.fontSize.xl,
    },
  };

  return StyleSheet.create(baseStyles);
};

export default Button;