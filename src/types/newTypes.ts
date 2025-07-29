import { BarcodeType } from "expo-camera";

export interface GradeConfig {
  expectedQuestions: number;
  expectedAlternatives: number;
  markingThreshold: number;
  minimumCellSize: number;
  contrastAdjustment: number;
  brightnessAdjustment: number;
  cornerTolerance: number;
  maxMultipleMarks: number;
  minConfidence: number;
}

export interface Cell {
  question: number;
  alternative: string;
  x: number;
  y: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

export interface Answer {
  question: number;
  alternatives: {
    alternative: string;
    intensity: number;
    isMarked: boolean;
    confidence: number;
  }[];
  markedAlternatives: string[];
  selectedAnswer: string | null;
  hasMultipleMarks: boolean;
  hasNoMarks: boolean;
  confidence: number;
}

export interface GradeRegion {
  uri: string;
  base64?: string;
  width: number;
  height: number;
  corners: {
    topLeft: { x: number; y: number };
    topRight: { x: number; y: number };
    bottomLeft: { x: number; y: number };
    bottomRight: { x: number; y: number };
  };
}

export interface ValidationResults {
  errors: string[];
  warnings: string[];
  isValid: boolean;
  overallConfidence: number;
  questionsWithIssues: number;
}

export interface ProcessResult {
  success: boolean;
  answers: Answer[];
  validation: ValidationResults;
  confidence: number;
  gradeRegion?: GradeRegion;
  processedImage?: string;
  error?: string;
}

export interface GradeStatistics {
  totalQuestions: number;
  answeredQuestions: number;
  multipleMarks: number;
  noMarks: number;
  averageConfidence: number;
  correctAnswers?: number;
  score?: number;
}

export interface AlignmentResult {
  isAligned: boolean;
  quality: number;
  corners?: { x: number; y: number }[];
}

export interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  class?: string;
  photo?: string;
}

export interface CorrectionResult {
  studentId: string; // ID do aluno
  studentName: string; // Nome do aluno
  totalQuestions: number; // Total de questões na prova
  correctAnswers: number; // Número de respostas corretas
  score: number; // Pontuação do aluno (porcentagem)
  detailedResults: {
    question: number; // Número da questão
    studentAnswer: string; // Resposta do aluno
    correctAnswer: string; // Resposta correta
    isCorrect: boolean; // Indica se a resposta está correta
  }[]; // Resultados detalhados para cada questão
  timestamp: string; // Data e hora da correção
}

export interface ExamTemplate {
  id: string;
  title: string;
  questions: number;
  alternatives: string[];
  answerKey: string[];
}

export type AuthView = 'auth' | 'scanner' | 'students' | 'home'; 