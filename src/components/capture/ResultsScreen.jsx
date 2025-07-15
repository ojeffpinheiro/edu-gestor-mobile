import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';

const ResultsScreen = ({ results }) => {
  if (!results || !results.success) {
    return (
      <View style={styles.container}>
        <Text>Erro no processamento: {results?.error || 'Desconhecido'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resultados da Prova</Text>
      
      {results.questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>
            Questão {question.question}: {question.markedOption || 'Nenhuma'}
          </Text>
          {question.options.filter(o => o.filled).length > 1 && (
            <Text style={styles.warningText}> (Múltiplas marcações detectadas)</Text>
          )}
        </View>
      ))}
      
      {results.validation.errors.length > 0 && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Problemas encontrados:</Text>
          {results.validation.errors.map((error, i) => (
            <Text key={i} style={styles.errorText}>- {error}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default ResultsScreen;