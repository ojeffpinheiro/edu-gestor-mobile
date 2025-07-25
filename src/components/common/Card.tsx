import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, BorderRadius } from '../../styles/designTokens';

export type CardVariant = 'base' | 'elevated' | 'success' | 'error' | 'info';

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

  // Mapeamento de padding
  const paddingMap = {
    sm: Spacing.sm,
    md: Spacing.md,
    lg: Spacing.lg,
    xl: Spacing.xl,
  };

  // Estilos dinâmicos baseados na variant
  const getVariantStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: colors.card,
      borderRadius: BorderRadius.md,
      padding: paddingMap[padding],
    };

    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          elevation: 3,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        };
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: colors.success + '10',
          borderLeftWidth: 4,
          borderLeftColor: colors.success,
        };
      case 'error':
        return {
          ...baseStyle,
          backgroundColor: colors.error + '10',
          borderLeftWidth: 4,
          borderLeftColor: colors.error,
        };
      case 'info':
        return {
          ...baseStyle,
          backgroundColor: colors.info + '10',
          borderLeftWidth: 4,
          borderLeftColor: colors.info,
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

// Estilos base compartilhados
const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: Spacing.sm,
  },
});

export default Card;