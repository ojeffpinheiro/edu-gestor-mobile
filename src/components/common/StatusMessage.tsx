import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface StatusMessageProps {
  variant: 'success' | 'error' | 'info' | 'warning';
  message: string;
  style?: object;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ variant, message, style }) => {
  const { colors } = useTheme();
  
  const backgroundColor = {
    success: colors.feedback.success,
    error: colors.feedback.error,
    info: colors.feedback.info,
    warning: colors.feedback.warning,
  }[variant];

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Text style={[styles.message, { color: colors.text.onPrimary }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default StatusMessage;