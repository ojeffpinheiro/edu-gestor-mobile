import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { BorderRadius, Spacing } from '../styles/designTokens';
import { CheckCircle } from 'lucide-react-native';

interface SelectableListItemProps {
  primaryText: string;
  secondaryTexts: string[];
  isSelected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const SelectableListItem = ({
  primaryText,
  secondaryTexts,
  isSelected,
  onPress,
  style,
}: SelectableListItemProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: isSelected ? colors.primary : colors.border,
        },
        isSelected && { backgroundColor: colors.primary + '10' },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={[styles.primaryText, { color: colors.textPrimary }]}>
          {primaryText}
        </Text>
        <View style={styles.secondaryContainer}>
          {secondaryTexts.map((text, i) => (
            <Text key={i} style={[styles.secondaryText, { color: colors.textSecondary }]}>
              {text}
            </Text>
          ))}
        </View>
      </View>
      {isSelected && (
        <CheckCircle
          size={24}
          color={colors.primary}
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  primaryText: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  secondaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryText: {
    fontSize: 14,
  },
  icon: {
    marginLeft: Spacing.sm,
  },
});

export default SelectableListItem;