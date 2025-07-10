import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/commun';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Bem-vindo ao App de Correção de Provas</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Auth')}
        >
          <Text style={styles.buttonText}>Iniciar Correção</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Report')}
        >
          <Text style={styles.buttonText}>Ver Relatórios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}