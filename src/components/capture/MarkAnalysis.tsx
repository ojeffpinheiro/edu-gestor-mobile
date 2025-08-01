import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { calculateCentroids, detectShapes, loadAndProcessImage } from '../../utils/markUtils';

import { useTheme } from '../../context/ThemeContext';
import { createMarkAnalysisStyles } from './CameraStyles';
import { mapCentroidsToGrid, Mark } from '../../utils/coordinateUtils';

interface MarkAnalysisProps {
  imageUri: string;
  gridSize?: { rows: number; cols: number };
  onBack?: () => void;
}

const MarkAnalysis: React.FC<MarkAnalysisProps> = ({
  imageUri,
  gridSize = { rows: 5, cols: 5 }
}) => {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const { colors } = useTheme();
  const styles = createMarkAnalysisStyles(colors);


  useEffect(() => {
    const analyzeImage = async () => {
      // 1. Carregar e processar imagem
      const imageTensor = await loadAndProcessImage(imageUri);
      // 2. Detectar marcações
      const detectedShapes = await detectShapes(imageTensor);
      // 3. Calcular centroides
      const centroids = calculateCentroids(detectedShapes);

      // 4. Mapear para grid
      const mappedMarks = mapCentroidsToGrid(
        centroids,
        gridSize.rows,
        gridSize.cols,
        imageTensor.shape[1],
        imageTensor.shape[0]
      );

      setMarks(mappedMarks);
      tf.dispose(imageTensor);
    };

    analyzeImage();
  }, [imageUri]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} />

      {/* Overlay com grade e marcações */}
      <View style={[StyleSheet.absoluteFill, styles.overlay]}>
        {/* Renderizar grade */}
        {Array.from({ length: gridSize.rows }).map((_, row) => (
          Array.from({ length: gridSize.cols }).map((_, col) => {
            const cellMark = marks.find(m => m.cell.row === row && m.cell.col === col);
            return (
              <View
                key={`${row}-${col}`}
                style={[
                  styles.cell,
                  cellMark && styles.markedCell,
                  {
                    left: `${(col / gridSize.cols) * 100}%`,
                    top: `${(row / gridSize.rows) * 100}%`,
                    width: `${100 / gridSize.cols}%`,
                    height: `${100 / gridSize.rows}%`,
                  }
                ]}
              >
                {cellMark && (
                  <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>
                      Confiança: {Math.round(cellMark.confidence * 100)}%
                    </Text>
                  </View>
                )}
              </View>
            );
          })
        ))}
      </View>
    </View>
  );
};

export default MarkAnalysis;