import React from 'react';
import { TouchableOpacity, Animated, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';
import { ButtonStyles } from '../../styles/sharedComponents';

interface ButtonProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  testID?: string;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  style, 
  onPress, 
  ...props 
}) => {
  const scaleValue = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedTouchable
      style={[
        ButtonStyles.primary, 
        style, 
        { 
          transform: [{ scale: scaleValue }],
          opacity: props.disabled ? 0.6 : 1,
        }
      ]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={props.disabled}
      {...props}
    >
      {children}
    </AnimatedTouchable>
  );
};