// components/Auth/ValidationFeedback.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

interface ValidationFeedbackProps {
  isValid: boolean;
  isTouched: boolean;
  errorMessages: string[];
  showCriteria?: boolean;
}

const ValidationFeedback: React.FC<ValidationFeedbackProps> = ({
  isValid,
  isTouched,
  errorMessages,
  showCriteria = false
}) => {
  const { colors } = useTheme();

  if (!isTouched) return null;

  return (
    <View style={styles.container}>
      {isValid ? (
        <View style={styles.validContainer}>
          <MaterialIcons name="check-circle" size={16} color={colors.feedback.success} />
          <Text style={[styles.validText, { color: colors.feedback.success }]}>
            Campo válido
          </Text>
        </View>
      ) : (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={16} color={colors.feedback.error} />
          <View style={styles.errorList}>
            {errorMessages.map((msg, index) => (
              <Text 
                key={index} 
                style={[styles.errorText, { color: colors.feedback.error }]}
              >
                {msg}
              </Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  validContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  errorList: {
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    lineHeight: 16,
  },
  validText: {
    fontSize: 12,
  },
});

export default ValidationFeedback;