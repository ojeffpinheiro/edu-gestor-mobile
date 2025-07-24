import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../screens/Camera';
import { useTheme } from '../../context/ThemeContext';
import { createCameraStyles } from './CameraStyles';

const ImagePreview = ({ imageUri, onRetry, onConfirm }) => {
  const { colors } = useTheme();
  const cameraStyles = createCameraStyles(colors);

  return (
    <View style={cameraStyles.container}>
      <Image source={{ uri: imageUri }} style={cameraStyles.previewImage} />

      <View style={cameraStyles.previewControls}>
        <TouchableOpacity
          style={[cameraStyles.previewButton, cameraStyles.retryButton]}
          onPress={onRetry}
        >
          <Ionicons name="close" size={24} color="white" />
          <Text style={cameraStyles.previewButtonText}>Repetir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[cameraStyles.previewButton, cameraStyles.confirmButton]}
          onPress={onConfirm}
        >
          <Ionicons name="checkmark" size={24} color="white" />
          <Text style={cameraStyles.previewButtonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImagePreview;