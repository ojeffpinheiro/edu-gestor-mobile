import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/commun';

export default function CaptureScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Captura</Text>
      <Text style={styles.subtitle}>Capture a imagem da prova</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Processing')}
      >
        <Text style={styles.buttonText}>Processar Prova</Text>
      </TouchableOpacity>
    </View>
  );
}