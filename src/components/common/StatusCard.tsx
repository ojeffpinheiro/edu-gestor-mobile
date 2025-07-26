import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Spacing, Typography } from '../../styles/designTokens';

// Interface para as props do ícone
interface IconProps {
  color?: string;
  size?: number;
}

interface StatusCardProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  icon: React.ReactElement<IconProps>; // Agora especificamos que o ícone aceita color
  title: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const StatusCard = ({ variant, icon, title, children, style }: StatusCardProps) => {
  const { colors } = useTheme();
  const variantColor = colors.feedback[variant];

  // Clonamos o ícone com a cor apropriada
  const coloredIcon = React.cloneElement(icon, {
    color: variantColor,
    size: icon.props.size || 24, // Tamanho padrão se não especificado
  });

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: variantColor + '10',
        borderLeftColor: variantColor 
      },
      style
    ]}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {coloredIcon}
        </View>
        <Text style={[styles.title, { color: variantColor }]}>{title}</Text>
      </View>
      
      {children && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderLeftWidth: 4,
    marginVertical: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    marginRight: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },
  content: {
    marginTop: Spacing.xs,
  },
});

export default StatusCard;