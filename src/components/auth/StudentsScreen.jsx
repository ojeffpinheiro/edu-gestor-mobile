import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Users, CheckCircle } from 'lucide-react-native';
import { styles } from './styles';

const students = [
  { id: '001', name: 'Ana Silva', class: '3A' },
  { id: '002', name: 'Carlos Santos', class: '3A' },
  { id: '003', name: 'Maria Oliveira', class: '3B' },
  { id: '004', name: 'João Pereira', class: '3B' }
];

const StudentsScreen = ({ navigation, scannedCode, selectedStudent, setSelectedStudent }) => {   return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Users size={24} color="#2563eb" />
          </View>
          <Text style={styles.title}>Identificação de Aluno</Text>
          <Text style={styles.subtitle}>Selecione o aluno para esta prova</Text>
        </View>
        
        {scannedCode && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              <Text style={{fontWeight: 'bold'}}>Código:</Text> {scannedCode}
            </Text>
          </View>
        )}
        
        <ScrollView style={styles.studentsList}>
          {students.map((student) => (
            <TouchableOpacity
              key={student.id}
              style={[
                styles.studentItem,
                selectedStudent === student.id && styles.selectedStudent
              ]}
              onPress={() => setSelectedStudent(student.id)}
            >
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentClass}>Turma: {student.class}</Text>
              </View>
              <View style={styles.studentIdContainer}>
                <Text style={styles.studentId}>ID: {student.id}</Text>
                {selectedStudent === student.id && (
                  <CheckCircle size={20} color="#2563eb" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {selectedStudent && (
          <View style={styles.successBox}>
            <View style={styles.successHeader}>
              <CheckCircle size={20} color="#16a34a" />
              <Text style={styles.successTitle}>Aluno Selecionado</Text>
            </View>
            <Text style={styles.successText}>
              {students.find(s => s.id === selectedStudent)?.name}
            </Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={[styles.primaryButton, !selectedStudent && styles.disabledButton]}
          onPress={() => navigation.navigate('Capture')}
          disabled={!selectedStudent}
        >
          <Text style={styles.buttonText}>Continuar para Captura</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentView('scanner')}
        >
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StudentsScreen;