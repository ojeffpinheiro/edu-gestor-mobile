import React from 'react';
import { View, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';

import { useTheme } from '../../../context/ThemeContext';

import Button from '../../common/Button';

import { ColorScheme } from '../../../styles/colors';

interface StudentsFooterProps {
  hasSelection: boolean;
  onContinue: () => void;
  onBack: () => void;
}

// Definindo tipos para os estilos
interface StudentsFooterStyles {
  container: ViewStyle;
  primaryButton: ViewStyle;
  disabledButton: ViewStyle;
  buttonTransparent: ViewStyle;
  primaryButtonText: TextStyle;
  secondaryButton: ViewStyle;
}

const StudentsFooter = ({ hasSelection, onContinue, onBack }: StudentsFooterProps) => {
  const { colors } = useTheme();
  const styles = createStudentsFooterStyles(colors);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={
          hasSelection
            ? [colors.primary.main, colors.primary.dark]
            : [colors.component.disabled, colors.component.disabled]
        }
        style={[styles.primaryButton, !hasSelection && styles.disabledButton]}
      >
        <Button
          title="Continuar Prova"
          onPress={onContinue}
          variant="ghost"
          disabled={!hasSelection}
          style={styles.buttonTransparent}
          textStyle={styles.primaryButtonText}
          icon={<ArrowRight size={20} color="white" />}
        />
      </LinearGradient>

      <Button
        title="Voltar ao Scanner"
        onPress={onBack}
        variant="ghost"
        style={styles.secondaryButton}
      />
    </View>
  );
};

const createStudentsFooterStyles = (colors: ColorScheme): StudentsFooterStyles => 
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: colors.background.primary,
      borderTopWidth: 1,
      borderTopColor: colors.border.light,
      zIndex: 10,
    },
    primaryButton: {
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: colors.primary.main,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
      marginBottom: 16,
    },
    disabledButton: {
      shadowOpacity: 0.1,
      elevation: 2,
    },
    buttonTransparent: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      height: 56,
    },
    primaryButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    secondaryButton: {
      backgroundColor: colors.component.card,
      borderColor: colors.border.light,
      color: colors.text.card,
      borderWidth: 1,
      borderRadius: 16,
      height: 56,
    },
  });

export default React.memo(StudentsFooter);