import React from 'react';
import { View, Text } from 'react-native';
import { Settings, Plus } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import createSettingsTabStyles from './SettingsTabStyles';
import Button from '../common/Button';

const SettingsTab = ({ answerKey }) => {
  const { colors } = useTheme();
  const styles = createSettingsTabStyles(colors);

  return (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Configurações</Text>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsLabel}>Gabarito Atual</Text>
        <Text style={styles.answerKeyText}>{answerKey.join(', ')}</Text>

        <Button
          variant="outline"
          onPress={() => { }}
          icon={<Settings size={20} color={colors.gray[500]} />}
          title="Editar Gabarito"
          style={styles.settingsButton}
          textStyle={styles.settingsButtonText}
        />
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsLabel}>Configurações da Prova</Text>
        <Button
          variant="outline"
          onPress={() => { }}
          icon={<Plus size={20} color={colors.gray[500]} />}
          title="Nova Prova"
          style={styles.settingsButton}
          textStyle={styles.settingsButtonText}
        />
      </View>
    </View>
  );
};

export default SettingsTab;