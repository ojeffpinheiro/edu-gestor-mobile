import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { ButtonStyles, CardStyles } from '../../styles/sharedComponents';
import { Spacing } from '../../styles/designTokens';

interface ScanResultCardProps {
  code: string;
  animation: Animated.Value;
  onContinue: () => void;
}

const ScanResultCard = ({ code, animation, onContinue }: ScanResultCardProps) => {
  const { colors } = useTheme();

  return (
    <Animated.View style={[
      CardStyles.success,
      {
        transform: [{ scale: animation }],
        opacity: animation,
        padding: Spacing.lg,
        marginBottom: Spacing.xl,
      }
    ]}>
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

      <TouchableOpacity
        style={[ButtonStyles.primary, { backgroundColor: colors.success, marginTop: Spacing.md }]}
        onPress={onContinue}
      >
        <CheckCircle size={20} color={colors.card} style={{ marginRight: Spacing.xs }} />
        <Text style={ButtonStyles.text}>
          Continuar para Identificação
        </Text>
      </TouchableOpacity>
    </Animated.View>
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