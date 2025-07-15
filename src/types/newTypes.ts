
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