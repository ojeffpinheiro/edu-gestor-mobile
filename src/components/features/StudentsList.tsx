import React from 'react';
import { FlatList, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Text } from 'react-native';
import StudentCard from '../StudentCard';
import { Student } from '../../types/newTypes';
import SelectionCounter from './SelectionCounter';

interface StudentsListProps {
  students: Student[];
  selectedStudents: Student[];
  onSelectStudent: (student: Student) => void;
}

// Definindo tipos para os estilos
interface StudentsListStyles {
  container: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  listContent: ViewStyle;
}

const StudentsList = ({ students, selectedStudents, onSelectStudent }: StudentsListProps) => {
  const { colors } = useTheme();
  const styles = createStudentsListStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alunos Disponíveis ({students.length})</Text>
        <SelectionCounter
          count={selectedStudents.length} 
          total={students.length} 
        />
      </View>

      <FlatList
        data={students}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <StudentCard
            student={item}
            isSelected={selectedStudents.some(s => s.id === item.id)}
            onSelect={onSelectStudent}
          />
        )}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const createStudentsListStyles = (colors: any): StudentsListStyles => 
  StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      marginBottom: 32,
    },
    header: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
      marginBottom: 16,
    },
    title: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: colors.text.secondary,
      textTransform: 'uppercase' as const,
      letterSpacing: 1,
    },
    listContent: {
      paddingBottom: 16,
    },
  });

export default React.memo(StudentsList);