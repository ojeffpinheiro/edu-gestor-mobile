import { useRef } from 'react';
import { Animated, Easing } from 'react-native';
import * as Haptics from 'expo-haptics';

export const usePressAnimation = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  
  const animatePress = (callback?: () => void) => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 50,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      callback?.();
    });
  };

  return { scaleValue, animatePress };
};