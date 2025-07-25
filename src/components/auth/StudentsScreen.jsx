import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import { Users, CheckCircle, ChevronLeft } from 'lucide-react-native';
import { createMainStyles } from '../../styles/mainStyles';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, BorderRadius, Typography, Shadow } from '../../styles/designTokens';
import { useNavigation } from '@react-navigation/native';
import Button from '../common/Button';
import Card from '../common/Card';

const students = [
  { id: '001', name: 'Ana Silva', class: '3A' },
  { id: '002', name: 'Carlos Santos', class: '3A' },
  { id: '003', name: 'Maria Oliveira', class: '3B' },
  { id: '004', name: 'João Pereira', class: '3B' }
];

const StudentsScreen = ({ scannedCode, selectedStudent, setSelectedStudent, setCurrentView }) => {
  const { colors } = useTheme();
  const styles = createMainStyles(colors);
  const navigation = useNavigation()
  const scaleValue = new Animated.Value(1);

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      })
    ]).start();
  };

  const handleStudentSelect = (id) => {
    animatePress();
    setSelectedStudent(id);
  };

  return (
    <View style={styles.container}>
      <Card variant='elevated' style={{ padding: 0 }}>
        <View style={[localStyles.headerContainer, { backgroundColor: colors.primary }]}>
          <Button
            onPress={() => setCurrentView('scanner')}
            variant="ghost"
            icon={<ChevronLeft size={24} color={colors.card} />}
            style={localStyles.backButton}
          />
          <View style={localStyles.headerContent}>
            <Text style={[localStyles.headerTitle, { color: colors.card }]}>Identificação de Aluno</Text>
            <Text style={[localStyles.headerSubtitle, { color: colors.card + 'CC' }]}>
              Selecione o aluno para esta prova
            </Text>
          </View>
        </View>

        <View style={{ padding: Spacing.lg }}>
          {scannedCode && (
            <View style={[localStyles.infoBox, { backgroundColor: colors.primary + '10' }]}>
              <Text style={[localStyles.infoText, { color: colors.primary }]}>
                <Text style={{ fontWeight: Typography.fontWeight.bold }}>Código: </Text>
                <Text>{scannedCode?.toString() || ''}</Text>
              </Text>
            </View>
          )}

          <Text style={[localStyles.sectionTitle, { color: colors.textSecondary, marginBottom: Spacing.sm }]}>
            Lista de Alunos
          </Text>

          <ScrollView
            style={localStyles.studentsList}
            showsVerticalScrollIndicator={false}
          >
            {students.map((student) => (
              <Animated.View
                key={student.id}
                style={{
                  transform: [{ scale: selectedStudent === student.id ? scaleValue : 1 }]
                }}
              >
                <TouchableOpacity
                  style={[
                    localStyles.studentItem,
                    {
                      borderColor: colors.border,
                      backgroundColor: colors.card,
                      ...Shadow(colors).button
                    },
                    selectedStudent === student.id && {
                      borderColor: colors.primary,
                      backgroundColor: colors.primary + '10',
                    }
                  ]}
                  onPress={() => handleStudentSelect(student.id)}
                  activeOpacity={0.7}
                >
                  <View style={localStyles.studentInfo}>
                    <Text style={[localStyles.studentName, { color: colors.textPrimary }]}>
                      {student.name}
                    </Text>
                    <View style={localStyles.studentMeta}>
                      <Text style={[localStyles.studentClass, { color: colors.textSecondary }]}>
                        Turma: {student.class}
                      </Text>
                      <Text style={[localStyles.studentId, { color: colors.textSecondary }]}>
                        ID: {student.id}
                      </Text>
                    </View>
                  </View>
                  {selectedStudent === student.id && (
                    <View style={localStyles.checkIcon}>
                      <CheckCircle size={24} color={colors.primary} fill={colors.primary} />
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>

          {selectedStudent && (
            <View style={[
              localStyles.successBox,
              {
                borderColor: colors.success,
                backgroundColor: colors.success + '10',
                ...Shadow(colors).button
              }
            ]}>
              <View style={localStyles.successHeader}>
                <CheckCircle size={20} color={colors.success} />
                <Text style={[localStyles.successTitle, { color: colors.success }]}>
                  Aluno Selecionado
                </Text>
              </View>
              <Text style={[localStyles.successText, { color: colors.success }]}>
                {students.find(s => s.id === selectedStudent)?.name}
              </Text>
            </View>
          )}

          <View style={localStyles.buttonsContainer}>
            <Button
              title="Continuar para Captura"
              onPress={() => navigation.navigate('Capture')}
              variant="primary"
              disabled={!selectedStudent}
              style={{ marginBottom: Spacing.sm }}
            />

            <Button
              title="Voltar"
              onPress={() => setCurrentView('scanner')}
              variant="outline"
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

const localStyles = {
  headerContainer: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    marginBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: Spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xxs,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.sm,
  },
  infoBox: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  infoText: {
    fontSize: Typography.fontSize.sm,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  studentsList: {
    maxHeight: 300,
    marginBottom: Spacing.lg,
  },
  studentItem: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontWeight: Typography.fontWeight.semibold,
    fontSize: Typography.fontSize.md,
    marginBottom: Spacing.xxs,
  },
  studentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  studentClass: {
    fontSize: Typography.fontSize.sm,
  },
  studentId: {
    fontSize: Typography.fontSize.sm,
  },
  checkIcon: {
    marginLeft: Spacing.sm,
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
  buttonsContainer: {
    marginTop: Spacing.sm,
  },
};

export default StudentsScreen;