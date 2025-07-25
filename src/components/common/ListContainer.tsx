// src/components/common/ListContainer.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ListContainerProps {
  children: React.ReactNode;
  divider?: boolean;
}

const ListContainer: React.FC<ListContainerProps> = ({ 
  children, 
  divider = true 
}) => {
  return (
    <View style={styles.container}>
      {React.Children.map(children, (child, index) => (
        <View key={index}>
          {child}
          {divider && index < React.Children.count(children) - 1 && (
            <View style={styles.divider} />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
});

export default ListContainer;
