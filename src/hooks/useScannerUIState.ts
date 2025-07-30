import { useState, useCallback } from 'react';
import { ScanType } from '../types/authTypes';

export const useScannerUIState = () => {
  const [activeMode, setActiveMode] = useState<ScanType>(null);
  const [torchOn, setTorchOn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showError, setShowError] = useState(false);
  const [manualInput, setManualInput] = useState('');

  const toggleTorch = useCallback(() => {
    setTorchOn(prev => !prev);
  }, []);

  const startScanning = useCallback(() => {
    setIsScanning(true);
    setShowError(false);
  }, []);

  const stopScanning = useCallback(() => {
    setIsScanning(false);
  }, []);

  const resetUIState = useCallback(() => {
    setActiveMode(null);
    setTorchOn(false);
    setIsScanning(false);
    setShowError(false);
    setManualInput('');
  }, []);

  return {
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
    setManualInput,
    resetUIState
  };
};