import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarcodeScanningResult, BarcodeType } from 'expo-camera';

import { useTheme } from '../../context/ThemeContext';
import { useScannerUIState } from '../../hooks/useScannerUIState';
import { useCameraPermission } from '../../hooks/useCameraPermission';
import { useScannerEngine } from '../../hooks/useScannerEngine';
import { useValidation } from '../../hooks/useValidation';

import { AuthView } from '../../types/newTypes';

import MainButtons from '../common/MainButtons';
import QRGuide from '../features/scanner/QRGuide';
import BarcodeGuide from '../features/scanner/BarcodeGuide';
import ManualGuide from '../features/scanner/ManualGuide';
import PermissionRequestCard from '../features/scanner/PermissionRequestCard';
import BottomBar from '../common/layout/BottomBar';

interface ScannerProps {
  setCurrentView: (view: AuthView) => void;
  setIsAuthenticated: (auth: boolean) => void;
  isAuthenticated: boolean;
}

const ScannerScreen: React.FC<ScannerProps> = ({
  setCurrentView,
  setIsAuthenticated,
  isAuthenticated
}) => {
  const { colors } = useTheme();
  const {
    activeMode,
    setActiveMode,
    torchOn,
    toggleTorch,
    isScanning,
    startScanning,
    stopScanning,
    showError,
    setShowError,
    manualInput,
    setManualInput
  } = useScannerUIState();

  // Permissões da câmera
  const {
    status: permissionStatus,
    requestPermission,
    openSettings,
    hasPermission
  } = useCameraPermission();

  // Lógica de escaneamento
  const {
    scannedCode,
    isValidating,
    handleBarcodeScanned,
    resetScanner,
    mockScan
  } = useScannerEngine({ activeMode });

  // Validação
  const {
    validateISBN,
    validateQRCode
  } = useValidation();

  // Animação
  const scanLineAnimation = useRef(new Animated.Value(0)).current;

  // Tipos de códigos de barras suportados
  const barcodeTypes: BarcodeType[] = [
    'qr', 'pdf417', 'ean13', 'ean8', 'code128', 'code39', 'code93',
    'codabar', 'itf14', 'upc_a', 'upc_e', 'aztec', 'datamatrix'
  ];

  // Efeito para lidar com a autenticação quando um código é escaneado
  useEffect(() => {
    if (scannedCode) {
      setIsAuthenticated(true);
      setCurrentView('students');
    }
  }, [scannedCode]);

  // Efeito para animação da linha de scan
  useEffect(() => {
    if (isScanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(scanLineAnimation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scanLineAnimation.stopAnimation();
    }
  }, [isScanning]);

  // Função para lidar com envio manual
  const handleManualSubmit = () => {
    const validation = validateISBN(manualInput);
    if (!validation.isValid) {
      setShowError(true);
      return false;
    }

    // Se válido, simular um scan
    const mockResult: BarcodeScanningResult = {
      data: manualInput,
      type: 'ean13',
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

    handleBarcodeScanned(mockResult, 'manual');
    return true;
  };

  // Renderização condicional baseada no status da permissão
  if (permissionStatus === 'denied') {
    return (
      <PermissionRequestCard
        onRequestPermission={requestPermission}
        onBack={() => setCurrentView('auth')}
        isError={true}
      />
    );
  }

  if (permissionStatus === 'undetermined') {
    return (
      <PermissionRequestCard
        onRequestPermission={requestPermission}
        onBack={() => setCurrentView('auth')}
        isError={false}
      />
    );
  }

  if (hasPermission === null) {
    return (
      <View style={[styles.permissionContainer, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.permissionText, { color: colors.text.primary }]}>
          Solicitando permissão para a câmera...
        </Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={[styles.permissionContainer, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.permissionText, { color: colors.text.primary }]}>
          Permissão para câmera negada
        </Text>
        <TouchableOpacity
          style={[styles.permissionButton, { backgroundColor: colors.component.primaryButton }]}
          onPress={openSettings}
        >
          <Text style={[styles.permissionButtonText, { color: colors.text.onPrimary }]}>
            Abrir Configurações
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderMode = () => {
    const modeComponents = {
      qr: (
        <QRGuide
          setActiveMode={setActiveMode}
          isScanning={isScanning}
          handleBarcodeScanned={(result) => handleBarcodeScanned(result, 'qr')}
          barcodeTypes={barcodeTypes}
          torchOn={torchOn}
          scanLineAnimation={scanLineAnimation}
          onMockScan={mockScan}
        />
      ),
      barcode: (
        <BarcodeGuide
          setActiveMode={setActiveMode}
          isScanning={isScanning}
          handleBarcodeScanned={(result) => handleBarcodeScanned(result, 'barcode')}
          barcodeTypes={barcodeTypes}
          torchOn={torchOn}
          scanLineAnimation={scanLineAnimation}
          onMockScan={mockScan}
        />
      ),
      manual: (
        <ManualGuide
          setActiveMode={setActiveMode}
          manualInput={manualInput}
          setManualInput={setManualInput}
          showError={showError}
          setShowError={setShowError}
          handleManualSubmit={handleManualSubmit}
        />
      )
    };

    return activeMode ? modeComponents[activeMode] : null;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {!activeMode && <MainButtons setActiveMode={setActiveMode} />}

      {renderMode()}

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
          <Text style={[styles.mockTooltipText, {
            color: colors.text.primary,
            backgroundColor: colors.background.secondary
          }]}>
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