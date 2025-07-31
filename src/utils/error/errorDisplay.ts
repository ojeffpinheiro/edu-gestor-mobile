import { Alert } from 'react-native';
import { ErrorConfig } from '../../types/feedback';

export const showAlert = (config: ErrorConfig) => {
  Alert.alert(
    config.title,
    config.message,
    config.actions?.map(action => ({
      text: action.text,
      onPress: action.onPress,
      style: action.style || 'default',
    })),
  );
};

export const showToast = (message: string, type: 'error' | 'success') => {
  // Implementação com sua biblioteca de toast (ex: react-native-toast-message)
};