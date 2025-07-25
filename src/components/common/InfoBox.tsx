import React from 'react';
import { View, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Spacing } from '../../styles/designTokens';

interface InfoBoxProps {
  title?: string;
  items: string[];
  variant?: 'primary' | 'success' | 'error';
  style?: StyleProp<ViewStyle>;
}

const InfoBox = ({ title, items, variant = 'primary', style }: InfoBoxProps) => {
  const { colors } = useTheme();
  const color = colors[variant];

  return (
    <View style={[styles.container, { backgroundColor: color + '10' }, style]}>
      {title && (
        <Text style={[styles.title, { color }]}>{title}</Text>
      )}
      {items.map((item, i) => (
        <Text key={i} style={[styles.item, { color }]}>
          • {item}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  title: {
    fontWeight: '600',
    marginBottom: Spacing.sm,
    fontSize: 16,
  },
  item: {
    fontSize: 14,
    marginBottom: Spacing.xs,
  },
});

export default InfoBox;