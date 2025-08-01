import { useState, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as jpeg from 'jpeg-js';
import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import chroma from 'chroma-js';
import useErrorSystem from './useErrorSystem';
import { validateImageFile, validateImageQuality, validateLightingConditions } from '../utils/validationUtils';

interface PointAnalysisResult {
  pointsStatus: Record<number, boolean>;
  pointsColors: Record<number, { r: number; g: number; b: number; percentage?: number }>;
  correctPoints: number;
  totalPoints: number;
  shouldCapture: boolean;
}

const BLACK_THRESHOLD = 80;

const useImageAnalysis = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { showError } = useErrorSystem();

  const analyzeColor = useCallback((r: number, g: number, b: number) => {
    const grayValue = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    const normalizedR = r / 255;
    const normalizedG = g / 255;
    const normalizedB = b / 255;
    const color = chroma(normalizedR, normalizedG, normalizedB);
    const blackDistance = chroma.distance(color, '#000000');
    const MIN_BRIGHTNESS = 10;
    const isBlack = blackDistance < BLACK_THRESHOLD && grayValue < MIN_BRIGHTNESS;
    const percentage = Math.max(0, 100 - (blackDistance / BLACK_THRESHOLD) * 100);

    return { isBlack, grayValue, percentage };
  }, []);

  const extractFirstNumber = useCallback((value: any): number => {
    while (Array.isArray(value)) {
      value = value[0];
    }
    return typeof value === 'number' ? value : 0;
  }, []);

  const analyzePoints = useCallback(async (imageUri: string, isLandscape: boolean): Promise<PointAnalysisResult> => {
    try {
      setIsProcessing(true);

      // Validação do arquivo de imagem
      const fileValidation = validateImageFile({ uri: imageUri });
      if (!fileValidation.isValid) {
        throw new Error(fileValidation.message);
      }

      // Validação da qualidade da imagem
      const qualityValidation = await validateImageQuality(imageUri);
      if (!qualityValidation.isValid) {
        throw new Error(qualityValidation.message);
      }

      const base64String = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const rawImageData = Buffer.from(base64String, 'base64');
      const imageData = jpeg.decode(rawImageData, { useTArray: true });
      const pixelBuffer = new Uint8Array(imageData.data);
      let imageTensor = tf.tensor3d(pixelBuffer, [imageData.height, imageData.width, 4], 'float32');

      // Validação das condições de iluminação
      const lightingValidation = validateLightingConditions(imageTensor);
      if (!lightingValidation.isValid) {
        tf.dispose(imageTensor);
        throw new Error(lightingValidation.message);
      }

      // Redimensionar se necessário
      const MAX_SIZE = 1024;
      const scaleFactor = Math.min(MAX_SIZE / imageData.width, MAX_SIZE / imageData.height);

      if (scaleFactor < 1) {
        const resizedTensor = tf.image.resizeBilinear(imageTensor, [
          Math.floor(imageData.height * scaleFactor),
          Math.floor(imageData.width * scaleFactor)
        ]);
        tf.dispose(imageTensor);
        imageTensor = resizedTensor;
      }

      const referencePoints = isLandscape ? [
        { id: 1, x: 0.26, y: 0.1 },
        { id: 2, x: 0.26, y: 0.85 },
        { id: 3, x: 0.35, y: 0.1 },
        { id: 4, x: 0.5, y: 0.85 },
        { id: 5, x: 0.8, y: 0.1 },
        { id: 6, x: 0.8, y: 0.85 }
      ] : [
        { id: 1, x: 0.1, y: 0.2 },
        { id: 2, x: 1, y: 0.2 },
        { id: 3, x: 0.1, y: 0.55 },
        { id: 4, x: 1, y: 0.55 },
        { id: 5, x: 0.1, y: 0.84 },
        { id: 6, x: 1, y: 0.84 }
      ];

      const newPointsStatus: Record<number, boolean> = {};
      const newPointsColors: Record<number, { r: number; g: number; b: number; percentage?: number }> = {};
      let correctPoints = 0;

      for (const point of referencePoints) {
        const x = Math.round(point.x * imageTensor.shape[1]);
        const y = Math.round(point.y * imageTensor.shape[0]);

        const startX = Math.max(0, x - 5);
        const startY = Math.max(0, y - 5);
        const sliceWidth = Math.min(10, imageTensor.shape[1] - startX);
        const sliceHeight = Math.min(10, imageTensor.shape[0] - startY);

        const region = imageTensor.slice([startY, startX, 0], [sliceHeight, sliceWidth, 4]);

        const getChannelMean = async (channel: number) => {
          const channelSlice = region.slice([0, 0, channel], [sliceHeight, sliceWidth, 1]);
          const meanTensor = channelSlice.mean();
          const value = await meanTensor.array();
          tf.dispose([channelSlice, meanTensor]);
          return extractFirstNumber(value);
        };

        const r = await getChannelMean(0);
        const g = await getChannelMean(1);
        const b = await getChannelMean(2);

        const color = chroma(r, g, b);
        const blackDistance = chroma.distance(color, '#000000');
        const isCorrect = blackDistance < BLACK_THRESHOLD;
        const { grayValue, percentage } = analyzeColor(r, g, b);

        newPointsStatus[point.id] = isCorrect;
        newPointsColors[point.id] = {
          r: grayValue,
          g: grayValue,
          b: grayValue,
          percentage,
        };

        if (isCorrect) correctPoints++;
        tf.dispose(region);
      }

      tf.dispose(imageTensor);

      return {
        pointsStatus: newPointsStatus,
        pointsColors: newPointsColors,
        correctPoints,
        totalPoints: referencePoints.length,
        shouldCapture: correctPoints === referencePoints.length
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Falha na validação da imagem');
      showError('image_validation', errorObj);
      throw errorObj;
    } finally {
      setIsProcessing(false);
    }
  }, [analyzeColor, extractFirstNumber, showError]);

  return {
    isProcessing,
    analyzePoints
  };
};

export default useImageAnalysis;