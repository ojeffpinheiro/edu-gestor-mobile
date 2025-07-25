import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { Spacing } from '../../styles/designTokens';
import Button from '../common/Button';
import Card from '../common/Card';

interface ScanResultCardProps {
  code: string;
  animation: Animated.Value;
  onContinue: () => void;
}

const ScanResultCard = ({ code, animation, onContinue }: ScanResultCardProps) => {
  const { colors } = useTheme();

  return (
    <Card variant='success' padding='lg'>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.successIcon, { backgroundColor: colors.success + '20' }]}>
          <CheckCircle size={24} color={colors.success} />
        </View>
        <View style={{ marginLeft: Spacing.md }}>
          <Text style={[styles.successTitle, { color: colors.success }]}>
            Código Detectado
          </Text>
          <Text style={[styles.successCode, { color: colors.textPrimary }]}>
            {code}
          </Text>
        </View>
      </View>

      <Button
        title="Continuar para Identificação"
        onPress={onContinue}
        variant="success"
        icon={<CheckCircle size={20} />}
        iconPosition="left"
      />
    </Card>
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