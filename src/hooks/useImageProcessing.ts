// useImageProcessing.ts
import { useState, useCallback } from 'react';
import * as FileSystem from 'expo-file-system';
import * as tf from '@tensorflow/tfjs';
import * as jpeg from 'jpeg-js';
import { Buffer } from 'buffer';

import useErrorSystem from './useErrorSystem';
import useImageCapture from './useImageCapture';
import useImageAnalysis from './useImageAnalysis';

interface ImageCaptureResult {
  uri: string;
  width?: number;
  height?: number;
}

const useImageProcessing = (onPhotoCaptured: (uri: string) => void) => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [pointsStatus, setPointsStatus] = useState<Record<number, boolean>>({});
  const [pointsColors, setPointsColors] = useState<Record<number, { r: number; g: number; b: number; percentage?: number }>>({});
  const [analysisResult, setAnalysisResult] = useState<{ correctPoints: number; totalPoints: number } | null>(null);
  const [autoCaptureMode, setAutoCaptureMode] = useState<'OFF' | 'FAST' | 'SLOW'>('OFF');

  const { showError } = useErrorSystem();
  const { isProcessing: isCaptureProcessing, captureImage, handleGalleryOpen } = useImageCapture();
  const { isProcessing: isAnalysisProcessing, analyzePoints } = useImageAnalysis();

  const isProcessing = isCaptureProcessing || isAnalysisProcessing;

  const handleImageCapture = useCallback(async (imageResult: ImageCaptureResult) => {
    try {
      onPhotoCaptured(imageResult.uri);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Falha ao processar imagem');
      showError('image_processing', errorObj);
    }
  }, [onPhotoCaptured, showError]);

  const handleCapture = useCallback(async (cameraRef: React.RefObject<any>) => {
    if (isProcessing || !cameraRef.current) return;

    try {
      const photo = await captureImage(cameraRef);
      if (!photo) return;

      const result = await analyzePoints(photo.uri, isLandscape);
      setAnalysisResult({ correctPoints: result.correctPoints, totalPoints: result.totalPoints });
      setPointsStatus(result.pointsStatus);
      setPointsColors(result.pointsColors);

      if (result.correctPoints < result.totalPoints) {
        const errorMessage = `Pontos identificados: ${result.correctPoints}/${result.totalPoints}`;
        showError('point_analysis_failed', new Error(errorMessage));
        return;
      }

      await handleImageCapture({ uri: photo.uri });
    } catch (error) {
      if (error instanceof Error && error.message.includes('permission')) {
        showError('camera_permission_denied');
      } else {
        showError('capture_failed', error instanceof Error ? error : undefined);
      }
    }
  }, [isProcessing, isLandscape, captureImage, analyzePoints, handleImageCapture, showError]);

  const handleAutoCaptureToggle = useCallback(() => {
    setAutoCaptureMode(prevMode => {
      switch (prevMode) {
        case 'OFF': return 'FAST';
        case 'FAST': return 'SLOW';
        case 'SLOW': return 'OFF';
        default: return 'OFF';
      }
    });
  }, []);
  
  return {
    isProcessing,
    pointsStatus,
    pointsColors,
    analysisResult,
    autoCaptureMode,
    isLandscape,
    handleCapture,
    handleGalleryOpen,
    handleAutoCaptureToggle,
    handleImageCapture
  };
};

// Helper function para criar tensor a partir de URI
export async function getTensorFromURI(uri: string): Promise<tf.Tensor3D> {
  const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
  const rawImageData = Buffer.from(base64, 'base64');
  const imageData = jpeg.decode(rawImageData, { useTArray: true });
  return tf.tensor3d(imageData.data, [imageData.height, imageData.width, 4], 'float32');
}

export default useImageProcessing;