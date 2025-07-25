import React from 'react';
import { StyleSheet } from 'react-native';
import Button from '../common/Button';

const NavButton = ({ icon, active, ...props }) => {
  return (
    <Button
      variant={active ? 'floating' : 'ghost'}
      icon={icon}
      rounded
      style={[styles.button, active && styles.activeButton]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    padding: 0,
  },
  activeButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default NavButton;