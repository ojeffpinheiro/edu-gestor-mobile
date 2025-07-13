import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Settings, Plus } from 'lucide-react-native';

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

const styles = StyleSheet.create({
  tabContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  settingsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  answerKeyText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  settingsButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default SettingsTab;