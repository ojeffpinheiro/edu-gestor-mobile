import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView } from 'expo-camera';
import { Flashlight, Scan, ArrowLeft } from 'lucide-react-native';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

import GridDetectionOverlay from './GridDetectionOverlay';
import ScanLine from './ScanLine';
import GridQualityIndicator from './GridQualityIndicator';

import { useTheme } from '../../context/ThemeContext';
import { detectEdges, calculateAlignmentQuality } from '../../utils/imageProcessor';

import { createMainStyles } from '../../styles/mainStyles'
import { Spacing, BorderRadius } from '../../styles/designTokens';

// Componente de câmera com suporte a tensores
const TensorCamera = cameraWithTensors(CameraView);

const CameraScreen = ({ onPhotoCaptured, onBack }) => {
  const { colors } = useTheme();
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [gridDetected, setGridDetected] = useState(false);
  const [alignmentQuality, setAlignmentQuality] = useState(0);
  const [edgePositions, setEdgePositions] = useState(null);
  const cameraRef = useRef(null);
  const styles = createMainStyles(colors);
  const textureDims = { width: 1080, height: 1920 }; // Dimensões para processamento

  const toggleTorch = () => setTorchEnabled(current => !current);

  // Função para processar frames da câmera
  const handleCameraStream = async (images) => {
    const nextImageTensor = images.next().value;

    try {
      // Detectar bordas e calcular qualidade
      const { edges, quality } = await detectEdges(nextImageTensor);
      const { topLeft, topRight, bottomLeft, bottomRight } = edges;

      setAlignmentQuality(quality);
      setGridDetected(quality > 60); // Considera detectado se qualidade > 60%
      setEdgePositions(edges);

      tf.dispose(nextImageTensor);
    } catch (error) {
      console.error('Erro no processamento:', error);
    }
  };

  const handleCapture = async () => {
    if (!gridDetected) {
      Alert.alert('Atenção', 'Posicione melhor a folha dentro do quadro para melhor detecção');
      return;
    }

    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
          skipProcessing: true // Para capturar imagem mais rápido
        });
        onPhotoCaptured(photo.uri);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível capturar a foto');
      }
    }
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <TensorCamera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing={'back'}
        torchEnabled={torchEnabled}
        onReady={handleCameraStream}
        cameraTextureWidth={textureDims.width}
        cameraTextureHeight={textureDims.height}
        resizeWidth={textureDims.width}
        resizeHeight={textureDims.height}
        resizeDepth={3}
        autorender={true}
      >
        <GridDetectionOverlay detected={gridDetected} edges={edgePositions} />
        <ScanLine active={true} />
        <GridQualityIndicator quality={alignmentQuality} />

        <View style={[
          localStyles.header,
          { borderBottomColor: colors.border, backgroundColor: colors.background }
        ]}>
          <TouchableOpacity onPress={onBack}>
            <ArrowLeft size={24} color={colors.card} />
          </TouchableOpacity>
        </View>

        <View style={localStyles.overlay}>
          <View style={[localStyles.scanFrame, {
            borderColor: gridDetected ? colors.success : colors.warning
          }]}>
            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((position) => (
              <View
                key={position}
                style={[
                  localStyles.corner,
                  localStyles[position],
                  { borderColor: colors.card }
                ]}
              />
            ))}
            {edgePositions && (
              <>
                <View style={[
                  localStyles.cornerMarker,
                  {
                    left: edgePositions.topLeft.x,
                    top: edgePositions.topLeft.y,
                    borderColor: colors.success
                  }
                ]} />
                {/* Repetir para outros cantos */}
              </>
            )}
          </View>
          <Text style={[localStyles.instructionText, { color: colors.card }]}>
            {gridDetected
              ? `Posição ideal! (${alignmentQuality}%) Toque para capturar`
              : `Ajuste o alinhamento (${alignmentQuality}%)`}
          </Text>
        </View>

        <View style={localStyles.controls}>
          <TouchableOpacity
            style={[
              localStyles.button,
              {
                backgroundColor: gridDetected ? colors.success : colors.primary,
                opacity: gridDetected ? 1 : 0.7
              }
            ]}
            onPress={handleCapture}
          >
            <Scan size={24} color={colors.card} />
            <Text style={[localStyles.buttonText, { color: colors.card }]}>
              Capturar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              localStyles.torchButton,
              {
                backgroundColor: colors.card,
                borderColor: torchEnabled ? colors.warning : colors.border
              }
            ]}
            onPress={toggleTorch}
          >
            <Flashlight
              size={24}
              fill={torchEnabled ? colors.warning : 'transparent'}
              color={torchEnabled ? colors.warning : colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
      </TensorCamera>
    </View>
  );
};

const localStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1
  },
  scanFrame: {
    width: '80%',
    aspectRatio: 1,
    borderWidth: 2,
    position: 'relative'
  },
  cornerMarker: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: 'rgba(0,255,0,0.3)'
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#ffffff',
    borderWidth: 2
  },
  topLeft: {
    top: -2,
    left: -2,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  topRight: {
    top: -2,
    right: -2,
    borderLeftWidth: 0,
    borderBottomWidth: 0
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderRightWidth: 0,
    borderTopWidth: 0
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  instructionText: {
    marginTop: Spacing.lg,
    fontSize: 16,
    fontWeight: 'bold'
  },
  controls: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.sm
  },
  buttonText: {
    marginLeft: Spacing.sm,
    fontSize: 16,
    fontWeight: 'bold'
  },
  torchButton: {
    padding: Spacing.md,
    borderRadius: BorderRadius.round
  }
});

export default CameraScreen;