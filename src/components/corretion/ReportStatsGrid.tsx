// components/correction/ReportStatsGrid.tsx
import React from 'react';
import { View } from 'react-native';
import { FileText, Target, Trophy, TrendingUp } from 'lucide-react-native';
import StatsCard from './StatsCard';
import { ColorScheme } from '../../styles/colors';

interface ReportStatsGridProps {
    report: {
        totalExams: number;
        averageScore: number;
        passedStudents: number;
        passRate: number;
    };
    colors: ColorScheme;
}

const ReportStatsGrid: React.FC<ReportStatsGridProps> = ({ report, colors }) => {
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
            <StatsCard
                title="Total de Provas"
                value={report.totalExams}
                icon={FileText}
                color={colors.primary.main}
            />
            <StatsCard
                title="Média Geral"
                value={report.averageScore.toFixed(1)}
                icon={Target}
                color={colors.feedback.info}
            />
            <StatsCard
                title="Aprovados"
                value={report.passedStudents}
                icon={Trophy}
                color={colors.feedback.success}
            />
            <StatsCard
                title="Taxa de Aprovação"
                value={`${report.passRate}%`}
                icon={TrendingUp}
                color={colors.secondary.main}
            />
        </View>
    );
};

export default ReportStatsGrid;