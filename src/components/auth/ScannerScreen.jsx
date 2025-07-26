import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Alert, Linking, Animated } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { ScanLine } from 'lucide-react-native';

import { useTheme } from '../../context/ThemeContext';

import PermissionRequestCard from './PermissionRequestCard';
import ScanResultCard from './ScanResultCard';
import ScannerControls from './ScannerControls';
import ScannerOverlay from './ScannerOverlay';

import SectionHeader from '../common/SectionHeader';
import Card from '../common/Card';

import { createScannerScreenStyles } from './styles';

const ScannerScreen = ({ setCurrentView, scannedCode, setScannedCode }) => {
  const { colors } = useTheme();
  const styles = createScannerScreenStyles(colors);
  const [scannerActive, setScannerActive] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const camera = useRef(null);

  // Animações
  const scanLineAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  const barcodeTypes = [
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

  const toggleTorch = async () => {
    try {
      if (camera.current) {
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
      }
    } catch (error) {
      console.error("Erro ao alternar flash:", error);
      Alert.alert("Erro", "Não foi possível ativar o flash.");
    }
  };

  const handleBarcodeScanned = ({ data }) => {
    if (!scannedCode && isScanning) {
      setScannedCode(data);
      setScannerActive(false);
      setIsScanning(false);
    }
  };

  const startScanning = async () => {
    if (hasPermission === false) {
      Alert.alert('Permissão Negada', 'Você precisa conceder permissão para a câmera para usar o scanner.');
      return;
    }
    setScannerActive(true);
    setIsScanning(true);
    setScannedCode(null);
  };

  const stopScanning = () => {
    setScannerActive(false);
    setIsScanning(false);
  };

  const simulateBarcodeScan = () => {
    const mockCodes = ['PROVA001', 'TURMA3A', 'TURMA3B', 'PROVA002'];
    const randomCode = mockCodes[Math.floor(Math.random() * mockCodes.length)];
    setScannedCode(randomCode);
    setScannerActive(false);
    setIsScanning(false);
  };

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraPermissions();
  }, []);

  if (hasPermission === null) {
    return <PermissionRequestCard onRequestPermission={() => Camera.requestCameraPermissionsAsync()} onBack={() => setCurrentView('auth')} />;
  }

  if (hasPermission === false) {
    return <PermissionRequestCard isError onRequestPermission={() => Camera.requestCameraPermissionsAsync()} onBack={() => setCurrentView('auth')} />;
  }

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.scrollContainer}>
        <Card>
          <SectionHeader
            title="Scanner"
            subtitle="Capture a imagem do documento"
            iconName="camera"
          />

          <View style={styles.scannerContainer}>
            {scannerActive ? (
              <View style={styles.cameraContainer}>
                <CameraView
                  ref={camera}
                  style={styles.camera}
                  onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
                  barcodeScannerSettings={{ barcodeTypes }}
                  torchEnabled={torchOn}
                />
                <ScannerOverlay scanLineAnimation={scanLineAnimation} isScanning={isScanning} />
              </View>
            ) : (
              <View style={styles.scannerPlaceholder}>
                <Animated.View style={{ transform: [{ scale: pulseAnimation }] }}>
                  <View style={styles.scannerIconContainer}>
                    <ScanLine size={40} color={colors.primary.main} />
                  </View>
                  <Text style={styles.scannerReadyText}>Pronto para escanear</Text>
                  <Text style={styles.scannerHintText}>Toque no botão abaixo para iniciar</Text>
                </Animated.View>
              </View>
            )}
          </View>

          {scannedCode && (
            <ScanResultCard
              code={scannedCode}
              onContinue={() => setCurrentView('students')}
            />
          )}

          <ScannerControls
            scannerActive={scannerActive}
            torchOn={torchOn}
            pulseAnimation={pulseAnimation}
            onStartScanning={startScanning}
            onStopScanning={stopScanning}
            onToggleTorch={toggleTorch}
            onSimulateScan={simulateBarcodeScan}
            onBack={() => setCurrentView('auth')}
          />
        </Card>
      </ScrollView>
    </View>
  );
};

export default ScannerScreen;