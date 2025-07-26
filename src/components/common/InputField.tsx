import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, BorderRadius, Typography, Shadow } from '../../styles/designTokens';
import { Eye, EyeOff } from 'lucide-react-native';
import { ColorScheme } from '../../styles/colors';

interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: React.ReactNode;
  onClear?: () => void;
  onToggleVisibility?: () => void;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  icon,
  onClear,
  onToggleVisibility,
  keyboardType,
  autoFocus = false,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  ...rest
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const dynamicStyles = createButtonStyles(colors, isFocused);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    onClear?.();
    inputRef.current?.clear();
  };

  return (
    <View style={[dynamicStyles.container, containerStyle]}>
      {label && <Text style={[dynamicStyles.label, labelStyle]}>{label}</Text>}

      <View style={dynamicStyles.inputContainer}>
        {icon && <View style={dynamicStyles.iconContainer}>{icon}</View>}

        <TextInput
          ref={inputRef}
          style={[dynamicStyles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.secondary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        {value && onClear && (
          <TouchableOpacity onPress={handleClear} style={dynamicStyles.actionButton}>
            <Text style={{ color: colors.text.primary }}>×</Text>
          </TouchableOpacity>
        )}

        {secureTextEntry && onToggleVisibility && (
          <TouchableOpacity onPress={onToggleVisibility} style={dynamicStyles.actionButton}>
            {secureTextEntry ? (
              <Eye color={colors.text.secondary} size={20} />
            ) : (
              <EyeOff color={colors.text.secondary} size={20} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={dynamicStyles.errorText}>{error}</Text>}
    </View>
  );
};

const createButtonStyles = (colors: ColorScheme, isFocused: boolean) => {
   return StyleSheet.create({
    container: {
      marginBottom: Spacing.md,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: isFocused ? colors.primary.main : colors.border.medium,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.lg,
      backgroundColor: colors.background.secondary,
      ...(isFocused && Shadow(colors).xs)
    },
    label: {
      marginBottom: Spacing.sm,
      color: colors.text.primary,
      fontSize: Typography.fontSize.sm,
      fontWeight: Typography.fontWeight.medium,
    },
    input: {
      flex: 1,
      height: 56,
      color: colors.text.primary,
      paddingVertical: Spacing.md,
    },
    iconContainer: {
      marginRight: Spacing.sm,
    },
    actionButton: {
      padding: Spacing.xs,
    },
    errorText: {
      marginTop: Spacing.xs,
      color: colors.feedback.error,
      fontSize: Typography.fontSize.xs,
    },
  });
}

export default InputField;