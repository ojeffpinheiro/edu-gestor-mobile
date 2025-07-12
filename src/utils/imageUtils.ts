import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';
import { decode } from 'jpeg-js';

export async function getTensorFromURI(uri: string): Promise<tf.Tensor3D> {
  try {
    // 1. Obter a imagem como base64
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64
    });

    // 2. Converter base64 para Uint8Array
    const raw = base64ToUint8Array(base64);

    // 3. Decodificar JPEG para obter dimensões exatas
    const { width, height, data } = decode(raw);
    
    // 4. Criar tensor com dimensões corretas
    const tensor = tf.tensor3d(data, [height, width, 4]); // 4 canais (RGBA)
    
    // 5. Converter para RGB (remover canal alpha se existir)
    const rgbTensor = tensor.slice([0, 0, 0], [height, width, 3]);
    
    // 6. Redimensionar se necessário (opcional)
    const targetSize = 800;
    if (height > targetSize || width > targetSize) {
      const scale = Math.min(targetSize / width, targetSize / height);
      const newHeight = Math.round(height * scale);
      const newWidth = Math.round(width * scale);
      const resized = tf.image.resizeBilinear(rgbTensor, [newHeight, newWidth] as [number, number]);
      tf.dispose([tensor, rgbTensor]);
      return resized as tf.Tensor3D;
    }
    
    tf.dispose(tensor);
    return rgbTensor;
  } catch (error) {
    console.error('Erro no processamento da imagem:', error);
    throw error;
  }
}

function base64ToUint8Array(base64: string): Uint8Array {
  const base64Data = base64.split(',')[1] || base64; // Remove data URL header if exists
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}