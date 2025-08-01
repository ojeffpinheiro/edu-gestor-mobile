import * as tf from '@tensorflow/tfjs';
import { useState, useEffect } from 'react';
import { mapCentroidsToGrid, Mark } from '../utils/coordinateUtils';
import { calculateCentroids, detectShapes, loadAndProcessImage } from '../utils/markUtils';

interface UseMarkDetectionProps {
  imageUri: string;
  gridSize?: { rows: number; cols: number };
}

export const useMarkDetection = ({ imageUri, gridSize = { rows: 5, cols: 5 } }: UseMarkDetectionProps) => {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async () => {
    if (!imageUri) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
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
      setProcessedImage(imageUri); // Poderia ser uma URI de imagem processada se aplicável
    } catch (err) {
      console.error('Erro na análise:', err);
      setError('Falha ao processar a imagem. Por favor, tente novamente.');
    } finally {
      setIsProcessing(false);
      tf.disposeVariables();
    }
  };

  // Analisar automaticamente quando a imagem mudar
  useEffect(() => {
    analyzeImage();
  }, [imageUri]);

  return {
    marks,
    processedImage,
    isProcessing,
    error,
    analyzeImage
  };
};