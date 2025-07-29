// useUserFeedback.ts
import { useCallback, useState } from 'react';
import { Alert, ToastAndroid, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

type FeedbackType = 'success' | 'error' | 'info' | 'warning';
type FeedbackPosition = 'top' | 'bottom' | 'center';

interface FeedbackOptions {
  type: FeedbackType;
  message: string;
  duration?: number;
  position?: FeedbackPosition;
  useToast?: boolean;
  useAlert?: boolean;
  haptic?: boolean;
}

interface ToastConfig {
  visible: boolean;
  message: string;
  type: FeedbackType;
  duration: number;
  position: FeedbackPosition;
}

export const useUserFeedback = () => {
  const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);
  const [feedbackConfig, setFeedbackConfig] = useState({
    visible: false,
    options: {
      type: 'info' as FeedbackType,
      message: '',
      duration: 3000,
      position: 'bottom' as FeedbackPosition,
    },
  });
  
  
  const showFeedback = useCallback((options: FeedbackOptions) => {
    const { 
      type = 'info', 
      message, 
      duration = 3000, 
      position = 'bottom',
      useToast = false,
      useAlert = false,
      haptic = true,
    } = options;

    if (haptic) {
      switch (type) {
        case 'success':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'error':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
        case 'warning':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        default:
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }

    // Decidir o método de exibição
    if (useToast || Platform.OS === 'android') {
      showToast(message, type, duration);
    } else if (useAlert) {
      showAlert(message, type);
    } else {
      setFeedbackConfig({
        visible: true,
        options: { type, message, duration, position },
      });
    }
  }, []);

  const showToast = (message: string, type: FeedbackType, duration: number) => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        message,
        duration,
        ToastAndroid.BOTTOM
      );
    } else {
      // iOS - usar componente customizado
      setToastConfig({
        visible: true,
        message,
        type,
        duration,
        position: 'bottom',
      });
      setTimeout(() => setToastConfig(null), duration);
    }
  };

  const showAlert = (message: string, type: FeedbackType) => {
    Alert.alert(
      type === 'error' ? 'Erro' :
        type === 'success' ? 'Sucesso' :
          type === 'warning' ? 'Aviso' : 'Informação',
      message,
      [{ text: 'OK', onPress: () => { } }]
    );
  };

  
  const hideFeedback = useCallback(() => {
    setFeedbackConfig(prev => ({ ...prev, visible: false }));
    setToastConfig(null);
  }, []);

  return {
    // Para componentes de UI
    toastConfig,
    feedbackConfig,

    // Métodos principais
    showFeedback,
    hideFeedback,

    // Métodos específicos (opcionais)
    showToast,
    showAlert,
  };
};