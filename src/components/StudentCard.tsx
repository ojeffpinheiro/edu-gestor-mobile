import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import { useTheme } from '../context/ThemeContext';
import { useAnimation } from '../hooks/useAnimation';
import { Student } from '../types/newTypes';
import { studentSchema } from '../utils/validationUtils';
import { useUserFeedback } from '../hooks/useUserFeedback';

interface StudentCardProps {
  student: Student;
  isSelected: boolean;
  onSelect: (student: any) => void;
  disabled?: boolean;
}

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  isSelected,
  onSelect,
  disabled = false
}) => {
  const { colors } = useTheme();
  const { pressAnimation } = useAnimation();
  const { showFeedback } = useUserFeedback();

  const scaleValue = useRef(new Animated.Value(1)).current;
  const borderWidthValue = useRef(new Animated.Value(isSelected ? 2 : 0)).current;
  const styles = createStyles(colors, isSelected);
  const [isValid, setIsValid] = useState(true);

  const handlePress = () => {
    pressAnimation({
      scaleTo: 0.9,
      onPress: () => {
        showFeedback({
          type: 'success',
          message: 'Aluno selecionado',
          hapticType: 'light',
        });
        onSelect(student);
      },
    });
  };

  useEffect(() => {
    studentSchema.isValid(student)
      .then(valid => setIsValid(valid))
      .catch(() => setIsValid(false));
  }, [student]);

  useEffect(() => {
    // Animação ao selecionar/deselecionar
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: isSelected ? 1.02 : 1,
        friction: 5,
        useNativeDriver: true,
      }),
      // Remova a animação de borderWidth ou use useNativeDriver: false
      Animated.timing(borderWidthValue, {
        toValue: isSelected ? 2 : 0,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false, // Alterado para false
      }),
    ]).start();
  }, [isSelected]);

  if (!isValid) {
    return (
      <View style={styles.invalidContainer}>
        <Text style={styles.invalidText}>
          Dados inválidos para {student.name}. Verifique a matrícula ou turma.
        </Text>
      </View>
    );
  }

  return (
    <Animated.View style={[
      styles.container,
      {
        transform: [{ scale: scaleValue }],
        borderWidth: isSelected ? 2 : 0,
        borderColor: isSelected ? colors.primary.main : 'transparent'
      }
    ]}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={disabled}
        accessibilityLabel={`${isSelected ? 'Desselecionar' : 'Selecionar'} aluno ${student.name}`}
        accessibilityHint={`Aluno da turma ${student.class}, matrícula ${student.registrationNumber}`}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected }}
      >
        <View style={styles.content}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {student.name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text
              style={styles.name}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {student.name}
            </Text>
            <Text style={styles.details}>
              {student.registrationNumber} • Turma {student.class}
            </Text>
          </View>

          <View style={styles.selectionIndicator}>
            {isSelected && (
              <Check size={18} color={colors.text.onPrimary} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const createStyles = (colors: any, isSelected: boolean) =>
  StyleSheet.create({
    container: {
      borderRadius: 12,
      marginBottom: 8,
      backgroundColor: isSelected
        ? `${colors.primary.main}10`
        : colors.component.card,
      overflow: 'hidden',
      borderWidth: isSelected ? 2 : 1,
      borderColor: isSelected
        ? colors.primary.main
        : colors.border.light,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: isSelected
        ? colors.primary.main
        : `${colors.primary.main}15`,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    avatarText: {
      fontSize: 18,
      fontWeight: '600',
      color: isSelected
        ? colors.text.onPrimary
        : colors.primary.main,
    },
    infoContainer: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: 4,
    },
    details: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    selectionIndicator: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: isSelected
        ? colors.primary.main
        : 'transparent',
      borderWidth: isSelected ? 0 : 2,
      borderColor: colors.primary.main,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
    },
    invalidContainer: {
      padding: 16,
      backgroundColor: colors.feedback.error + '20',
      borderColor: colors.feedback.error,
      borderWidth: 1,
      borderRadius: 12,
    },
    invalidText: {
      color: colors.feedback.error,
      fontWeight: '500',
    },
  });

export default React.memo(StudentCard);