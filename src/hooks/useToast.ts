import { useState } from 'react';
import { ToastAndroid, Platform } from 'react-native';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastConfig {
  type: ToastType;
  message: string;
  duration?: number;
}

export const useToast = () => {
  const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);

  const showToast = (config: ToastConfig) => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        config.message,
        config.duration || ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } else {
      // Implementação para iOS usando um componente de toast
      setToastConfig(config);
      setTimeout(() => setToastConfig(null), config.duration || 3000);
    }
  };

  return { showToast, toastConfig };
};