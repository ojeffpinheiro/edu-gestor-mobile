import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

type ModeTypes = 'qr' | 'barcode' | 'manual';

type Props = {
  id: ModeTypes;
  label: string;
  icon: 'qr-code' | 'barcode' | 'keyboard';
  hint: string;
}

interface MainButtonsProps {
  setActiveMode: (mode: ModeTypes) => void;
}

const MainButtons: React.FC<MainButtonsProps> = ({ setActiveMode }) => {
  const { colors } = useTheme();

  const modes: Props[] = [
    { id: 'qr', label: 'Escanear via QR Code',
      icon: 'qr-code', hint: 'Abre a câmera para escanear um código QR' },
    { id: 'barcode', label: 'Escanear via Código de Barras',
       icon: 'barcode', hint: 'Abre a câmera para escanear um código de barras' },
    { id: 'manual', label: 'Digitar o Código',
      icon: 'keyboard', hint: 'Abre a tela de entrada de código manual' },
  ];

  return (
    <View style={[styles.header, { backgroundColor: colors.background.secondary }]}>
      {modes.map(mode => (
        <TouchableOpacity key={mode.id} accessibilityRole="button"
          accessibilityHint={mode.hint} accessibilityLabel={mode.label}
          style={[styles.mainButton, { backgroundColor: colors.component.secondaryButton }]}
          onPress={() => setActiveMode(mode.id)}>
          <Text style={[styles.buttonText, { color: colors.text.primary }]}>
            {mode.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  mainButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minWidth: 160,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default MainButtons;