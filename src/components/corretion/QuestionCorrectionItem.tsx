// components/correction/QuestionCorrectionItem.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { CheckCircle, XCircle } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { createExamDetailModalStyles } from './ExamDetailModalStyles';

interface QuestionCorrectionItemProps {
    question: number;
    studentAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
}

const QuestionCorrectionItem: React.FC<QuestionCorrectionItemProps> = ({
    question,
    studentAnswer,
    correctAnswer,
    isCorrect
}) => {
    const { colors } = useTheme();
    const styles = createExamDetailModalStyles(colors);

    return (
        <View style={[
            styles.correctionItem,
            !isCorrect && styles.incorrectAnswer
        ]}>
            <Text style={styles.questionNumber}>Q{question}</Text>
            <Text style={styles.studentAnswerText}>Resposta: {studentAnswer}</Text>
            <Text style={styles.correctAnswerText}>Gabarito: {correctAnswer}</Text>
            {isCorrect ? (
                <CheckCircle size={16} color={colors.feedback.success} />
            ) : (
                <XCircle size={16} color={colors.feedback.error} />
            )}
        </View>
    );
};

export default QuestionCorrectionItem;