import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';

const ProcessingScreen = ({ message = 'Processando Provas' }) => (
  <View style={styles.processingContainer}>
    <ActivityIndicator size="large" color="#3b82f6" />
    <Text style={styles.processingTitle}>{message}</Text>
    <Text style={styles.processingText}>Analisando as respostas...</Text>
  </View>
);

export default ProcessingScreen;