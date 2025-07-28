import React from 'react';
import { View, Text } from 'react-native';
import { Settings, Plus } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import { createSettingsTabStyles } from './SettingsTabStyles';

interface SettingsTabProps {
  answerKey?: string[];
}

const SettingsTab: React.FC<SettingsTabProps> = ({ answerKey = [] }) => {
  const { colors } = useTheme();
  const styles = createSettingsTabStyles(colors);

  return (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Configurações</Text>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsLabel}>Gabarito Atual</Text>
        <Text style={styles.answerKeyText}>
          {answerKey.length > 0 ? answerKey.join(', ') : 'Nenhum gabarito definido'}
        </Text>

        <Button
          variant="outline"
          onPress={() => {}}
          icon={<Settings size={20} color={colors.text.secondary} />}
          title="Editar Gabarito"
          style={styles.settingsButton}
          textStyle={styles.settingsButtonText}
        />
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsLabel}>Configurações da Prova</Text>
        <Button
          variant="outline"
          onPress={() => {}}
          icon={<Plus size={20} color={colors.text.secondary} />}
          title="Nova Prova"
          style={styles.settingsButton}
          textStyle={styles.settingsButtonText}
        />
      </View>
    </View>
  );
};

export default SettingsTab;