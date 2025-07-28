import React, { useState } from 'react';
import { View, Image, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { createCameraStyles } from './CameraStyles';
import Button from '../common/Button';
import { Spacing } from '../../styles/designTokens';

const ImagePreview = ({ imageUri, onRetry, onConfirm }) => {
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.9))[0];
  
  const { colors } = useTheme();
  const cameraStyles = createCameraStyles(colors);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.back(1)),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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