import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, ScanLine, CheckCircle } from 'lucide-react-native';
import { styles } from './styles';

const ScannerScreen = ({ setCurrentView, scannedCode, setScannedCode }) => {
  const [scannerActive, setScannerActive] = useState(false);

  const simulateBarcodeScan = () => {
    const mockCodes = ['PROVA001', 'TURMA3A', 'TURMA3B', 'PROVA002'];
    const randomCode = mockCodes[Math.floor(Math.random() * mockCodes.length)];
    setScannedCode(randomCode);
    setScannerActive(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <ScanLine size={24} color="#2563eb" />
          </View>
          <Text style={styles.title}>Scanner de Código</Text>
          <Text style={styles.subtitle}>Escaneie o código da prova ou turma</Text>
        </View>
        
        <View style={styles.scannerPlaceholder}>
          {scannerActive ? (
            <View style={styles.scannerActive}>
              <Camera size={32} color="#2563eb" />
              <Text style={styles.scannerText}>Escaneando...</Text>
            </View>
          ) : (
            <View style={styles.scannerInactive}>
              <ScanLine size={32} color="#9ca3af" />
              <Text style={styles.scannerText}>Clique para iniciar o scanner</Text>
            </View>
          )}
        </View>
        
        {scannedCode && (
          <View style={styles.successBox}>
            <View style={styles.successHeader}>
              <CheckCircle size={20} color="#16a34a" />
              <Text style={styles.successTitle}>Código Detectado</Text>
            </View>
            <Text style={styles.successCode}>{scannedCode}</Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={[styles.primaryButton, scannerActive && styles.disabledButton]}
          onPress={() => {
            setScannerActive(true);
            setTimeout(simulateBarcodeScan, 2000);
          }}
          disabled={scannerActive}
        >
          <Text style={styles.buttonText}>
            {scannerActive ? 'Escaneando...' : 'Iniciar Scanner'}
          </Text>
        </TouchableOpacity>
        
        {scannedCode && (
          <TouchableOpacity 
            style={styles.successButton}
            onPress={() => setCurrentView('students')}
          >
            <Text style={styles.buttonText}>Continuar para Identificação</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentView('auth')}
        >
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScannerScreen;