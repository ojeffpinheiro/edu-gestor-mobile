import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

let isTFReady = false;

export async function initializeTF() {
  if (!isTFReady) {
    // Verifica se está rodando no React Native
   if (!tf.getBackend()) {
    await tf.ready();
    console.log('Backend TF:', tf.getBackend());
  } else {
      await tf.setBackend('rn-webgl');
      await tf.ready();
    }
    isTFReady = true;
    console.log('TensorFlow.js backend:', tf.getBackend());
  }
  return true;
}