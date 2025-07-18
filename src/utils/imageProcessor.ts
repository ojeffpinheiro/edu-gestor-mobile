import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { Tensor3D, Tensor4D, Tensor } from '@tensorflow/tfjs';

// Definir tipos para as bordas detectadas
interface Point {
  x: number;
  y: number;
}

interface DetectedEdges {
  topLeft: Point;
  topRight: Point;
  bottomLeft: Point;
  bottomRight: Point;
}

interface DetectionResult {
  edges: DetectedEdges;
  quality: number;
}

interface ImageAnalysisResult {
  edges: DetectedEdges;
  quality: number;
  contrast: number;
  sharpness: number;
  brightness: number;
  alignment: number;
}

// Declarar tipo para o modelo
let edgeDetectionModel: tf.GraphModel | null = null;

async function initializeTF() {
  await tf.ready();
  console.log('TensorFlow.js está pronto');
}

export const loadModels = async (): Promise<void> => {
  try {
    await initializeTF();
    
    if (!edgeDetectionModel) {
      const modelJson = require('../assets/models/edge_detection/model.json');
      const modelWeights = require('../assets/models/edge_detection/weights.bin');
      
      edgeDetectionModel = await tf.loadGraphModel(
        bundleResourceIO(modelJson, modelWeights)
      );
    }
  } catch (error) {
    console.error('Erro ao carregar modelos:', error);
    throw error;
  }
};

// Funções auxiliares
const processImageData = async (tensor: tf.Tensor3D): Promise<ImageData> => {
  const [height, width] = tensor.shape;
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Não foi possível obter o contexto 2D');
  }

  const imageData = ctx.createImageData(width, height);
  const data = await tensor.data();
  
  for (let i = 0; i < data.length; i++) {
    imageData.data[i] = data[i] * 255;
  }
  
  ctx.putImageData(imageData, 0, 0);
  return imageData;
};

const calculateContrast = (imageData: ImageData): number => {
  // Implementação simplificada do cálculo de contraste
  let sum = 0;
  let sumSquares = 0;
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    sum += brightness;
    sumSquares += brightness * brightness;
  }
  
  const mean = sum / (data.length / 4);
  const variance = (sumSquares / (data.length / 4)) - (mean * mean);
  return Math.round(Math.sqrt(variance));
};

const calculateSharpness = (imageData: ImageData): number => {
  // Implementação simplificada do cálculo de nitidez
  const data = imageData.data;
  let sharpness = 0;
  
  for (let i = 4; i < data.length - 4; i += 4) {
    const delta = Math.abs(data[i] - data[i - 4]);
    sharpness += delta;
  }
  
  return Math.round(sharpness / (data.length / 4));
};

const calculateBrightness = (imageData: ImageData): number => {
  // Implementação simplificada do cálculo de brilho
  const data = imageData.data;
  let sum = 0;
  
  for (let i = 0; i < data.length; i += 4) {
    sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
  }
  
  return Math.round(sum / (data.length / 4));
};

const calculateAlignment = (edges: DetectedEdges): number => {
  const { topLeft, topRight, bottomLeft } = edges;
  const angleTop = Math.atan2(topRight.y - topLeft.y, topRight.x - topLeft.x) * 180 / Math.PI;
  const angleLeft = Math.atan2(bottomLeft.y - topLeft.y, bottomLeft.x - topLeft.x) * 180 / Math.PI;
  
  const horizontalDistortion = Math.abs(angleTop - 0);
  const verticalDistortion = Math.abs(angleLeft - 90);
  
  return 100 - (horizontalDistortion + verticalDistortion);
};

const calculateOverallQuality = (metrics: {
  contrast: number;
  sharpness: number;
  brightness: number;
  alignment: number;
}): number => {
  // Ponderação dos diferentes fatores de qualidade
  const weights = {
    contrast: 0.3,
    sharpness: 0.3,
    brightness: 0.2,
    alignment: 0.2
  };
  
  const normalizedContrast = Math.min(100, metrics.contrast * 2);
  const normalizedSharpness = metrics.sharpness;
  const normalizedBrightness = 100 - Math.abs(metrics.brightness - 128);
  const normalizedAlignment = metrics.alignment;
  
  return Math.round(
    (normalizedContrast * weights.contrast) +
    (normalizedSharpness * weights.sharpness) +
    (normalizedBrightness * weights.brightness) +
    (normalizedAlignment * weights.alignment)
  );
};

export const analyzeImage = async (tensor: tf.Tensor3D): Promise<ImageAnalysisResult> => {
  // 1. Detecção de bordas usando o modelo carregado
  const { edges } = await detectEdges(tensor);
  
  // 2. Análise de qualidade da imagem
  const imageData = await processImageData(tensor);
  
  // 3. Cálculo de métricas
  const contrast = calculateContrast(imageData);
  const sharpness = calculateSharpness(imageData);
  const brightness = calculateBrightness(imageData);
  const alignment = calculateAlignment(edges);
  
  // 4. Qualidade geral
  const quality = calculateOverallQuality({
    contrast,
    sharpness,
    brightness,
    alignment
  });
  
  return {
    edges,
    quality,
    contrast,
    sharpness,
    brightness,
    alignment
  };
};


export const detectEdges = async (tensor: Tensor3D): Promise<DetectionResult> => {
  if (!edgeDetectionModel) {
    throw new Error('Modelo não carregado. Chame loadModels() primeiro.');
  }

  const resizedTensor = tf.image.resizeBilinear(tensor, [256, 256]);
  const normalizedTensor = resizedTensor.div(255.0);
  const batchedTensor = normalizedTensor.expandDims(0) as Tensor4D;

  const predictions = edgeDetectionModel.predict(batchedTensor);
  
  let resultTensor: Tensor;
  if (Array.isArray(predictions)) {
    resultTensor = predictions[0];
  } else if (predictions instanceof tf.Tensor) {
    resultTensor = predictions;
  } else {
    resultTensor = predictions['output'] as Tensor;
  }

  const edges = processPredictions(resultTensor);
  const quality = calculateAlignmentQuality(edges);
  
  tf.dispose([resizedTensor, normalizedTensor, batchedTensor, resultTensor]);
  
  return { edges, quality };
};

const processPredictions = (predictions: Tensor): DetectedEdges => {
  const data = predictions.dataSync();
  
  return {
    topLeft: { x: data[0] * 100, y: data[1] * 100 },
    topRight: { x: data[2] * 100, y: data[3] * 100 },
    bottomLeft: { x: data[4] * 100, y: data[5] * 100 },
    bottomRight: { x: data[6] * 100, y: data[7] * 100 }
  };
};

export const calculateAlignmentQuality = (edges: DetectedEdges): number => {
  const { topLeft, topRight, bottomLeft, bottomRight } = edges;
  
  const angleTop = Math.atan2(topRight.y - topLeft.y, topRight.x - topLeft.x) * 180 / Math.PI;
  const angleLeft = Math.atan2(bottomLeft.y - topLeft.y, bottomLeft.x - topLeft.x) * 180 / Math.PI;
  
  const horizontalDistortion = Math.abs(angleTop - 0);
  const verticalDistortion = Math.abs(angleLeft - 90);
  
  const width = distance(topLeft, topRight);
  const height = distance(topLeft, bottomLeft);
  const aspectRatio = width / height;
  const ratioDistortion = Math.abs(aspectRatio - 0.707);
  
  const quality = 100 - (
    (horizontalDistortion * 0.4) + 
    (verticalDistortion * 0.4) + 
    (ratioDistortion * 20)
  );
  
  return Math.max(0, Math.min(100, Math.round(quality)));
};

const distance = (p1: Point, p2: Point): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};