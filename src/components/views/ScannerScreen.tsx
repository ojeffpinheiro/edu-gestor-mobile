import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { BarcodeScanningResult, BarcodeType } from 'expo-camera';

import { useTheme } from '../../context/ThemeContext';
import { useScannerUIState } from '../../hooks/useScannerUIState';
import { useCameraPermission } from '../../hooks/useCameraPermission';
import { useScannerEngine } from '../../hooks/useScannerEngine';
import { useValidation } from '../../hooks/useValidation';

import { AuthView } from '../../types/newTypes';

import MainButtons from '../common/MainButtons';
import BottomBar from '../common/layout/BottomBar';
import PermissionStatusView from '../PermissionStatusView';
import ScannerModeRenderer from '../features/scanner/ScannerRouter';
import DevTooltip from '../features/scanner/DevTooltip';

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

  const {
    status: permissionStatus,
    requestPermission,
    openSettings,
    hasPermission
  } = useCameraPermission();

  const {
    scannedCode,
    isValidating,
    handleBarcodeScanned,
    resetScanner,
    mockScan
  } = useScannerEngine({ activeMode });

  const { validateISBN } = useValidation();

  const scanLineAnimation = useRef(new Animated.Value(0)).current;

  const barcodeTypes: BarcodeType[] = [
    'qr', 'pdf417', 'ean13', 'ean8', 'code128', 'code39', 'code93',
    'codabar', 'itf14', 'upc_a', 'upc_e', 'aztec', 'datamatrix'
  ];

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
    } else {
      scanLineAnimation.stopAnimation();
    }
  }, [isScanning]);

  const handleManualSubmit = () => {
    const validation = validateISBN(manualInput);
    if (!validation.isValid) {
      setShowError(true);
      return false;
    }

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

  // Handle permission states
  if (permissionStatus === 'denied' || permissionStatus === 'undetermined' || 
      hasPermission === null || hasPermission === false) {
    return (
      <PermissionStatusView
        status={
          permissionStatus === 'denied' ? 'denied' :
          permissionStatus === 'undetermined' ? 'undetermined' :
          hasPermission === null ? 'null' : 'false'
        }
        onRequestPermission={requestPermission}
        onBack={() => setCurrentView('auth')}
        openSettings={openSettings}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {!activeMode && <MainButtons setActiveMode={setActiveMode} />}

      <ScannerModeRenderer
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        isScanning={isScanning}
        handleBarcodeScanned={handleBarcodeScanned}
        barcodeTypes={barcodeTypes}
        torchOn={torchOn}
        scanLineAnimation={scanLineAnimation}
        onMockScan={mockScan}
        manualInput={manualInput}
        setManualInput={setManualInput}
        showError={showError}
        setShowError={setShowError}
        handleManualSubmit={handleManualSubmit}
      />

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

      <DevTooltip />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default ScannerScreen;