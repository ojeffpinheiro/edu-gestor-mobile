import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../screens/Camera';

const ImagePreview = ({ imageUri, onRetry, onConfirm }) => (
  <View style={styles.container}>
    <Image source={{ uri: imageUri }} style={styles.previewImage} />
    
    <View style={styles.previewControls}>
      <TouchableOpacity
        style={[styles.previewButton, styles.retryButton]}
        onPress={onRetry}
      >
        <Ionicons name="close" size={24} color="white" />
        <Text style={styles.previewButtonText}>Repetir</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.previewButton, styles.confirmButton]}
        onPress={onConfirm}
      >
        <Ionicons name="checkmark" size={24} color="white" />
        <Text style={styles.previewButtonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ImagePreview;