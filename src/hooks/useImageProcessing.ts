import { useCallback } from "react";
import * as tf from '@tensorflow/tfjs';

import { ExamTemplate } from "../types/newTypes";

import { getTensorFromURI } from "../utils/imageUtils";

import { useResultCalculations } from "./useCorrectionState";
import useErrorHandling from "./useErrorHandling";

const useImageProcessing = (examTemplate: ExamTemplate | null) => {
    const { showError } = useErrorHandling();
    const { generateRandomAnswers, calculateResults } = useResultCalculations();

    const processImage = useCallback(async (imageUri: string) => {
        try {
            await tf.ready();
            const tensor = await getTensorFromURI(imageUri);
            console.log('Tensor criado com sucesso:', tensor.shape);
            
            await new Promise(resolve => setTimeout(resolve, 3000)); // Simula processamento
            
            if (!examTemplate) {
                throw new Error('Exam template not loaded.');
            }
            
            const detectedAnswers = generateRandomAnswers(examTemplate.questions);
            const results = calculateResults(detectedAnswers, examTemplate.answerKey);
            
            tf.dispose(tensor);
            return results;
        } catch (error) {
            console.error('Falha ao processar imagem:', error);
            handleProcessingError(error);
            throw error;
        }
    }, [examTemplate, generateRandomAnswers, calculateResults]);

    const handleProcessingError = (error: unknown) => {
        if (error instanceof Error) {
            if (error.message.includes('TensorFlow')) {
                showError('model_loading_failed', error);
            } else if (error.message.includes('image')) {
                showError('image_processing_failed', error);
            } else {
                showError('default', error);
            }
        } else {
            showError('default');
        }
    };

    return { processImage };
};

export default useImageProcessing;