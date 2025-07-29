// useExamCorrection.ts
import { useState, useCallback, useEffect } from 'react';
import { ExamTemplate, CorrectionResult, Student } from '../types/newTypes';
import { sampleExamTemplate, sampleStudents } from '../mocks/scannerMocks';
import { useImageProcessing } from './useImageProcessing';
import useErrorHandling from './useErrorHandling';
import * as Haptics from 'expo-haptics';

type ProcessingStatus = 'idle' | 'capturing' | 'processing' | 'completed' | 'failed';
type AppScreen = 'home' | 'camera' | 'results' | 'review';

interface ExamCorrectionState {
  currentScreen: AppScreen;
  processingStatus: ProcessingStatus;
  capturedImage: string | null;
  correctionResults: CorrectionResult | null;
  examTemplate: ExamTemplate | null;
  students: Student[];
  corrections: CorrectionResult[];
  selectedStudents: Student[];
}

export const useExamCorrection = () => {
  // Estado principal
  const [state, setState] = useState<ExamCorrectionState>({
    currentScreen: 'home',
    processingStatus: 'idle',
    capturedImage: null,
    correctionResults: null,
    examTemplate: null,
    students: [],
    corrections: [],
    selectedStudents: []
  });

  const { showError } = useErrorHandling();
  const { processCapturedImage, captureImage, selectFromGallery } = useImageProcessing(state.examTemplate);

  // Inicialização
  useEffect(() => {
    // Carregar dados iniciais (mock ou API)
    setState(prev => ({
      ...prev,
      examTemplate: sampleExamTemplate,
      students: sampleStudents
    }));
  }, []);

  // Navegação entre telas
  const navigateTo = useCallback((screen: AppScreen) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
  }, []);

  // Captura e processamento de imagem
  const handleCaptureImage = useCallback(async (cameraRef: React.RefObject<any>) => {
    setState(prev => ({ ...prev, processingStatus: 'capturing' }));
    
    try {
      const success = await captureImage(cameraRef);
      if (success) {
        navigateTo('results');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      showError('capture_failed', error instanceof Error ? error : undefined);
    } finally {
      setState(prev => ({ ...prev, processingStatus: 'idle' }));
    }
  }, [captureImage, navigateTo, showError]);

  // Processamento de imagem da galeria
  const handleSelectFromGallery = useCallback(async () => {
    setState(prev => ({ ...prev, processingStatus: 'processing' }));
    
    try {
      const success = await selectFromGallery();
      if (success) {
        navigateTo('results');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      showError('gallery_access_failed', error instanceof Error ? error : undefined);
    } finally {
      setState(prev => ({ ...prev, processingStatus: 'idle' }));
    }
  }, [selectFromGallery, navigateTo, showError]);

  // Processar imagem capturada
  const processImage = useCallback(async (imageUri: string) => {
    setState(prev => ({ ...prev, processingStatus: 'processing' }));
    
    try {
      const results = await processCapturedImage(imageUri);
      setState(prev => ({
        ...prev,
        capturedImage: imageUri,
        correctionResults: results,
        processingStatus: 'completed'
      }));
      return results;
    } catch (error) {
      setState(prev => ({ ...prev, processingStatus: 'failed' }));
      showError('processing_failed', error instanceof Error ? error : undefined);
      throw error;
    }
  }, [processCapturedImage, showError]);

  // Salvar correção
  const saveCorrection = useCallback(() => {
    if (!state.correctionResults) return;

    const newCorrection = {
      ...state.correctionResults,
      id: Date.now().toString(),
      savedAt: new Date().toISOString(),
      students: state.selectedStudents
    };

    setState(prev => ({
      ...prev,
      corrections: [...prev.corrections, newCorrection],
      currentScreen: 'home',
      capturedImage: null,
      correctionResults: null,
      selectedStudents: []
    }));

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [state.correctionResults, state.selectedStudents]);

  // Selecionar alunos
  const toggleStudentSelection = useCallback((student: Student) => {
    setState(prev => {
      const isSelected = prev.selectedStudents.some(s => s.id === student.id);
      return {
        ...prev,
        selectedStudents: isSelected
          ? prev.selectedStudents.filter(s => s.id !== student.id)
          : [...prev.selectedStudents, student]
      };
    });
  }, []);

  // Reiniciar fluxo
  const resetCorrectionFlow = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentScreen: 'home',
      capturedImage: null,
      correctionResults: null,
      processingStatus: 'idle',
      selectedStudents: []
    }));
  }, []);

  return {
    // Estado completo
    ...state,
    
    // Métodos de navegação
    navigateTo,
    
    // Métodos de captura
    handleCaptureImage,
    handleSelectFromGallery,
    
    // Métodos de processamento
    processImage,
    saveCorrection,
    
    // Gerenciamento de alunos
    toggleStudentSelection,
    
    // Controle do fluxo
    resetCorrectionFlow,
    
    // Status helpers
    isIdle: state.processingStatus === 'idle',
    isProcessing: state.processingStatus === 'processing',
    hasResults: state.correctionResults !== null
  };
};