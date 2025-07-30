import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { mockStudents } from '../mocks/scannerMocks';
import { Student } from '../types/newTypes';
import { useUserFeedback } from './useUserFeedback';

interface UseStudentsProps {
  initialSelectedStudents?: Student[];
}

const PAGE_SIZE = 10;

export const useStudents = ({ initialSelectedStudents = [] }: UseStudentsProps = {}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>(initialSelectedStudents);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { showFeedback } = useUserFeedback();

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
      showFeedback({
        type: 'error',
        message: 'Erro ao confirmar seleção',
        useAlert: true
      });
      Alert.alert('Nenhum aluno selecionado', 'Por favor, selecione pelo menos um aluno.');
      return false;
    }

    // Aqui você pode adicionar lógica adicional antes de confirmar
    console.log('Alunos selecionados:', selectedStudents);
    showFeedback({
      type: 'success',
      message: 'Aluno(s) selecionado(s) com sucesso!',
      haptic: true
    });
    return true;
  };

  // Limpa seleção
  const clearSelection = () => {
    setSelectedStudents([]);
  };

  const fetchStudents = async (page: number): Promise<Student[]> => {
    try {
      // Simulando chamada à API com paginação
      await new Promise(resolve => setTimeout(resolve, 500));

      // Filtra os mockStudents para simular paginação
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      return mockStudents.slice(startIndex, endIndex);
    } catch (error) {
      throw error;
    }
  };

  const loadMoreStudents = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const newStudents = await fetchStudents(nextPage);

      setStudents(prev => [...prev, ...newStudents]);
      setCurrentPage(nextPage);
      setHasMore(newStudents.length === PAGE_SIZE);
    } catch (error) {
      showFeedback({
        type: 'error',
        message: 'Falha ao carregar mais alunos',
        useAlert: true
      });
    } finally {
      setIsLoading(false);
    }
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