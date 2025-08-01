import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { CheckCircle, ArrowRight } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Student } from '../../types/newTypes';

interface SelectedStudentPreviewProps {
  student: Student;
}

const SelectedStudentPreview = ({ student }: SelectedStudentPreviewProps) => {
  const { colors } = useTheme();
  const styles = createSelectedStudentPreviewStyles(colors);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[`${colors.feedback.success}20`, `${colors.feedback.success}10`]}
        style={styles.gradient}
      >
        <CheckCircle size={24} color={colors.feedback.success} />
        <View style={styles.content}>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.class}>Turma {student.class}</Text>
        </View>
        <ArrowRight size={20} color={colors.feedback.success} />
      </LinearGradient>
    </View>
  );
};

// Definindo o tipo para os estilos
interface SelectedStudentStyles {
  container: ViewStyle;
  gradient: ViewStyle;
  content: ViewStyle;
  name: TextStyle;
  class: TextStyle;
}

const createSelectedStudentPreviewStyles = (colors: any): SelectedStudentStyles => 
  StyleSheet.create({
    container: {
      marginHorizontal: 24,
      marginBottom: 32,
      borderRadius: 16,
      overflow: 'hidden' as const,
      shadowColor: colors.feedback.success,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    gradient: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      padding: 16,
      borderWidth: 1,
      borderColor: `${colors.feedback.success}30`,
    },
    content: {
      flex: 1,
      marginLeft: 12,
    },
    name: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: colors.text.primary,
      marginBottom: 2,
    },
    class: {
      fontSize: 14,
      color: colors.text.secondary,
      fontWeight: '500' as const,
    },
  });

export default React.memo(SelectedStudentPreview);