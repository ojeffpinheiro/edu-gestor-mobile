// src/components/Checkbox.tsx
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface CheckboxProps {
  isChecked: boolean;
  onPress: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[
        styles.checkbox, 
        { 
          borderColor: colors.border.medium,
          backgroundColor: isChecked ? colors.component.primaryButton : colors.background.secondary
        }
      ]}>
        {isChecked && <View style={styles.checkmark} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: 'white',
  },
});

export default Checkbox;