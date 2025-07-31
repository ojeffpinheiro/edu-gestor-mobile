import React, { useEffect, useMemo } from 'react';
import {
  View, Text, Animated, ScrollView,
  StatusBar, TouchableOpacity,
  FlatList, Platform,
  UIManager, LayoutAnimation
} from 'react-native';
import {
  CheckCircle, Users, Sparkles,
  ArrowRight, ChevronLeft,
  SearchIcon, X, Check
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { useTheme } from '../../context/ThemeContext';

import { useStudents } from '../../hooks/useStudents';
import useErrorSystem from '../../hooks/useErrorSystem';
import { useAnimation } from '../../hooks/useAnimation';
import { useSelection } from '../../hooks/useSelection';

import { AuthView, Student } from '../../types/newTypes';

import Button from '../common/Button';
import SectionHeader from '../common/SectionHeader';
import SearchBar from '../common/SearchBar';
import SelectionBar from '../common/SelectionBar';

import { createStudentsScreenStyles } from '../features/studentsScreenStyles';
import SelectionCounter from '../features/SelectionCounter';

import StudentCard from '../StudentCard';

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
  const { colors } = useTheme();
  const styles = createStudentsScreenStyles(colors);
  const navigation = useNavigation();
  const errorSystem = useErrorSystem();
  const { opacity, scale, animateIn, animateOut } = useAnimation({
    initialOpacity: 0,
    initialScale: 0.9
  });

  const {
    students,
    isLoading,
    searchTerm,
    filteredStudents,
    setSearchTerm,
    confirmSelection,
  } = useStudents();

  const {
    selectedItems: selectedStudents,
    toggleSelection: toggleStudentSelection,
    toggleSelectAll,
    clearSelection,
    isAllSelected,
    hasSelection,
    selectionBatch,
  } = useSelection<Student>({
    initialSelectedItems: students,
  });

  useEffect(() => {
    if (students.length > 0) {
      animateIn();
    } else {
      animateOut();
    }
  }, [students]);

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
    scale.setValue(0.95);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.spring(scale, {
      toValue: 1,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start();
    errorSystem.showCustomError({
      title: 'Seleção',
      message: `${student.name} ${selectedStudents.some(s => s.id === student.id) ? 'removido' : 'selecionado'}`,
      haptic: true
    });
  };

  const selectedStudentData = useMemo(() =>
    students.find(s => s.id === selectedStudent),
    [selectedStudent, students]
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <Text style={{ color: colors.text.primary }}>Carregando alunos...</Text>
      </View>
    );
  }

  const validateSearchInput = (text: string) => {
    if (text.length > 50) {
      errorSystem.showCustomError({
        title: 'Aviso',
        message: 'Busca muito longa (máx. 50 caracteres)'
      });
      return false;
    }
    return true;
  };

  const handleSearch = (text: string) => {
    if (validateSearchInput(text)) {
      setSearchTerm(text);
    }
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
                onPress={() => clearSelection()}
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
          icon={<Users size={24} color={colors.text.primary} />}
          onBack={() => setCurrentView('scanner')}
        />

        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={{ paddingBottom: 100 }}
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

            <SearchBar
              value={searchTerm}
              onChangeText={handleSearch}
              placeholder="Buscar alunos..." />
          </View>

          {/* Código Escaneado */}
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
              <SelectionCounter
                count={selectedStudents.length}
                total={filteredStudents.length}
              />
              <FlatList
                data={students}
                keyExtractor={item => item.id}
                getItemLayout={(__, index) => ({
                  length: STUDENT_LIST_CONFIG.itemHeight,
                  offset: STUDENT_LIST_CONFIG.itemHeight * index,
                  index,
                })}
                renderItem={({ item }) => (
                  <StudentCard
                    student={item}
                    isSelected={selectedStudents.some(s => s.id === item.id)}
                    onSelect={toggleStudentSelection}
                  />
                )}
                scrollEnabled={false}
                contentContainerStyle={styles.listContent}
                initialNumToRender={10}
                maxToRenderPerBatch={5}
                windowSize={5}
                updateCellsBatchingPeriod={50}
              />
            </View>
          </View>

          {hasSelection && (
            <Animated.View style={[
              styles.floatingActionBar,
              { backgroundColor: colors.background.secondary, shadowColor: colors.primary.main }
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

          {/* Botões */}
          <View style={styles.actionsContainer}>
            <LinearGradient
              colors={
                selectedStudent
                  ? [colors.primary.main, colors.primary.dark]
                  : [colors.component.disabled, colors.component.disabled]
              }
              style={[styles.primaryButton, !selectedStudent && styles.disabledButton]}
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

        <SelectionBar
          selectedCount={selectedStudents.length}
          totalCount={filteredStudents.length}
          onSelectAll={() => toggleSelectAll(filteredStudents)}
          onDeselectAll={clearSelection}
          onConfirm={confirmSelection}
          isAllSelected={isAllSelected(filteredStudents)}
          confirmLabel="Confirmar seleção"
          style={styles.selectionBar}
        />
      </LinearGradient>
      {selectionBatch > 1 && (
        <View style={styles.batchSelectionIndicator}>
          <Text style={styles.batchSelectionText}>
            +{selectionBatch}
          </Text>
        </View>
      )}
    </>
  );
};

export default StudentsScreen;