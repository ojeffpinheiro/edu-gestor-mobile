import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/commun';

export default function ReportScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório</Text>
      <Text style={styles.subtitle}>Resultados da correção</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Voltar ao Início</Text>
      </TouchableOpacity>
    </View>
  );
}