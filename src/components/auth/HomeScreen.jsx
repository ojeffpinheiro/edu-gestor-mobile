import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import { styles } from './styles';

const HomeScreen = ({ setCurrentView }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <BookOpen size={32} color="#2563eb" />
          </View>
          <Text style={styles.title}>Correção Automatizada</Text>
          <Text style={styles.subtitle}>Sistema para correção de provas via scanner</Text>
        </View>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Como funciona:</Text>
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>• Autentique-se com sua senha</Text>
            <Text style={styles.infoItem}>• Escaneie o código da prova</Text>
            <Text style={styles.infoItem}>• Identifique o aluno</Text>
            <Text style={styles.infoItem}>• Capture a folha de resposta</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => setCurrentView('auth')}
        >
          <Text style={styles.buttonText}>Iniciar Correção</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;