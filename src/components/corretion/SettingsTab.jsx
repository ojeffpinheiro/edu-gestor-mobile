import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Settings, Plus } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import createSettingsTabStyles from './SettingsTabStyles';

const SettingsTab = ({ answerKey }) => {
  const { colors } = useTheme();
  const styles = createSettingsTabStyles(colors);

  return (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Configurações</Text>
      
      <View style={styles.settingsSection}>
        <Text style={styles.settingsLabel}>Gabarito Atual</Text>
        <Text style={styles.answerKeyText}>{answerKey.join(', ')}</Text>
        
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={20} color={colors.gray[500]} />
          <Text style={styles.settingsButtonText}>Editar Gabarito</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsLabel}>Configurações da Prova</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Plus size={20} color={colors.gray[500]} />
          <Text style={styles.settingsButtonText}>Nova Prova</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsTab;