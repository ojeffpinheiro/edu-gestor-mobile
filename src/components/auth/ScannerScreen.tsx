import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, Linking, Animated, Text, TouchableOpacity, Easing } from 'react-native';
import { Camera, BarcodeScanningResult, BarcodeType } from 'expo-camera';
import { useTheme } from '../../context/ThemeContext';
import QRGuide from './QRGuide';
import BarcodeGuide from './BarcodeGuide';
import ManualGuide from './ManualGuide';
import BottomBar from './BottomBar';
import MainButtons from '../common/MainButtons';
import { mockBarcodes, mockQRcodes } from '../../mocks/scannerMocks';
import { Ionicons } from '@expo/vector-icons';

interface ScannerProps {
  setCurrentView: (view: string) => void;
  scannedCode: string;
  setScannedCode: (code: string) => void;
  setIsAuthenticated: (auth: boolean) => void;
  isAuthenticated: boolean;
}

const ScannerScreen: React.FC<ScannerProps> = ({
  setCurrentView,
  scannedCode,
  setScannedCode,
  setIsAuthenticated,
  isAuthenticated
}) => {
  const { colors } = useTheme();
  const [activeMode, setActiveMode] = useState<'qr' | 'barcode' | 'manual' | null>(null);
  const [manualInput, setManualInput] = useState('');
  const [showError, setShowError] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const scanLineAnimation = useRef(new Animated.Value(0)).current;

  const barcodeTypes: BarcodeType[] = [
    'qr', 'pdf417', 'ean13', 'ean8', 'code128', 'code39', 'code93',
    'codabar', 'itf14', 'upc_a', 'upc_e', 'aztec', 'datamatrix'
  ];

  useEffect(() => {
    if (isScanning) {
      Animated.loop(
        Animated.timing(scanLineAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      scanLineAnimation.setValue(0);
    }
  }, [isScanning]);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraPermissions();
  }, []);

  const toggleTorch = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        setTorchOn(!torchOn);
      } else {
        Alert.alert(
          "Permissão necessária",
          "Você precisa permitir o acesso à câmera para usar o flash.",
          [
            { text: "Cancelar", style: "cancel" },
            { text: "Abrir Configurações", onPress: () => Linking.openSettings() },
          ]
        );
      }
    } catch (error) {
      console.error("Erro ao alternar flash:", error);
      Alert.alert("Erro", "Não foi possível ativar o flash.");
    }
  };

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    const { data } = result;
    if (!scannedCode && isScanning) {
      // Verifica se o código escaneado é válido (mock)
      const isValid = validateScannedCode(data, activeMode);

      if (isValid) {
        setScannedCode(data);
        setIsScanning(false);
        setIsAuthenticated(true);
        setCurrentView('students');
        Alert.alert('Sucesso', 'Código válido escaneado!');
      } else {
        Alert.alert('Erro', 'Código inválido. Por favor, tente novamente.');
        setIsScanning(false);
      }
    }
  };

  const validateScannedCode = (code: string, mode: 'qr' | 'barcode' | 'manual' | null): boolean => {
    if (!mode) return false;

    if (mode === 'qr') {
      return mockQRcodes.valid.includes(code);
    } else if (mode === 'barcode' || mode === 'manual') {
      return mockBarcodes.valid.includes(code);
    }

    return false;
  };

  const startScanning = async () => {
    if (hasPermission === false) {
      Alert.alert('Permissão Negada', 'Você precisa conceder permissão para a câmera para usar o scanner.');
      return;
    }
    setIsScanning(true);
    setScannedCode('');
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  const handleManualSubmit = () => {
    if (manualInput.length > 0) {
      const isValid = validateScannedCode(manualInput, 'manual');

      if (isValid) {
        setScannedCode(manualInput);
        setIsAuthenticated(true);
        setCurrentView('students');
        Alert.alert('Sucesso', 'Código válido inserido!');
      } else {
        setShowError(true);
        Alert.alert('Erro', 'Código inválido. Por favor, verifique e tente novamente.');
      }
    } else {
      setShowError(true);
    }
  };

  const mockScan = (type: 'valid' | 'invalid') => {
    const code = activeMode === 'qr'
      ? mockQRcodes[type][Math.floor(Math.random() * mockQRcodes[type].length)]
      : mockBarcodes[type][Math.floor(Math.random() * mockBarcodes[type].length)];

    const mockResult: BarcodeScanningResult = {
      data: code,
      type: activeMode === 'qr' ? 'qr' : 'ean13',
      cornerPoints: [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 }
      ],
      bounds: {
        origin: { x: 0, y: 0 },
        size: { width: 100, height: 100 }
      }
    };

    handleBarcodeScanned(mockResult);
  };

  if (hasPermission === null) {
    return (
      <View style={[styles.permissionContainer, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.permissionText, { color: colors.text.primary }]}>Solicitando permissão para a câmera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={[styles.permissionContainer, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.permissionText, { color: colors.text.primary }]}>Permissão para câmera negada</Text>
        <TouchableOpacity
          style={[styles.permissionButton, { backgroundColor: colors.component.primaryButton }]}
          onPress={() => Linking.openSettings()}
        >
          <Text style={[styles.permissionButtonText, { color: colors.text.onPrimary }]}>Abrir Configurações</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {!activeMode && <MainButtons setActiveMode={setActiveMode} />}

      {activeMode === 'qr' && (
        <QRGuide
          setActiveMode={setActiveMode}
          isScanning={isScanning}
          handleBarcodeScanned={handleBarcodeScanned}
          barcodeTypes={barcodeTypes}
          torchOn={torchOn}
          scanLineAnimation={scanLineAnimation}
          onMockScan={mockScan}
        />
      )}

      {activeMode === 'barcode' && (
        <BarcodeGuide
          setActiveMode={setActiveMode}
          isScanning={isScanning}
          handleBarcodeScanned={handleBarcodeScanned}
          barcodeTypes={barcodeTypes}
          torchOn={torchOn}
          scanLineAnimation={scanLineAnimation}
          onMockScan={mockScan}
        />
      )}

      {activeMode === 'manual' && (
        <ManualGuide
          setActiveMode={setActiveMode}
          manualInput={manualInput}
          setManualInput={setManualInput}
          showError={showError}
          setShowError={setShowError}
          handleManualSubmit={handleManualSubmit}
        />
      )}

      <BottomBar
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        toggleTorch={toggleTorch}
        torchOn={torchOn}
        startScanning={startScanning}
        stopScanning={stopScanning}
        isScanning={isScanning}
        setManualInput={setManualInput}
        setShowError={setShowError}
      />

      {__DEV__ && (
        <View style={styles.mockTooltip}>
          <Ionicons name="information-circle" size={24} color={colors.feedback.info} />
          <Text style={[styles.mockTooltipText, { color: colors.text.primary, backgroundColor: colors.background.secondary, }]}>
            Modo desenvolvimento ativo - use os botões de teste
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  permissionButton: {
    padding: 15,
    borderRadius: 10,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  devButtons: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 100,
  },
  devButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  devButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mockTooltip: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    gap: 8,
  },
  mockTooltipText: {
    fontSize: 14,
    flex: 1,
  },
});

export default ScannerScreen;