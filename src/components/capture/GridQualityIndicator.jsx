import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

/**
 * Componente que mostra um indicador visual da qualidade do alinhamento
 * 
 * @param {number} quality - Valor de 0 a 100 representando a qualidade
 */
const GridQualityIndicator = ({ quality }) => {
  // Determina a cor com base na qualidade
  const getColor = () => {
    if (quality > 75) return '#10B981'; // verde
    if (quality > 50) return '#F59E0B'; // amarelo
    return '#EF4444'; // vermelho
  };

  return (
    <View style={styles.qualityContainer}>
      <View style={[
        styles.qualityBar, 
        { 
          width: `${quality}%`,
          backgroundColor: getColor()
        }
      ]} />
      <Text style={styles.qualityText}>
        Qualidade: {quality}% {quality > 50 ? '👍' : '👎'}
      </Text>
    </View>
  );
};

export default GridQualityIndicator;