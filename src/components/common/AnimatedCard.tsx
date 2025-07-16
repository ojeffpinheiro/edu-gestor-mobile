import React, { ReactNode } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { CardStyles } from '../../styles/sharedComponents';

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  delay?: number;
}

export const AnimatedCard: React.FC<CardProps> = ({ 
  children, 
  style, 
  delay = 0 
}) => {
  const opacity = new Animated.Value(0);
  const scale = new Animated.Value(0.9);

  React.useEffect(() => {
    const timer = setTimeout(() => {
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
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

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