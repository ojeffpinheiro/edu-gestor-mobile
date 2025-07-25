import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { BorderRadius, Spacing } from "../../styles/designTokens";
import React, { ReactElement } from "react";

interface StatusCardProps {
  variant: 'success' | 'error' | 'info';
  icon: ReactElement;
  title: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

// Exemplo de implementação
const StatusCard = ({ variant, icon, title, children, style }: StatusCardProps) => {
  const { colors } = useTheme();

  const variantColors = {
    success: colors.success,
    error: colors.error,
    info: colors.primary,
  };

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: variantColors[variant] + '10',
        borderColor: variantColors[variant],
      },
      style
    ]}>
      <View style={styles.header}>
        {icon}
        <Text style={[styles.title, { color: variantColors[variant] }]}>
          {title}
        </Text>
      </View>
      {children && (
        <View style={styles.content}>
          {typeof children === 'string' ? (
            <Text style={{ color: colors.textPrimary }}>{children}</Text>
          ) : (
            children
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: Spacing.sm,
  },
  content: {
    marginTop: Spacing.sm,
  },
});

export default StatusCard;