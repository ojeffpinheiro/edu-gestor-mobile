import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { X, CheckCircle, Download } from 'lucide-react-native';
import styles from './styles';

const ResultsScreen = ({ results, setCurrentScreen }) => (
  <View style={styles.resultsContainer}>
    <View style={styles.maxWidthContainer}>
      <View style={styles.screenHeader}>
        <TouchableOpacity
          onPress={() => setCurrentScreen('home')}
          style={styles.headerButton}
        >
          <X size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Resultados</Text>
        <View style={{ width: 32 }} />
      </View>

      {results && (
        <ScrollView contentContainerStyle={styles.resultsContent}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreText}>{results.score}%</Text>
            <Text style={styles.scoreSubtext}>
              {results.correctAnswers} de {results.totalQuestions} questões
            </Text>
          </View>

          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>Detalhes por Questão</Text>
            <ScrollView style={styles.detailsList}>
              {results.details.map((detail, index) => (
                <View key={index} style={styles.detailItem}>
                  <Text style={styles.detailQuestion}>Q{detail.question}</Text>
                  <View style={styles.detailAnswerContainer}>
                    <Text style={styles.detailAnswer}>
                      {detail.studentAnswer} → {detail.correctAnswer}
                    </Text>
                    {detail.isCorrect ? (
                      <CheckCircle size={16} color="#16a34a" />
                    ) : (
                      <X size={16} color="#dc2626" />
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity
            onPress={() => Alert.alert('Sucesso', 'Resultados exportados com sucesso!')}
            style={[styles.button, styles.primaryButton, styles.exportButton]}
          >
            <Download size={20} color="white" />
            <Text style={styles.buttonText}>Exportar Resultados</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  </View>
);

export default ResultsScreen;