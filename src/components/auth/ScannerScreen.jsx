import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Alert, Linking, Animated } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { useTheme } from '../../context/ThemeContext';
import PermissionRequestCard from './PermissionRequestCard';
import ScanResultCard from './ScanResultCard';
import ScannerControls from './ScannerControls';
import ScannerOverlay from './ScannerOverlay';

const ScannerScreen = ({ setCurrentView, scannedCode, setScannedCode }) => {
  const { colors } = useTheme();
  const [scannerActive, setScannerActive] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const camera = useRef(null);

  // Animações
  const scanLineAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0.8)).current;
  const successAnimation = useRef(new Animated.Value(0)).current;

  const barcodeTypes = [
    'qr', 'pdf417', 'ean13', 'ean8', 'code128', 'code39', 'code93', 'codabar', 'itf14', 'upc_a', 'upc_e', 'aztec', 'datamatrix'
  ];

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

  // Efeitos para animações (manter os mesmos useEffect do original)

  // Solicitar permissão da câmera
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
    <View style={{ flex: 1, backgroundColor: colors.card }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={CardStyles.base}>
          <View style={{ alignItems: 'center', marginBottom: Spacing.xl }}>
            <View style={[ButtonStyles.primary, { backgroundColor: colors.primary + '15' }]}>
              <View style={{ backgroundColor: colors.primary + '25', padding: Spacing.md, borderRadius: 50 }}>
                <ScanLine size={28} color={colors.primary} />
              </View>
            </View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.textPrimary }}>
              Scanner Inteligente
            </Text>
            <Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: Spacing.sm }}>
              Escaneie QR Code ou código de barras da prova/turma
            </Text>
          </View>

          <View style={{ height: 300, borderRadius: 12, overflow: 'hidden', marginBottom: Spacing.xl }}>
            {scannerActive ? (
              <View style={{ flex: 1, position: 'relative' }}>
                <CameraView
                  ref={camera}
                  style={{ flex: 1 }}
                  onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
                  barcodeScannerSettings={{ barcodeTypes }}
                  torchEnabled={torchOn}
                />
                <ScannerOverlay scanLineAnimation={scanLineAnimation} isScanning={isScanning} />
              </View>
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.gray[100] }}>
                <Animated.View style={{ transform: [{ scale: pulseAnimation }] }}>
                  <View style={{ backgroundColor: colors.primary + '20', padding: Spacing.lg, borderRadius: 50 }}>
                    <ScanLine size={40} color={colors.primary} />
                  </View>
                  <Text style={{ color: colors.textPrimary, marginTop: Spacing.md, fontWeight: '600' }}>
                    Pronto para escanear
                  </Text>
                  <Text style={{ color: colors.textSecondary, marginTop: Spacing.xs }}>
                    Toque no botão abaixo para iniciar
                  </Text>
                </Animated.View>
              </View>
            )}
          </View>

          {scannedCode && (
            <ScanResultCard 
              code={scannedCode} 
              animation={successAnimation} 
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
        </View>
      </ScrollView>
    </View>
  );
};

export default ScannerScreen;