import { useCallback, useEffect, useState } from "react";
import * as tf from '@tensorflow/tfjs';
import { getTensorFromURI } from "../utils/imageUtils";
import { sampleExamTemplate, sampleStudents } from "../mocks/scannerMocks";
import { CorrectionResult, ExamTemplate, Student } from "../types/newTypes";
import { useCorrectionState } from "./useCorrectionState";
import { useImageProcessing } from "./useImageProcessing";

interface ProcessingLogic {
    currentScreen: string;
    capturedImage: string | null;
    processingStatus: 'idle' | 'processing' | 'completed' | 'failed';
    correctionResults: CorrectionResult | null;
    examTemplate: ExamTemplate | null;
    students: Student[];
    corrections: CorrectionResult[];
    handleImageCapture: (imageUri: string) => void;
    saveCorrection: () => void;
    setCurrentScreen: (screen: string) => void;
    setExamTemplate: React.Dispatch<React.SetStateAction<ExamTemplate | null>>;
    resetProcessing: () => void;
}

export const useProcessingLogic = (): ProcessingLogic => {
    // Estados
    const {
        currentScreen, setCurrentScreen,
        capturedImage, setCapturedImage,
        processingStatus, setProcessingStatus,
        correctionResults, setCorrectionResults,
        corrections, setCorrections
    } = useCorrectionState();

    const [examTemplate, setExamTemplate] = useState<ExamTemplate | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    
    // Hooks auxiliares
    const { processImage } = useImageProcessing(examTemplate);

    // Inicialização
    useEffect(() => {
        setExamTemplate(sampleExamTemplate);
        setStudents(sampleStudents);
    }, []);

    // Manipulação de imagens
    const handleImageCapture = useCallback(async (imageUri: string) => {
        setCapturedImage(imageUri);
        setProcessingStatus('processing');
        
        try {
            const results = await processImage(imageUri);
            setCorrectionResults(results);
            setProcessingStatus('completed');
        } catch {
            setProcessingStatus('failed');
        }
    }, [processImage]);

    // Salvamento de correção
    const saveCorrection = useCallback(() => {
        if (correctionResults) {
            const newCorrection = {
                id: Date.now().toString(),
                ...correctionResults,
                savedAt: new Date().toISOString()
            };
            setCorrections(prev => [...prev, newCorrection]);
            resetProcessing();
        }
    }, [correctionResults]);

    // Reset
    const resetProcessing = useCallback(() => {
        setCapturedImage(null);
        setCorrectionResults(null);
        setProcessingStatus('idle');
        setCurrentScreen('home');
    }, []);

    return {
        currentScreen,
        capturedImage,
        processingStatus,
        correctionResults,
        examTemplate,
        students,
        corrections,
        handleImageCapture,
        saveCorrection,
        setCurrentScreen,
        setExamTemplate,
        resetProcessing,
    };
};