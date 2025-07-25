import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Spacing, Typography } from '../../styles/designTokens';
import { ColorScheme } from '../../styles/colors';

interface StatusCardProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const StatusCard = ({ variant, icon, title, children, style }: StatusCardProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors, variant);

  return (
    <View style={[styles.statusCardContainer, style]}>
      <View style={styles.statusCardHeader}>
        <View style={styles.statusCardIconContainer}>
          {icon}
        </View>
        <Text style={styles.statusCardTitle}>{title}</Text>
      </View>
      
      {children && (
        <View style={styles.statusCardContent}>
          {children}
        </View>
      )}
    </View>
  );
};

export const createStyles = (colors: ColorScheme, variant?: string) => {
  const variantColors = {
    success: colors.feedback.success,
    error: colors.feedback.error,
    warning: colors.feedback.warning,
    info: colors.feedback.info,
  };

  return StyleSheet.create({
    statusCardContainer: {
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      backgroundColor: variant ? variantColors[variant] + '20' : colors.background.secondary,
      borderLeftWidth: 4,
      borderLeftColor: variant ? variantColors[variant] : colors.primary.main,
    },
    statusCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    statusCardIconContainer: {
      marginRight: Spacing.sm,
    },
    statusCardTitle: {
      fontSize: Typography.fontSize.md,
      fontWeight: Typography.fontWeight.semibold,
      color: variant ? variantColors[variant] : colors.text.primary,
    },
    statusCardContent: {
      marginTop: Spacing.xs,
    },
  });
};

export default StatusCard;