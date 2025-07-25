// src/components/common/StatusMessage.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

type StatusType = 'success' | 'error' | 'warning' | 'info';

interface StatusMessageProps {
  type: StatusType;
  title: string;
  message: string;
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
}

const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  title,
  message,
  icon,
  containerStyle,
  titleStyle,
  messageStyle,
}) => {
  const { colors } = useTheme();

  const getStatusStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: colors.success,
          borderColor: colors.success,
          textColor: colors.success,
        };
      case 'error':
        return {
          backgroundColor: colors.error,
          borderColor: colors.error,
          textColor: colors.error,
        };
      case 'warning':
        return {
          backgroundColor: colors.warning,
          borderColor: colors.warning,
          textColor: colors.warning,
        };
      case 'info':
        return {
          backgroundColor: colors.info,
          borderColor: colors.info,
          textColor: colors.info,
        };
      default:
        return {
          backgroundColor: colors.background,
          borderColor: colors.border,
          textColor: colors.textPrimary,
        };
    }
  };

  const { backgroundColor, borderColor, textColor } = getStatusStyles();

  return (
    <View style={[styles.container, { backgroundColor, borderColor }, containerStyle]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: textColor }, titleStyle]}>{title}</Text>
        <Text style={[styles.message, { color: textColor }, messageStyle]}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    fontSize: 14,
  },
});

export default StatusMessage;
