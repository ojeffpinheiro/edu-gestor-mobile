import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { Tensor3D, Tensor4D, Tensor } from '@tensorflow/tfjs';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { decode } from 'jpeg-js';
import { Buffer } from 'buffer';

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
  // Converte o tensor para um array de dados
  const data = await tensor.data();
  const [height, width] = tensor.shape;

  // Cria um objeto ImageData
  const imageData = new ImageData(width, height);

  // Preenche o ImageData.data com os valores do tensor (assumindo RGB ou RGBA)
  // Se o tensor for RGB (3 canais), precisamos adicionar um canal alpha
  if (tensor.shape[2] === 3) {
    for (let i = 0; i < data.length / 3; i++) {
      imageData.data[i * 4] = data[i * 3];       // R
      imageData.data[i * 4 + 1] = data[i * 3 + 1]; // G
      imageData.data[i * 4 + 2] = data[i * 3 + 2]; // B
      imageData.data[i * 4 + 3] = 255;            // Alpha (totalmente opaco)
    }
  } else if (tensor.shape[2] === 4) {
    // Se já for RGBA, apenas copia
    for (let i = 0; i < data.length; i++) {
      imageData.data[i] = data[i];
    }
  } else {
    throw new Error('Formato de tensor não suportado para conversão em ImageData. Esperado 3 ou 4 canais.');
  }

  return imageData;
};

const calculateContrast = (imageData: ImageData): number => {
  // Implementação simplificada do cálculo de contraste
  let sum = 0;
  let sumSquares = 0;
  const data = imageData.data;
  const numPixels = data.length / 4;

  if (numPixels === 0) return 0;

  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    sum += brightness;
    sumSquares += brightness * brightness;
  }

  const mean = sum / numPixels;
  const variance = (sumSquares / numPixels) - (mean * mean);
  const stdDev = Math.sqrt(variance);

  // Normaliza o desvio padrão para uma escala de 0-100
  // Um valor típico de desvio padrão para imagens com bom contraste pode ser 50-70
  // Ajuste o fator de escala (ex: 2.0) conforme necessário para o seu intervalo desejado
  return Math.round(Math.min(100, stdDev * 2.0));
};

const calculateSharpness = (imageData: ImageData): number => {
  // Implementação simplificada do cálculo de nitidez usando a diferença de pixels adjacentes
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  let sharpnessSum = 0;
  let count = 0;

  if (width <= 1 || height <= 1) return 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const currentBrightness = (data[i] + data[i + 1] + data[i + 2]) / 3;

      // Compara com o pixel à direita
      if (x < width - 1) {
        const rightBrightness = (data[i + 4] + data[i + 5] + data[i + 6]) / 3;
        sharpnessSum += Math.abs(currentBrightness - rightBrightness);
        count++;
      }
      // Compara com o pixel abaixo
      if (y < height - 1) {
        const belowBrightness = (data[((y + 1) * width + x) * 4] + data[((y + 1) * width + x) * 4 + 1] + data[((y + 1) * width + x) * 4 + 2]) / 3;
        sharpnessSum += Math.abs(currentBrightness - belowBrightness);
        count++;
      }
    }
  }

  if (count === 0) return 0;

  // Normaliza o valor de nitidez para uma escala de 0-100
  // O valor máximo de diferença entre pixels é 255.
  // Ajuste o fator de escala (ex: 0.2) conforme necessário.
  return Math.round(Math.min(100, (sharpnessSum / count) * 0.4));
};

const calculateBrightness = (imageData: ImageData): number => {
  // Implementação simplificada do cálculo de brilho
  const data = imageData.data;
  let sum = 0;
  const numPixels = data.length / 4;

  if (numPixels === 0) return 0;

  for (let i = 0; i < data.length; i += 4) {
    sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
  }

  // Retorna o brilho médio normalizado para 0-255
  return Math.round(sum / numPixels);
};

const calculateAlignment = (edges: DetectedEdges): number => {
  if (!edges || !edges.topLeft || !edges.topRight || !edges.bottomLeft || !edges.bottomRight) {
    return 0; // Retorna 0 se as bordas não forem válidas
  }

  const { topLeft, topRight, bottomLeft, bottomRight } = edges;

  // Calcula os ângulos das linhas superior e esquerda em relação aos eixos
  const angleTop = Math.atan2(topRight.y - topLeft.y, topRight.x - topLeft.x) * 180 / Math.PI;
  const angleLeft = Math.atan2(bottomLeft.y - topLeft.y, bottomLeft.x - topLeft.x) * 180 / Math.PI;

  // Calcula a distorção em relação a um retângulo perfeito (0 graus horizontal, 90 graus vertical)
  const horizontalDistortion = Math.abs(angleTop); // Idealmente 0
  const verticalDistortion = Math.abs(angleLeft - 90); // Idealmente 90

  // Calcula a proporção da largura e altura para verificar distorção de perspectiva
  const widthTop = distance(topLeft, topRight);
  const widthBottom = distance(bottomLeft, bottomRight);
  const heightLeft = distance(topLeft, bottomLeft);
  const heightRight = distance(topRight, bottomRight);

  // Verifica se as larguras e alturas são consistentes
  const widthConsistency = Math.abs(widthTop - widthBottom) / Math.max(widthTop, widthBottom);
  const heightConsistency = Math.abs(heightLeft - heightRight) / Math.max(heightLeft, heightRight);

  // Pondera as distorções para obter uma pontuação de alinhamento
  // Valores menores para distorção significam melhor alinhamento
  const alignmentScore = 100 - (
    (horizontalDistortion * 0.3) + // Penalidade para inclinação horizontal
    (verticalDistortion * 0.3) +   // Penalidade para inclinação vertical
    (widthConsistency * 20) +      // Penalidade para distorção de largura
    (heightConsistency * 20)       // Penalidade para distorção de altura
  );

  return Math.max(0, Math.min(100, Math.round(alignmentScore)));
};

const calculateOverallQuality = (metrics: {
  contrast: number;
  sharpness: number;
  brightness: number;
  alignment: number;
}): number => {
  // Ponderação dos diferentes fatores de qualidade
  const weights = {
    contrast: 0.25,
    sharpness: 0.25,
    brightness: 0.25,
    alignment: 0.25
  };

  // Normaliza as métricas para uma escala de 0-100 se ainda não estiverem
  // Brilho: idealmente próximo de 128 (meio termo). Penaliza desvios.
  const normalizedBrightness = 100 - (Math.abs(metrics.brightness - 128) / 128) * 100;

  return Math.round(
    (metrics.contrast * weights.contrast) +
    (metrics.sharpness * weights.sharpness) +
    (normalizedBrightness * weights.brightness) +
    (metrics.alignment * weights.alignment)
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

  console.log('detectEdges: Forma do tensor de entrada:', tensor.shape);

  const resizedTensor = tf.image.resizeBilinear(tensor, [256, 256]);
  const normalizedTensor = resizedTensor.div(255.0);
  const batchedTensor = normalizedTensor.expandDims(0) as Tensor4D;

  console.log('detectEdges: Forma do tensor antes da previsão:', batchedTensor.shape);

  const predictions = edgeDetectionModel.predict(batchedTensor);

  let resultTensor: Tensor;
  if (Array.isArray(predictions)) {
    resultTensor = predictions[0];
  } else if (predictions instanceof tf.Tensor) {
    resultTensor = predictions;
  } else {
    resultTensor = predictions['output'] as Tensor;
  }

  const data = resultTensor.dataSync();
  console.log('detectEdges: Dados de previsão brutos (8 valores):', data); // Verifique a saída bruta

  const edges: DetectedEdges = {
    topLeft: { x: data[0] * 256, y: data[1] * 256 },
    topRight: { x: data[2] * 256, y: data[3] * 256 },
    bottomLeft: { x: data[4] * 256, y: data[5] * 256 },
    bottomRight: { x: data[6] * 256, y: data[7] * 256 }
  };

  console.log('detectEdges: Bordas calculadas:', edges); // Verifique as bordas calculadas

  const quality = calculateAlignmentQuality(edges);
  console.log('detectEdges: Qualidade de alinhamento calculada:', quality);

  tf.dispose([resizedTensor, normalizedTensor, batchedTensor, resultTensor]);

  return { edges, quality };
};

export const calculateAlignmentQuality = (edges: DetectedEdges): number => {
  if (!edges || !edges.topLeft || !edges.topRight || !edges.bottomLeft || !edges.bottomRight) {
    return 0;
  }

  const { topLeft, topRight, bottomLeft, bottomRight } = edges;

  // Calcula os ângulos das linhas superior e esquerda
  const angleTop = Math.atan2(topRight.y - topLeft.y, topRight.x - topLeft.x) * 180 / Math.PI;
  const angleLeft = Math.atan2(bottomLeft.y - topLeft.y, bottomLeft.x - topLeft.x) * 180 / Math.PI;

  // Distorção em relação a um retângulo perfeito (0 graus horizontal, 90 graus vertical)
  const horizontalDistortion = Math.abs(angleTop);
  const verticalDistortion = Math.abs(angleLeft - 90);

  // Consistência das dimensões (larguras e alturas opostas devem ser semelhantes)
  const widthTop = distance(topLeft, topRight);
  const widthBottom = distance(bottomLeft, bottomRight);
  const heightLeft = distance(topLeft, bottomLeft);
  const heightRight = distance(topRight, bottomRight);

  const widthConsistency = Math.abs(widthTop - widthBottom) / Math.max(widthTop, widthBottom, 1);
  const heightConsistency = Math.abs(heightLeft - heightRight) / Math.max(heightLeft, heightRight, 1);

  // Penalidades para cada tipo de distorção
  const penaltyHorizontal = horizontalDistortion * 0.5; // Ajuste o peso conforme a importância
  const penaltyVertical = verticalDistortion * 0.5;
  const penaltyWidthConsistency = widthConsistency * 30; // Penalidade maior para inconsistência
  const penaltyHeightConsistency = heightConsistency * 30;

  // Pontuação de qualidade (0-100)
  const qualityScore = 100 - (penaltyHorizontal + penaltyVertical + penaltyWidthConsistency + penaltyHeightConsistency);

  return Math.max(0, Math.min(100, Math.round(qualityScore)));
};

const distance = (p1: Point, p2: Point): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

/**
 * Converte uma imagem URI para ImageData (dados de pixel).
 * Esta é uma implementação para React Native usando expo-image-manipulator e jpeg-js.
 * @param {string} imageUri - URI da imagem.
 * @returns {Promise<ImageData>} Promise resolvendo para ImageData.
 */
export const getImageDataFromUri = async (imageUri: string): Promise<ImageData> => {
  try {
    // Redimensionar a imagem para um tamanho gerenciável antes de processar
    // Isso ajuda no desempenho e na memória para detecção de cantos.
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 800 } }], // Redimensiona para largura máxima de 800px
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );

    if (!manipulatedImage.base64) {
      throw new Error('Não foi possível obter a imagem em base64.');
    }

    const raw = Buffer.from(manipulatedImage.base64, 'base64');
    const { width, height, data } = decode(raw, { useTArray: true });

    // `data` de `jpeg-js` já é um `Uint8Array` no formato RGBA.
    return new ImageData(new Uint8ClampedArray(data), width, height);

  } catch (error) {
    console.error('Erro ao converter URI para ImageData:', error);
    throw error;
  }
};

/**
 * Aplica binarização adaptativa a uma imagem.
 * @param {ImageData} imageData - Os dados da imagem para binarizar.
 * @param {number} [blockSize=15] - Tamanho do bloco de vizinhança para cálculo do limiar.
 * @param {number} [C=2] - Constante subtraída da média.
 * @returns {ImageData} Dados da imagem binarizada.
 */
export const applyBinarization = (imageData: ImageData, blockSize = 15, C = 2): ImageData => {
  const { width, height, data } = imageData;
  const output = new ImageData(width, height);
  const outputData = output.data;

  // 1. Converter para escala de cinza
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    outputData[i] = outputData[i + 1] = outputData[i + 2] = gray;
    outputData[i + 3] = 255; // alpha
  }

  // 2. Limiarização adaptativa (Otsu ou similar, aqui uma média local)
  const halfBlock = Math.floor(blockSize / 2);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      let count = 0;

      // Calcular média na vizinhança
      for (let dy = -halfBlock; dy <= halfBlock; dy++) {
        for (let dx = -halfBlock; dx <= halfBlock; dx++) {
          const nx = x + dx;
          const ny = y + dy;

          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const idx = (ny * width + nx) * 4;
            sum += outputData[idx];
            count++;
          }
        }
      }

      const mean = sum / count;
      const idx = (y * width + x) * 4;
      const pixelValue = outputData[idx];

      // Aplicar limiar
      outputData[idx] = outputData[idx + 1] = outputData[idx + 2] =
        (pixelValue > (mean - C)) ? 255 : 0; // 255 (branco) ou 0 (preto)
    }
  }

  return output;
};

/**
 * Detecta os cantos de um retângulo em uma imagem binarizada.
 * Esta é uma implementação simplificada/conceitual para React Native.
 * Em um ambiente de produção, usaria bibliotecas de visão computacional.
 * @param {ImageData} binaryImage - Imagem binarizada (preto e branco).
 * @returns {Promise<Point[]>} Array de 4 pontos (topLeft, topRight, bottomRight, bottomLeft).
 */
export const detectCorners = async (binaryImage: ImageData): Promise<Point[]> => {
  const { width, height, data } = binaryImage;

  // Implementação conceitual:
  // Em um cenário real, você aplicaria detecção de bordas (Canny),
  // encontraria contornos, filtraria por área e forma (retângulos),
  // e então identificaria os 4 cantos do maior retângulo.

  // Para simulação, vamos procurar por "clusters" de pixels pretos
  // nos quadrantes da imagem, assumindo que os cantos são os pontos mais extremos.

  let minX = width, maxX = 0, minY = height, maxY = 0;
  let foundPixels = 0;

  // Percorre a imagem para encontrar os limites gerais dos pixels pretos
  // Isso é uma simplificação grosseira de encontrar o "bounding box" da grade
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      // Se o pixel é preto (valor 0 após binarização)
      if (data[i] === 0) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
        foundPixels++;
      }
    }
  }

  if (foundPixels < 100) { // Se poucos pixels pretos foram encontrados, provavelmente não há grade
    throw new Error("Não foi possível detectar uma grade clara na imagem.");
  }

  // Retorna os 4 cantos do bounding box detectado.
  // Em um algoritmo real, você faria uma detecção mais robusta dos cantos
  // e aplicaria uma correção de perspectiva se o retângulo não fosse perfeito.
  return [
    { x: minX, y: minY }, // Top-left
    { x: maxX, y: minY }, // Top-right
    { x: maxX, y: maxY }, // Bottom-right
    { x: minX, y: maxY }, // Bottom-left
  ];
};

/**
 * Extrai a região da grade aplicando uma transformação de perspectiva.
 * Esta é uma implementação conceitual para React Native.
 * Em um ambiente de produção, usaria bibliotecas de visão computacional.
 * @param {string} imageUri - URI da imagem original.
 * @param {Point[]} corners - Array de 4 pontos de canto (topLeft, topRight, bottomRight, bottomLeft).
 * @param {number} targetWidth - Largura desejada da imagem de saída.
 * @param {number} targetHeight - Altura desejada da imagem de saída.
 * @returns {Promise<string>} URI da imagem da grade extraída.
 */
export const extractGridRegion = async (
  imageUri: string,
  corners: Point[],
  targetWidth: number = 600, // Ex: largura padrão para a grade
  targetHeight: number = 800 // Ex: altura padrão para a grade
): Promise<string> => {
  // Esta função é um mock para ambiente React Native.
  // A transformação de perspectiva é complexa e geralmente requer OpenCV ou Skia.
  // Aqui, vamos simular um recorte simples baseado nos cantos para demonstração.

  if (corners.length !== 4) {
    throw new Error("São necessários exatamente 4 cantos para extrair a grade.");
  }

  // Ordena os cantos para garantir que estejam em ordem (topLeft, topRight, bottomRight, bottomLeft)
  // Isso é crucial para a transformação de perspectiva real.
  // Para o mock, assumimos que `detectCorners` já retorna nesta ordem.
  const [topLeft, topRight, bottomRight, bottomLeft] = corners;

  // Calcula o bounding box para o recorte inicial
  const minX = Math.min(topLeft.x, topRight.x, bottomRight.x, bottomLeft.x);
  const minY = Math.min(topLeft.y, topRight.y, bottomRight.y, bottomLeft.y);
  const maxX = Math.max(topLeft.x, topRight.x, bottomRight.x, bottomLeft.x);
  const maxY = Math.max(topLeft.y, topRight.y, bottomRight.y, bottomLeft.y);

  const cropWidth = maxX - minX;
  const cropHeight = maxY - minY;

  if (cropWidth <= 0 || cropHeight <= 0) {
    throw new Error("Dimensões de recorte inválidas.");
  }

  try {
    const result = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        {
          crop: {
            originX: minX,
            originY: minY,
            width: cropWidth,
            height: cropHeight,
          },
        },
        {
          resize: {
            width: targetWidth,
            height: targetHeight,
          },
        },
      ],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    return result.uri;
  } catch (error) {
    console.error("Erro ao extrair região da grade:", error);
    throw error;
  }
};

/**
 * Calcula as coordenadas das células dentro da grade extraída.
 * @param {number} gridWidth - Largura da imagem da grade extraída.
 * @param {number} gridHeight - Altura da imagem da grade extraída.
 * @param {number} rows - Número de linhas (questões) na grade.
 * @param {number} cols - Número de colunas (alternativas) na grade.
 * @returns {{x: number, y: number, width: number, height: number}[][]} Array 2D de coordenadas das células.
 */
export const calculateCellCoordinates = (
  gridWidth: number,
  gridHeight: number,
  rows: number,
  cols: number
): { x: number, y: number, width: number, height: number }[][] => {
  const cellWidth = gridWidth / cols;
  const cellHeight = gridHeight / rows;

  const cells: { x: number, y: number, width: number, height: number }[][] = [];

  for (let row = 0; row < rows; row++) {
    const rowCells: { x: number, y: number, width: number, height: number }[] = [];
    for (let col = 0; col < cols; col++) {
      rowCells.push({
        x: col * cellWidth,
        y: row * cellHeight,
        width: cellWidth,
        height: cellHeight
      });
    }
    cells.push(rowCells);
  }

  return cells;
};

// Funções de utilidade para visão computacional (Harris, Canny, etc.)
// Estas seriam implementações complexas ou wrappers para bibliotecas nativas.
// Para este exemplo, são apenas stubs.

/**
 * Converte uma imagem para escala de cinza.
 * @param {ImageData} imageData - Dados da imagem RGBA.
 * @returns {ImageData} Dados da imagem em escala de cinza.
 */
export const convertToGrayscale = (imageData: ImageData): ImageData => {
  const { width, height, data } = imageData;
  const grayData = new Uint8ClampedArray(width * height * 4); // RGBA output

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    grayData[i] = gray;
    grayData[i + 1] = gray;
    grayData[i + 2] = gray;
    grayData[i + 3] = data[i + 3]; // Keep original alpha
  }
  return new ImageData(grayData, width, height);
};