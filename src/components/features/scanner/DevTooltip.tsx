import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';

const DevTooltip: React.FC = () => {
  const { colors } = useTheme();

  if (!__DEV__) return null;

  return (
    <View style={styles.mockTooltip}>
      <Ionicons name="information-circle" size={24} color={colors.feedback.info} />
      <Text style={[styles.mockTooltipText, {
        color: colors.text.primary,
        backgroundColor: colors.background.secondary
      }]}>
        Modo desenvolvimento ativo - use os botões de teste
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mockTooltip: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    gap: 8,
  },
  mockTooltipText: {
    fontSize: 14,
    flex: 1,
  },
});

export default DevTooltip;