import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { createScannerOverlayStyles } from '../../auth/styles';

interface ScannerOverlayProps {
  scanLineAnimation: Animated.Value;
  isScanning: boolean;
  scannerSize?: number;
}

const ScannerOverlay = ({ 
  scanLineAnimation, 
  isScanning,
  scannerSize = 280 
}: ScannerOverlayProps) => {
  const { colors } = useTheme();
  const styles = createScannerOverlayStyles(colors, scannerSize);

  return (
    <View style={styles.overlay}>
      <View style={styles.frameContainer}>
        <View style={styles.frame}>
          {/* Cantos do scanner */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />

          {/* Linha de scan animada */}
          <Animated.View 
            style={[
              styles.scanLine,
              {
                transform: [{
                  translateY: scanLineAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-scannerSize/2, scannerSize/2],
                  })
                }]
              }
            ]} 
          />
        </View>
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionText}>
          Posicione o código dentro da área de escaneamento
        </Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            {isScanning ? 'Escaneando...' : 'Aguardando código'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ScannerOverlay;