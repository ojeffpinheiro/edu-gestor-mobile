import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Check, X, CheckCircle } from 'lucide-react-native';
import { useAnimation } from '../../hooks/useAnimation';
import * as Haptics from 'expo-haptics';

interface SelectionBarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  isAllSelected?: boolean;
  style?: any;
}

const SelectionBar: React.FC<SelectionBarProps> = ({
  selectedCount,
  totalCount,
  onDeselectAll,
  onConfirm,
  onSelectAll,
  confirmLabel = 'Confirmar',
  isAllSelected = false,
  style
}) => {
  const { colors } = useTheme();
  const { pressAnimation, animatedStyles } = useAnimation({
    pressScale: 0.97,
    enableHapticFeedback: true
  });

  const handlePress = (action: () => void) => {
    pressAnimation({
      hapticType: 'light',
      onPress: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        action();
      }
    });
  };

  const styles = createStyles(colors);

  if (selectedCount === 0) return null;

  return (
    <Animated.View style={[styles.container, style, animatedStyles]}>
      <View style={styles.counterContainer}>
        <CheckCircle size={20} color={colors.primary.main} />
        <Text style={styles.counterText}>
          {selectedCount} {selectedCount === 1 ? 'selecionado' : 'selecionados'}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        {!isAllSelected ? (
          <TouchableOpacity
            onPress={() => handlePress(onSelectAll)}
            style={styles.actionButton}
            accessibilityLabel="Selecionar todos"
            accessibilityRole="button"
          >
            <Text style={styles.actionText}>Selecionar todos</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handlePress(onDeselectAll)}
            style={styles.actionButton}
            accessibilityLabel="Desselecionar todos"
            accessibilityRole="button"
          >
            <X size={16} color={colors.primary.main} />
            <Text style={styles.actionText}>Limpar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => handlePress(onConfirm)}
          style={[styles.actionButton, styles.confirmButton]}
          accessibilityLabel={confirmLabel}
          accessibilityRole="button"
        >
          <Text style={[styles.actionText, styles.confirmText]}>{confirmLabel}</Text>
          <Check size={16} color={colors.text.onPrimary} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.component.card,
      borderRadius: 12,
      padding: 12,
      marginHorizontal: 16,
      marginBottom: 8,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    counterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    counterText: {
      marginLeft: 8,
      color: colors.text.primary,
      fontWeight: '500',
    },
    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      marginLeft: 8,
    },
    actionText: {
      color: colors.primary.main,
      fontWeight: '500',
      marginRight: 4,
    },
    confirmButton: {
      backgroundColor: colors.primary.main,
      paddingHorizontal: 16,
    },
    confirmText: {
      color: colors.text.onPrimary,
      marginRight: 8,
    },
  });

export default React.memo(SelectionBar);