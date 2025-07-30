import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BarcodeScanningResult, BarcodeType } from 'expo-camera';

import { useTheme } from '../../../context/ThemeContext';

import ScannerCamera from '../../common/ScannerCamera';
import { useUserFeedback } from '../../../hooks/useUserFeedback';

interface QRGuideProps {
  setActiveMode: (mode: null) => void;
  isScanning: boolean;
  handleBarcodeScanned: (result: BarcodeScanningResult) => void;
  barcodeTypes: BarcodeType[];
  torchOn: boolean;
  scanLineAnimation: any;
  onMockScan: (type: 'valid' | 'invalid') => void;
}

const QRGuide: React.FC<QRGuideProps> = ({
  setActiveMode,
  isScanning,
  handleBarcodeScanned,
  barcodeTypes,
  torchOn,
  scanLineAnimation,
  onMockScan
}) => {
  const { colors } = useTheme();
  const { showFeedback } = useUserFeedback();

  const handleMockScan = (type: 'valid' | 'invalid') => {
    onMockScan(type);
    showFeedback({
      type: type === 'valid' ? 'success' : 'error',
      message: type === 'valid'
        ? 'Código válido detectado!'
        : 'Código inválido. Por favor, tente novamente.',
      duration: 3000,
      useToast: true,
      haptic: true
    });
  };

  const handleUpload = () => {
    showFeedback({
      type: 'info',
      message: 'Funcionalidade de upload em desenvolvimento',
      duration: 2000,
      useToast: true
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.mockButton, { backgroundColor: colors.component.card }]}
        onPress={() => {
          Alert.alert(
            'Dados de Teste',
            'Escolha um tipo de código para testar:',
            [
              {
                text: 'Código Válido',
                onPress: () => handleMockScan('valid'),
                style: 'default'
              },
              {
                text: 'Código Inválido',
                onPress: () => handleMockScan('invalid'),
                style: 'destructive'
              },
              {
                text: 'Cancelar',
                style: 'cancel'
              }
            ]
          );
        }}
      >
        <MaterialIcons name="science" size={20} color={colors.text.onPrimary} />
        <Text style={[styles.mockButtonText, { color: colors.text.onPrimary }]}>
          Testar com Dados Mockados
        </Text>
      </TouchableOpacity>

      <ScannerCamera
        isScanning={isScanning}
        handleBarcodeScanned={handleBarcodeScanned}
        barcodeTypes={barcodeTypes}
        torchOn={torchOn}
        scanLineAnimation={scanLineAnimation}
        borderColor={colors.accent[2]}
        cornerColor={colors.feedback.error}
        scanLineColor={colors.accent[2]}
      />

      <TouchableOpacity
        style={[styles.uploadButton, { backgroundColor: colors.component.primaryButton }]}
        onPress={() => Alert.alert('Upload', 'Funcionalidade de upload será implementada')}
      >
        <MaterialIcons name="file-upload" size={20} color={colors.text.onPrimary} />
        <Text style={[styles.uploadButtonText, { color: colors.text.onPrimary }]}>Upload From Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  uploadButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  mockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
    marginTop: 8,
  },
  mockButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default QRGuide;