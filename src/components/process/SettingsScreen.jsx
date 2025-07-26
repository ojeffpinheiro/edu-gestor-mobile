import { View, Text, TextInput, Switch, ScrollView } from 'react-native';
import { FileText, Scan, Settings, Download } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import { createSettingsScreenStyles } from './SettingsScreenStyles';

const SettingsScreen = ({ examTemplate, onExamTemplateChange }) => {
  const { colors } = useTheme();
  const styles = createSettingsScreenStyles(colors);
  
  return (
    <ScrollView style={styles.screenContainer}>
      <Text style={styles.heading1}>Configurações</Text>
      
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <FileText size={20} color={colors.primary.main} />
          <Text style={styles.heading2}>Configurações da Prova</Text>
        </View>
        
        {examTemplate && (
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nome da Prova</Text>
              <TextInput
                style={styles.input}
                value={examTemplate.name}
                onChangeText={(text) => onExamTemplateChange({...examTemplate, name: text})}
                placeholderTextColor={colors.text.secondary}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Número de Questões</Text>
              <TextInput
                style={styles.input}
                value={String(examTemplate.questions)}
                onChangeText={(text) => onExamTemplateChange({...examTemplate, questions: parseInt(text) || 0})}
                keyboardType="numeric"
                placeholderTextColor={colors.text.secondary}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Alternativas</Text>
              <TextInput
                style={styles.input}
                value={examTemplate.alternatives.join(', ')}
                onChangeText={(text) => onExamTemplateChange({...examTemplate, alternatives: text.split(', ')})}
                placeholderTextColor={colors.text.secondary}
              />
            </View>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Scan size={20} color={colors.primary.main} />
          <Text style={styles.heading2}>Processamento de Imagem</Text>
        </View>
        
        <View style={styles.switchGroup}>
          <Text style={styles.bodyText}>Detecção automática de bordas</Text>
          <Switch 
            value={true}
            trackColor={{ true: colors.primary.main, false: colors.border.light }}
            thumbColor={colors.background.secondary}
          />
        </View>
        
        <View style={styles.switchGroup}>
          <Text style={styles.bodyText}>Correção de perspectiva</Text>
          <Switch 
            value={true}
            trackColor={{ true: colors.primary.main, false: colors.border.light }}
            thumbColor={colors.background.secondary}
          />
        </View>
        
        <View style={styles.switchGroup}>
          <Text style={styles.bodyText}>Validação de confiança</Text>
          <Switch 
            value={true}
            trackColor={{ true: colors.primary.main, false: colors.border.light }}
            thumbColor={colors.background.secondary}
          />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Settings size={20} color={colors.primary.main} />
          <Text style={styles.heading2}>Sistema</Text>
        </View>
        
        <Button
          title="Sincronizar com Sistema Escolar"
          onPress={() => {}}
          variant="secondary"
          style={styles.button}
        />
        
        <Button
          title="Exportar Dados"
          onPress={() => {}}
          variant="primary"
          icon={<Download size={16} color={colors.text.onPrimary} />}
          iconPosition="left"
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;