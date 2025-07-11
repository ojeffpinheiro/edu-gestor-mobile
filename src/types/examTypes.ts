export interface Exam {
  id: number;
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