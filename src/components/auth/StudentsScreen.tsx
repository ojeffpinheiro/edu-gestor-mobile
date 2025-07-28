
import React, { useMemo } from 'react';
import { View, Text, Animated, ScrollView, StatusBar } from 'react-native';
import { CheckCircle, Users, Sparkles, ArrowRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // ou react-native-linear-gradient

import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import SectionHeader from '../common/SectionHeader';
import { AnimationHelpers } from '../../styles/animations';
import SelectableListItem from '../SelectableListItem';
import { createStudentsScreenStyles } from './sudentsScreenStyles';
import { Student } from '../../types/newTypes';

interface StudentsScreenProps {
  scannedCode?: string;
  selectedStudent?: string | null;
  setSelectedStudent: (id: string) => void;
  setCurrentView: (view: string) => void;
}

const ANIMATION_CONFIG = {
  duration: 200,
  useNativeDriver: true
};

const STUDENT_LIST_CONFIG = {
  maxItemsToShow: 50,
  itemHeight: 80
};

const StudentsScreen = ({
  scannedCode,
  selectedStudent,
  setSelectedStudent,
  setCurrentView
}: StudentsScreenProps) => {
  const { colors } = useTheme();
  const styles = createStudentsScreenStyles(colors);
  const navigation = useNavigation();
  const scaleValue = AnimationHelpers.createAnimatedValue(1);

  // TODO: Substituir por dados reais da API
  const students: Student[] = [
    { id: '001', name: 'Ana Silva', class: '3A' },
    { id: '002', name: 'Carlos Santos', class: '3A' },
    { id: '003', name: 'Maria Oliveira', class: '3B' },
    { id: '004', name: 'João Pereira', class: '3B' }
  ];

  

  const selectedStudentData = useMemo(() => 
    students.find(s => s.id === selectedStudent), 
    [selectedStudent, students]
  );

  const handleStudentSelect = (id: string) => {
    AnimationHelpers.pressAnimation(scaleValue, () => {
      setSelectedStudent(id);
    });
  };

  if (students.length === 0) {
    return (
      <LinearGradient
        colors={[colors.background.primary, colors.background.secondary]}
        style={styles.screenContainer}
      >
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <View style={styles.emptyState}>
          <Users size={64} color={colors.text.secondary} />
          <Text style={styles.emptyTitle}>Nenhum aluno disponível</Text>
          <Text style={styles.emptySubtitle}>
            Verifique sua conexão e tente novamente
          </Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={[colors.background.primary, colors.background.secondary]}
        style={styles.screenContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Moderno */}
          <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={[colors.primary.main, colors.primary.dark]}
                  style={styles.iconGradient}
                >
                  <Users size={28} color="white" />
                </LinearGradient>
              </View>
              <View style={styles.headerText}>
                <Text style={styles.title}>Selecionar Aluno</Text>
                <Text style={styles.subtitle}>
                  Escolha o aluno para iniciar a prova
                </Text>
              </View>
            </View>
          </View>

          {/* Código Escaneado - Card Moderno */}
          {scannedCode && (
            <Animated.View style={[styles.codeCard, { opacity: 1 }]}>
              <LinearGradient
                colors={[`${colors.primary.main}15`, `${colors.primary.main}25`]}
                style={styles.codeCardGradient}
              >
                <View style={styles.codeHeader}>
                  <Sparkles size={20} color={colors.primary.main} />
                  <Text style={styles.codeLabel}>Código Identificado</Text>
                </View>
                <Text style={styles.codeValue}>{scannedCode}</Text>
              </LinearGradient>
            </Animated.View>
          )}

          {/* Preview do Aluno Selecionado */}
          {selectedStudentData && (
            <Animated.View style={styles.selectedPreview}>
              <LinearGradient
                colors={[colors.feedback.success + '20', colors.feedback.success + '10']}
                style={styles.previewGradient}
              >
                <CheckCircle size={24} color={colors.feedback.success} />
                <View style={styles.previewContent}>
                  <Text style={styles.previewName}>{selectedStudentData.name}</Text>
                  <Text style={styles.previewClass}>Turma {selectedStudentData.class}</Text>
                </View>
                <ArrowRight size={20} color={colors.feedback.success} />
              </LinearGradient>
            </Animated.View>
          )}

          {/* Lista de Alunos */}
          <View style={styles.studentsSection}>
            <Text style={styles.sectionTitle}>
              Alunos Disponíveis ({students.length})
            </Text>
            
            <View style={styles.studentsList}>
              {students.map((student, index) => (
                <Animated.View
                  key={student.id}
                  style={[
                    styles.studentCard,
                    {
                      transform: [{ 
                        scale: selectedStudent === student.id ? scaleValue : 1 
                      }]
                    }
                  ]}
                >
                  <SelectableListItem
                    student={student}
                    isSelected={selectedStudent === student.id}
                    onPress={() => handleStudentSelect(student.id)}
                    index={index}
                  />
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Botões com Design Moderno */}
          <View style={styles.actionsContainer}>
            <LinearGradient
              colors={
                selectedStudent 
                  ? [colors.primary.main, colors.primary.dark]
                  : [colors.component.disabled, colors.component.disabled]
              }
              style={[
                styles.primaryButton,
                !selectedStudent && styles.disabledButton
              ]}
            >
              <Button
                title="Continuar Prova"
                onPress={() => navigation.navigate('Capture' as never)}
                variant="ghost" // para não interferir com o gradient
                disabled={!selectedStudent}
                style={styles.buttonTransparent}
                textStyle={styles.primaryButtonText}
                icon={<ArrowRight size={20} color="white" />}
              />
            </LinearGradient>

            <Button
              title="Voltar ao Scanner"
              onPress={() => setCurrentView('scanner')}
              variant="secondary"
              style={styles.secondaryButton}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default StudentsScreen;