// components/common/StatusMessage.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { X, CheckCircle, AlertCircle } from 'lucide-react-native';
import { ColorScheme } from '../../styles/colors';
import { Spacing } from '../../styles/designTokens';

type StatusType = 'error' | 'success' | 'warning';

interface StatusMessageProps {
  type: StatusType;
  title: string;
  message: string;
  onDismiss?: () => void;
  actions?: Array<{
    label: string;
    onPress: () => void;
  }>;
}

const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  title,
  message,
  onDismiss,
  actions
}) => {
  const { colors } = useTheme();
  const styles = createStatusMessageStyles(colors, type);
  const iconColor = getIconColor(colors, type);

  const Icon = {
    error: AlertCircle,
    success: CheckCircle,
    warning: AlertCircle
  }[type];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon size={20} color={iconColor} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        {onDismiss && (
          <TouchableOpacity onPress={onDismiss}>
            <X size={20} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>

      {actions && actions.length > 0 && (
        <View style={styles.actionsContainer}>
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              onPress={action.onPress}
              style={styles.actionButton}
            >
              <Text style={styles.actionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Função separada para obter a cor do ícone
const getIconColor = (colors: ColorScheme, type: StatusType) => {
  return {
    error: colors.feedback.error,
    success: colors.feedback.success,
    warning: colors.feedback.warning
  }[type];
};

// Função para criar estilos
const createStatusMessageStyles = (colors: ColorScheme, type: StatusType) => {
  const backgroundColor = {
    error: colors.feedback.error,
    success: colors.feedback.success,
    warning: colors.feedback.warning
  }[type];

  return StyleSheet.create({
    container: {
      backgroundColor,
      borderRadius: Spacing.sm,
      padding: Spacing.md,
      marginVertical: Spacing.sm,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontWeight: 'bold',
      color: colors.text.primary,
      marginBottom: Spacing.xs,
    },
    message: {
      color: colors.text.primary,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: Spacing.sm,
      marginTop: Spacing.sm,
    },
    actionButton: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
    },
    actionText: {
      color: colors.text.primary,
      fontWeight: 'bold',
    },
  });
};

export default StatusMessage;