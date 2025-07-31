import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { Student } from '../types/newTypes';
import { useSelection } from './useSelection';
import useErrorSystem from './useErrorSystem';
import { LayoutAnimation } from 'react-native';

export const useStudentSelection = (initialSelectedStudents: Student[] = []) => {
  const errorSystem = useErrorSystem();
  
  const {
    selectedItems,
    toggleSelection,
    toggleSelectAll,
  } = useSelection<Student>({ initialSelectedItems: initialSelectedStudents });

  const handleStudentSelect = useCallback((student: Student) => {
    Haptics.selectionAsync();
    toggleSelection(student);
    
    // Configura animação
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    // Feedback ao usuário
    errorSystem.showCustomError({
      title: 'Seleção',
      message: `${student.name} ${selectedItems.some(s => s.id === student.id) ? 'removido' : 'selecionado'}`,
      haptic: true
    });
  }, [toggleSelection, selectedItems, errorSystem]);

  const handleSelectAll = useCallback((students: Student[]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleSelectAll(students);
  }, [toggleSelectAll]);

  return { handleStudentSelect, handleSelectAll };
};