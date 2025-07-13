import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

let isInitialized = false;

export async function initializeTF() {
  if (!isInitialized) {
    try {
      // 1. Carregar o polyfill
      await import('@tensorflow/tfjs-react-native/dist/platform_react_native');
      
      // 2. Configurar backend
      await tf.setBackend('rn-webgl');
      
      // 3. Verificar se está pronto
      await tf.ready();
      
      console.log(`Backend ${tf.getBackend()} inicializado com sucesso`);
      isInitialized = true;
    } catch (error) {
      console.error('Erro na inicialização:', error);
      throw error;
    }
  }
  return isInitialized;
}