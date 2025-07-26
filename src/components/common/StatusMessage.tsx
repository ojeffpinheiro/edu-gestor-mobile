import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, BorderRadius, Typography } from '../../styles/designTokens';

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
    const baseStyles = {
      backgroundColor: colors.feedback[type] + '10',
      borderColor: colors.feedback[type],
      textColor: colors.feedback[type],
    };

    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        marginVertical: Spacing.sm,
        backgroundColor: baseStyles.backgroundColor,
        borderColor: baseStyles.borderColor,
      },
      iconContainer: {
        marginRight: Spacing.md,
      },
      textContainer: {
        flex: 1,
      },
      title: {
        fontWeight: Typography.fontWeight.semibold,
        fontSize: Typography.fontSize.md,
        color: baseStyles.textColor,
        marginBottom: Spacing.xs,
      },
      message: {
        fontSize: Typography.fontSize.sm,
        color: colors.text.primary,
        lineHeight: Typography.lineHeight.sm,
      },
    });
  };

  const styles = getStatusStyles();

  return (
    <View style={[styles.container, containerStyle]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.textContainer}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <Text style={[styles.message, messageStyle]}>
          {message}
        </Text>
      </View>
    </View>
  );
};

export default StatusMessage;