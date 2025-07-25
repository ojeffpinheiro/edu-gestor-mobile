import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { BorderRadius, Spacing } from '../styles/designTokens';

interface StatusIconProps {
  icon: React.ComponentType<{ size: number; color: string }>;
  variant: 'info' | 'success' | 'warning' | 'error';
  size: 'sm' | 'md' | 'lg';
}

const StatusIcon = ({ icon: Icon, variant, size }: StatusIconProps) => {
  const { colors } = useTheme();
  
  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48
  };

  const variantColors = {
    info: colors.feedback.info,
    success: colors.feedback.success,
    warning: colors.feedback.warning,
    error: colors.feedback.error,
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: variantColors[variant] + '20',
        width: sizeMap[size] + Spacing.lg,
        height: sizeMap[size] + Spacing.lg,
        borderRadius: BorderRadius.round,
      }
    ]}>
      <Icon 
        size={sizeMap[size]} 
        color={variantColors[variant]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StatusIcon;