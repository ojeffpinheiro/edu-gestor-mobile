import React from 'react';
import { Text, TouchableOpacity, View, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface AppButtonProps {
  title?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  icon, 
  accessibilityLabel, 
  accessibilityHint,
  disabled = false
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[style, disabled && { opacity: 0.6 }]}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: 8
      }}>
        {icon}
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;