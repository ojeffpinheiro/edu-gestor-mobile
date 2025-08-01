import { useRef, useCallback } from 'react';
import { Animated, Easing } from 'react-native';

import { FeedbackType } from '../types/feedback';
import { triggerHapticFeedback } from '../utils/hapticUtils';

interface UseAnimationProps {
  initialOpacity?: number;
  initialScale?: number;
  initialTranslateY?: number;
  pressScale?: number;
  duration?: number;
  pressDuration?: number;
  releaseDuration?: number;
  delay?: number;
  useNativeDriver?: boolean;
  enableHapticFeedback?: boolean;
}

interface PressAnimationConfig {
  scaleTo?: number;
  onPress?: () => void;
  hapticType?: FeedbackType;
}

export const useAnimation = ({
  initialOpacity = 0,
  initialScale = 1,
  initialTranslateY = 0,
  pressScale = 0.95,
  duration = 300,
  pressDuration = 50,
  releaseDuration = 100,
  delay = 0,
  useNativeDriver = true,
  enableHapticFeedback = true,
}: UseAnimationProps = {}) => {
  const opacity = useRef(new Animated.Value(initialOpacity)).current;
  const scale = useRef(new Animated.Value(initialScale)).current;
  const translateY = useRef(new Animated.Value(initialTranslateY)).current;

  // Animação de entrada (fade-in + scale up)
  const animateIn = useCallback((callback?: () => void) => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 5,
        useNativeDriver,
      }),
    ]).start(callback);
  }, [opacity, scale, translateY, duration, useNativeDriver]);

  // Animação de saída (fade-out + scale down)
  const animateOut = useCallback((callback?: () => void) => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration,
        useNativeDriver,
        easing: Easing.in(Easing.cubic),
      }),
      Animated.timing(scale, {
        toValue: 0.8,
        duration,
        useNativeDriver,
      }),
    ]).start(callback);
  }, [opacity, scale, duration, useNativeDriver]);

  // Animação de pressão (para botões/interativos)
  const pressAnimation = useCallback((config?: PressAnimationConfig) => {
    const {
      scaleTo = pressScale,
      onPress,
      hapticType = 'light'
    } = config || {};

    Animated.sequence([
      // Animação de pressão
      Animated.timing(scale, {
        toValue: scaleTo,
        duration: pressDuration,
        useNativeDriver,
        easing: Easing.in(Easing.ease),
      }),
      // Animação de liberação
      Animated.timing(scale, {
        toValue: 1,
        duration: releaseDuration,
        useNativeDriver,
        easing: Easing.out(Easing.ease),
      }),
    ]).start(() => {
      if (enableHapticFeedback) {
        triggerHapticFeedback(hapticType);
      }
      onPress?.();
    });
  }, [scale, pressScale, pressDuration, releaseDuration, useNativeDriver, enableHapticFeedback]);

  // Reset para valores iniciais
  const resetAnimation = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: initialOpacity,
        duration: 0,
        useNativeDriver,
      }),
      Animated.timing(scale, {
        toValue: initialScale,
        duration: 0,
        useNativeDriver,
      }),
      Animated.timing(translateY, {
        toValue: initialTranslateY,
        duration: 0,
        useNativeDriver,
      }),
    ]).start();
  }, [opacity, scale, translateY, initialOpacity, initialScale, initialTranslateY]);

  return {
    // Valores animados
    opacity,
    scale,
    translateY,
    
    // Métodos de animação
    animateIn,
    animateOut,
    pressAnimation,
    resetAnimation,
    
    // Feedback tátil
    triggerHapticFeedback,
    
    // Estilos compostos (para uso direto em componentes)
    animatedStyles: {
      opacity,
      transform: [{ scale }, { translateY }],
    }
  };
};

export const useFadeAnimation = (initialValue = 0) => {
  const fadeAnim = useRef(new Animated.Value(initialValue)).current;

  const fadeIn = (duration = 300) => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (duration = 300) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  return { fadeAnim, fadeIn, fadeOut };
};

export const useSlideAnimation = (initialValue = 100) => {
  const slideAnim = useRef(new Animated.Value(initialValue)).current;

  const slideIn = (duration = 300) => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  };

  const slideOut = (duration = 300) => {
    Animated.timing(slideAnim, {
      toValue: initialValue,
      duration,
      easing: Easing.in(Easing.exp),
      useNativeDriver: true,
    }).start();
  };

  return { slideAnim, slideIn, slideOut };
};