import React from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { ScanLine, Flashlight, X, Zap } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { Spacing } from '../../styles/designTokens';
import Button from '../common/Button';

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
          <Button
            variant="floating"
            onPress={onStopScanning}
            icon={<X size={20} />}
            style={{ top: Spacing.md, right: Spacing.md }}
          />

          <Button
            variant="floating"
            onPress={onToggleTorch}
            icon={<Flashlight size={20} color={torchOn ? colors.warning : colors.card} />}
            style={{ 
                backgroundColor: torchOn ? colors.warning + '20' : 'rgba(0, 0, 0, 0.7)',
                bottom: Spacing.md,
                right: Spacing.md
              }
            }
          />
        </>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            title={scannerActive ? 'Escaneando...' : 'Iniciar Scanner'}
            onPress={onStartScanning}
            variant="primary"
            disabled={scannerActive}
            icon={<ScanLine size={20} />}
            iconPosition="left"
          />

          <Button
            title="Simular Código (Teste)"
            onPress={onSimulateScan}
            variant="secondary"
            icon={<Zap size={18} />}
            iconPosition="left"
          />

          <Button
            title="Voltar"
            onPress={onBack}
            variant="ghost"
          />
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
  disabledButton: {
    opacity: 0.7,
  },
});

export default ScannerControls;