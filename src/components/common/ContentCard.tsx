// src/components/common/ContentCard.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

type CardVariant = 'default' | 'elevated' | 'outlined';

interface ContentCardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  children, 
  variant = 'default', 
  style 
}) => {
  const { colors } = useTheme();

  const getVariantStyle = () => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: colors.surface,
          elevation: 3,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        };
      case 'outlined':
        return {
          backgroundColor: colors.background,
          borderWidth: 1,
          borderColor: colors.border,
        };
      default:
        return {
          backgroundColor: colors.surface,
        };
    }
  };

  return (
    <View style={[styles.container, getVariantStyle(), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
});

export default ContentCard;
