import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FeedbackPosition, FeedbackType } from '../../types/feedback';
import { useTheme } from '../../context/ThemeContext';

interface FeedbackProps {
  visible: boolean;
  options: {
    type: FeedbackType;
    position?: FeedbackPosition;
    duration?: number;
    title?: string;
    message: string;
  };
  onHide: () => void;
}

const iconMap = {
  success: Ionicons,
  error: Ionicons,
  warning: Ionicons,
  info: Ionicons
};

const iconNameMap: Record<FeedbackType, keyof typeof Ionicons.glyphMap> = {
  success: 'checkmark-circle',
  error: 'close-circle',
  warning: 'warning',
  info: 'information-circle'
};

const Feedback: React.FC<FeedbackProps> = ({ visible, options, onHide }) => {
  const { colors } = useTheme();
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(30)).current;

  const positionStyles = {
    top: { top: 60 },
    bottom: { bottom: 60 },
    center: { top: '50%' as const, marginTop: -50 }
  };

  const variantColors = {
    success: colors.feedback.success,
    error: colors.feedback.error,
    warning: colors.feedback.warning,
    info: colors.feedback.info,
  };

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideFeedback();
      }, options.duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideFeedback = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 30,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  };

  if (!visible) return null;

  const IconComponent = iconMap[options.type];
  const iconName = iconNameMap[options.type];
  const position = options.position || 'bottom';

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyles[position],
        {
          opacity,
          transform: [{ translateY }],
          backgroundColor: variantColors[options.type] + '20',
          borderLeftColor: variantColors[options.type],
        }
      ]}
    >
      <View style={styles.content}>
        <IconComponent
          name={iconName}
          size={24}
          color={variantColors[options.type]}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          {options.title && (
            <Text style={[styles.title, { color: variantColors[options.type] }]}>
              {options.title}
            </Text>
          )}
          <Text style={[styles.message, { color: colors.text.primary }]}>
            {options.message}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
  },
});

export default Feedback;