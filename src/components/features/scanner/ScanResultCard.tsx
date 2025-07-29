import React from 'react';
import { View, Text, Animated } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { useTheme } from '../../../context/ThemeContext';
import { createScanResultCardStyles } from '../../auth/styles';
import StatusCard from '../../common/StatusCard';
import Button from '../../common/Button';

interface ScanResultCardProps {
  code: string;
  onContinue: () => void;
  animation?: Animated.Value;
}

const ScanResultCard = ({ code, onContinue, animation }: ScanResultCardProps) => {
  const { colors } = useTheme();
  const styles = createScanResultCardStyles(colors);

  return (
    <StatusCard
      variant="success"
      icon={<CheckCircle size={24} color={colors.feedback.success} />}
      title="Código Detectado"
      style={styles.scanResultCard}
    >
      <View style={styles.content}>
        <Text style={styles.codeText}>{code}</Text>
        
        <Button
          title="Continuar para Identificação"
          onPress={onContinue}
          variant="success"
          icon={<CheckCircle size={20} color={colors.text.onPrimary} />}
          iconPosition="left"
          style={styles.button}
          accessibilityLabel="Continuar para identificação do aluno"
        />
      </View>
    </StatusCard>
  );
};

export default ScanResultCard;