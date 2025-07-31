import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AccessibilityInfo,
  Keyboard,
  Platform,
  Dimensions,
  EmitterSubscription,
  findNodeHandle,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAnimation } from '../../hooks/useAnimation';
import { FeedbackAction, FeedbackOptions, FeedbackType } from '../../types/feedback';

interface FeedbackProps {
  visible: boolean;
  options: FeedbackOptions;
  onHide: () => void;
}

const iconNameMap = {
  success: 'checkmark-circle' as const,
  error: 'close-circle' as const,
  warning: 'warning' as const,
  info: 'information-circle' as const
};

const Feedback: React.FC<FeedbackProps> = ({ visible, options, onHide }) => {
  const { colors } = useTheme();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const windowHeight = Dimensions.get('window').height;
  const feedbackRef = useRef<View>(null);

  const {
    opacity,
    translateY,
    scale,
    animateIn,
    animateOut
  } = useAnimation({
    initialOpacity: 0.5,
    initialTranslateY: 30,
    initialScale: 0.95,
    duration: 300,
    pressDuration: 100,
    releaseDuration: 200,
    useNativeDriver: true
  });

  useEffect(() => {
    let keyboardDidShowListener: EmitterSubscription;
    let keyboardDidHideListener: EmitterSubscription;

    if (options.avoidKeyboard) {
      keyboardDidShowListener = Keyboard.addListener(
        Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
        (e) => {
          setKeyboardHeight(e.endCoordinates.height);
          setKeyboardVisible(true);
        }
      );

      keyboardDidHideListener = Keyboard.addListener(
        Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
        () => {
          setKeyboardHeight(0);
          setKeyboardVisible(false);
        }
      );
    }

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, [options.avoidKeyboard]);

  // Configurações de acessibilidade
  useEffect(() => {
    if (visible && feedbackRef.current) {
      AccessibilityInfo.announceForAccessibility(
        options.title ? `${options.title}. ${options.message}` : options.message || ''
      );

      // Usando findNodeHandle para obter o reactTag
      const reactTag = findNodeHandle(feedbackRef.current);
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
  }, [visible, options.title, options.message]);

  // Configuração das animações
  useEffect(() => {
    if (visible) {
      animateIn(() => {
        // Callback após a animação de entrada
      });

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


  const calculatePosition = () => {
    const baseOffset = options.offset || 0;
    const horizontalOffset = options.horizontalOffset || 20;
    const keyboardOffset = options.keyboardOffset || 20;

    // Definindo um tipo mais amplo para o estilo de posição
    let positionStyle: {
      left: number;
      right: number;
      top?: number;
      bottom?: number;
      transform?: any[];
    } = {
      left: horizontalOffset,
      right: horizontalOffset,
    };

    const verticalPosition = options.position || 'bottom';

    switch (verticalPosition) {
      case 'top':
        positionStyle = {
          ...positionStyle,
          top: baseOffset + (keyboardVisible ? keyboardOffset : 0),
        };
        break;
      case 'center':
        positionStyle = {
          ...positionStyle,
          top: windowHeight / 2 - 50 + baseOffset,
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 30],
                outputRange: [0, 30 - baseOffset]
              })
            },
            { scale }
          ],
        };
        break;
      case 'bottom':
      default:
        positionStyle = {
          ...positionStyle,
          bottom: baseOffset + (keyboardVisible ? keyboardHeight + keyboardOffset : 0),
        };
        break;
    }

    return positionStyle;
  };

  // Renderização de ícone customizado
  const renderIcon = () => {
    if (options.icon === null) return null;

    const iconColor = variantColors[options.type];
    const iconSize = 24;

    if (options.icon) {
      const CustomIcon = options.icon;
      return (
        <CustomIcon
          color={iconColor}
          size={iconSize}
          {...options.iconProps}
          style={[styles.icon, options.iconProps?.style]}
        />
      );
    }

    return (
      <Ionicons
        name={iconNameMap[options.type]}
        size={iconSize}
        color={iconColor}
        style={styles.icon}
        accessibilityElementsHidden={true}
        importantForAccessibility="no"
      />
    );
  };

  // Renderização de conteúdo customizado
  const renderContent = () => {
    if (options.content) {
      const CustomContent = options.content;
      return (
        <CustomContent
          type={options.type}
          title={options.title}
          message={options.message}
          color={variantColors[options.type]}
          {...options.contentProps}
        />
      );
    }

    return (
      <>
        {options.title && (
          <Text
            style={[styles.title, { color: variantColors[options.type] }]}
            accessibilityRole="header"
          >
            {options.title}
          </Text>
        )}
        {options.message && (
          <Text
            style={[styles.message, { color: colors.text.primary }]}
            accessibilityRole="text"
          >
            {options.message}
          </Text>
        )}
      </>
    );
  };

  const hideFeedback = () => {
    animateOut(() => {
      onHide();
    });
  };

  const handlePressAction = (action: FeedbackAction) => {
    action.onPress();
    hideFeedback();
  };

  if (!visible) return null;

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

  return (
    <View
      ref={feedbackRef}
      accessible={true}
      accessibilityRole="alert"
      accessibilityLabel={options.accessibilityLabel ||
        (options.title ? `${options.title}. ${options.message}` : options.message || '')}
      importantForAccessibility="yes"
    >
      <Animated.View style={[styles.container, calculatePosition(), {
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
          accessible={false}
        >
          <View style={styles.content}>
            {renderIcon()}
            <View style={styles.textContainer}>
              {renderContent()}
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
                  accessibilityRole="button"
                  accessibilityLabel={action.text}
                  accessibilityHint={action.accessibilityHint || `Executa a ação ${action.text}`}
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
    </View>
  );
};

declare global {
  interface FeedbackIconProps {
    color: string;
    size: number;
    style?: any;
  }

  interface FeedbackContentProps {
    type: FeedbackType;
    title?: string;
    message?: string;
    color: string;
  }
}

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