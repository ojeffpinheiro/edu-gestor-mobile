import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/commun';

export default function IdentificationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Identificação</Text>
      <Text style={styles.subtitle}>Identifique o tipo de prova</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Capture')}
      >
        <Text style={styles.buttonText}>Continuar para Captura</Text>
      </TouchableOpacity>
    </View>
  );
}