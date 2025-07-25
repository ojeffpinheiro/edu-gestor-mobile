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

  const dynamicStyles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isFocused ? colors.primary : colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      backgroundColor: colors.background,
    },
    label: {
      marginBottom: 8,
      color: colors.textPrimary,
      fontSize: 14,
      fontWeight: '500',
    },
    input: {
      flex: 1,
      height: 48,
      color: colors.textPrimary,
      paddingVertical: 12,
    },
    iconContainer: {
      marginRight: 8,
    },
    actionButton: {
      padding: 8,
    },
    errorText: {
      marginTop: 4,
      color: colors.error,
      fontSize: 12,
    },
  });

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
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        {value && onClear && (
          <TouchableOpacity onPress={handleClear} style={dynamicStyles.actionButton}>
            <Text style={{ color: colors.textPrimary }}>×</Text>
          </TouchableOpacity>
        )}

        {secureTextEntry && onToggleVisibility && (
          <TouchableOpacity onPress={onToggleVisibility} style={dynamicStyles.actionButton}>
            <Text style={{ color: colors.textPrimary }}>{secureTextEntry ? '👁️' : '🔒'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={dynamicStyles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputField;
