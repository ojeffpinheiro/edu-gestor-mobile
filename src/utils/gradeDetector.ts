// src/utils/gradeDetector.js

import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { Answer, Cell, GradeConfig, GradeRegion, GradeStatistics, ProcessResult } from '../types/newTypes';
import { applyBinarization, calculateCellCoordinates, convertToCanvas, detectCorners, extractGridRegion, getImageData } from './imageProcessor';

/**
 * Configurações para detecção de grades
 */

const GRADE_CONFIG: GradeConfig = {
    expectedQuestions: 20,
    expectedAlternatives: 5,
    markingThreshold: 0.3,
    minimumCellSize: 20,
    contrastAdjustment: 1.2,
    brightnessAdjustment: 0.1,
    cornerTolerance: 10,
    maxMultipleMarks: 1,
    minConfidence: 0.7
};

class GradeDetector {
    private imageUri: string;
    private config: GradeConfig;
    private imageData: any;
    private gradeRegion: GradeRegion | null = null;
    private cells: Cell[] = [];
    private detectedAnswers: Answer[] = [];

    constructor(imageUri: string, config: GradeConfig = GRADE_CONFIG) {
        this.imageUri = imageUri;
        this.config = config;
    }

    async processImage(): Promise<ProcessResult> {
        try {
            const processedImage = await this.preprocessImage();
            const gradeCorners = await this.detectGrade(processedImage);

            if (!gradeCorners) {
                throw new Error('Não foi possível detectar a grade na imagem');
            }

            this.gradeRegion = await this.extractGradeRegion(processedImage, gradeCorners);
            this.cells = this.divideCells(this.gradeRegion);
            this.detectedAnswers = await this.analyzeMarkings();

            const validationResults = this.validateResults();

            return {
                success: true,
                answers: this.detectedAnswers,
                validation: validationResults,
                confidence: this.calculateOverallConfidence(),
                gradeRegion: this.gradeRegion,
                processedImage: processedImage.uri
            };

        } catch (error) {
    console.error('Erro no processamento da imagem:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      answers: [],
      validation: { 
        errors: [error instanceof Error ? error.message : 'Erro desconhecido'], 
        warnings: [],
        isValid: false,
        overallConfidence: 0,
        questionsWithIssues: 0
      },
      confidence: 0
    };
  }
}

    /**
     * Pré-processa a imagem para melhorar a detecção
     */
    async preprocessImage() {
        try {
            // Redimensionar para otimizar processamento
            const resized = await manipulateAsync(
                this.imageUri,
                [{ resize: { width: 800 } }],
                { compress: 0.8, format: SaveFormat.JPEG }
            );

            // Ajustar contraste e brilho
            const enhanced = await manipulateAsync(
                resized.uri,
                [],
                {
                    compress: 1.0,
                    format: SaveFormat.JPEG,
                    base64: true
                }
            );

            return enhanced;
        } catch (error) {
            throw new Error(`Erro no pré-processamento: ${error.message}`);
        }
    }

    /**
     * Detecta os cantos da grade na imagem
     */
    async detectGrade(processedImage) {
        try {
            // Simular detecção de cantos - Em produção, usar OpenCV ou biblioteca similar
            // Por enquanto, assumir que a grade ocupa 80% da imagem centralizada

            const imageWidth = 800; // Largura após redimensionamento
            const imageHeight = 600; // Altura estimada proporcionalmente

            const margin = 0.1; // 10% de margem

            const corners = {
                topLeft: {
                    x: imageWidth * margin,
                    y: imageHeight * margin
                },
                topRight: {
                    x: imageWidth * (1 - margin),
                    y: imageHeight * margin
                },
                bottomLeft: {
                    x: imageWidth * margin,
                    y: imageHeight * (1 - margin)
                },
                bottomRight: {
                    x: imageWidth * (1 - margin),
                    y: imageHeight * (1 - margin)
                }
            };

            return corners;
        } catch (error) {
            throw new Error(`Erro na detecção da grade: ${error.message}`);
        }
    }

    /**
     * Extrai a região da grade com base nos cantos detectados
     */
    async extractGradeRegion(processedImage, corners) {
        try {
            const { topLeft, bottomRight } = corners;

            const width = bottomRight.x - topLeft.x;
            const height = bottomRight.y - topLeft.y;

            const croppedImage = await manipulateAsync(
                processedImage.uri,
                [{
                    crop: {
                        originX: topLeft.x,
                        originY: topLeft.y,
                        width: width,
                        height: height
                    }
                }],
                {
                    compress: 1.0,
                    format: SaveFormat.JPEG,
                    base64: true
                }
            );

            return {
                uri: croppedImage.uri,
                base64: croppedImage.base64,
                width: width,
                height: height,
                corners: corners
            };
        } catch (error) {
            throw new Error(`Erro na extração da grade: ${error.message}`);
        }
    }

    /**
     * Divide a região da grade em células individuais
     */
    divideCells(gradeRegion) {
        const cells = [];
        const { width, height } = gradeRegion;

        const cellWidth = width / this.config.expectedAlternatives;
        const cellHeight = height / this.config.expectedQuestions;

        for (let row = 0; row < this.config.expectedQuestions; row++) {
            for (let col = 0; col < this.config.expectedAlternatives; col++) {
                const cell = {
                    question: row + 1,
                    alternative: String.fromCharCode(65 + col), // A, B, C, D, E
                    x: col * cellWidth,
                    y: row * cellHeight,
                    width: cellWidth,
                    height: cellHeight,
                    centerX: (col * cellWidth) + (cellWidth / 2),
                    centerY: (row * cellHeight) + (cellHeight / 2)
                };

                cells.push(cell);
            }
        }

        return cells;
    }

    /**
     * Analisa as marcações em cada célula
     */
    async analyzeMarkings() {
        const answers = [];

        // Agrupar células por questão
        const cellsByQuestion = this.groupCellsByQuestion();

        for (let questionNum = 1; questionNum <= this.config.expectedQuestions; questionNum++) {
            const questionCells = cellsByQuestion[questionNum] || [];
            const questionAnalysis = await this.analyzeQuestionCells(questionNum, questionCells);

            answers.push(questionAnalysis);
        }

        return answers;
    }

    /**
     * Agrupa células por número da questão
     */
    groupCellsByQuestion() {
        const grouped = {};

        this.cells.forEach(cell => {
            if (!grouped[cell.question]) {
                grouped[cell.question] = [];
            }
            grouped[cell.question].push(cell);
        });

        return grouped;
    }

    /**
     * Analisa as células de uma questão específica
     */
    async analyzeQuestionCells(questionNum, cells) {
        const cellAnalysis = [];

        for (const cell of cells) {
            const markingIntensity = await this.calculateMarkingIntensity(cell);

            cellAnalysis.push({
                alternative: cell.alternative,
                intensity: markingIntensity,
                isMarked: markingIntensity > this.config.markingThreshold,
                confidence: this.calculateCellConfidence(markingIntensity)
            });
        }

        // Determinar a resposta da questão
        const markedCells = cellAnalysis.filter(cell => cell.isMarked);

        return {
            question: questionNum,
            alternatives: cellAnalysis,
            markedAlternatives: markedCells.map(cell => cell.alternative),
            selectedAnswer: markedCells.length === 1 ? markedCells[0].alternative : null,
            hasMultipleMarks: markedCells.length > 1,
            hasNoMarks: markedCells.length === 0,
            confidence: this.calculateQuestionConfidence(cellAnalysis)
        };
    }

    /**
     * Calcula a intensidade de marcação em uma célula
     */
    async calculateMarkingIntensity(cell) {
        try {
            // Simular análise de pixels - Em produção, usar análise real da imagem
            // Por enquanto, simular com valores aleatórios ponderados

            const baseIntensity = Math.random() * 0.6; // 0-60% base

            // Simular algumas células como "marcadas"
            const isSimulatedMark = Math.random() > 0.8; // 20% chance de ser marcada

            if (isSimulatedMark) {
                return Math.min(0.9, baseIntensity + 0.4); // 40-90% para marcadas
            }

            return baseIntensity;
        } catch (error) {
            console.warn(`Erro ao calcular intensidade da célula ${cell.alternative}:`, error);
            return 0;
        }
    }

    /**
     * Calcula a confiança da detecção em uma célula
     */
    calculateCellConfidence(intensity) {
        if (intensity > this.config.markingThreshold + 0.2) {
            return 0.9; // Alta confiança para marcações claras
        } else if (intensity > this.config.markingThreshold) {
            return 0.7; // Confiança média
        } else if (intensity > this.config.markingThreshold - 0.1) {
            return 0.4; // Baixa confiança (próximo ao limite)
        }
        return 0.8; // Alta confiança para não marcadas
    }

    /**
     * Calcula a confiança geral para uma questão
     */
    calculateQuestionConfidence(cellAnalysis) {
        const avgConfidence = cellAnalysis.reduce((sum, cell) => sum + cell.confidence, 0) / cellAnalysis.length;

        // Penalizar questões com múltiplas marcações ou sem marcações
        const markedCount = cellAnalysis.filter(cell => cell.isMarked).length;

        if (markedCount === 1) {
            return avgConfidence;
        } else if (markedCount === 0) {
            return avgConfidence * 0.5; // Penalizar questões sem resposta
        } else {
            return avgConfidence * 0.3; // Penalizar questões com múltiplas marcações
        }
    }

    /**
     * Calcula a confiança geral do processamento
     */
    calculateOverallConfidence() {
        if (this.detectedAnswers.length === 0) return 0;

        const totalConfidence = this.detectedAnswers.reduce((sum, answer) => sum + answer.confidence, 0);
        return totalConfidence / this.detectedAnswers.length;
    }

    /**
     * Valida os resultados detectados
     */
    validateResults() {
        const errors = [];
        const warnings = [];

        // Verificar se o número de questões está correto
        if (this.detectedAnswers.length !== this.config.expectedQuestions) {
            errors.push(`Esperado ${this.config.expectedQuestions} questões, encontrado ${this.detectedAnswers.length}`);
        }

        // Verificar questões com múltiplas marcações
        const multipleMarks = this.detectedAnswers.filter(answer => answer.hasMultipleMarks);
        if (multipleMarks.length > 0) {
            warnings.push(`${multipleMarks.length} questões com múltiplas marcações: ${multipleMarks.map(q => q.question).join(', ')}`);
        }

        // Verificar questões sem marcações
        const noMarks = this.detectedAnswers.filter(answer => answer.hasNoMarks);
        if (noMarks.length > 0) {
            warnings.push(`${noMarks.length} questões sem marcações: ${noMarks.map(q => q.question).join(', ')}`);
        }

        // Verificar confiança geral
        const overallConfidence = this.calculateOverallConfidence();
        if (overallConfidence < this.config.minConfidence) {
            warnings.push(`Confiança geral baixa: ${(overallConfidence * 100).toFixed(1)}%`);
        }

        return {
            errors,
            warnings,
            isValid: errors.length === 0,
            overallConfidence,
            questionsWithIssues: multipleMarks.length + noMarks.length
        };
    }
}

/**
 * Função principal para processar uma imagem de prova
 */
const processAnswerSheet = async (imageUri: string) => {
    try {
        // 1. Convert image to canvas
        const canvas = await convertToCanvas(imageUri);
        
        // 2. Get image data and apply binarization
        const imageData = getImageData(canvas);
        const binaryImage = applyBinarization(imageData);
        
        // 3. Detect corners
        const corners = await detectCorners(binaryImage);
        
        // 4. Extract grid region
        const gridCanvas = extractGridRegion(canvas, corners);
        
        // 5. Calculate cell coordinates (assuming 20 questions with 5 options each)
        const cellCoords = calculateCellCoordinates(gridCanvas, 20, 5);
        
        const detector = new GradeDetector(imageUri);
        const result = await detector.processImage();
        
        return {
            success: true,
            corners,
            gridImage: gridCanvas.toDataURL(),
            cellCoordinates: cellCoords,
            ...result
        };
    } catch (error) {
        console.error('Processing error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}

/**
 * Função para calcular estatísticas de uma prova corrigida
 */
export function calculateGradeStatistics(answers: Answer[], correctAnswers: string[] | null = null): GradeStatistics {
  const statistics: GradeStatistics = {
    totalQuestions: answers.length,
    answeredQuestions: answers.filter(a => a.selectedAnswer).length,
    multipleMarks: answers.filter(a => a.hasMultipleMarks).length,
    noMarks: answers.filter(a => a.hasNoMarks).length,
    averageConfidence: 0
  };
  
  if (answers.length > 0) {
    statistics.averageConfidence = answers.reduce((sum, a) => sum + a.confidence, 0) / answers.length;
  }
  
  if (correctAnswers) {
    let correctCount = 0;
    
    answers.forEach((answer, index) => {
      if (answer.selectedAnswer === correctAnswers[index]) {
        correctCount++;
      }
    });
    
    statistics.correctAnswers = correctCount;
    statistics.score = (correctCount / answers.length) * 100;
  }
  
  return statistics;
}

/**
 * Função para exportar resultados em diferentes formatos
 */
export function exportResults(answers, format = 'json') {
    const results = {
        processedAt: new Date().toISOString(),
        answers: answers.map(answer => ({
            question: answer.question,
            selectedAnswer: answer.selectedAnswer,
            confidence: answer.confidence,
            hasIssues: answer.hasMultipleMarks || answer.hasNoMarks
        }))
    };

    switch (format) {
        case 'csv':
            return convertToCSV(results);
        case 'json':
        default:
            return JSON.stringify(results, null, 2);
    }
}

/**
 * Converte resultados para formato CSV
 */
function convertToCSV(results) {
    const headers = ['Questão', 'Resposta', 'Confiança', 'Problemas'];
    const rows = results.answers.map(answer => [
        answer.question,
        answer.selectedAnswer || 'SEM RESPOSTA',
        `${(answer.confidence * 100).toFixed(1)}%`,
        answer.hasIssues ? 'SIM' : 'NÃO'
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
}