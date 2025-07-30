import { useState, useRef, useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { Camera, BarcodeScanningResult, BarcodeType } from 'expo-camera';
import { Easing, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { mockBarcodes, mockQRcodes } from '../mocks/scannerMocks';
import { useUserFeedback } from './useUserFeedback';

export const useScanner = () => {
  const { showFeedback } = useUserFeedback();

  const [activeMode, setActiveMode] = useState<'qr' | 'barcode' | 'manual' | null>(null);
  const [manualInput, setManualInput] = useState('');
  const [showError, setShowError] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [permissionStatus, setPermissionStatus] = useState<'undetermined' | 'granted' | 'denied'>('undetermined');
  const scanLineAnimation = useRef(new Animated.Value(0)).current;

  const barcodeTypes: BarcodeType[] = [
    'qr', 'pdf417', 'ean13', 'ean8', 'code128', 'code39', 'code93',
    'codabar', 'itf14', 'upc_a', 'upc_e', 'aztec', 'datamatrix'
  ];

  useEffect(() => {
    let animation: Animated.CompositeAnimation;

    if (isScanning) {
      animation = Animated.loop(
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
      );
      animation.start();
    } else {
      scanLineAnimation.setValue(0);
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
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

  const validateScannedCode = (code: string, mode: 'qr' | 'barcode' | 'manual' | null): boolean => {
    if (!mode) return false;

    if (mode === 'qr') {
      return mockQRcodes.valid.includes(code);
    } else if (mode === 'barcode' || mode === 'manual') {
      return mockBarcodes.valid.includes(code);
    }

    return false;
  };

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    console.log('Barcode scanned:', result.data);

    const isValid = validateScannedCode(result.data, activeMode);

    if (isValid) {
      console.log('Code is valid, proceeding...');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      showFeedback({
        type: 'success',
        message: 'Código escaneado com sucesso!',
        haptic: true
      });
      setScannedCode(result.data);
      setIsScanning(false);
      return true;
    } else {
      console.log('Invalid code');
      showFeedback({
        type: 'error',
        message: 'Código inválido. Por favor, tente novamente.',
        haptic: true
      });
      setIsScanning(false);
      return false;
    }
  };

  const startScanning = async () => {
    if (hasPermission === false) {
      showFeedback({
        type: 'error',
        message: 'Permissão da câmera negada. Por favor, habilite nas configurações.',
        haptic: true
      });
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
    if (!manualInput.trim()) {
      showFeedback({
        type: 'error',
        message: 'Por favor, insira um código válido',
        haptic: true
      });
      setShowError(true);
      return false;
    }

    if (manualInput.length > 0) {
      const isValid = validateScannedCode(manualInput, 'manual');

      if (isValid) {
        setScannedCode(manualInput);
        setShowError(false);
        return true;
      } else {
        showFeedback({
          type: 'error',
          message: 'Código inválido. Por favor, verifique e tente novamente.',
          haptic: true
        });
        setShowError(true);
        return false;
      }
    } else {
      setShowError(true);
      return false;
    }
  };

  const generateMockCode = (type: 'valid' | 'invalid') => {
    return activeMode === 'qr'
      ? mockQRcodes[type][Math.floor(Math.random() * mockQRcodes[type].length)]
      : mockBarcodes[type][Math.floor(Math.random() * mockBarcodes[type].length)];
  };

  const createMockResult = (code: string): BarcodeScanningResult => {
    return {
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
  };
  const mockScan = (type: 'valid' | 'invalid') => {
    setIsScanning(true);
    const code = generateMockCode(type);
    const mockResult = createMockResult(code);
    return handleBarcodeScanned(mockResult);
  };

  const requestPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermissionStatus(status === 'granted' ? 'granted' : 'denied');
      setHasPermission(status === 'granted');
    } catch (error) {
      setPermissionStatus('denied');
      setHasPermission(false);
    }
  };

  return {
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
    permissionStatus,
    requestPermission,
    setScannedCode,
    toggleTorch,
    handleBarcodeScanned,
    startScanning,
    stopScanning,
    handleManualSubmit,
    mockScan
  };
};