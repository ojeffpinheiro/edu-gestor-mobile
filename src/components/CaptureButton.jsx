import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const CaptureButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.captureButton} onPress={onPress}>
      <View style={styles.captureButtonInner} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});

export default CaptureButton;