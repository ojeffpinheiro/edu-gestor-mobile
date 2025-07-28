import { useEffect, useState } from "react";
import { correctExam } from "../utils/examUtils";
import { initialExams } from "../mocks/scannerMocks";
import useErrorHandling from "./useErrorHandling";

export interface ExamResult {
  id: string; // Alterado para string para consistência
  studentName: string;
  studentId: string;
  examDate: string;
  subject: string;
  answers: string[];
  status: 'pending' | 'corrected'; // Tipo específico
  score: number | null; // Permite null para provas não corrigidas
  totalQuestions: number;
}

interface ExamError {
  title: string;
  message: string;
  actions?: Array<{
    text: string;
    onPress: () => void;
  }>;
}

export const useExams = () => {
  const [exams, setExams] = useState<ExamResult[]>(initialExams);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ExamError | null>(null);
  const { showError } = useErrorHandling();

  const processAllPendingExams = async (answerKey: string[]) => {
    if (!validateInputs(answerKey)) return;

    try {
      setIsLoading(true);
      
      const updatedExams = exams.map(exam => {
        if (exam.status === 'pending') {
          const { score } = correctExam(exam.answers, answerKey);
          return {
            ...exam,
            score,
            status: 'corrected' as const
          };
        }
        return exam;
      });

      setExams(updatedExams);
    } catch (error) {
      setError({
        title: 'Erro ao processar correções',
        message: 'Ocorreu um erro durante o processamento das correções.',
        actions: [{
          text: 'Tentar novamente',
          onPress: () => processAllPendingExams(answerKey)
        }]
      });
      showError('processing_error', error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateInputs = (answerKey: string[]) => {
    if (!answerKey || answerKey.length === 0) {
      setError({
        title: 'Gabarito vazio',
        message: 'O gabarito não pode estar vazio',
        actions: [{
          text: 'OK',
          onPress: () => {}
        }]
      });
      return false;
    }

    const invalidAnswers = answerKey.filter(a => !['A', 'B', 'C', 'D'].includes(a));
    if (invalidAnswers.length > 0) {
      showError('invalid_input', new Error(`Respostas inválidas no gabarito: ${invalidAnswers.join(', ')}`));
      return false;
    }

    return true;
  };

  const resetExamCorrection = (examId: string) => {
    setExams(prevExams =>
      prevExams.map(exam =>
        exam.id === examId
          ? { ...exam, status: 'pending', score: null }
          : exam
      )
    );
  };

  return {
    exams,
    isLoading,
    error,
    processAllPendingExams,
    resetExamCorrection,
    hasPendingExams: exams.some(exam => exam.status === 'pending')
  };
};