import React from 'react';
import { BarcodeType } from 'expo-camera';
import QRGuide from './QRGuide';
import BarcodeGuide from './BarcodeGuide';
import ManualGuide from './ManualGuide';

interface ScannerModeRendererProps {
  activeMode: 'qr' | 'barcode' | 'manual' | null;
  setActiveMode: (mode: 'qr' | 'barcode' | 'manual' | null) => void;
  isScanning: boolean;
  handleBarcodeScanned: (result: any, type: 'qr' | 'barcode' | 'manual') => void;
  barcodeTypes: BarcodeType[];
  torchOn: boolean;
  scanLineAnimation: any;
  onMockScan: (mockType: "valid" | "invalid") => void;
  manualInput: string;
  setManualInput: (input: string) => void;
  showError: boolean;
  setShowError: (show: boolean) => void;
  handleManualSubmit: () => void;
}

const ScannerModeRenderer: React.FC<ScannerModeRendererProps> = ({
  activeMode,
  setActiveMode,
  isScanning,
  handleBarcodeScanned,
  barcodeTypes,
  torchOn,
  scanLineAnimation,
  onMockScan,
  manualInput,
  setManualInput,
  showError,
  setShowError,
  handleManualSubmit
}) => {
  if (!activeMode) return null;

  const modeComponents = {
    qr: (
      <QRGuide
        setActiveMode={setActiveMode}
        isScanning={isScanning}
        handleBarcodeScanned={(result) => handleBarcodeScanned(result, 'qr')}
        barcodeTypes={barcodeTypes}
        torchOn={torchOn}
        scanLineAnimation={scanLineAnimation}
        onMockScan={onMockScan}
      />
    ),
    barcode: (
      <BarcodeGuide
        setActiveMode={setActiveMode}
        isScanning={isScanning}
        handleBarcodeScanned={(result) => handleBarcodeScanned(result, 'barcode')}
        barcodeTypes={barcodeTypes}
        torchOn={torchOn}
        scanLineAnimation={scanLineAnimation}
        onMockScan={onMockScan}
      />
    ),
    manual: (
      <ManualGuide
        setActiveMode={setActiveMode}
        manualInput={manualInput}
        setManualInput={setManualInput}
        showError={showError}
        setShowError={setShowError}
        handleManualSubmit={handleManualSubmit}
      />
    )
  };

  return modeComponents[activeMode];
};

export default ScannerModeRenderer;