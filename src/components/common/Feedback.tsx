import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FeedbackPosition, FeedbackType } from '../../types/feedback';
import { useTheme } from '../../context/ThemeContext';

interface FeedbackAction {
  text: string;
  onPress: () => void;
  style?: 'primary' | 'secondary';
}

interface FeedbackProps {
  visible: boolean;
  options: {
    type: FeedbackType;
    position?: FeedbackPosition;
    duration?: number;
    title?: string;
    message: string;
    actions?: FeedbackAction[];
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
  const opacity = useRef(new Animated.Value(0.5)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const scale = useRef(new Animated.Value(0.95)).current;


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

  const actionButtonStyles = {
    primary: {
      backgroundColor: variantColors[options.type],
      borderColor: variantColors[options.type],
    },
    secondary: {
      backgroundColor: 'transparent',
      borderColor: variantColors[options.type],
    }
  };

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();

      let timer: NodeJS.Timeout;
      if (options.duration !== 0) {
        timer = setTimeout(() => {
          hideFeedback();
        }, options.duration || 3000);
      }

      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [visible]);

  const hideFeedback = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 30,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  };

  const handlePressAction = (action: FeedbackAction) => {
    action.onPress();
    hideFeedback();
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
          transform: [{ translateY }, { scale }],
          backgroundColor: variantColors[options.type] + '20',
          borderLeftColor: variantColors[options.type],
        }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={hideFeedback}
        style={styles.touchableContainer}
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

        {options.actions && options.actions.length > 0 && (
          <View style={styles.actionsContainer}>
            {options.actions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePressAction(action)}
                style={[
                  styles.actionButton,
                  actionButtonStyles[action.style || 'primary'],
                  { borderColor: variantColors[options.type] }
                ]}
              >
                <Text style={[
                  styles.actionText,
                  {
                    color: action.style === 'secondary' ?
                      variantColors[options.type] : colors.text.onPrimary
                  }
                ]}>
                  {action.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </TouchableOpacity>
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
  touchableContainer: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
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
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Feedback;