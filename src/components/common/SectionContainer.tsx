// src/components/common/SectionContainer.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';

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
  return (
    <View style={[styles.container, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333333',
  },
});

export default SectionContainer;
