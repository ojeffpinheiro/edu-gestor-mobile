import { Linking } from 'react-native';
import { LogLevel } from '../../types/feedback';

export const openAppSettings = () => {
  Linking.openSettings().catch(() => {
    console.error('Falha ao abrir configurações');
  });
};

export const logMessage = (level: LogLevel, message: string, metadata?: any) => {
  if (__DEV__ || level === 'error') {
    console[level](`[${level.toUpperCase()}] ${message}`, metadata);
  }
};