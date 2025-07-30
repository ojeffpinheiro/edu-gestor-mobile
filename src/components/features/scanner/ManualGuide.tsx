import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';

interface ManualGuideProps {
  setActiveMode: (mode: null) => void;
  manualInput: string;
  setManualInput: (text: string) => void;
  showError: boolean;
  setShowError: (show: boolean) => void;
  handleManualSubmit: () => void;
}

const ManualGuide: React.FC<ManualGuideProps> = ({
  setActiveMode,
  manualInput,
  setManualInput,
  showError,
  setShowError,
  handleManualSubmit,
}) => {
  const { colors } = useTheme();

  const validateISBN = (code: string) => {
    // Remove hífens para validação
    const cleanCode = code.replace(/-/g, '');

    // Verifica se tem 13 dígitos (ISBN-13)
    if (cleanCode.length !== 13) {
      return { valid: false, message: 'O ISBN deve ter 13 dígitos' };
    }

    // Verifica se são apenas números
    if (!/^\d+$/.test(cleanCode)) {
      return { valid: false, message: 'O ISBN deve conter apenas números' };
    }

    // Cálculo do dígito verificador
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanCode[i]) * (i % 2 === 0 ? 1 : 3);
    }
    const checkDigit = (10 - (sum % 10)) % 10;

    if (parseInt(cleanCode[12]) !== checkDigit) {
      return { valid: false, message: 'Dígito verificador inválido' };
    }

    return { valid: true };
  };

  return (
    <View style={[styles.manualGuideContainer, { backgroundColor: colors.background.primary }]}>
      <TouchableOpacity style={styles.closeButton} onPress={() => setActiveMode(null)}>
        <Ionicons name="close" size={32} color={colors.text.primary} />
      </TouchableOpacity>

      <Text style={[styles.manualTitle, { color: colors.text.primary }]}>ISBN XXX-XXXX-XXXXXXX</Text>

      <View style={[styles.scannerBox, styles.manualBox, { backgroundColor: colors.component.card, borderColor: colors.border.medium }]}>
        <View style={[styles.manualBarcodePlaceholder, { backgroundColor: colors.component.disabled }]} />

        {showError && (
          <View style={[styles.errorContainer, { backgroundColor: `${colors.feedback.error}10` }]}>
            <MaterialIcons
              name="error-outline"
              size={16}
              color={colors.feedback.error}
            />
            <Text style={[styles.errorMessage, { color: colors.feedback.error }]}>
              Código inválido. Verifique o formato (XXX-X-XX-XXXXXX-X)
            </Text>
          </View>
        )}

        <TextInput
          style={[styles.manualInput, {
            backgroundColor: colors.component.input,
            color: colors.text.primary,
            borderColor: showError ? colors.feedback.error : colors.component.inputBorder
          }]}
          placeholder="XXX-X-XX-XXXXXX-X"
          placeholderTextColor={colors.text.secondary}
          value={manualInput}
          onChangeText={(text) => {
            setManualInput(text);
            setShowError(false);
          }}
          autoComplete="off"
        />
      </View>

      <TouchableOpacity
        style={[styles.scanButton, { backgroundColor: colors.component.primaryButton }]}
        onPress={handleManualSubmit}
      >
        <Text style={[styles.scanButtonText, { color: colors.text.onPrimary }]}>Escanear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  manualGuideContainer: {
    flex: 1,
    padding: 32,
    paddingTop: 64,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  manualTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  scannerBox: {
    width: '90%',
    aspectRatio: 1,
    maxWidth: 360,
    marginVertical: 48,
    position: 'relative',
    borderWidth: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  manualBox: {
    padding: 16,
    aspectRatio: undefined,
    height: 240,
    justifyContent: 'space-between',
  },
  manualBarcodePlaceholder: {
    height: 80,
    width: '100%',
    marginBottom: 16,
  },
  errorMessage: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 12,
  },
  manualInput: {
    width: '100%',
    borderRadius: 6,
    padding: 12,
    fontSize: 18,
    borderWidth: 1,
  },
  scanButton: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  scanButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
});

export default ManualGuide;