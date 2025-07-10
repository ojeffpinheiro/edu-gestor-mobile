import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles/commun';

export default function ProcessingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Processamento</Text>
      <Text style={styles.subtitle}>Processando a prova...</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Report')}
      >
        <Text style={styles.buttonText}>Ver Relatório</Text>
      </TouchableOpacity>
    </View>
  );
}