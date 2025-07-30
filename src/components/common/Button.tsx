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
import { Spacing, BorderRadius, Typography, Shadow } from '../../styles/designTokens';
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
  | 'text';         // Links estilizados como botões

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
  // ... outras variantes
  // Tamanhos
  xs: ViewStyle;
  // ... outros tamanhos
  // Text sizes
  xsText: TextStyle;
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
  const { pressAnimation, triggerHapticFeedback } = useAnimation({
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
    primary: {},
    primaryText: {},
    xs: {},
    xsText: {},
  };
  baseStyles.primary = {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  };

  baseStyles.primaryText = {
    color: colors.text.onPrimary,
  };

  baseStyles.xs = {
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.xs,
    minHeight: 32,
  };

  baseStyles.xsText = {
    fontSize: Typography.fontSize.xs,
  };

  return StyleSheet.create(baseStyles);
};

export default Button;