import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Text } from 'react-native';
import { ScanLine, Flashlight, X, Zap } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { ButtonStyles } from '../../styles/sharedComponents';
import { Spacing } from '../../styles/designTokens';

interface ScannerControlsProps {
  scannerActive: boolean;
  torchOn: boolean;
  pulseAnimation: Animated.Value;
  onStartScanning: () => void;
  onStopScanning: () => void;
  onToggleTorch: () => void;
  onSimulateScan: () => void;
  onBack: () => void;
}

const ScannerControls = ({
  scannerActive,
  torchOn,
  pulseAnimation,
  onStartScanning,
  onStopScanning,
  onToggleTorch,
  onSimulateScan,
  onBack,
}: ScannerControlsProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {scannerActive ? (
        <>
          <TouchableOpacity
            style={[styles.floatingButton, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}
            onPress={onStopScanning}
          >
            <X size={20} color={colors.card} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.floatingButton,
              { backgroundColor: torchOn ? colors.warning + '20' : 'rgba(0, 0, 0, 0.7)' },
              { bottom: Spacing.md, right: Spacing.md }
            ]}
            onPress={onToggleTorch}
          >
            <Flashlight size={20} color={torchOn ? colors.warning : colors.card} />
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              ButtonStyles.primary,
              { backgroundColor: scannerActive ? colors.gray[400] : colors.primary },
              scannerActive && styles.disabledButton
            ]}
            onPress={onStartScanning}
            disabled={scannerActive}
          >
            <ScanLine size={20} color={colors.card} style={{ marginRight: Spacing.xs }} />
            <Text style={ButtonStyles.text}>
              {scannerActive ? 'Escaneando...' : 'Iniciar Scanner'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ButtonStyles.secondary}
            onPress={onSimulateScan}
          >
            <Zap size={18} color={colors.textSecondary} style={{ marginRight: Spacing.xs }} />
            <Text style={[ButtonStyles.text, { color: colors.textSecondary }]}>
              Simular Código (Teste)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[ButtonStyles.secondary, { marginTop: Spacing.md }]}
            onPress={onBack}
          >
            <Text style={[ButtonStyles.text, { color: colors.textSecondary }]}>
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: Spacing.lg,
  },
  buttonContainer: {
    gap: Spacing.md,
  },
  floatingButton: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    top: Spacing.md,
    right: Spacing.md,
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default ScannerControls;