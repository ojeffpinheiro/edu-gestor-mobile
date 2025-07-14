import { Correction, Exam, ExamReport } from "../types/examTypes";

export const correctExam = (studentAnswers: string[] = [], answerKey: string[] = []) => {
  // Use arrays vazios como padrão, caso não sejam fornecidos
  const safeStudentAnswers = Array.isArray(studentAnswers) ? studentAnswers : [];
  const safeAnswerKey = Array.isArray(answerKey) ? answerKey : [];

  let correctCount = 0;
  const corrections: Correction[] = [];

  const length = Math.min(safeStudentAnswers.length, safeAnswerKey.length);

  for (let i = 0; i < length; i++) {
    const isCorrect = safeStudentAnswers[i] === safeAnswerKey[i];
    if (isCorrect) correctCount++;
    
    corrections.push({
      question: i + 1,
      studentAnswer: safeStudentAnswers[i],
      correctAnswer: safeAnswerKey[i],
      isCorrect
    });
  }

  const score = length > 0 ? (correctCount / length) * 10 : 0;
  
  // Sempre retorne um objeto com todas as propriedades esperadas
  return {
    score: parseFloat(score.toFixed(1)),
    corrections,
    correctCount
  };
};

export const generateReport = (exams: Exam[]): ExamReport => {
  const correctedExams = exams.filter(exam => exam.status === 'corrected');
  const totalExams = correctedExams.length;
  const averageScore = correctedExams.reduce((sum, exam) => sum + (exam.score || 0), 0) / totalExams;
  const passedStudents = correctedExams.filter(exam => (exam.score || 0) >= 6).length;
  const failedStudents = totalExams - passedStudents;

  return {
    totalExams,
    averageScore: parseFloat(averageScore.toFixed(1)),
    passedStudents,
    failedStudents,
    passRate: parseFloat(((passedStudents / totalExams) * 100).toFixed(1))
  };
};