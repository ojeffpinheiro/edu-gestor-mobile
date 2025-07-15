import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { FileText, Scan, Settings, Download } from 'lucide-react-native';
import styles from './SettingsScreenStyles';

const SettingsScreen = ({ examTemplate, onExamTemplateChange }) => {
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
        
        <TouchableOpacity style={styles.systemButton}>
          <Text style={styles.systemButtonText}>Sincronizar com Sistema Escolar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.systemButton, styles.downloadButton]}>
          <Download size={16} color="white" />
          <Text style={[styles.systemButtonText, styles.downloadButtonText]}>Exportar Dados</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;