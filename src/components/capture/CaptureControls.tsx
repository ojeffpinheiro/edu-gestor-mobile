import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  return (
    <View style={styles.container}>
      {/* Gallery Button */}
      <TouchableOpacity onPress={onGalleryOpen} style={styles.button}>
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
          autoCaptureMode !== 'OFF' && styles.activeButton
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
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
  },
  activeButton: {
    backgroundColor: 'rgba(0,100,0,0.3)',
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
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default CaptureControls;