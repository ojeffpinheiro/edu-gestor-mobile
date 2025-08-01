import { useState, useCallback } from 'react';
import { CameraView } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import useErrorSystem from './useErrorSystem';
import { useCameraPermission } from './useCameraPermission';

const useImageCapture = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { showError } = useErrorSystem();
  const { hasPermission, requestPermission } = useCameraPermission();

  const captureImage = useCallback(async (cameraRef: React.RefObject<CameraView>) => {
    if (!hasPermission) {
      const newStatus = await requestPermission();
      if (newStatus !== 'granted') {
        throw new Error('Permissão da câmera negada');
      }
    }

    if (!cameraRef.current) throw new Error('Camera not ready');
    return await cameraRef.current.takePictureAsync();
  }, [hasPermission, requestPermission]);

  const handleGalleryOpen = useCallback(async () => {
    try {
      setIsProcessing(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8
      });

      if (!result.canceled && result.assets.length > 0) {
        return {
          uri: result.assets[0].uri,
          width: result.assets[0].width,
          height: result.assets[0].height
        };
      }
      return null;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Falha ao abrir galeria');
      showError('gallery_permission', errorObj);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [showError]);

  return {
    isProcessing,
    capturedImage,
    setCapturedImage,
    captureImage,
    handleGalleryOpen
  };
};

export default useImageCapture;