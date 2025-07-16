// components/ResponsiveContainer.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { isTablet, scaleHeight, scaleWidth } from '../../utils/responsiveUtils';

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
  const basePadding = isTablet() ? 24 : 16;
  const scaledPadding = basePadding * paddingMultiplier;

  return (
    <View style={[
      styles.container,
      { 
        paddingHorizontal: scaleWidth(scaledPadding),
        paddingVertical: scaleHeight(scaledPadding * 0.8) 
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