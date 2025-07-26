import React from 'react';
import { View, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Spacing, Typography } from '../../styles/designTokens';

interface InfoBoxProps {
  title?: string;
  items: string[];
  variant?: 'primary' | 'success' | 'error' | 'info' | 'warning';
  style?: StyleProp<ViewStyle>;
}

const InfoBox = ({ title, items, variant = 'primary', style }: InfoBoxProps) => {
  const { colors } = useTheme();
  const color = colors.feedback[variant] || colors.primary.main;

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: color + '10',
      }, 
      style
    ]}>
      {title && (
        <Text style={[styles.title, { color }]}>{title}</Text>
      )}
      {items.map((item, i) => (
        <Text key={i} style={[styles.item, { color: colors.text.primary }]}>
          • {item}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  title: {
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.sm,
    fontSize: Typography.fontSize.md,
  },
  item: {
    fontSize: Typography.fontSize.sm,
    marginBottom: Spacing.xs,
    lineHeight: Typography.lineHeight.sm,
  },
});

export default InfoBox;