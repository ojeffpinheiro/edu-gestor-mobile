import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Settings, Plus } from 'lucide-react-native';
import styles from './SettingsTabStyles';

const SettingsTab = ({ answerKey }) => {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Configurações</Text>
      
      <View style={styles.settingsSection}>
        <Text style={styles.settingsLabel}>Gabarito Atual</Text>
        <Text style={styles.answerKeyText}>{answerKey.join(', ')}</Text>
        
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={20} color="#6B7280" />
          <Text style={styles.settingsButtonText}>Editar Gabarito</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsLabel}>Configurações da Prova</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Plus size={20} color="#6B7280" />
          <Text style={styles.settingsButtonText}>Nova Prova</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsTab;