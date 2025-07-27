// components/common/ScannerCamera.tsx
import React from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { CameraView, BarcodeScanningResult, BarcodeType } from 'expo-camera';
import { useTheme } from '../../context/ThemeContext';

interface ScannerCameraProps {
  isScanning: boolean;
  handleBarcodeScanned: (result: BarcodeScanningResult) => void;
  barcodeTypes: BarcodeType[];
  torchOn: boolean;
  scanLineAnimation: Animated.Value;
  borderColor: string;
  cornerColor: string;
  scanLineColor: string;
  showHeader?: boolean;
  headerTitle?: string;
  headerSubtitle?: string;
}

const ScannerCamera: React.FC<ScannerCameraProps> = ({
  isScanning,
  handleBarcodeScanned,
  barcodeTypes,
  torchOn,
  scanLineAnimation,
  borderColor,
  cornerColor,
  scanLineColor,
  showHeader = false,
  headerTitle = '',
  headerSubtitle = '',
}) => {
  const { colors } = useTheme();
  const camera = React.useRef(null);

  return (
    <View style={styles.guideContainer}>
      {showHeader && (
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text.primary }]}>{headerTitle}</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>{headerSubtitle}</Text>
        </View>
      )}

      <View style={[styles.scannerBox, { borderColor }]}>
        <View style={[styles.corner, styles.topLeft, { borderColor: cornerColor }]} />
        <View style={[styles.corner, styles.topRight, { borderColor: cornerColor }]} />
        <View style={[styles.corner, styles.bottomLeft, { borderColor: cornerColor }]} />
        <View style={[styles.corner, styles.bottomRight, { borderColor: cornerColor }]} />

        <CameraView
          ref={camera}
          onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
          barcodeScannerSettings={{ barcodeTypes }}
          flash={torchOn ? 'on' : 'off'}
          style={StyleSheet.absoluteFill}
        />

        <Animated.View
          style={[
            styles.scanLine,
            {
              backgroundColor: scanLineColor,
              transform: [{
                translateY: scanLineAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-140, 140],
                })
              }]
            }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  guideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  scannerBox: {
    width: '90%',
    aspectRatio: 1,
    maxWidth: 360,
    marginVertical: 48,
    position: 'relative',
    borderWidth: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopLeftRadius: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopRightRadius: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomLeftRadius: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomRightRadius: 4,
  },
  scanLine: {
    position: 'absolute',
    height: 2,
    width: '100%',
    left: 0,
  },
});

export default ScannerCamera;