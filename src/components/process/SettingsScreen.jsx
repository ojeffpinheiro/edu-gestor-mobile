import { View, Text, TextInput, Switch, ScrollView } from 'react-native';
import { FileText, Scan, Settings, Download } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import createSettingsScreenStyles from './SettingsScreenStyles';
import Button from '../common/Button';

const SettingsScreen = ({ examTemplate, onExamTemplateChange }) => {
  const { colors } = useTheme();
  const styles = createSettingsScreenStyles(colors);
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <FileText size={20} color="#2563eb" />
          <Text style={styles.sectionTitle}>Configurações da Prova</Text>
        </View>
        
        {examTemplate && (
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nome da Prova</Text>
              <TextInput
                style={styles.input}
                value={examTemplate.name}
                onChangeText={(text) => onExamTemplateChange({...examTemplate, name: text})}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Número de Questões</Text>
              <TextInput
                style={styles.input}
                value={String(examTemplate.questions)}
                onChangeText={(text) => onExamTemplateChange({...examTemplate, questions: parseInt(text) || 0})}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Alternativas</Text>
              <TextInput
                style={styles.input}
                value={examTemplate.alternatives.join(', ')}
                onChangeText={(text) => onExamTemplateChange({...examTemplate, alternatives: text.split(', ')})}
              />
            </View>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Scan size={20} color="#2563eb" />
          <Text style={styles.sectionTitle}>Processamento de Imagem</Text>
        </View>
        
        <View style={styles.switchGroup}>
          <Text style={styles.switchLabel}>Detecção automática de bordas</Text>
          <Switch value={true} />
        </View>
        
        <View style={styles.switchGroup}>
          <Text style={styles.switchLabel}>Correção de perspectiva</Text>
          <Switch value={true} />
        </View>
        
        <View style={styles.switchGroup}>
          <Text style={styles.switchLabel}>Validação de confiança</Text>
          <Switch value={true} />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Settings size={20} color="#2563eb" />
          <Text style={styles.sectionTitle}>Sistema</Text>
        </View>
        
        <Button
          title="Sincronizar com Sistema Escolar"
          onPress={() => {}}
          variant="outline"
          style={styles.systemButton}
          textStyle={styles.systemButtonText}
        />
        
        <Button
          title="Exportar Dados"
          onPress={() => {}}
          variant="primary"
          icon={<Download size={16} color="white" />}
          iconPosition="left"
          style={[styles.systemButton, styles.downloadButton]}
          textStyle={[styles.systemButtonText, styles.downloadButtonText]}
        />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;