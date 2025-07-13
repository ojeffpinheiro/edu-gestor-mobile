import * as tf from '@tensorflow/tfjs';
import { initializeTF } from './tfInit';
import { getTensorFromURI } from './imageUtils';

// Constantes ajustáveis
const FILL_THRESHOLD = 0.3;
const EXPECTED_QUESTIONS = 10;

interface ProcessResult {
  success: boolean;
  questions?: QuestionResult[];
  validation?: {
    valid: boolean;
    errors: string[];
  };
  error?: string;
}

interface QuestionResult {
  question: number;
  options: {
    letter: string;
    filled: boolean;
  }[];
  markedOption: string | null;
}

export async function processAnswerSheet(imageUri: string): Promise<ProcessResult> {
  try {
    // Inicializa o TensorFlow
    await initializeTF();

    // 1. Carregar imagem
    const imageTensor = await loadImageTensor(imageUri);
    
    // 2. Pré-processamento
    const processed = await preprocessImage(imageTensor);
    
    // 3. Detectar grade
    const answerGrid = detectAnswerGrid(tf.reshape(processed, [processed.shape[0], processed.shape[1], 1]) as tf.Tensor3D);
    
    // 4. Processar cada questão
    const results: QuestionResult[] = [];
    const lineHeight = Math.floor(answerGrid.shape[0] / EXPECTED_QUESTIONS);
    
    for (let i = 0; i < EXPECTED_QUESTIONS; i++) {
      const line = tf.slice(answerGrid, [i*lineHeight, 0], [lineHeight, answerGrid.shape[1]]);
      const questionNumber = 11 + i;
      const line2D = tf.squeeze(line, [2]) as tf.Tensor2D;
      results.push(processQuestionLine(line2D, questionNumber));
      tf.dispose([line, line2D]);
    }
    
    // 5. Validar resultados
    const validation = validateResults(results);
    
    // Limpeza de tensores
    tf.dispose([imageTensor, processed, answerGrid]);
    
    return {
      success: true,
      questions: results,
      validation
    };
    
  } catch (error) {
    console.error('Erro no processamento:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
}

async function loadImageTensor(uri: string): Promise<tf.Tensor3D> {
  try {
    await initializeTF(); // Garante que o TF está inicializado
    
    // Usa nosso novo utilitário
    const tensor = await getTensorFromURI(uri);
    return tensor;
  } catch (error) {
    console.error('Erro ao carregar imagem:', error);
    throw error;
  }
}

function detectAnswerGrid(imageTensor: tf.Tensor3D): tf.Tensor3D {
  const height = imageTensor.shape[0];
  const width = imageTensor.shape[1];
  
  // Converter para tensor 4D explicitamente
  const image4D = tf.reshape(imageTensor, [1, height, width, 1]) as tf.Tensor4D;
  
  // Definir região de interesse
  const boxes = tf.tensor2d([[0.2, 0.1, 0.8, 0.9]]);
  const boxIndices = tf.tensor1d([0], 'int32');
  const cropSize: [number, number] = [Math.floor(height * 0.7), Math.floor(width * 0.8)];
  
  const cropped = tf.image.cropAndResize(
    image4D,
    boxes as tf.Tensor2D,
    boxIndices,
    cropSize
  );
  
  // Converter para tensor 3D
  return tf.squeeze(cropped, [0]) as tf.Tensor3D;
}

function processQuestionLine(lineTensor: tf.Tensor2D, questionNumber: number): QuestionResult {
  const optionWidth = Math.floor(lineTensor.shape[1] / 6);
  const options = [];
  
  for (let i = 0; i < 5; i++) {
    const option = tf.slice(lineTensor, [0, i*optionWidth], [lineTensor.shape[0], optionWidth]);
    const fillPercent = calculateFillPercentage(option);
    options.push({
      letter: String.fromCharCode(65 + i),
      filled: fillPercent > FILL_THRESHOLD
    });
    tf.dispose(option);
  }
  
  return {
    question: questionNumber,
    options,
    markedOption: options.filter(o => o.filled).length === 1 
      ? options.find(o => o.filled)?.letter || null 
      : null
  };
}

function calculateFillPercentage(tensor: tf.Tensor2D): number {
  const filledPixels = tensor.sum().dataSync()[0];
  const totalPixels = tensor.size;
  return filledPixels / totalPixels;
}

function validateResults(detectedAnswers: QuestionResult[]) {
  const errors: string[] = [];
  
  detectedAnswers.forEach(answer => {
    const markedCount = answer.options.filter(o => o.filled).length;
    if (markedCount === 0) {
      errors.push(`Q${answer.question}: Nenhuma opção marcada`);
    } else if (markedCount > 1) {
      errors.push(`Q${answer.question}: Múltiplas opções marcadas`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// Adicione esta nova função para conversão para escala de cinza
function convertToGrayscale(imageTensor: tf.Tensor3D): tf.Tensor3D {
  // Usa a média ponderada dos canais RGB para conversão padrão
  // Fórmula: 0.299 * R + 0.587 * G + 0.114 * B
  const weights = tf.tensor1d([0.299, 0.587, 0.114]);
  const grayscale = tf.sum(imageTensor.mul(weights), 2, false);
  
  // Expande as dimensões para manter o tensor 3D (height, width, 1)
  return grayscale.expandDims(2) as tf.Tensor3D;
}

// Modifique a função preprocessImage para usar a nova conversão
async function preprocessImage(imageTensor: tf.Tensor3D): Promise<tf.Tensor2D> {
  // 1. Converter para escala de cinza
  const grayscale = convertToGrayscale(imageTensor);
  
  // 2. Normalização
  const min = grayscale.min();
  const max = grayscale.max();
  const adjusted = tf.div(tf.sub(grayscale, min), tf.sub(max, min));
  
  // 3. Binarização com threshold adaptativo
  const mean = (await adjusted.mean().data())[0];
  const threshold = mean * 0.7;
  
  // 4. Criar máscara binária
  const mask = tf.greater(adjusted, tf.scalar(threshold));
  
  // Limpeza de tensores intermediários
  tf.dispose([grayscale, min, max, adjusted]);
  
  return tf.cast(mask, 'float32') as tf.Tensor2D;
}