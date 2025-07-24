import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Spacing } from '../../styles/designTokens';

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

  return (
    <View style={styles.container}>
      {/* Gallery Button */}
      <TouchableOpacity onPress={onGalleryOpen} style={[styles.button, { backgroundColor: colors.success + '30' }]}>
        <Ionicons name="images" size={32} color="white" />
      </TouchableOpacity>

      {/* Main Capture Button */}
      <TouchableOpacity
        onPress={onCapture}
        style={[styles.captureButton, isProcessing && styles.disabledButton]}
        disabled={isProcessing}
      >
        <Ionicons name="camera" size={40} color="white" />
      </TouchableOpacity>

      {/* Auto Capture Toggle */}
      <TouchableOpacity
        onPress={onAutoCaptureToggle}
        style={[
          styles.button,
          autoCaptureMode !== 'OFF' && { backgroundColor: colors.primary, borderColor: colors.border }
        ]}
      >
        <View style={styles.autoCaptureContainer}>
          <Ionicons
            name="timer"
            size={28}
            color={
              autoCaptureMode === 'FAST' ? '#00FF00' :
                autoCaptureMode === 'SLOW' ? '#FFA500' :
                  'white'
            }
          />
          <Text style={styles.autoCaptureText}>
            {autoCaptureMode === 'FAST' ? '1.5s' :
              autoCaptureMode === 'SLOW' ? '3s' :
                'Auto'}
          </Text>
          {autoCaptureMode !== 'OFF' && (
            <View style={[
              styles.indicator,
              { backgroundColor: autoCaptureMode === 'FAST' ? '#00FF00' : '#FFA500' }
            ]} />
          )}
        </View>
      </TouchableOpacity>
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
    padding: 15,
    borderRadius: 50,
  },
  autoCaptureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoCaptureText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  indicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  captureButton: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.round,
    borderWidth: 2,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default CaptureControls;