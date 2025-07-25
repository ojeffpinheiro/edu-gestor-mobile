import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Spacing } from '../../styles/designTokens';
import Button from '../common/Button';

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

  const getAutoCaptureColor = () => {
    switch (autoCaptureMode) {
      case 'FAST': return colors.success;
      case 'SLOW': return colors.warning;
      default: return colors.card;
    }
  };

  return (
    <View style={styles.container}>
      {/* Gallery Button */}
      <Button
        onPress={onGalleryOpen}
        variant="floating"
        icon={<Ionicons name="images" size={24} color={colors.card} />}
        style={[styles.button, { backgroundColor: `${colors.success}30` }]}
        rounded
        disabled={isProcessing}
      />

      {/* Main Capture Button */}
      <Button
        onPress={onCapture}
        variant="floating"
        size="lg"
        icon={<Ionicons name="camera" size={32} color={colors.card} />}
        style={[
          styles.captureButton, 
          isProcessing && styles.disabledButton,
          { borderColor: colors.border }
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
            <Text style={[styles.autoCaptureText, { color: colors.card }]}>
              {autoCaptureMode === 'FAST' ? '1.5s' :
               autoCaptureMode === 'SLOW' ? '3s' : 'Auto'}
            </Text>
            {autoCaptureMode !== 'OFF' && (
              <View style={[
                styles.indicator,
                { 
                  backgroundColor: autoCaptureMode === 'FAST' ? 
                    colors.success : colors.warning 
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

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: BorderRadius.round
  },
  button: {
    width: 50,
    height: 50,
    padding: 0,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderWidth: 2,
  },
  disabledButton: {
    opacity: 0.5,
  },
  autoCaptureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  autoCaptureText: {
    fontSize: 12,
    marginTop: 4,
  },
  indicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default CaptureControls;