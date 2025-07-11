import { Correction, Exam, ExamReport } from "../types/examTypes";

export const correctExam = (studentAnswers: string[], answerKey: string[]) => {
  let correctCount = 0;
  const corrections: Correction[] = [];

  for (let i = 0; i < answerKey.length; i++) {
    const isCorrect = studentAnswers[i] === answerKey[i];
    if (isCorrect) correctCount++;
    
    corrections.push({
      question: i + 1,
      studentAnswer: studentAnswers[i],
      correctAnswer: answerKey[i],
      isCorrect
    });
  }

  const score = (correctCount / answerKey.length) * 10;
  return { score, corrections, correctCount };
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