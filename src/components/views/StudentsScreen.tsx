import React, { useMemo, useRef } from 'react';
import { View, Text, Animated, ScrollView, StatusBar, TouchableOpacity, TextInput, FlatList, Platform, UIManager, LayoutAnimation } from 'react-native';
import { CheckCircle, Users, Sparkles, ArrowRight, ChevronLeft, SearchIcon, X, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // ou react-native-linear-gradient
import * as Haptics from 'expo-haptics';

import { useTheme } from '../../context/ThemeContext';
import { useStudents } from '../../hooks/useStudents';

import { AuthView, Student } from '../../types/newTypes';

import Button from '../common/Button';

import SectionHeader from '../common/SectionHeader';

import { createStudentsScreenStyles } from './sudentsScreenStyles';

interface StudentsScreenProps {
  scannedCode?: string;
  selectedStudent?: string | null;
  setSelectedStudent: (id: string) => void;
  setCurrentView: (view: AuthView) => void;
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
  const navigation = useNavigation();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const { colors } = useTheme();
  const styles = createStudentsScreenStyles(colors);
  const {
    students,
    selectedStudents,
    isLoading,
    searchTerm,
    setSearchTerm,
    toggleStudentSelection,
    toggleSelectAll,
    confirmSelection,
    isAllSelected,
    hasSelection, clearSelection
  } = useStudents();

  const handleStudentSelect = (student: Student) => {
    Haptics.selectionAsync();
    toggleStudentSelection(student);

    // Feedback tátil
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    // Animação mais suave
    scaleValue.setValue(0.95);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const selectedStudentData = useMemo(() =>
    students.find(s => s.id === selectedStudent),
    [selectedStudent, students]
  );

  const renderItem = ({ item }: { item: Student }) => {
    const isSelected = selectedStudents.some(s => s.id === item.id);
    return (
      <Animated.View
        style={[
          styles.studentCard,
          isSelected && styles.selectedCard,
          { transform: [{ scale: scaleValue }] }
        ]}>
        <TouchableOpacity
          onPress={() => handleStudentSelect(item)}
          activeOpacity={0.7}
          accessibilityLabel={`Selecionar aluno ${item.name}`}
          accessibilityHint={`${selectedStudents.some(s => s.id === item.id) ? 'Desselecionar' : 'Selecionar'} aluno ${item.name} da turma ${item.class}`}
          accessibilityRole="button"
        >
          <View style={styles.studentAvatar}>
            <Text style={styles.studentInitial}>{item.name.charAt(0)}</Text>
          </View>

          <View style={styles.studentInfoContainer}>
            <Text style={styles.studentName}>{item.name}</Text>
            <Text style={styles.studentDetails}>
              {item.registrationNumber} • Turma {item.class}
            </Text>
          </View>

          <View style={[
            styles.selectionBadge,
            selectedStudents.some(s => s.id === item.id) && styles.selectedBadge
          ]}>
            {selectedStudents.some(s => s.id === item.id) && (
              <Check size={16} color="white" />
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <Text style={{ color: colors.text.primary }}>Carregando alunos...</Text>
      </View>
    );
  }

  if (students.length === 0) {
    return (
      <LinearGradient
        colors={[colors.background.primary, colors.background.secondary]}
        style={styles.screenContainer}
      >
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <View style={styles.emptyState}>
          <Users size={64} color={colors.text.secondary} />
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIllustration}>
              <Users size={72} color={colors.text.secondary} />
            </View>
            <Text style={styles.emptyTitle}>Nenhum aluno encontrado</Text>
            <Text style={styles.emptyDescription}>
              {searchTerm
                ? 'Nenhum aluno corresponde à sua busca. Tente outro termo.'
                : 'Verifique sua conexão ou contate o administrador.'}
            </Text>
            {searchTerm ? (
              <TouchableOpacity
                onPress={() => setSearchTerm('')}
                style={styles.emptyActionButton}
              >
                <Text style={styles.emptyActionText}>Limpar busca</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => clearSelection()} // Supondo que tenha essa função
                style={styles.emptyActionButton}
              >
                <Text style={styles.emptyActionText}>Tentar novamente</Text>
              </TouchableOpacity>
            )}
          </View>
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
        <SectionHeader
          title="Identificação de Aluno"
          subtitle="Selecione o aluno para esta prova"
          icon='users'
          onBack={() => setCurrentView('scanner')}
        />

        <ScrollView
          style={styles.scrollContent}
        >
          {/* Header Moderno */}
          <View style={styles.headerContainer}>
            <View style={styles.headerRow}>
              <TouchableOpacity
                onPress={() => setCurrentView('scanner')}
                style={styles.backButton}
              >
                <ChevronLeft size={24} color={colors.text.primary} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Seleção de Alunos</Text>
            </View>

            <View style={styles.searchContainer}>
              <SearchIcon size={20} color={colors.text.secondary} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar por nome ou turma..."
                placeholderTextColor={colors.text.tertiary}
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
              {searchTerm ? (
                <TouchableOpacity onPress={() => setSearchTerm('')} style={styles.clearSearchButton}>
                  <X size={20} color={colors.text.secondary} />
                </TouchableOpacity>
              ) : null}
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
              <FlatList
                data={students}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
              />
            </View>
          </View>

          {hasSelection && (
            <Animated.View style={[
              styles.floatingActionBar,
              {
                backgroundColor: colors.background.secondary,
                shadowColor: colors.primary.main,
              }
            ]}>
              <Text style={styles.selectionCountText}>
                {selectedStudents.length} selecionado(s)
              </Text>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmSelection}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
                <ArrowRight size={20} color="white" style={styles.confirmIcon} />
              </TouchableOpacity>
            </Animated.View>
          )}

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
                variant="ghost"
                disabled={!hasSelection}
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