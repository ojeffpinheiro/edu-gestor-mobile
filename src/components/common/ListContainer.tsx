import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Spacing } from '../../styles/designTokens';

interface ListContainerProps {
  children: React.ReactNode;
  divider?: boolean;
}

const ListContainer: React.FC<ListContainerProps> = ({ 
  children, 
  divider = true 
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {React.Children.map(children, (child, index) => (
        <View key={index}>
          {child}
          {divider && index < React.Children.count(children) - 1 && (
            <View style={[styles.divider, { backgroundColor: colors.border.light }]} />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginVertical: Spacing.sm,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
});

export default ListContainer;