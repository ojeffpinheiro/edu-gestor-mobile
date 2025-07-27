import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface MainButtonsProps {
  setActiveMode: (mode: 'qr' | 'barcode' | 'manual' | null) => void;
}

const MainButtons: React.FC<MainButtonsProps> = ({ setActiveMode }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.background.secondary }]}>
      <TouchableOpacity
        style={[styles.mainButton, { backgroundColor: colors.component.secondaryButton }]}
        onPress={() => setActiveMode('qr')}
      >
        <Text style={[styles.buttonText, { color: colors.text.primary }]}>Escanear via QR Code</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.mainButton, { backgroundColor: colors.component.secondaryButton }]}
        onPress={() => setActiveMode('barcode')}
      >
        <Text style={[styles.buttonText, { color: colors.text.primary }]}>Escanear via Código de Barras</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.mainButton, { backgroundColor: colors.component.secondaryButton }]}
        onPress={() => setActiveMode('manual')}
      >
        <Text style={[styles.buttonText, { color: colors.text.primary }]}>Digitar o Código</Text>
      </TouchableOpacity>
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