import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';

import { useTheme } from '../../../context/ThemeContext';

interface ScannedCodeCardProps {
  code: string;
}

const ScannedCodeCard = ({ code }: ScannedCodeCardProps) => {
  const { colors } = useTheme();
  const styles = createScannedCodeCardStyles(colors);

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={[`${colors.primary.main}15`, `${colors.primary.main}25`]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Sparkles size={20} color={colors.primary.main} />
          <Text style={styles.label}>Código Identificado</Text>
        </View>
        <Text style={styles.value}>{code}</Text>
      </LinearGradient>
    </View>
  );
};

const createScannedCodeCardStyles = (colors: any) => 
  StyleSheet.create({
    card: {
      marginHorizontal: 24,
      marginBottom: 24,
      borderRadius: 20,
      overflow: 'hidden' as const, // Tipo específico
      shadowColor: colors.primary.main,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    gradient: {
      padding: 20,
      borderWidth: 1,
      borderColor: `${colors.primary.main}30`,
    },
    header: {
      flexDirection: 'row' as const, // Tipo específico
      alignItems: 'center' as const, // Tipo específico
      marginBottom: 12,
    },
    label: {
      fontSize: 14,
      fontWeight: '600' as const, // Tipo específico
      color: colors.primary.main,
      marginLeft: 8,
      textTransform: 'uppercase' as const,
      letterSpacing: 0.5,
    },
    value: {
      fontSize: 24,
      fontWeight: '700' as const, // Tipo específico
      color: colors.text.primary,
      fontFamily: 'monospace',
    },
  });

export default React.memo(ScannedCodeCard);