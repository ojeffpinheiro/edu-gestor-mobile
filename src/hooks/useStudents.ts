import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { mockStudents } from '../mocks/scannerMocks';
import { Student } from '../types/newTypes';

interface UseStudentsProps {
  initialSelectedStudents?: Student[];
}

export const useStudents = ({ initialSelectedStudents = [] }: UseStudentsProps = {}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>(initialSelectedStudents);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Carrega os alunos (mock ou API)
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setIsLoading(true);
        // Simula chamada assíncrona
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Aqui viria a chamada real à API
        // const response = await api.get('/students');
        // setStudents(response.data);
        
        // Usando mock por enquanto
        setStudents(mockStudents);
      } catch (err) {
        setError('Falha ao carregar alunos');
        console.error('Error loading students:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadStudents();
  }, []);

  // Filtra alunos baseado no termo de pesquisa
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.registrationNumber.includes(searchTerm)
  );

  // Alterna seleção de aluno
  const toggleStudentSelection = (student: Student) => {
    setSelectedStudents(prev => {
      const isSelected = prev.some(s => s.id === student.id);
      if (isSelected) {
        return prev.filter(s => s.id !== student.id);
      } else {
        return [...prev, student];
      }
    });
  };

  // Seleção múltipla (para selecionar/desselecionar todos)
  const toggleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents([...filteredStudents]);
    }
  };

  // Confirma seleção (pode ser usado para navegação ou outras ações)
  const confirmSelection = () => {
    if (selectedStudents.length === 0) {
      Alert.alert('Nenhum aluno selecionado', 'Por favor, selecione pelo menos um aluno.');
      return false;
    }
    
    // Aqui você pode adicionar lógica adicional antes de confirmar
    console.log('Alunos selecionados:', selectedStudents);
    return true;
  };

  // Limpa seleção
  const clearSelection = () => {
    setSelectedStudents([]);
  };

  return {
    students: filteredStudents,
    selectedStudents,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    toggleStudentSelection,
    toggleSelectAll,
    confirmSelection,
    clearSelection,
    isAllSelected: selectedStudents.length === filteredStudents.length && filteredStudents.length > 0,
    hasSelection: selectedStudents.length > 0,
  };
};