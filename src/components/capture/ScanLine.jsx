import React, { useState } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const ScanLine = ({ active }) => {
  const { colors } = useTheme();
  const [position] = useState(new Animated.Value(0));
  
  React.useEffect(() => {
    if (active) {
      Animated.loop(
        Animated.timing(position, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ).start();
    } else {
      position.setValue(0);
    }
  }, [active]);

  return (
    <Animated.View 
      style={[
        localStyles.line,
        { 
          backgroundColor: colors.primary,
          transform: [{
            translateY: position.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%']
            })
          }]
        }
      ]} 
    />
  );
};

const localStyles = StyleSheet.create({
  line: {
    position: 'absolute',
    width: '100%',
    height: 2,
    opacity: 0.8
  }
});

export default ScanLine;
