import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

const useCaptureAnimation = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateCapture = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.elastic(1)),
        useNativeDriver: true,
      }),
    ]).start();
  };

  return {
    scaleAnim,
    animateCapture
  };
};

export default useCaptureAnimation;