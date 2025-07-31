import { useState, useRef, useCallback, useEffect } from 'react';
import { BarcodeScanningResult } from 'expo-camera';
import { mockBarcodes, mockQRcodes } from '../mocks/scannerMocks';
import { ScanType } from '../types/authTypes';
import useErrorSystem from './useErrorSystem';

interface UseScannerEngineProps {
  activeMode: ScanType
}

export const useScannerEngine = ({ activeMode }: UseScannerEngineProps) => {
  const errorSystem = useErrorSystem();

  const [scannedCode, setScannedCode] = useState<string>('');
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const validateScannedCode = useCallback((code: string, type: ScanType): boolean => {
    const validCodes = type === 'qr' ? mockQRcodes.valid : mockBarcodes.valid;
    return validCodes.includes(code);
  }, []);

  const handleBarcodeScanned = useCallback((result: BarcodeScanningResult, type: ScanType) => {
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }

    setIsValidating(true);
    try {
      scanTimeoutRef.current = setTimeout(() => {
        const isValid = validateScannedCode(result.data, type);

        if (!isValid) {
          handleError('invalid_code');
          return;
        } else {
          setScannedCode(result.data);
        }
        setIsValidating(false);
      }, 500);
    } catch (error) {
      handleError('validation_failed');
    } finally {
      setIsValidating(false);
    }
  }, [validateScannedCode, isValidating]);

  const resetScanner = useCallback(() => {
    setScannedCode('');
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }
    setIsValidating(false);
  }, []);

  const mockScan = useCallback((mockType: 'valid' | 'invalid') => {
    if (!activeMode) return;

    const isQRMode = activeMode === 'qr';
    const mockCollection = isQRMode ? mockQRcodes : mockBarcodes;
    const codes = mockCollection[mockType];
    const randomCode = codes[Math.floor(Math.random() * codes.length)];

    const mockResult: BarcodeScanningResult = {
      data: randomCode,
      type: isQRMode ? 'qr' : 'ean13',
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

    handleBarcodeScanned(mockResult, activeMode);
  }, [activeMode, handleBarcodeScanned]);

  useEffect(() => {
    return () => {
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, []);

  const handleError = useCallback((errorType: 'invalid_code' | 'camera_unavailable' | 'validation_failed') => {
    const messages = {
      invalid_code: 'Código inválido. Por favor, tente novamente.',
      camera_unavailable: 'Câmera indisponível. Verifique as permissões.',
      validation_failed: 'Falha na validação do código.'
    };

    errorSystem.showCustomError({
      title: 'Erro',
      message: messages[errorType]
    });
  }, [errorSystem]);

  return {
    scannedCode,
    isValidating,
    handleBarcodeScanned,
    resetScanner,
    setScannedCode,
    mockScan
  };
};