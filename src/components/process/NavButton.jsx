import React from 'react';
import { StyleSheet } from 'react-native';
import Button from '../common/Button';
import { useTheme } from '../../context/ThemeContext';
import { Shadow } from '../../styles/designTokens';
import { createButtonStyles } from '../../styles/globalStyles';

const NavButton = ({ icon, active, ...props }) => {
  const { colors } = useTheme();
    const buttons = createButtonStyles(colors);
  
  const styles = StyleSheet.create({
    button: {
      ...buttons.round
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