import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { CardStyles } from '../../styles/sharedComponents';

export const AnimatedCard = ({ children, style }) => {
  const [opacity] = useState(new Animated.Value(0));
  const [scale] = useState(new Animated.Value(0.9));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        CardStyles.base,
        style,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};