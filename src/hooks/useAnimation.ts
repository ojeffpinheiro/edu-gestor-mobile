import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface UseAnimationProps {
  initialOpacity?: number;
  initialScale?: number;
  duration?: number;
  delay?: number;
  useNativeDriver?: boolean;
  onAnimationEnd?: () => void;
}

export const useAnimation = ({
  initialOpacity = 0,
  initialScale = 0.9,
  duration = 300,
  delay = 0,
  useNativeDriver = true,
  onAnimationEnd,
}: UseAnimationProps = {}) => {
  const opacity = useRef(new Animated.Value(initialOpacity)).current;
  const scale = useRef(new Animated.Value(initialScale)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        // Animação de opacidade (fade-in)
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver,
        }),
        // Animação de escala (spring)
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          useNativeDriver,
        }),
      ]).start(onAnimationEnd);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, duration, opacity, scale, useNativeDriver]);

  return { opacity, scale };
};