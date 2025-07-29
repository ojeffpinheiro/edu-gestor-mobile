import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking, Alert, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../context/ThemeContext';

import { useScanner } from '../../hooks/useScanner';

import MainButtons from '../common/MainButtons';

import QRGuide from './QRGuide';
import BarcodeGuide from './BarcodeGuide';
import ManualGuide from './ManualGuide';
import BottomBar from './BottomBar';
import { Camera } from 'expo-camera';
import PermissionRequestCard from './PermissionRequestCard';
import { AuthView } from '../../types/newTypes';

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
    manualInput,
    setManualInput,
    showError,
    setShowError,
    hasPermission,
    isScanning,
    torchOn,
    scanLineAnimation,
    barcodeTypes,
    scannedCode,
    setScannedCode,
    toggleTorch,
    handleBarcodeScanned,
    startScanning,
    stopScanning,
    handleManualSubmit,
    mockScan
  } = useScanner();
  const [permissionStatus, setPermissionStatus] = useState('undetermined');

  // Efeito para lidar com a autenticação quando um código é escaneado
  useEffect(() => {
    if (scannedCode) {
      setIsAuthenticated(true);
      setCurrentView('students');
    }
  }, [scannedCode]);

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
    }
  }, [isScanning]);

  const requestPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermissionStatus(status === 'granted' ? 'granted' : 'denied');
    } catch (error) {
      setPermissionStatus('denied');
    }
  };

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
          handleManualSubmit={() => {
            if (handleManualSubmit()) {
              setIsAuthenticated(true);
              setCurrentView('students');
              Alert.alert('Sucesso', 'Código válido inserido!');
            }
          }}
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