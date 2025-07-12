import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import GridQualityIndicator from './GridQualityIndicator';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/**
 * Componente para detectar marcadores na imagem da prova
 * 
 * @param {string} imageUri - URI da imagem a ser analisada
 * @param {function} onDetection - Callback com os resultados da detecção
 */
const MarkerDetector = ({ imageUri, onDetection }) => {
  const [detectionStatus, setDetectionStatus] = useState('Analisando...');
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [detectionResult, setDetectionResult] = useState(null);

  // Áreas onde os marcadores devem estar localizados (em % da imagem)
  const MARKER_AREAS = [
    { id: 'top-left', x: 0.15, y: 0.15, size: 0.05 },
    { id: 'top-right', x: 0.85, y: 0.15, size: 0.05 },
    { id: 'bottom-left', x: 0.15, y: 0.85, size: 0.05 },
    { id: 'bottom-right', x: 0.85, y: 0.85, size: 0.05 }
  ];

  // Efeito que inicia a detecção quando o componente é montado
  useEffect(() => {
    const prepareDetection = async () => {
      try {
        // 1. Obtém as dimensões da imagem
        const { width, height } = await getImageSize(imageUri);
        setImageSize({ width, height });

        // 2. Inicia o processo de detecção
        detectMarkers(width, height);
      } catch (error) {
        console.error('Erro ao preparar detecção:', error);
        setDetectionStatus('Erro ao carregar imagem');
        onDetection({
          success: false,
          quality: 0,
          error: 'Erro ao carregar imagem'
        });
      }
    };

    prepareDetection();
  }, [imageUri]);

  const verifyMarginsPrecisely = (markers) => {
  const requiredMarkers = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  if (!requiredMarkers.every(id => markers.some(m => m.id === id))) {
    return false;
  }

  const tl = markers.find(m => m.id === 'top-left');
  const tr = markers.find(m => m.id === 'top-right');
  const bl = markers.find(m => m.id === 'bottom-left');
  const br = markers.find(m => m.id === 'bottom-right');

  // Verifica paralelismo das linhas com tolerância reduzida
  const horizontalParallelism = Math.abs((tr.y - tl.y) - (br.y - bl.y));
  const verticalParallelism = Math.abs((bl.x - tl.x) - (br.x - tr.x));

  // Verifica proporções com tolerância reduzida
  const widthRatio = (tr.x - tl.x) / (br.x - bl.x);
  const heightRatio = (bl.y - tl.y) / (br.y - tr.y);

  return horizontalParallelism < 0.02 && 
         verticalParallelism < 0.02 &&
         Math.abs(widthRatio - 1) < 0.05 && 
         Math.abs(heightRatio - 1) < 0.05;
};

  /**
   * Obtém as dimensões da imagem
   * @param {string} uri - URI da imagem
   */
  const getImageSize = async (uri) => {
    const { width, height } = await new Promise((resolve, reject) => {
      Image.getSize(uri,
        (width, height) => resolve({ width, height }),
        (error) => reject(error)
      );
    });
    return { width, height };
  };

  /**
   * Detecta os marcadores na imagem
   * @param {number} imgWidth - Largura da imagem
   * @param {number} imgHeight - Altura da imagem
   */
  const detectMarkers = async (imgWidth, imgHeight) => {
    try {
      setDetectionStatus('Processando imagem...');

      // 1. Redimensiona a imagem para melhor performance
      const resizeRatio = 800 / Math.max(imgWidth, imgHeight);
      const resizedWidth = Math.floor(imgWidth * resizeRatio);
      const resizedHeight = Math.floor(imgHeight * resizeRatio);

      const resized = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: resizedWidth } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

      setDetectionStatus('Verificando marcadores...');

      // 2. Verifica cada área de marcador
      let detectedCount = 0;
      const detectionResults = [];

      for (const area of MARKER_AREAS) {
        try {
          // Simula a detecção (em produção, você implementaria a lógica real)
          const isDetected = await simulateMarkerDetection(
            resized.uri,
            area,
            resizedWidth,
            resizedHeight
          );

          detectionResults.push({
            ...area,
            detected: isDetected
          });

          if (isDetected) detectedCount++;
        } catch (error) {
          console.error(`Erro ao verificar área ${area.id}:`, error);
          detectionResults.push({
            ...area,
            detected: false,
            error: error.message
          });
        }
      }

      // 3. Calcula a qualidade da detecção
    const marginsAligned = verifyMarginsPrecisely(
      detectionResults.filter(m => m.detected)
    );

    const quality = marginsAligned ? 
      Math.round((detectedCount / MARKER_AREAS.length) * 100) :
      Math.round((detectedCount / MARKER_AREAS.length) * 70); // Penaliza se margens não alinhadas

    const success = detectedCount >= 3 && marginsAligned;

      setDetectionStatus(success ? 'Marcadores válidos!' : 'Marcadores insuficientes');
      setDetectionResult({ success, quality, detectedCount, details: detectionResults });

      // Chama o callback com os resultados
      onDetection({
        success,
        quality,
        detectedCount,
        details: detectionResults
      });

    } catch (error) {
      console.error('Erro na detecção:', error);
      setDetectionStatus('Erro na análise');
      onDetection({
        success: false,
        quality: 0,
        error: error.message
      });
    }
  };

  /**
   * Função simulada para detecção de marcadores
   * (Em produção, substitua por uma implementação real)
   */
  const simulateMarkerDetection = async (uri, area, imgWidth, imgHeight) => {
    // Em uma implementação real, você analisaria a cor da área aqui
    // Esta simulação assume que os marcadores estão corretos 80% das vezes
    return Math.random() > 0.2;
  };

  // Renderiza a tela de detecção
  return (
    <View style={styles.container}>
      {/* Exibe a imagem sendo analisada */}
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Mostra o status da detecção */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{detectionStatus}</Text>
        {detectionResult && (
          <GridQualityIndicator quality={detectionResult.quality} />
        )}
      </View>

      {/* Visualização das áreas de detecção (para debug) */}
      {imageSize.width > 0 && MARKER_AREAS.map(area => {
        const left = area.x * imageSize.width * (screenWidth / imageSize.width);
        const top = area.y * imageSize.height * (screenHeight / imageSize.height);
        const size = area.size * Math.min(imageSize.width, imageSize.height) *
          (screenWidth / imageSize.width);

        return (
          <View
            key={area.id}
            style={[
              styles.markerArea,
              {
                left,
                top,
                width: size,
                height: size,
                borderColor: detectionResult?.details.find(d => d.id === area.id)?.detected
                  ? 'green'
                  : 'red'
              }
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  statusContainer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  statusText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  markerArea: {
    position: 'absolute',
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,0,0.2)'
  }
});

export default MarkerDetector;