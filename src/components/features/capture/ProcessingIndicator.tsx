// components/ProcessingIndicator.js
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { ColorScheme } from '../../../styles/colors';

const ProcessingIndicator = () => {
  const { colors } = useTheme();
  const styles = createProcessingIndicator(colors);
  
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary.main} />
      <Text style={styles.text}>Processando...</Text>
    </View>
  );
};

const createProcessingIndicator = (colors: ColorScheme) => {
    return StyleSheet.create({
        container: {
            marginTop: 32,
            alignItems: 'center',
        },
        indicator: {
            color: colors.primary.main,
        },
        text: {
            marginTop: 16,
            color: colors.text.secondary,
        }
    })
}

export default ProcessingIndicator;