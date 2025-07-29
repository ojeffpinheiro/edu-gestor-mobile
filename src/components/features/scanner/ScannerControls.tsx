import React from 'react';
import { View } from 'react-native';
import { ScanLine, Flashlight, X, Zap } from 'lucide-react-native';
import { useTheme } from '../../../context/ThemeContext';
import Button from '../../common/Button';
import { AnimationHelpers } from '../../../styles/animations';
import { createScannerControlsStyles } from '../../auth/styles';

interface ScannerControlsProps {
  isActive: boolean;
  torchEnabled: boolean;
  onStartScanning: () => void;
  onStopScanning: () => void;
  onToggleTorch: () => void;
  onSimulateScan?: () => void;
  onBack: () => void;
}

const ScannerControls = ({
  isActive,
  torchEnabled,
  onStartScanning,
  onStopScanning,
  onToggleTorch,
  onSimulateScan,
  onBack,
}: ScannerControlsProps) => {
  const { colors } = useTheme();
  const styles = createScannerControlsStyles(colors);
  const pulseAnimation = AnimationHelpers.createAnimatedValue(1);

  return (
    <View style={styles.scannerControlsContainer}>
      {isActive ? (
        <>
          <Button
            variant="floating"
            onPress={onStopScanning}
            icon={<X size={20} color={colors.text.onPrimary} />}
            style={styles.closeButton}
            accessibilityLabel="Fechar scanner"
          />

          <Button
            variant="floating"
            onPress={onToggleTorch}
            icon={
              <Flashlight 
                size={20} 
                color={torchEnabled ? colors.feedback.warning : colors.text.onPrimary} 
              />
            }
            style={[
              styles.torchButton,
              torchEnabled && styles.torchButtonActive
            ]}
            accessibilityLabel={torchEnabled ? "Desligar flash" : "Ligar flash"}
          />
        </>
      ) : (
        <View style={styles.buttonGroup}>
          <Button
             title={isActive ? 'Escaneando...' : 'Iniciar Scanner'}
            onPress={onStartScanning}
            variant="primary"
            disabled={isActive}
            icon={<ScanLine size={20} color={colors.text.onPrimary} />}
            iconPosition="left"
            style={styles.mainButton}
            accessibilityLabel="Iniciar scanner de código"
          />

          {onSimulateScan && (
            <Button
              title="Simular Código"
              onPress={onSimulateScan}
              variant="secondary"
              icon={<Zap size={18} color={colors.primary.main} />}
              iconPosition="left"
              style={styles.secondaryButton}
              accessibilityLabel="Simular leitura de código"
            />
          )}

          <Button
            title="Voltar"
            onPress={onBack}
            variant="ghost"
            style={styles.backButton}
            accessibilityLabel="Voltar para tela anterior"
          />
        </View>
      )}
    </View>
  );
};

export default ScannerControls;