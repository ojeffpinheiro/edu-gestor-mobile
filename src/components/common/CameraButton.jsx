import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Button from './common/Button';
import { useTheme } from '../../context/ThemeContext';

const CameraButton = ({
  type = 'capture', // 'capture' | 'icon'
  onPress,
  icon,
  variant = 'floating',
  size = 'lg',
  style,
  ...props
}) => {
  const { colors } = useTheme();

  if (type === 'icon') {
    return (
      <Button
        variant={variant}
        size={size}
        rounded
        icon={icon}
        style={[styles.iconButton, style]}
        onPress={onPress}
        {...props}
      />
    );
  }

  return (
    <TouchableOpacity 
      style={[styles.captureButton, style]} 
      onPress={onPress}
      activeOpacity={0.8}
      {...props}
    >
      <View style={styles.captureButtonOuter}>
        <View style={[styles.captureButtonInner, { backgroundColor: colors.background.paper }]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Estilo para botão de ícone (CameraButton original)
  iconButton: {
    width: 60,
    height: 60,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Estilo para botão de captura (CaptureButton original)
  captureButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  captureButtonOuter: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default CameraButton;