import { useState, useRef, useCallback, useEffect } from 'react';
import { BarcodeScanningResult } from 'expo-camera';
import { mockBarcodes, mockQRcodes } from '../mocks/scannerMocks';
import { useUserFeedback } from './useUserFeedback';
import { ScanType } from '../types/authTypes';

interface UseScannerEngineProps {
  activeMode: ScanType
}

export const useScannerEngine = ({ activeMode }: UseScannerEngineProps) => {
  const { showFeedback } = useUserFeedback();
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

    scanTimeoutRef.current = setTimeout(() => {
      const isValid = validateScannedCode(result.data, type);

      if (isValid) {
        setScannedCode(result.data);
        showFeedback({
          type: 'success',
          message: 'Code scanned successfully!',
          haptic: true
        });
      } else {
        showFeedback({
          type: 'error',
          message: `Invalid ${type} code. Please try again.`,
          haptic: true
        });
      }

      setIsValidating(false);
    }, 500);
  }, [validateScannedCode, showFeedback]);

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

  return {
    scannedCode,
    isValidating,
    handleBarcodeScanned,
    resetScanner,
    setScannedCode,
    mockScan
  };
};