import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { Spacing } from '../../styles/designTokens';
import Button from '../common/Button';
import Card from '../common/Card';
import StatusCard from '../common/StatusCard';

interface ScanResultCardProps {
  code: string;
  animation: Animated.Value;
  onContinue: () => void;
}

const ScanResultCard = ({ code, animation, onContinue }: ScanResultCardProps) => {
  const { colors } = useTheme();

  return (
    <StatusCard
      variant="success"
      icon={<CheckCircle />}
      title="Código Detectado"
      style={{ padding: Spacing.lg }}
    >
      <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: 'bold' }}>
        {code}
      </Text>
      <Button
        title="Continuar para Identificação"
        onPress={onContinue}
        variant="success"
        icon={<CheckCircle size={20} />}
        iconPosition="left"
        style={{ marginTop: Spacing.md }}
      />
    </StatusCard>
  );
};

const styles = StyleSheet.create({
  successIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  successCode: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default ScanResultCard;