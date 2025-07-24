import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Spacing } from '../../styles/designTokens';

interface ScannerOverlayProps {
  scanLineAnimation: Animated.Value;
  isScanning: boolean;
}

const ScannerOverlay = ({ scanLineAnimation, isScanning }: ScannerOverlayProps) => {
  const { colors } = useTheme();
  const { width } = Dimensions.get('window');
  const scannerSize = width * 0.7;

  return (
    <View style={styles.scannerOverlay}>
      <View style={styles.scannerFrameContainer}>
        <View style={[styles.scannerFrame, { borderColor: colors.primary, width: scannerSize, height: scannerSize }]}>
          {/* Cantos */}
          <View style={[styles.corner, styles.topLeft, { borderColor: colors.primary }]} />
          <View style={[styles.corner, styles.topRight, { borderColor: colors.primary }]} />
          <View style={[styles.corner, styles.bottomLeft, { borderColor: colors.primary }]} />
          <View style={[styles.corner, styles.bottomRight, { borderColor: colors.primary }]} />

          {/* Linha de scan animada */}
          <Animated.View style={[
            styles.scanLine,
            {
              backgroundColor: colors.primary,
              transform: [{
                translateY: scanLineAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-scannerSize/2, scannerSize/2],
                }),
              }],
            }
          ]} />
        </View>
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={[styles.scannerInstructions, { color: colors.card }]}>
          Posicione o código dentro da área de escaneamento
        </Text>
        <View style={styles.scannerHints}>
          <Text style={[styles.hintText, { color: colors.card }]}>
            {isScanning ? 'Escaneando...' : 'Aguardando código'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerFrame: {
    position: 'relative',
    backgroundColor: 'transparent',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderWidth: 3,
  },
  topLeft: {
    top: -3,
    left: -3,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: -3,
    right: -3,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: -3,
    left: -3,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: -3,
    right: -3,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanLine: {
    position: 'absolute',
    width: '80%',
    height: 2,
    alignSelf: 'center',
    left: '10%',
    top: '50%',
    marginTop: -1,
    borderRadius: 1,
  },
  instructionsContainer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  scannerInstructions: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: Spacing.sm,
  },
  scannerHints: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  hintText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ScannerOverlay;