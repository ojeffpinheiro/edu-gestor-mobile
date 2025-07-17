import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Users, CheckCircle } from 'lucide-react-native';
import { createMainStyles } from '../../styles/mainStyles';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, BorderRadius, Typography } from '../../styles/designTokens';

const students = [
  { id: '001', name: 'Ana Silva', class: '3A' },
  { id: '002', name: 'Carlos Santos', class: '3A' },
  { id: '003', name: 'Maria Oliveira', class: '3B' },
  { id: '004', name: 'João Pereira', class: '3B' }
];

const StudentsScreen = ({ navigation, scannedCode, selectedStudent, setSelectedStudent, setCurrentView }) => {
  const { colors } = useTheme();
  const styles = createMainStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={localStyles.header}>
          <View style={[localStyles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
            <Users size={24} color={colors.primary} />
          </View>
          <Text style={styles.title}>Identificação de Aluno</Text>
          <Text style={styles.subtitle}>Selecione o aluno para esta prova</Text>
        </View>

        {scannedCode && (
          <View style={[localStyles.infoBox, { backgroundColor: colors.primary + '10' }]}>
            <Text style={[localStyles.infoText, { color: colors.primary }]}>
              <Text style={{ fontWeight: Typography.fontWeight.bold }}>Código: </Text>
              <Text>{scannedCode?.toString() || ''}</Text>
            </Text>
          </View>
        )}

        <ScrollView style={localStyles.studentsList}>
          {students.map((student) => (
            <TouchableOpacity
              key={student.id}
              style={[
                localStyles.studentItem,
                { borderColor: colors.border },
                selectedStudent === student.id && { borderColor: colors.primary, backgroundColor: colors.primary + '10' }
              ]}
              onPress={() => setSelectedStudent(student.id)}
            >
              <View style={localStyles.studentInfo}>
                <Text style={[localStyles.studentName, { color: colors.textPrimary }]}>{student.name}</Text>
                <Text style={[localStyles.studentClass, { color: colors.textSecondary }]}>Turma: {student.class}</Text>
              </View>
              <View style={localStyles.studentIdContainer}>
                <Text style={[localStyles.studentId, { color: colors.textSecondary }]}>ID: {student.id}</Text>
                {selectedStudent === student.id && (
                  <CheckCircle size={20} color={colors.primary} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selectedStudent && (
          <View style={[localStyles.successBox, { borderColor: colors.success, backgroundColor: colors.success + '10' }]}>
            <View style={localStyles.successHeader}>
              <CheckCircle size={20} color={colors.success} />
              <Text style={[localStyles.successTitle, { color: colors.success }]}>Aluno Selecionado</Text>
            </View>
            <Text style={[localStyles.successText, { color: colors.success }]}>
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
          style={[styles.secondaryButton, { borderColor: colors.border }]}
          onPress={() => setCurrentView('scanner')}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.textSecondary }]}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const localStyles = {
  header: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  iconContainer: {
    borderRadius: BorderRadius.round,
    width: Spacing.xxxl + Spacing.xs, // 64
    height: Spacing.xxxl + Spacing.xs, // 64
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  infoBox: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  infoText: {
    fontSize: Typography.fontSize.sm,
  },
  studentsList: {
    maxHeight: 300,
    marginBottom: Spacing.lg,
  },
  studentItem: {
    borderWidth: 2,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  studentInfo: {
    marginBottom: Spacing.xs,
  },
  studentName: {
    fontWeight: Typography.fontWeight.semibold,
    fontSize: Typography.fontSize.md,
  },
  studentClass: {
    fontSize: Typography.fontSize.sm,
  },
  studentIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  studentId: {
    fontSize: Typography.fontSize.sm,
  },
  successBox: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xxs,
  },
  successTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: Spacing.xs,
  },
  successText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    marginLeft: Spacing.xxl,
  },
};

export default StudentsScreen;