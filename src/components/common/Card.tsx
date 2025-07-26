import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, BorderRadius, Shadow } from '../../styles/designTokens';

export type CardVariant = 'base' | 'elevated' | 'outlined' | 'success' | 'error' | 'info';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: CardVariant;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'base',
  padding = 'md',
}) => {
  const { colors } = useTheme();

  const paddingMap = {
    sm: Spacing.sm,
    md: Spacing.md,
    lg: Spacing.lg,
    xl: Spacing.xl,
  };

  const getVariantStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: colors.component.card,
      borderRadius: BorderRadius.md,
      padding: paddingMap[padding],
    };

    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          ...Shadow(colors).md,
        };
      case 'outlined':
        return {
          ...baseStyle,
          borderWidth: 1,
          borderColor: colors.border.medium,
        };
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: colors.feedback.success + '10',
          borderLeftWidth: 4,
          borderLeftColor: colors.feedback.success,
        };
      case 'error':
        return {
          ...baseStyle,
          backgroundColor: colors.feedback.error + '10',
          borderLeftWidth: 4,
          borderLeftColor: colors.feedback.error,
        };
      case 'info':
        return {
          ...baseStyle,
          backgroundColor: colors.feedback.info + '10',
          borderLeftWidth: 4,
          borderLeftColor: colors.feedback.info,
        };
      default: // 'base'
        return baseStyle;
    }
  };

  return (
    <View style={[styles.cardContainer, getVariantStyle(), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: Spacing.sm,
  },
});

export default Card;