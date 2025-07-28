import { useCallback, useState } from "react";
import { CorrectionResult } from "../types/newTypes";

// hook separado para o gerenciamento do estado da correção
export const useCorrectionState = () => {
    const [currentScreen, setCurrentScreen] = useState('home');
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'completed' | 'failed'>('idle');
    const [correctionResults, setCorrectionResults] = useState<CorrectionResult | null>(null);
    const [corrections, setCorrections] = useState<CorrectionResult[]>([]);

    return {
        currentScreen, setCurrentScreen,
        capturedImage, setCapturedImage,
        processingStatus, setProcessingStatus,
        correctionResults, setCorrectionResults,
        corrections, setCorrections
    };
};

// Hook para cálculos de resultados
export const useResultCalculations = () => {
    const generateRandomAnswers = useCallback((numQuestions: number) => {
        const alternatives = ['A', 'B', 'C', 'D', 'E'];
        return Array.from({ length: numQuestions }, () =>
            alternatives[Math.floor(Math.random() * alternatives.length)]
        );
    }, []);

    const calculateResults = useCallback((studentAnswers: string[], answerKey: string[]): CorrectionResult => {
        let correctAnswers = 0;
        const detailedResults = studentAnswers.map((answer, index) => {
            const isCorrect = answer === answerKey[index];
            if (isCorrect) correctAnswers++;
            return {
                question: index + 1,
                studentAnswer: answer,
                correctAnswer: answerKey[index],
                isCorrect
            };
        });
        return {
            studentId: '001', // Mocked
            studentName: 'Ana Silva', // Mocked
            totalQuestions: answerKey.length,
            correctAnswers,
            score: Math.round((correctAnswers / answerKey.length) * 100),
            detailedResults,
            timestamp: new Date().toISOString()
        };
    }, []);

    return { generateRandomAnswers, calculateResults };
};