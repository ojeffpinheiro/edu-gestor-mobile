import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { mockStudents } from '../mocks/scannerMocks';
import { Student } from '../types/newTypes';
import { useUserFeedback } from './useUserFeedback';
import { useSelection } from './useSelection';
import { usePagination } from './usePagination';
import { searchInputSchema, studentSchema } from '../utils/validationUtils';

interface UseStudentsProps {
  initialSelectedStudents?: Student[];
}

const PAGE_SIZE = 10;

export const useStudents = ({ initialSelectedStudents = [] }: UseStudentsProps = {}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const { showFeedback } = useUserFeedback();
  const {
    selectedItems: selectedStudents,
    toggleSelection: toggleStudentSelection,
    toggleSelectAll,
    isAllSelected,
    clearSelection,
    hasSelection,
  } = useSelection<Student>({
    initialSelectedItems: initialSelectedStudents,
  });
  const {
    items: students,
    currentPage,
    hasMore,
    isLoading: isLoadingMore,
    loadMore: loadMoreStudents,
    setItems: setStudents,
  } = usePagination<Student>({ pageSize: 10 });

  // Carrega os alunos (mock ou API)
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setIsLoading(true);
        // Simula chamada assíncrona
        const initialStudents = await fetchStudents(1);

        // Validar todos os alunos
        const validationResults = await Promise.all(
          initialStudents.map(student => validateStudent(student))
        );

        // Filtrar apenas alunos válidos
        const validStudents = initialStudents.filter(
          (_, index) => validationResults[index]
        );

        // Aqui viria a chamada real à API
        // const response = await api.get('/students');
        // setStudents(response.data);

        // Usando mock por enquanto
        setStudents(validStudents);
      } catch (err) {
        setError('Não foi possível carregar a lista de alunos. Verifique sua conexão ou tente novamente mais tarde.');
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

  const validateStudent = async (student: Student) => {
    try {
      await studentSchema.validate(student);
      return true;
    } catch (err) {
      console.error('Erro na validação do aluno:', err.message);
      showFeedback({
        type: 'error',
        message: `Dados inválidos para o aluno ${student.name}: ${err.message}`,
        useAlert: true
      });
      return false;
    }
  };

  return {
    students: filteredStudents,
    selectedStudents,
    isLoading,
    error,
    searchTerm,
    filteredStudents,
    setSearchTerm,
    toggleStudentSelection,
    toggleSelectAll,
    confirmSelection,
    clearSelection,
    isAllSelected,
    hasSelection,
  };
};