import React, { useEffect } from 'react';
import { View, Image, Animated, Easing, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../context/ThemeContext';
import { useFadeAnimation, useSlideAnimation } from '../../hooks/useAnimation';
import useCaptureAnimation from '../../hooks/useCaptureAnimation';
import { Spacing } from '../../styles/designTokens';
import Button from '../common/Button';
import { createCameraBaseStyles } from './CameraStyles';

const ImagePreview = ({ imageUri, onRetry, onConfirm }) => {
  const { fadeAnim, fadeIn, fadeOut } = useFadeAnimation();
  const { slideAnim, slideIn, slideOut } = useSlideAnimation();
  const { scaleAnim } = useCaptureAnimation();

  const { colors } = useTheme();
  const cameraStyles = createCameraBaseStyles(colors);

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

  const getFixedUri = () => {
    if (Platform.OS === 'ios') {
      return decodeURIComponent(imageUri.replace('file://', ''));
    }
    return imageUri;
  };

  return (
    // Atualizar estilos usando createThemeStyles
    <View style={cameraStyles.container}>
      <View style={[cameraStyles.card, { flex: 1, width: '100%', height: '100%', padding: 0, overflow: 'hidden' }]}>
        <Image
          source={{ uri: getFixedUri() }}
          style={{
            width: '100%',
            height: '100%',
            borderWidth: 1,
          }}
          contentFit="contain"
          onError={(e) => console.log('Erro ao carregar:', e.nativeEvent.error)} />

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