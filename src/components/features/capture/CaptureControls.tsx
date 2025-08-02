import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AppButton from '../../capture/AppButton';

interface CaptureControlsProps {
  currentStep: 'positioning' | 'captured' | 'analyzing' | 'results';
  onTakePicture: () => void;
  onRetake: () => void;
  onAnalyze: () => void;
  onConfirm: () => void;
  isProcessing?: boolean; // Optional prop to indicate processing state
}

const CaptureControls: React.FC<CaptureControlsProps> = ({
  currentStep,
  onTakePicture,
  onRetake,
  onAnalyze,
  onConfirm,
  isProcessing = false, // Default to false if not provided
}) => {
  switch (currentStep) {
    case 'positioning':
      return (
        <View style={styles.controlsCard}>
          <AppButton
            title="Capturar"
            disabled={isProcessing} // Disable button if processing
            onPress={onTakePicture}
            style={styles.captureButton}
            icon={<MaterialIcons name="camera" size={24} color="white" />}
          />
        </View>
      );
    case 'captured':
      return (
        <View style={styles.controlsCard}>
          <View style={styles.buttonRow}>
            <AppButton
              title="Tirar Novamente"
              onPress={onRetake}
              disabled={isProcessing} // Disable button if processing
              style={[styles.actionButton, { backgroundColor: '#F44336' }]}
              icon={<MaterialIcons name="replay" size={24} color="white" />}
            />
            <AppButton
              title="Analisar"
              disabled={isProcessing} // Disable button if processing
              onPress={onAnalyze}
              style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
              icon={<MaterialIcons name="search" size={24} color="white" />}
            />
          </View>
        </View>
      );
    case 'analyzing':
      return (
        <View style={styles.analyzingCard}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.analyzingText}>Analisando pontos...</Text>
        </View>
      );
    case 'results':
      return (
        <View style={styles.controlsCard}>
          <View style={styles.buttonRow}>
            <AppButton
              title="Repetir"
              disabled={isProcessing} // Disable button if processing
              onPress={onRetake}
              style={[styles.actionButton, { backgroundColor: '#F44336' }]}
              icon={<MaterialIcons name="replay" size={24} color="white" />}
            />
            <AppButton
              title="Confirmar"
              disabled={isProcessing} // Disable button if processing
              onPress={onConfirm}
              style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
              icon={<MaterialIcons name="check" size={24} color="white" />}
            />
          </View>
        </View>
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  controlsCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  analyzingCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  captureButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    minWidth: 140,
  },
  analyzingText: {
    color: 'white',
    marginTop: 16,
    fontSize: 18,
  },
});

export default CaptureControls;