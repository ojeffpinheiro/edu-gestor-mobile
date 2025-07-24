import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CaptureControlsProps {
  onCapture: () => void;
  onGalleryOpen: () => void;
  autoCapture: boolean;
  onAutoCaptureToggle: () => void;
  isProcessing: boolean;
}

const CaptureControls: React.FC<CaptureControlsProps> = ({
  onCapture,
  onGalleryOpen,
  autoCapture,
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
      <TouchableOpacity onPress={onAutoCaptureToggle} style={styles.button}>
        {autoCapture ? (
          <Ionicons name="timer" size={32} color="#00FF00" />
        ) : (
          <Ionicons name="timer-outline" size={32} color="white" />
        )}
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