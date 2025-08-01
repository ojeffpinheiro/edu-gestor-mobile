import * as ImagePicker from 'expo-image-picker';
import { useState, useCallback } from 'react';
import { Alert, Platform } from 'react-native';

const useImagePicker = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const openGallery = useCallback(async () => {
    setIsProcessing(true);
    
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permissão necessária',
            'Precisamos da permissão para acessar sua galeria para que você possa selecionar imagens.',
            [{ text: 'OK' }]
          );
          return null;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]) {
        return {
          uri: result.assets[0].uri,
          width: result.assets[0].width,
          height: result.assets[0].height,
        };
      }
      return null;
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Erro', 'Não foi possível acessar a galeria. Por favor, tente novamente.', [{ text: 'OK' }]);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return { openGallery, isProcessing };
};

export default useImagePicker;