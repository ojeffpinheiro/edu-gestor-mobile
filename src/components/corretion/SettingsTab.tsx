import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Settings, Plus } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import { createSettingsTabStyles } from './SettingsTabStyles';

interface SettingsTabProps {
  answerKey?: string[];
  onAnswerKeyChange?: (answerKey: string[]) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  answerKey = [],
  onAnswerKeyChange = () => { }
}) => {
  const { colors } = useTheme();
  const styles = createSettingsTabStyles(colors);
  const [inputValue, setInputValue] = useState(answerKey.join(', '));
  const [error, setError] = useState('');

  const validateAndSave = () => {
    const answers = inputValue.split(',').map(a => a.trim().toUpperCase());

    if (answers.length === 0) {
      setError('O gabarito não pode estar vazio');
      return false;
    }

    const invalidAnswers = answers.filter(a => !['A', 'B', 'C', 'D'].includes(a));
    if (invalidAnswers.length > 0) {
      setError(`Respostas inválidas: ${invalidAnswers.join(', ')}. Use apenas A, B, C ou D.`);
      return false;
    }

    setError('');
    onAnswerKeyChange(answers);
    return true;
  };

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
          onPress={validateAndSave}
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
          onPress={() => { }}
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