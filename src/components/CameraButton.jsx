// CameraButton.jsx
import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './common/Button';

const CameraButton = ({ icon, variant = 'floating', size = 'lg', ...props }) => {
  return (
    <Button
      variant={variant}
      size={size}
      rounded
      icon={icon}
      style={[styles.button, props.style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraButton;