import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { isTablet, scaleHeight, scaleWidth } from '../../utils/responsiveUtils';
import { useTheme } from '../../context/ThemeContext';
import { Spacing } from '../../styles/designTokens';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  paddingMultiplier?: number;
}

export const ResponsiveContainer = ({ 
  children, 
  style, 
  paddingMultiplier = 1 
}: ResponsiveContainerProps) => {
  const { colors } = useTheme();
  const basePadding = isTablet() ? Spacing.lg : Spacing.md;
  const scaledPadding = basePadding * paddingMultiplier;

  return (
    <View style={[
      styles.container,
      { 
        paddingHorizontal: scaleWidth(scaledPadding),
        paddingVertical: scaleHeight(scaledPadding * 0.8),
        backgroundColor: colors.background.primary,
      },
      style
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});