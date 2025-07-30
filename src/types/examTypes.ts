export interface Exam {
  id: string;
  studentName: string;
  studentId: string;
  examDate: string;
  subject: string;
  answers: string[];
  status: 'pending' | 'corrected';
  score: number | null;
  totalQuestions: number;
}

export interface Correction {
  question: number;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface ExamReport {
  totalExams: number;
  averageScore: number;
  passedStudents: number;
  failedStudents: number;
  passRate: number;
}

export interface ImageCapture {
  id: number;
  uri: string;
  extractedGridUri?: string;
  gridDetection?: GridDetectionResult;
  timestamp: string;
  hasValidGrid: boolean;
  gridError?: string;
  manual?: boolean;
}

export interface GridDetectionResult {
  success: boolean;
  corners?: Corners;
  grid?: GridInfo;
  error?: string;
  debug?: DebugInfo;
}

export interface ProcessingResults {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  details: QuestionDetail[];
  imagesUsed: number[];
}

// Interface para os cantos/marcadores da grade
export interface Corners {
  topLeft: Region;
  topRight: Region;
  bottomLeft: Region;
  bottomRight: Region;
}

// Interface para informações da grade
export interface GridInfo {
  bounds: {
    topLeft: { x: number; y: number };
    topRight: { x: number; y: number };
    bottomLeft: { x: number; y: number };
    bottomRight: { x: number; y: number };
  };
  width: number;
  height: number;
  center: { x: number; y: number };
}

// Interface para informações de debug
export interface DebugInfo {
  totalRegions: number;
  imageSize: { width: number; height: number };
}

// Interface para região detectada
export interface Region {
  pixels: [number, number][];
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  center: { x: number; y: number };
  width: number;
  height: number;
  area: number;
}

// Interface para detalhes das questões
export interface QuestionDetail {
  question: number;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

// Interface para resultados do processamento
export interface ProcessingResults {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  details: QuestionDetail[];
  imagesUsed: number[];
}

// Interface para captura de imagem
export interface ImageCapture {
  id: number;
  uri: string;
  extractedGridUri?: string;
  gridDetection?: GridDetectionResult;
  timestamp: string;
  hasValidGrid: boolean;
  gridError?: string;
  manual?: boolean;
}

// Interface para resultado da detecção de grade
export interface GridDetectionResult {
  success: boolean;
  corners?: Corners;
  grid?: GridInfo;
  error?: string;
  debug?: DebugInfo;
}

export interface ExamResult {
  id: string;
  studentName: string;
  studentId: string;
  examDate: string;
  subject: string;
  answers: string[];
  status: 'pending' | 'corrected';
  score: number | null;
  totalQuestions: number;
}