import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Linking, StyleSheet } from 'react-native';
import { ScanLine, CheckCircle, X, Flashlight } from 'lucide-react-native';
import { CameraView, Camera } from 'expo-camera';
import { styles } from './styles';

const ScannerScreen = ({ setCurrentView, scannedCode, setScannedCode }) => {
  const [scannerActive, setScannerActive] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const camera = useRef(null);
  const [hasTorch, setHasTorch] = useState(false);
  const [torchOn, setTorchOn] = useState(false);

  const toggleTorch = () => {
    if (camera.current) {
      camera.current.toggleTorch();
      setTorchOn(!torchOn);
    }
  };

  // Formatos de código suportados
  const barcodeTypes = [
    'qr',
    'pdf417',
    'ean13',
    'ean8',
    'code128',
    'code39',
    'code93',
    'codabar',
    'itf14',
    'upc_a',
    'upc_e',
    'aztec',
    'datamatrix'
  ];

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      if (status !== 'granted') {
        Alert.alert(
          'Permissão Necessária',
          'É necessário permitir o acesso à câmera para usar o scanner.',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Configurações', onPress: () => Linking.openSettings() }
          ]
        );
      }
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ data }) => {
    if (!scannedCode && isScanning) {
      console.log('Código escaneado:', data);
      setScannedCode(data);
      setScannerActive(false);
      setIsScanning(false);
    }
  };

  const startScanning = async () => {
    if (hasPermission === false) {
      Alert.alert(
        'Permissão Negada',
        'Você precisa conceder permissão para a câmera para usar o scanner.'
      );
      return;
    }

    if (hasPermission === null) {
      // Aguardando decisão de permissão
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

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Solicitando permissão...</Text>
        </View>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <ScanLine size={24} color="#ef4444" />
            </View>
            <Text style={styles.title}>Permissão Necessária</Text>
            <Text style={styles.subtitle}>
              É necessário permitir o acesso à câmera para usar o scanner
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => Camera.requestCameraPermissionsAsync()}
          >
            <Text style={styles.buttonText}>Permitir Acesso à Câmera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setCurrentView('auth')}
          >
            <Text style={styles.secondaryButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <ScanLine size={24} color="#2563eb" />
          </View>
          <Text style={styles.title}>Scanner de Código</Text>
          <Text style={styles.subtitle}>
            Escaneie QR Code ou código de barras da prova/turma
          </Text>
        </View>

        <View style={styles.scannerContainer}>
          {scannerActive ? (
            <View style={styles.cameraContainer}>
              <CameraView
                ref={camera}
                style={StyleSheet.absoluteFillObject}
                onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
                barcodeScannerSettings={{
                  barcodeTypes: barcodeTypes,
                }}
                torchEnabled={torchOn}
              />

              {/* Overlay do scanner */}
              <View style={styles.scannerOverlay}>
                <View style={styles.scannerFrame}>
                  <View style={styles.scannerCorner} />
                  <View style={[styles.scannerCorner, styles.topRight]} />
                  <View style={[styles.scannerCorner, styles.bottomLeft]} />
                  <View style={[styles.scannerCorner, styles.bottomRight]} />
                  <View style={styles.scannerGuideLine} />
                </View>

                <Text style={styles.scannerInstructions}>
                  Posicione o código dentro da área de escaneamento
                </Text>
              </View>

              {/* Botão para fechar scanner */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={stopScanning}
              >
                <X size={24} color="#ffffff" />
              </TouchableOpacity>

              {/* Botão da lanterna */}
              <TouchableOpacity
                style={styles.scannerTorchButton}
                onPress={toggleTorch}
              >
                <Flashlight
                  size={24}
                  color={torchOn ? "#FFD700" : "#ffffff"}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.scannerPlaceholder}>
              <View style={styles.scannerInactive}>
                <ScanLine size={32} color="#9ca3af" />
                <Text style={styles.scannerText}>
                  Clique para iniciar o scanner
                </Text>
              </View>
            </View>
          )}
        </View>

        {scannedCode && (
          <View style={styles.successBox}>
            <View style={styles.successHeader}>
              <CheckCircle size={20} color="#16a34a" />
              <Text style={styles.successTitle}>Código Detectado</Text>
            </View>
            <Text style={styles.successCode}>{scannedCode}</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, scannerActive && styles.disabledButton]}
            onPress={startScanning}
            disabled={scannerActive}
          >
            <Text style={styles.buttonText}>
              {scannerActive ? 'Escaneando...' : 'Iniciar Scanner'}
            </Text>
          </TouchableOpacity>

          {/* Botão para simular (desenvolvimento/teste) */}
          <TouchableOpacity
            style={[styles.secondaryButton, { marginTop: 10 }]}
            onPress={simulateBarcodeScan}
          >
            <Text style={styles.secondaryButtonText}>
              Simular Código (Teste)
            </Text>
          </TouchableOpacity>
        </View>

        {scannedCode && (
          <TouchableOpacity
            style={styles.successButton}
            onPress={() => setCurrentView('students')}
          >
            <Text style={styles.buttonText}>Continuar para Identificação</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setCurrentView('auth')}
        >
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScannerScreen;