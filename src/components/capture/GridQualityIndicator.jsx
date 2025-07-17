import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMainStyles } from '../styles/mainStyles';
import { useTheme } from '../context/ThemeContext';
import { Spacing, BorderRadius } from '../styles/designTokens';

const GridQualityIndicator = ({ quality }) => {
  const { colors } = useTheme();
  const styles = createMainStyles(colors);
  
  const getQualityColor = () => {
    if (quality > 75) return colors.success;
    if (quality > 50) return colors.warning;
    return colors.error;
  };

  return (
    <View style={[localStyles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Qualidade do Alinhamento</Text>
      <View style={localStyles.progressContainer}>
        <View style={[localStyles.progressBar, { 
          width: `${quality}%`, 
          backgroundColor: getQualityColor() 
        }]} />
      </View>
      <Text style={[localStyles.qualityText, { color: getQualityColor() }]}>
        {quality}%
      </Text>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Spacing.lg,
    left: Spacing.lg,
    right: Spacing.lg,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center'
  },
  progressContainer: {
    height: 6,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.sm,
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    borderRadius: BorderRadius.md
  },
  qualityText: {
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default GridQualityIndicator;