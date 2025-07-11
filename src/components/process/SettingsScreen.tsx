import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';
import { FileText, Scan, Settings, Download } from 'lucide-react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#2563eb',
  },
  form: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  switchLabel: {
    flex: 1,
  },
  systemButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  systemButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  downloadButton: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#4b5563',
  },
  downloadButtonText: {
    color: 'white',
  },
});

export default SettingsScreen;