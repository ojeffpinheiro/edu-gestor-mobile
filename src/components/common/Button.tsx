import React from 'react';
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
import { ColorScheme } from '../../styles/colors';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline' | 'ghost' | 'floating' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface IconProps {
  color?: string;
  size?: number;
}

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactElement<IconProps>;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  rounded?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
  rounded = false,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const { colors } = useTheme();
  const styles = createButtonStyles(colors);

  const buttonStyles: StyleProp<ViewStyle> = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    fullWidth && styles.fullWidth,
    rounded && styles.rounded,
    style,
  ];

  const textStyles: StyleProp<TextStyle> = [
    styles.textStyle,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    textStyle,
  ];

  const iconColor = {
    primary: colors.textPrimary,
    secondary: colors.card,
    success: colors.card,
    danger: colors.card,
    warning: colors.warning,
    info: colors.card,
    outline: colors.primary,
    ghost: colors.primary,
    text: colors.textPrimary,
  }[variant];

  const renderIcon = () => {
    if (!icon || loading) return null;
    return React.cloneElement(icon, {
      color: icon.props.color || iconColor,
      size: icon.props.size || 18,
    });
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      {loading ? (
        <ActivityIndicator size="small" color={iconColor} />
      ) : (
        <>
          {iconPosition === 'left' && icon && (
            <View style={styles.iconLeft}>{renderIcon()}</View>
          )}

          {title && <Text style={textStyles}>{title}</Text>}

          {iconPosition === 'right' && icon && (
            <View style={styles.iconRight}>{renderIcon()}</View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const createButtonStyles = (colors: ColorScheme) => {
  const baseStyles = {
    // Base styles
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'transparent',
    } as ViewStyle,
    
    fullWidth: {
      width: '100%',
    } as ViewStyle,
    
    rounded: {
      borderRadius: 24,
    } as ViewStyle,
    
    textStyle: {
      fontWeight: '600',
    } as TextStyle,

    // Variants
    primary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    } as ViewStyle,
    
    text_primary: {
      color: colors.textPrimary,
    } as TextStyle,

    secondary: {
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
    } as ViewStyle,
    
    text_secondary: {
      color: colors.textPrimary,
    } as TextStyle,

    success: {
      backgroundColor: colors.success,
      borderColor: colors.success,
    } as ViewStyle,
    
    text_success: {
      color: colors.textPrimary,
    } as TextStyle,

    danger: {
      backgroundColor: colors.error,
      borderColor: colors.error,
    } as ViewStyle,
    
    text_danger: {
      color: colors.textPrimary,
    } as TextStyle,

    warning: {
      backgroundColor: colors.warning,
      borderColor: colors.warning,
    } as ViewStyle,
    
    text_warning: {
      color: colors.warning,
    } as TextStyle,

    info: {
      backgroundColor: colors.info,
      borderColor: colors.info,
    } as ViewStyle,
    
    text_info: {
      color: colors.textPrimary,
    } as TextStyle,

    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.primary,
    } as ViewStyle,
    
    text_outline: {
      color: colors.primary,
    } as TextStyle,

    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    } as ViewStyle,
    
    text_ghost: {
      color: colors.primary,
    } as TextStyle,

    floating: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    } as ViewStyle,
    
    text_floating: {
      color: colors.textPrimary,
    } as TextStyle,

    text: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      padding: 0,
    } as ViewStyle,
    
    text_text: {
      color: colors.textPrimary,
    } as TextStyle,

    // Sizes
    sm: {
      paddingVertical: 8,
      paddingHorizontal: 12,
    } as ViewStyle,
    
    text_sm: {
      fontSize: 12,
    } as TextStyle,

    md: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    } as ViewStyle,
    
    text_md: {
      fontSize: 14,
    } as TextStyle,

    lg: {
      paddingVertical: 16,
      paddingHorizontal: 24,
    } as ViewStyle,
    
    text_lg: {
      fontSize: 16,
    } as TextStyle,

    // States
    disabled: {
      opacity: 0.6,
    } as ViewStyle,

    // Icon positioning
    iconLeft: {
      marginRight: 8,
    } as ViewStyle,
    
    iconRight: {
      marginLeft: 8,
    } as ViewStyle,
  };

  return StyleSheet.create(baseStyles);
};

export default Button;