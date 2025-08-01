import React, { memo } from 'react';
import { View, Text } from 'react-native';
import ProcessingIndicator from '../features/capture/ProcessingIndicator';
import ImagePlaceholder from '../features/capture/ImagePlaceholder';
import ActionButtons from './ActionButtons';
import NavigationButtons from './NavigationButtons';
import { useTheme } from '../../context/ThemeContext';
import { createMainScreenStyles } from '../../screens/styles';
import ImagePreview from './ImagePreview';

interface MainScreenProps {
  selectedImage: { uri: string } | null;
  isProcessing: boolean;
  onSelectImage: () => void;
  onResetImage: () => void;
  onNextStudent: () => void;
  orientation: 'PORTRAIT' | 'LANDSCAPE';
  onScreenChange: (screen: 'main' | 'camera' | 'colorDetector') => void;
}

const MainScreen = memo(({
  selectedImage,
  isProcessing,
  onScreenChange,
  onSelectImage,
  onResetImage,
  onNextStudent,
  orientation
}: MainScreenProps) => {
  const { colors } = useTheme();
  const styles = createMainScreenStyles(colors, orientation);

  const renderContent = () => {
    if (isProcessing) return <ProcessingIndicator />;
    if (selectedImage) return (
      <ImagePreview
        imageUri={selectedImage.uri}
        onRetry={onResetImage}
        onConfirm={onNextStudent}
      />
    );
    return <ImagePlaceholder />;
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Selecione uma imagem</Text>

      <View style={styles.imageContainer}>
        {renderContent()}
      </View>

      <ActionButtons
        onCameraPress={() => onScreenChange('camera')}
        onGalleryPress={onSelectImage}
        onDetectorPress={() => onScreenChange('colorDetector')}
        disabled={isProcessing}
        colors={colors}
      />
    </View>
  );
});

export default MainScreen;