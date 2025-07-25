import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { ChevronLeft } from 'lucide-react-native';
import { Spacing, BorderRadius, Typography } from '../../styles/designTokens';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onBack?: () => void;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon,
  onBack,
  containerStyle,
  titleStyle,
  subtitleStyle,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {onBack && (
        <TouchableOpacity 
          onPress={onBack} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft 
            size={Typography.fontSize.xl} 
            color={colors.text.secondary} 
          />
        </TouchableOpacity>
      )}
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.textContainer}>
        <Text style={[
          styles.title, 
          { color: colors.primary.main }, 
          titleStyle
        ]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[
            styles.subtitle, 
            { color: colors.secondary.main }, 
            subtitleStyle
          ]}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: 'transparent',
  },
  backButton: {
    marginRight: Spacing.md,
    padding: Spacing.xs,
    borderRadius: BorderRadius.round,
  },
  iconContainer: {
    marginRight: Spacing.md,
    padding: Spacing.xs,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    lineHeight: Typography.fontSize.xxl * 1.3,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.regular,
    marginTop: Spacing.xxs,
    lineHeight: Typography.fontSize.sm * 1.5,
  },
});

export default SectionHeader;