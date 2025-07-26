import React from 'react';
import { StyleSheet } from 'react-native';
import Button from '../common/Button';
import { useTheme } from '../../context/ThemeContext';
import { Shadow } from '../../styles/designTokens';

const NavButton = ({ icon, active, ...props }) => {
  const { colors } = useTheme();
  
  const styles = StyleSheet.create({
    button: {
      width: 50,
      height: 50,
      padding: 0,
    },
    activeButton: {
      ...Shadow(colors).sm,
      backgroundColor: colors.primary.main,
    },
  });

  return (
    <Button
      variant={active ? 'primary' : 'ghost'}
      icon={icon}
      rounded
      style={[styles.button, active && styles.activeButton]}
      iconColor={active ? colors.text.onPrimary : colors.text.secondary}
      {...props}
    />
  );
};

export default NavButton;