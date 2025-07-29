import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface FeedbackMessageProps {
  visible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ visible, message, type }) => {
  const { colors } = useTheme();
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  const backgroundColor = {
    success: colors.feedback.success,
    error: colors.feedback.error,
    info: colors.feedback.info,
  }[type];

  return (
    <Animated.View style={[
      styles.container,
      { backgroundColor, opacity }
    ]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 1000,
  },
  message: {
    color: 'white',
    fontWeight: '500',
  },
});

export default FeedbackMessage;