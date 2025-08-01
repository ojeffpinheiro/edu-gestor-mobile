import React, { useEffect, useMemo } from 'react';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '../../context/ThemeContext';

import { useStudents } from '../../hooks/useStudents';
import { useSelection } from '../../hooks/useSelection';

import { AuthView, Student } from '../../types/newTypes';

import StudentsHeader from '../features/StudentsHeader';
import ScannedCodeCard from '../features/ScannedCodeCard';
import StudentsList from '../features/StudentsList';
import StudentsFooter from '../features/StudentsFooter';
import SelectedStudentPreview from '../features/SelectedStudentPreview';

interface StudentsScreenProps {
  scannedCode?: string;
  selectedStudent?: string | null;
  setSelectedStudent: (id: string) => void;
  setCurrentView: (view: AuthView) => void;
}

const StudentsScreen = ({
  scannedCode,
  selectedStudent,
  setSelectedStudent,
  setCurrentView
}: StudentsScreenProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { students, isLoading, searchTerm, filteredStudents, setSearchTerm, handleSearch } = useStudents();
  const { selectedItems: selectedStudents, toggleSelection: toggleStudentSelection, hasSelection } = useSelection<Student>({ initialSelectedItems: students });

  const selectedStudentData = useMemo(() => 
    students.find(s => s.id === selectedStudent),
    [selectedStudent, students]
  );

  const handleContinue = () => {
    navigation.navigate('Capture' as never);
  };

  const handleBack = () => {
    setCurrentView('scanner');
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background.primary }}>
        <Text style={{ color: colors.text.primary }}>Carregando alunos...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={[colors.background.primary, colors.background.secondary]}
        style={{ flex: 1 }}
      >
        <StudentsHeader
          searchTerm={searchTerm}
          onBack={handleBack}
          onSearch={handleSearch}
        />

        <ScrollView style={{ flex: 1, paddingTop: 120, paddingBottom: 180 }}>
          {scannedCode && <ScannedCodeCard code={scannedCode} />}
          {selectedStudentData && <SelectedStudentPreview student={selectedStudentData} />}
          
          <StudentsList
            students={filteredStudents}
            selectedStudents={selectedStudents}
            onSelectStudent={toggleStudentSelection}
          />
        </ScrollView>

        <StudentsFooter
          hasSelection={hasSelection}
          onContinue={handleContinue}
          onBack={handleBack}
        />
      </LinearGradient>
    </>
  );
};

export default StudentsScreen;