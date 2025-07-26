import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import { createCaptureControlsStyles } from './CameraStyles';

interface CaptureControlsProps {
  onCapture: () => void;
  onGalleryOpen: () => void;
  autoCaptureMode: 'OFF' | 'FAST' | 'SLOW';
  onAutoCaptureToggle: () => void;
  isProcessing: boolean;
}

const CaptureControls: React.FC<CaptureControlsProps> = ({
  onCapture,
  onGalleryOpen,
  autoCaptureMode,
  onAutoCaptureToggle,
  isProcessing
}) => {
  const { colors } = useTheme();
  const styles = createCaptureControlsStyles(colors);

  const getAutoCaptureColor = () => {
    switch (autoCaptureMode) {
      case 'FAST': return colors.feedback.success;
      case 'SLOW': return colors.feedback.warning;
      default: return colors.text.secondary;
    }
  };

  return (
    <View style={styles.container}>
      {/* Gallery Button */}
      <Button
        onPress={onGalleryOpen}
        variant="floating"
        icon={<Ionicons name="images" size={24} color={colors.text.onPrimary} />}
        style={[styles.button, styles.galleryButton]}
        rounded
        disabled={isProcessing}
      />

      {/* Main Capture Button */}
      <Button
        onPress={onCapture}
        variant="floating"
        size="lg"
        icon={<Ionicons name="camera" size={32} color={colors.text.onPrimary} />}
        style={[
          styles.captureButton, 
          isProcessing && styles.disabledButton,
          { borderColor: colors.border.medium }
        ]}
        rounded
        disabled={isProcessing}
      />

      {/* Auto Capture Toggle */}
      <Button
        onPress={onAutoCaptureToggle}
        variant={autoCaptureMode !== 'OFF' ? 'floating' : 'ghost'}
        icon={
          <View style={styles.autoCaptureContainer}>
            <Ionicons
              name="timer"
              size={24}
              color={getAutoCaptureColor()}
            />
            <Text style={styles.autoCaptureText}>
              {autoCaptureMode === 'FAST' ? '1.5s' :
               autoCaptureMode === 'SLOW' ? '3s' : 'Auto'}
            </Text>
            {autoCaptureMode !== 'OFF' && (
              <View style={[
                styles.indicator,
                { 
                  backgroundColor: autoCaptureMode === 'FAST' ? 
                    colors.feedback.success : colors.feedback.warning 
                }
              ]} />
            )}
          </View>
        }
        style={styles.button}
        rounded
      />
    </View>
  );
};

export default CaptureControls;