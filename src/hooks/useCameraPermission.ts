import { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import { Linking } from 'react-native';
import useErrorSystem from './useErrorSystem';

type PermissionStatus = 'undetermined' | 'granted' | 'denied';

export const useCameraPermission = () => {
  const errorSystem = useErrorSystem();
  const [status, setStatus] = useState<PermissionStatus>('undetermined');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const { status } = await Camera.getCameraPermissionsAsync();
        setStatus(status === 'granted' ? 'granted' : 'denied');
      } catch (error) {
        setStatus('denied');
      } finally {
        setIsChecking(false);
      }
    };

    checkPermission();
  }, []);

  const requestPermission = async () => {
    try {
      setIsChecking(true);
      const { status } = await Camera.requestCameraPermissionsAsync();
      const newStatus = status === 'granted' ? 'granted' : 'denied';
      setStatus(newStatus);
      return newStatus;
    } catch (error) {
      errorSystem.showCustomError({
        title: 'Erro de permissão',
        message: 'Falha ao solicitar permissões da câmera'
      });
      return 'denied';
    } finally {
      setIsChecking(false);
    }
  };
  
  const openSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      errorSystem.showCustomError({
        title: 'Erro',
        message: 'Não foi possível abrir as configurações'
      });
    }
  };

  return {
    status,
    isChecking,
    hasPermission: status === 'granted',
    requestPermission,
    openSettings
  };
};