import { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import { Linking } from 'react-native';
import { useUserFeedback } from './useUserFeedback';

type PermissionStatus = 'undetermined' | 'granted' | 'denied';

export const useCameraPermission = () => {
  const { showFeedback } = useUserFeedback();
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
      showFeedback({
        type: 'error',
        message: 'Failed to request camera permissions',
        haptic: true
      });
      setStatus('denied');
      return 'denied';
    } finally {
      setIsChecking(false);
    }
  };

  const openSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      showFeedback({
        type: 'error',
        message: 'Não foi possível abrir as configurações',
        haptic: true
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