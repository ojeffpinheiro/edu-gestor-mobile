import { Correction, Exam, ExamReport } from "../types/examTypes";

export const correctExam = (studentAnswers: string[] = [], answerKey: string[] = []) => {
  // Validações de entrada
  if (!Array.isArray(studentAnswers)) {
    console.warn('studentAnswers não é um array', studentAnswers);
    studentAnswers = [];
  }
  
  if (!Array.isArray(answerKey)) {
    console.warn('answerKey não é um array', answerKey);
    answerKey = [];
  }

  let correctCount = 0;
  const corrections: Correction[] = [];

  // Processa apenas até o menor array
  const length = Math.min(studentAnswers.length, answerKey.length);

  for (let i = 0; i < length; i++) {
    const studentAnswer = studentAnswers[i] || '';
    const correctAnswer = answerKey[i] || '';
    const isCorrect = studentAnswer.toUpperCase() === correctAnswer.toUpperCase();
    
    if (isCorrect) correctCount++;
    
    corrections.push({
      question: i + 1,
      studentAnswer,
      correctAnswer,
      isCorrect
    });
  }

  const score = length > 0 ? (correctCount / length) * 10 : 0;
  
  return {
    score: parseFloat(score.toFixed(1)),
    corrections,
    correctCount,
    totalQuestions: length
  };
};

export const generateReport = (exams: Exam[] = []): ExamReport => {
  // Validação de entrada
  if (!Array.isArray(exams)) {
    console.warn('generateReport recebeu exams não-array', exams);
    exams = [];
  }

  const correctedExams = exams.filter(exam => exam?.status === 'corrected');
  const totalExams = correctedExams.length || 0;
  
  // Cálculos seguros
  const averageScore = totalExams > 0 
    ? correctedExams.reduce((sum, exam) => sum + (exam.score || 0), 0) / totalExams
    : 0;

  const passedStudents = correctedExams.filter(exam => (exam.score || 0) >= 6).length;
  
  return {
    totalExams,
    averageScore: parseFloat(averageScore.toFixed(1)),
    passedStudents,
    failedStudents: totalExams - passedStudents,
    passRate: totalExams > 0 
      ? parseFloat(((passedStudents / totalExams) * 100).toFixed(1))
      : 0
  };
};

export const calculateCorrections = (exam: { answers: any[], score: number | null }, answerKey: any[]) => {
  if (!Array.isArray(exam.answers) || !Array.isArray(answerKey)) {
    console.warn('Invalid input for calculateCorrections');
    return { score: 0, corrections: [] };
  }

  const validAnswers = exam.answers
    .map(a => typeof a === 'string' ? a.trim().toUpperCase() : '')
    .filter(a => ['A', 'B', 'C', 'D', ''].includes(a));

  const validAnswerKey = answerKey
    .map(a => typeof a === 'string' ? a.trim().toUpperCase() : '')
    .filter(a => ['A', 'B', 'C', 'D'].includes(a));

  if (validAnswers.length === 0 || validAnswerKey.length === 0) {
    return { score: 0, corrections: [] };
  }

  const result = correctExam(validAnswers, validAnswerKey);
  
  return {
    score: exam.score !== null ? exam.score : result.score,
    corrections: result.corrections || []
  };
};