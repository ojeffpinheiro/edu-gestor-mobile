import React from 'react';
import { View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { createCameraStyles } from './CameraStyles';
import Button from '../common/Button';
import { Spacing } from '../../styles/designTokens';

const ImagePreview = ({ imageUri, onRetry, onConfirm }) => {
  const { colors } = useTheme();
  const cameraStyles = createCameraStyles(colors);

  return (
    // Atualizar estilos usando createThemeStyles
    <View style={cameraStyles.screenContainer}>
      <View style={[cameraStyles.card, { flex: 1, padding: 0, overflow: 'hidden' }]}>
        <Image source={{ uri: imageUri }} style={{ flex: 1 }} resizeMode="contain" />

        <View style={[cameraStyles.card, {
          position: 'absolute',
          bottom: Spacing.lg,
          left: Spacing.lg,
          right: Spacing.lg,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }]}>
          <Button
            variant="text"
            onPress={onRetry}
            style={{ backgroundColor: colors.feedback.error }}
            icon={<Ionicons name="close" size={24} color="white" />}
            label="Repetir"
          />

          <Button
            variant="text"
            onPress={onConfirm}
            style={{ backgroundColor: colors.feedback.success }}
            icon={<Ionicons name="checkmark" size={24} color="white" />}
            label="Confirmar"
          />
        </View>
      </View>
    </View>
  );
};

export default ImagePreview;