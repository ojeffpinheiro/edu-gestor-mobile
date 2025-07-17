import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Linking, StyleSheet, Animated, Dimensions, ScrollView } from 'react-native';
import { ScanLine, CheckCircle, X, Flashlight, Camera as CameraIcon, Zap } from 'lucide-react-native';
import { CameraView, Camera } from 'expo-camera';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, BorderRadius, Typography } from '../../styles/designTokens';


const ScannerScreen = ({ setCurrentView, scannedCode, setScannedCode }) => {
  const { colors } = useTheme();

  const [scannerActive, setScannerActive] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const camera = useRef(null);
  const [torchOn, setTorchOn] = useState(false);

  // Animações
  const scanLineAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0.8)).current;
  const successAnimation = useRef(new Animated.Value(0)).current;

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

  const barcodeTypes = [
    'qr', 'pdf417', 'ean13', 'ean8', 'code128', 'code39', 'code93', 'codabar', 'itf14', 'upc_a', 'upc_e', 'aztec', 'datamatrix'
  ];

  // Animação da linha de scan
  useEffect(() => {
    if (scannerActive) {
      const animateScanLine = () => {
        Animated.sequence([
          Animated.timing(scanLineAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (scannerActive) {
            animateScanLine();
          }
        });
      };
      animateScanLine();
    }
  }, [scannerActive]);

  // Animação de entrada do card
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnimation, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Animação de sucesso
  useEffect(() => {
    if (scannedCode) {
      Animated.spring(successAnimation, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      successAnimation.setValue(0);
    }
  }, [scannedCode]);

  // Animação de pulso para o botão
  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();
  }, []);

  // Solicitar permissão da câmera
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
      <View style={modernStyles.container}>
        <Animated.View style={[
          modernStyles.loadingCard,
          { backgroundColor: colors.card, opacity: fadeAnimation }
        ]}>
          <View style={modernStyles.loadingContent}>
            <Animated.View style={[
              modernStyles.loadingIconContainer,
              { backgroundColor: colors.primary + '20', transform: [{ scale: pulseAnimation }] }
            ]}>
              <CameraIcon size={32} color={colors.primary} />
            </Animated.View>
            <Text style={[modernStyles.loadingTitle, { color: colors.textPrimary }]}>
              Solicitando permissão...
            </Text>
            <View style={modernStyles.loadingDots}>
              <Animated.View style={[modernStyles.dot, { backgroundColor: colors.primary }]} />
              <Animated.View style={[modernStyles.dot, { backgroundColor: colors.primary }]} />
              <Animated.View style={[modernStyles.dot, { backgroundColor: colors.primary }]} />
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={modernStyles.container}>
        <Animated.View style={[
          modernStyles.card,
          { backgroundColor: colors.card, opacity: fadeAnimation, transform: [{ scale: scaleAnimation }] }
        ]}>
          <View style={modernStyles.header}>
            <View style={[modernStyles.iconContainer, { backgroundColor: colors.error + '15' }]}>
              <View style={[modernStyles.iconInner, { backgroundColor: colors.error + '25' }]}>
                <X size={28} color={colors.error} />
              </View>
            </View>
            <Text style={[modernStyles.title, { color: colors.textPrimary }]}>
              Permissão Necessária
            </Text>
            <Text style={[modernStyles.subtitle, { color: colors.textSecondary }]}>
              É necessário permitir o acesso à câmera para usar o scanner
            </Text>
          </View>

          <TouchableOpacity
            style={[modernStyles.primaryButton, { backgroundColor: colors.primary }]}
            onPress={() => Camera.requestCameraPermissionsAsync()}
          >
            <CameraIcon size={20} color={colors.card} style={{ marginRight: Spacing.xs }} />
            <Text style={[modernStyles.buttonText, { color: colors.card }]}>
              Permitir Acesso à Câmera
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[modernStyles.secondaryButton, { borderColor: colors.border }]}
            onPress={() => setCurrentView('auth')}
          >
            <Text style={[modernStyles.secondaryButtonText, { color: colors.textSecondary }]}>
              Voltar
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={modernStyles.container}>
        <Animated.View style={[
          modernStyles.card,
          { backgroundColor: colors.card, opacity: fadeAnimation, transform: [{ scale: scaleAnimation }] }
        ]}>
          <View style={modernStyles.header}>
            <View style={[modernStyles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
              <View style={[modernStyles.iconInner, { backgroundColor: colors.primary + '25' }]}>
                <ScanLine size={28} color={colors.primary} />
              </View>
            </View>
            <Text style={[modernStyles.title, { color: colors.textPrimary }]}>
              Scanner Inteligente
            </Text>
            <Text style={[modernStyles.subtitle, { color: colors.textSecondary }]}>
              Escaneie QR Code ou código de barras da prova/turma
            </Text>
          </View>

          <View style={modernStyles.scannerContainer}>
            {scannerActive ? (
              <View style={modernStyles.cameraContainer}>
                <CameraView
                  ref={camera}
                  style={StyleSheet.absoluteFillObject}
                  onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
                  barcodeScannerSettings={{ barcodeTypes }}
                  torchEnabled={torchOn}
                />

                {/* Overlay do scanner modernizado */}
                <View style={modernStyles.scannerOverlay}>
                  <View style={modernStyles.scannerFrameContainer}>
                    <View style={[modernStyles.scannerFrame, { borderColor: colors.primary }]}>
                      {/* Cantos animados */}
                      <View style={[modernStyles.corner, modernStyles.topLeft, { borderColor: colors.primary }]} />
                      <View style={[modernStyles.corner, modernStyles.topRight, { borderColor: colors.primary }]} />
                      <View style={[modernStyles.corner, modernStyles.bottomLeft, { borderColor: colors.primary }]} />
                      <View style={[modernStyles.corner, modernStyles.bottomRight, { borderColor: colors.primary }]} />

                      {/* Linha de scan animada */}
                      <Animated.View style={[
                        modernStyles.scanLine,
                        {
                          backgroundColor: colors.primary,
                          transform: [{
                            translateY: scanLineAnimation.interpolate({
                              inputRange: [0, 1],
                              outputRange: [-100, 100],
                            }),
                          }],
                        }
                      ]} />

                      {/* Efeito de brilho */}
                      <Animated.View style={[
                        modernStyles.scanGlow,
                        {
                          backgroundColor: colors.primary,
                          opacity: scanLineAnimation.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: [0.3, 0.8, 0.3],
                          }),
                        }
                      ]} />
                    </View>
                  </View>

                  <View style={modernStyles.instructionsContainer}>
                    <Text style={modernStyles.scannerInstructions}>
                      Posicione o código dentro da área de escaneamento
                    </Text>
                    <View style={modernStyles.scannerHints}>
                      <Text style={modernStyles.hintText}>
                        {isScanning ? 'Escaneando...' : 'Aguardando código'}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Botões flutuantes */}
                <TouchableOpacity
                  style={[modernStyles.floatingButton, modernStyles.closeButton]}
                  onPress={stopScanning}
                >
                  <X size={20} color={colors.card} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    modernStyles.floatingButton,
                    modernStyles.torchButton,
                    { backgroundColor: torchOn ? colors.warning + '20' : 'rgba(0, 0, 0, 0.7)' }
                  ]}
                  onPress={toggleTorch}
                >
                  <Flashlight
                    size={20}
                    color={torchOn ? colors.warning : colors.card}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={modernStyles.scannerPlaceholder}>
                <Animated.View style={[
                  modernStyles.scannerInactive,
                  { transform: [{ scale: pulseAnimation }] }
                ]}>
                  <View style={[modernStyles.placeholderIcon, { backgroundColor: colors.primary + '20' }]}>
                    <ScanLine size={40} color={colors.primary} />
                  </View>
                  <Text style={[modernStyles.placeholderTitle, { color: colors.textPrimary }]}>
                    Pronto para escanear
                  </Text>
                  <Text style={[modernStyles.placeholderSubtitle, { color: colors.textSecondary }]}>
                    Toque no botão abaixo para iniciar
                  </Text>
                </Animated.View>
              </View>
            )}
          </View>

          {scannedCode && (
            <Animated.View style={[
              modernStyles.successBox,
              {
                backgroundColor: colors.success + '10',
                borderColor: colors.success,
                transform: [{ scale: successAnimation }],
                opacity: successAnimation,
              }
            ]}>
              <View style={modernStyles.successContent}>
                <View style={[modernStyles.successIcon, { backgroundColor: colors.success + '20' }]}>
                  <CheckCircle size={24} color={colors.success} />
                </View>
                <View style={modernStyles.successText}>
                  <Text style={[modernStyles.successTitle, { color: colors.success }]}>
                    Código Detectado
                  </Text>
                  <Text style={[modernStyles.successCode, { color: colors.textPrimary }]}>
                    {scannedCode}
                  </Text>
                </View>
              </View>
            </Animated.View>
          )}

          {/* Botões de ação */}
          <View style={[modernStyles.footer, { backgroundColor: colors.card }]}>
            <View style={modernStyles.buttonContainer}>
              <TouchableOpacity
                style={[
                  modernStyles.primaryButton,
                  { backgroundColor: scannerActive ? colors.gray[400] : colors.primary },
                  scannerActive && modernStyles.disabledButton
                ]}
                onPress={startScanning}
                disabled={scannerActive}
              >
                <ScanLine size={20} color={colors.card} style={{ marginRight: Spacing.xs }} />
                <Text style={[modernStyles.buttonText, { color: colors.card }]}>
                  {scannerActive ? 'Escaneando...' : 'Iniciar Scanner'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[modernStyles.secondaryButton, { borderColor: colors.border }]}
                onPress={simulateBarcodeScan}
              >
                <Zap size={18} color={colors.textSecondary} style={{ marginRight: Spacing.xs }} />
                <Text style={[modernStyles.secondaryButtonText, { color: colors.textSecondary }]}>
                  Simular Código (Teste)
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {scannedCode && (
            <Animated.View style={{ opacity: successAnimation }}>
              <TouchableOpacity
                style={[modernStyles.primaryButton, { backgroundColor: colors.success }]}
                onPress={() => setCurrentView('students')}
              >
                <CheckCircle size={20} color={colors.card} style={{ marginRight: Spacing.xs }} />
                <Text style={[modernStyles.buttonText, { color: colors.card }]}>
                  Continuar para Identificação
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          <TouchableOpacity
            style={[modernStyles.tertiaryButton, { borderColor: colors.border }]}
            onPress={() => setCurrentView('auth')}
          >
            <Text style={[modernStyles.tertiaryButtonText, { color: colors.textSecondary }]}>
              Voltar
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

// Estilos modernos
const modernStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: BorderRadius.xxl,
    padding: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  loadingCard: {
    borderRadius: BorderRadius.xxl,
    padding: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  loadingTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.md,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  iconInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.md,
  },
  scannerContainer: {
    width: '100%',
    height: 250,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    backgroundColor: '#f8f9fa',
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerFrame: {
    width: 220,
    height: 220,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderWidth: 3,
  },
  topLeft: {
    top: -3,
    left: -3,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: -3,
    right: -3,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: -3,
    left: -3,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: -3,
    right: -3,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanLine: {
    position: 'absolute',
    width: '80%',
    height: 2,
    alignSelf: 'center',
    left: '10%',
    top: '50%',
    marginTop: -1,
    borderRadius: 1,
  },
  scanGlow: {
    position: 'absolute',
    width: '80%',
    height: 8,
    alignSelf: 'center',
    left: '10%',
    top: '50%',
    marginTop: -4,
    borderRadius: 4,
    opacity: 0.3,
  },
  instructionsContainer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  scannerInstructions: {
    color: '#ffffff',
    fontSize: Typography.fontSize.md,
    textAlign: 'center',
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.sm,
  },
  scannerHints: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.md,
  },
  hintText: {
    color: '#ffffff',
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  torchButton: {
    bottom: Spacing.md,
    right: Spacing.md,
  },
  scannerPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  scannerInactive: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  placeholderIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  placeholderTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  placeholderSubtitle: {
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  successBox: {
    borderWidth: 2,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  successContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  successIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  successText: {
    flex: 1,
  },
  successTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.xxs,
  },
  successCode: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 1,
  },
  buttonContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tertiaryButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    letterSpacing: 0.5,
  },
  secondaryButtonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    letterSpacing: 0.5,
  },
  tertiaryButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default ScannerScreen;