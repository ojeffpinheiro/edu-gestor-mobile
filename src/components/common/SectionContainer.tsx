import React from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, Typography } from '../../styles/designTokens';

interface SectionContainerProps {
  children: React.ReactNode;
  title?: string;
  style?: ViewStyle;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ 
  children, 
  title,
  style 
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {title && (
        <Text style={[styles.title, { color: colors.text.primary }]}>
          {title}
        </Text>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.md,
  },
});

export default SectionContainer;