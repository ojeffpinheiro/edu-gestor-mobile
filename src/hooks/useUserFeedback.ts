
import { useCallback, useState } from 'react';
import { Alert, ToastAndroid, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { triggerHapticFeedback } from '../utils/hapticUtils';
import { getFeedbackConfig, showPlatformAlert, showPlatformToast } from '../utils/feedbackUtils';

type FeedbackType = 'success' | 'error' | 'info' | 'warning';
type FeedbackPosition = 'top' | 'bottom' | 'center';

const DEFAULT_DURATIONS = {
  success: 3000,
  error: 4000,
  warning: 3500,
  info: 2500
};

interface FeedbackOptions {
  type: FeedbackType;
  message: string;
  duration?: number;
  position?: FeedbackPosition;
  useToast?: boolean;
  useAlert?: boolean;
  haptic?: boolean;
  title?: string;
  actions?: {
    text: string;
    onPress: () => void;
    style?: 'primary' | 'secondary';
  }[];
  persistent?: boolean;
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
      title: '',
      actions: [],
    },
  });

  // Função principal para mostrar feedback
  const showFeedback = useCallback((options: FeedbackOptions) => {
    const duration = options.duration || DEFAULT_DURATIONS[options.type];
    const {
      type = 'info',
      message,
      position = 'bottom',
      useToast = false,
      useAlert = false,
      haptic = true,
      title,
      actions,
      persistent = false,
    } = options;

    // Dispara feedback háptico se necessário
    if (haptic) {
      triggerHapticFeedback(type);
    }

    // Obtém configuração padrão do feedback
    const config = getFeedbackConfig({
      type,
      message,
      duration,
      position,
      title,
      actions,
      persistent
    });

    // Decide o método de exibição baseado nas opções
    if (useToast || Platform.OS === 'android') {
      showPlatformToast(message, persistent ? 0 : duration);
    } else if (useAlert) {
      showPlatformAlert(
        type === 'error' ? 'Erro' :
          type === 'success' ? 'Sucesso' :
            type === 'warning' ? 'Aviso' : 'Informação',
        message,
        [{ text: 'OK', onPress: () => { } }]
      );
    } else {
      // Atualiza o estado para feedback customizado
      setFeedbackConfig({
        visible: true,
        options: config
      });
    }

    // Configura toast para iOS (se necessário)
    if (Platform.OS === 'ios' && useToast) {
      setToastConfig({
        visible: true,
        message,
        type,
        duration: persistent ? 0 : duration,
        position: 'bottom',
      });

      if (!persistent) {
        setTimeout(() => setToastConfig(null), duration);
      }
    }
  }, []);

  // Função para esconder feedback
  const hideFeedback = useCallback(() => {
    setFeedbackConfig(prev => ({ ...prev, visible: false }));
    setToastConfig(null);
  }, []);

  return {
    // Estado e configurações
    toastConfig,
    feedbackConfig,

    // Métodos principais
    showFeedback,
    hideFeedback,

    // Métodos específicos (opcionais)
    showToast: showPlatformToast,
    showAlert: showPlatformAlert,
  };
};