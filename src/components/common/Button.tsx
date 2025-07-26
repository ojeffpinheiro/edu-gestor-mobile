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
import { Spacing, BorderRadius, Typography, Shadow } from '../../styles/designTokens';
import { ColorScheme } from '../../styles/colors';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'outline' | 'ghost' | 'floating' | 'text';
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
  variant === 'text' ? styles.textVariant : styles[variant], // Ajuste aqui
  styles[size],
  disabled && styles.disabled,
  fullWidth && styles.fullWidth,
  rounded && styles.rounded,
  style,
];

  const textStyles: StyleProp<TextStyle> = [
  styles.textStyle,
  styles[`${variant}Text`],
  styles[`${size}Text`],
  textStyle,
];

  const iconColor = {
    primary: colors.text.onPrimary,
    secondary: colors.text.onPrimary,
    success: colors.text.onPrimary,
    error: colors.text.onPrimary,
    warning: colors.text.primary,
    info: colors.text.onPrimary,
    outline: colors.primary.main,
    ghost: colors.primary.main,
    text: colors.text.primary,
    floating: colors.text.onPrimary,
  }[variant];

  const renderIcon = () => {
    if (!icon || loading) return null;
    return React.cloneElement(icon, {
      color: icon.props.color || iconColor,
      size: icon.props.size || Typography.fontSize.md,
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
  return StyleSheet.create({
    // Base styles
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    
    textStyle: {
      fontWeight: Typography.fontWeight.semibold,
    },
    
    fullWidth: {
      width: '100%',
    },
    
    rounded: {
      borderRadius: BorderRadius.xxl,
    },
    
    disabled: {
      opacity: 0.6,
    },
    
    // Variants
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
      color: colors.text.onPrimary,
    },
    
    success: {
      backgroundColor: colors.feedback.success,
      borderColor: colors.feedback.success,
    },
    successText: {
      color: colors.text.onPrimary,
    },
    
    error: {
      backgroundColor: colors.feedback.error,
      borderColor: colors.feedback.error,
    },
    errorText: {
      color: colors.text.onPrimary,
    },
    
    warning: {
      backgroundColor: colors.feedback.warning,
      borderColor: colors.feedback.warning,
    },
    warningText: {
      color: colors.text.primary,
    },
    
    info: {
      backgroundColor: colors.feedback.info,
      borderColor: colors.feedback.info,
    },
    infoText: {
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
    
    floating: {
      backgroundColor: colors.gray[900] + 'CC',
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      ...Shadow(colors).md,
    },
    floatingText: {
      color: colors.text.onPrimary,
    },
    
    textVariant: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      padding: 0,
    },
    textVariantText: {
      color: colors.text.primary,
    },
    
    // Sizes
    sm: {
      paddingVertical: Spacing.xs,
      paddingHorizontal: Spacing.sm,
    },
    smText: {
      fontSize: Typography.fontSize.sm,
    },
    
    md: {
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
    },
    mdText: {
      fontSize: Typography.fontSize.md,
    },
    
    lg: {
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
    },
    lgText: {
      fontSize: Typography.fontSize.lg,
    },
    
    // Icon positioning
    iconLeft: {
      marginRight: Spacing.sm,
    },
    
    iconRight: {
      marginLeft: Spacing.sm,
    },
  });
};

export default Button;