import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, BookOpen, Scan, CheckCircle, FileText } from 'lucide-react-native';
import styles from './styles';

const WelcomeScreen = ({ setCurrentView, capturedImages, processImages, results, clearData }) => (
  <View style={styles.homeContainer}>
    <View style={styles.maxWidthContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <FileText size={48} color="#3b82f6" />
        </View>
        <Text style={styles.title}>EduScan</Text>
        <Text style={styles.subtitle}>Correção Automatizada de Provas</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setCurrentView('camera')}
          style={[styles.button, styles.primaryButton]}
        >
          <Camera size={24} color="white" />
          <Text style={styles.buttonText}>Capturar Provas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCurrentView('gallery')}
          style={[styles.button, styles.secondaryButton]}
        >
          <BookOpen size={24} color="#374151" />
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Provas Capturadas ({capturedImages.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={processImages}
          disabled={capturedImages.length === 0}
          style={[
            styles.button,
            capturedImages.length === 0 
              ? styles.disabledButton 
              : styles.successButton
          ]}
        >
          <Scan size={24} color={capturedImages.length === 0 ? "#6b7280" : "white"} />
          <Text style={[
            styles.buttonText,
            capturedImages.length === 0 && styles.disabledButtonText
          ]}>
            Processar Provas
          </Text>
        </TouchableOpacity>

        {results && (
          <TouchableOpacity
            onPress={() => setCurrentView('results')}
            style={[styles.button, styles.purpleButton]}
          >
            <CheckCircle size={24} color="white" />
            <Text style={styles.buttonText}>Ver Resultados</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        onPress={clearData}
        style={styles.clearButton}
      >
        <Text style={styles.clearButtonText}>Limpar Dados</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default WelcomeScreen;