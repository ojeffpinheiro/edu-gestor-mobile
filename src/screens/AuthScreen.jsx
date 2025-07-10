import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/commun';

export default function AuthScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autenticação</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Identification')}
      >
        <Text style={styles.buttonText}>Fazer Login</Text>
      </TouchableOpacity>
    </View>
  );
}