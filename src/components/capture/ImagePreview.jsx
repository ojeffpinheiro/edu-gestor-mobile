import React from 'react';
import { View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { createCameraStyles } from './CameraStyles';
import Button from '../common/Button';

const ImagePreview = ({ imageUri, onRetry, onConfirm }) => {
  const { colors } = useTheme();
  const cameraStyles = createCameraStyles(colors);

  return (
    <View style={cameraStyles.container}>
      <Image source={{ uri: imageUri }} style={cameraStyles.previewImage} />

      <View style={cameraStyles.previewControls}>
        <Button
          variant="text"
          onPress={onRetry}
          style={[cameraStyles.previewButton, cameraStyles.retryButton]}
        >
          <Ionicons name="close" size={24} color="white" />
          <Text style={cameraStyles.previewButtonText}>Repetir</Text>
      </Button>

        <Button
          variant="text"
          onPress={onConfirm}
          style={[cameraStyles.previewButton, cameraStyles.confirmButton]}
        >
          <Ionicons name="checkmark" size={24} color="white" />
          <Text style={cameraStyles.previewButtonText}>Confirmar</Text>
        </Button>
      </View>
    </View>
  );
};

export default ImagePreview;