import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const MarkerDetector = ({ position }) => {
  const { colors } = useTheme();
  
  if (!position) return null;

  return (
    <View style={[
      localStyles.marker, 
      { 
        left: position.x, 
        top: position.y,
        borderColor: colors.primary
      }
    ]} />
  );
};

const localStyles = StyleSheet.create({
  marker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    backgroundColor: 'rgba(59, 130, 246, 0.2)'
  }
});

export default MarkerDetector;