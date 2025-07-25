import { Animated, Easing } from 'react-native';

export const AnimationPresets = {
  // Transição entre telas
  screenTransition: (value: Animated.Value) => ({
    transform: [
      {
        translateX: value.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0],
        }),
      },
    ],
    opacity: value.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    }),
  }),

  // Feedback de toque em botões
  buttonScale: (value: Animated.Value) => ({
    transform: [
      {
        scale: value.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 0.95, 1],
        }),
      },
    ],
  }),

  // Micro-interações
  microInteraction: (value: Animated.Value) => ({
    transform: [
      {
        scale: value.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.05],
        }),
      },
    ],
    opacity: value.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    }),
  }),
};

export const AnimationHelpers = {
  // Configurações comuns
  standardConfig: {
    duration: 300,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  },

  // Cria um valor animado com comportamento padrão
  createAnimatedValue: (initialValue = 0) => {
    return new Animated.Value(initialValue);
  },
  
  pressAnimation: (value: Animated.Value, callback?: () => void) => {
    Animated.sequence([
      Animated.timing(value, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(value, {
        toValue: 1,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      })
    ]).start(() => callback?.());
  },
};