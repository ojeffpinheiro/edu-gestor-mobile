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

// Declarar tipo para o modelo
let edgeDetectionModel: tf.GraphModel | null = null;

async function initializeTF() {
  await tf.ready();
  console.log('TensorFlow.js está pronto');
}

export const loadModels = async (): Promise<void> => {
  try {
    // Inicialize o TensorFlow primeiro
    await initializeTF();
    
    if (!edgeDetectionModel) {
      const modelJson = require('../assets/models/edge_detection/model.json');
      const modelWeights = require('../assets/models//edge_detection/weights.bin');
      
      edgeDetectionModel = await tf.loadGraphModel(
        bundleResourceIO(modelJson, modelWeights)
      );
    }
  } catch (error) {
    console.error('Erro ao carregar modelos:', error);
    throw error;
  }
};

export const detectEdges = async (tensor: Tensor3D): Promise<DetectionResult> => {
  if (!edgeDetectionModel) {
    throw new Error('Modelo não carregado. Chame loadModels() primeiro.');
  }

  // Pré-processamento
  const resizedTensor = tf.image.resizeBilinear(tensor, [256, 256]);
  const normalizedTensor = resizedTensor.div(255.0);
  const batchedTensor = normalizedTensor.expandDims(0) as Tensor4D;

  // Executar inferência
  const predictions = edgeDetectionModel.predict(batchedTensor);
  
  // Verificar o tipo de saída e extrair o tensor principal
  let resultTensor: Tensor;
  if (Array.isArray(predictions)) {
    resultTensor = predictions[0];
  } else if (predictions instanceof tf.Tensor) {
    resultTensor = predictions;
  } else {
    // Se for NamedTensorMap, assumimos que a chave é 'output'
    resultTensor = predictions['output'] as Tensor;
  }

  const edges = processPredictions(resultTensor);
  const quality = calculateAlignmentQuality(edges);
  
  // Liberar tensores da memória
  tf.dispose([resizedTensor, normalizedTensor, batchedTensor, resultTensor]);
  
  return { edges, quality };
};

const processPredictions = (predictions: Tensor): DetectedEdges => {
  const data = predictions.dataSync();
  
  // Extrair coordenadas dos cantos (exemplo simplificado)
  return {
    topLeft: { x: data[0] * 100, y: data[1] * 100 },
    topRight: { x: data[2] * 100, y: data[3] * 100 },
    bottomLeft: { x: data[4] * 100, y: data[5] * 100 },
    bottomRight: { x: data[6] * 100, y: data[7] * 100 }
  };
};

export const calculateAlignmentQuality = (edges: DetectedEdges): number => {
  const { topLeft, topRight, bottomLeft, bottomRight } = edges;
  
  // Calcular ângulos
  const angleTop = Math.atan2(topRight.y - topLeft.y, topRight.x - topLeft.x) * 180 / Math.PI;
  const angleLeft = Math.atan2(bottomLeft.y - topLeft.y, bottomLeft.x - topLeft.x) * 180 / Math.PI;
  
  // Calcular distorções
  const horizontalDistortion = Math.abs(angleTop - 0); // 0° ideal
  const verticalDistortion = Math.abs(angleLeft - 90); // 90° ideal
  
  // Calcular proporções
  const width = distance(topLeft, topRight);
  const height = distance(topLeft, bottomLeft);
  const aspectRatio = width / height;
  const ratioDistortion = Math.abs(aspectRatio - 0.707); // Exemplo para A4
  
  // Combinar métricas (valores arbitrários para exemplo)
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