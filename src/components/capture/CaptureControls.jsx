import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const CaptureControls = ({
  onCapture,
  onGalleryOpen,
  autoCapture,
  onAutoCaptureToggle,
  isProcessing
}) => (
  <View style={styles.controls}>
    <TouchableOpacity
      style={[styles.button, styles.galleryButton]}
      onPress={onGalleryOpen}
      disabled={isProcessing}
    >
      <Ionicons name="images" size={28} color="white" />
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.button, styles.captureButton]}
      onPress={onCapture}
      disabled={isProcessing}
    >
      <FontAwesome 
        name={isProcessing ? "circle-o-notch" : "camera"} 
        size={32} 
        color="white" 
        style={isProcessing && { transform: [{ rotate: '90deg' }] }}
      />
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.button,
        styles.autoButton,
        autoCapture && styles.autoButtonActive
      ]}
      onPress={onAutoCaptureToggle}
      disabled={isProcessing}
    >
      <MaterialIcons 
        name={autoCapture ? "motion-photos-auto" : "timer"} 
        size={28} 
        color="white" 
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  galleryButton: {
    backgroundColor: '#4285F4',
  },
  captureButton: {
    backgroundColor: '#EA4335',
    width: 70,
    height: 70,
  },
  autoButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  autoButtonActive: {
    backgroundColor: 'rgba(0, 200, 0, 0.7)',
  },
});

export default CaptureControls;