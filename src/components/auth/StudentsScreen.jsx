import React from 'react';
import { View, Text, Animated } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Button from '../common/Button';
import Card from '../common/Card';
import SelectableListItem from '../SelectableListItem';
import SectionHeader from '../common/SectionHeader';
import { AnimationHelpers } from '../../styles/animations';
import { createStudentsScreenStyles } from './styles';

const students = [
  { id: '001', name: 'Ana Silva', class: '3A' },
  { id: '002', name: 'Carlos Santos', class: '3A' },
  { id: '003', name: 'Maria Oliveira', class: '3B' },
  { id: '004', name: 'João Pereira', class: '3B' }
];

const StudentsScreen = ({ scannedCode, selectedStudent, setSelectedStudent, setCurrentView }) => {
  const { colors } = useTheme();
  const styles = createStudentsScreenStyles(colors);
  const navigation = useNavigation();
  const scaleValue = AnimationHelpers.createAnimatedValue(1);

  const handleStudentSelect = (id) => {
    AnimationHelpers.pressAnimation(scaleValue, () => {
      setSelectedStudent(id);
    });
  };

  return (
    <View style={styles.screenContainer}>
      <Card variant="elevated">
        <SectionHeader
          title="Identificação de Aluno"
          subtitle="Selecione o aluno para esta prova"
          iconName="users"
          onBack={() => setCurrentView('scanner')}
        />

        {scannedCode && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Código: </Text>
              {scannedCode?.toString() || ''}
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Lista de Alunos</Text>

        <View style={styles.listContainer}>
          {students.map((student) => (
            <Animated.View
              key={student.id}
              style={{
                transform: [{ scale: selectedStudent === student.id ? scaleValue : 1 }]
              }}
            >
              <SelectableListItem
                primaryText={student.name}
                secondaryTexts={[
                  `Turma: ${student.class}`,
                  `ID: ${student.id}`
                ]}
                isSelected={selectedStudent === student.id}
                onPress={() => handleStudentSelect(student.id)}
                selectedIcon={<CheckCircle size={24} color={colors.primary.main} />}
              />
            </Animated.View>
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title="Continuar para Captura"
            onPress={() => navigation.navigate('Capture')}
            variant="primary"
            disabled={!selectedStudent}
            style={styles.continueButton}
          />

          <Button
            title="Voltar"
            onPress={() => setCurrentView('scanner')}
            variant="secondary"
          />
        </View>
      </Card>
    </View>
  );
};

export default StudentsScreen;