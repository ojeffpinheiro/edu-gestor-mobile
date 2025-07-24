import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Spacing, Typography } from '../../styles/designTokens';

export const Card = ({ children, style }) => {
  const { colors } = useTheme();
  return (
    <View style={[{
      backgroundColor: colors.card,
      borderRadius: BorderRadius.xxl,
      padding: Spacing.lg,
      margin: Spacing.md,
    }, style]}>
      {children}
    </View>
  );
};

export const PrimaryButton = ({ title, onPress, disabled }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? colors.gray[400] : colors.primary,
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: colors.card, fontWeight: Typography.fontWeight.semibold }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};