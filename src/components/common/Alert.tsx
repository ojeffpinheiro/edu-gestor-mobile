import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Spacing, Typography } from '../../styles/designTokens';

type AlertVariant = 'success' | 'error' | 'warning' | 'info';
type AlertStyle = 'toast' | 'banner' | 'card' | 'inline';

interface AlertProps {
  variant: AlertVariant;
  style?: AlertStyle;
  title?: string;
  message: string;
  icon?: React.ReactNode;
  position?: 'top' | 'bottom' | 'center';
  duration?: number;
  onDismiss?: () => void;
  visible?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  style = 'banner',
  title,
  message,
  icon,
  position = 'bottom',
  duration = 3000,
  onDismiss,
  visible = true,
}) => {
  const { colors } = useTheme();
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(30)).current;

  // Mapeamento de ícones padrão
  const defaultIconMap: Record<AlertVariant, keyof typeof Ionicons.glyphMap> = {
    success: 'checkmark-circle',
    error: 'close-circle',
    warning: 'warning',
    info: 'information-circle',
  };

  // Cores variantes
  const variantColor = colors.feedback[variant];

  // Estilos de posição
  const positionStyles = {
    top: { top: 60 },
    bottom: { bottom: 60 },
    center: { top: '50%' as const, marginTop: -50 },
  };

  // Animação de entrada/saída
  useEffect(() => {
    if (visible && style !== 'inline') {
      // Animação de entrada
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

      // Configurar timer para fechar automaticamente se houver duração
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, duration);

        return () => clearTimeout(timer);
      }
    }
  }, [visible, duration]);

  const handleDismiss = () => {
    if (style !== 'inline') {
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
      ]).start(() => onDismiss?.());
    } else {
      onDismiss?.();
    }
  };

  // Renderizar ícone
  const renderIcon = () => {
    if (icon) return icon;
    
    return (
      <Ionicons
        name={defaultIconMap[variant]}
        size={24}
        color={variantColor}
        style={styles.icon}
      />
    );
  };

  // Estilos baseados no tipo de alerta
  const getAlertStyle = (): StyleProp<ViewStyle> => {
    const baseStyle = {
      backgroundColor: variantColor + (style === 'toast' ? '' : '10'),
      borderLeftColor: style === 'card' ? variantColor : 'transparent',
    };

    switch (style) {
      case 'toast':
        return [
          styles.toastContainer,
          baseStyle,
          positionStyles[position],
          { opacity, transform: [{ translateY }] },
        ];
      case 'banner':
        return [
          styles.bannerContainer,
          baseStyle,
          positionStyles[position],
          { opacity, transform: [{ translateY }] },
        ];
      case 'card':
        return [
          styles.cardContainer,
          baseStyle,
        ];
      case 'inline':
        return [
          styles.inlineContainer,
          baseStyle,
        ];
      default:
        return styles.bannerContainer;
    }
  };

  if (!visible && style !== 'inline') return null;

  const ContainerComponent = style === 'toast' || style === 'banner' ? Animated.View : View;

  return (
    <ContainerComponent style={getAlertStyle()}>
      <View style={styles.content}>
        {(style === 'banner' || style === 'card') && (
          <View style={styles.iconContainer}>
            {renderIcon()}
          </View>
        )}
        
        <View style={styles.textContainer}>
          {title && (
            <Text style={[styles.title, { color: style === 'toast' ? 'white' : variantColor }]}>
              {title}
            </Text>
          )}
          <Text style={[
            styles.message, 
            { color: style === 'toast' ? 'white' : colors.text.primary }
          ]}>
            {message}
          </Text>
        </View>
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  // Estilo Toast (FeedbackMessage)
  toastContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    zIndex: 1000,
  },
  
  // Estilo Banner (Feedback)
  bannerContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  
  // Estilo Card (StatusCard)
  cardContainer: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderLeftWidth: 4,
    marginVertical: Spacing.sm,
  },
  
  // Estilo Inline (StatusMessage)
  inlineContainer: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.sm,
    alignItems: 'center',
  },
  
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  iconContainer: {
    marginRight: Spacing.sm,
  },
  
  textContainer: {
    flex: 1,
  },
  
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xs,
  },
  
  message: {
    fontSize: Typography.fontSize.sm,
  },
  
  icon: {
    marginRight: Spacing.sm,
  },
});

export default Alert;