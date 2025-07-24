import * as tf from '@tensorflow/tfjs';
import * as ImageManipulator from 'expo-image-manipulator';

interface Contour {
  points: Array<{ x: number; y: number }>;
}

export async function loadAndProcessImage(uri: string): Promise<tf.Tensor3D> {
  const response = await fetch(uri);
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);
  
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  ctx.drawImage(bitmap, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return tf.browser.fromPixels(imageData);
}

// Implementação simplificada do algoritmo de busca de contornos
function findContours(binaryImage: boolean[][]): Contour[] {
  const contours: Contour[] = [];
  const height = binaryImage.length;
  if (height === 0) return contours;
  const width = binaryImage[0].length;
  const visited = Array(height).fill(0).map(() => Array(width).fill(false));

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1],  [1, 0], [1, 1]
  ];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (binaryImage[y][x] && !visited[y][x]) {
        const contour: Contour = { points: [] };
        const queue: [number, number][] = [[y, x]];
        visited[y][x] = true;

        while (queue.length > 0) {
          const [cy, cx] = queue.shift()!;
          contour.points.push({ x: cx, y: cy });

          for (const [dy, dx] of directions) {
            const ny = cy + dy;
            const nx = cx + dx;

            if (ny >= 0 && ny < height && nx >= 0 && nx < width &&
                binaryImage[ny][nx] && !visited[ny][nx]) {
              visited[ny][nx] = true;
              queue.push([ny, nx]);
            }
          }
        }

        if (contour.points.length > 10) {
          contours.push(contour);
        }
      }
    }
  }

  return contours;
}

export async function detectShapes(imageTensor: tf.Tensor3D): Promise<Contour[]> {
  // Converter para escala de cinza com tipagem explícita
  const grayscale = tf.tidy(() => {
    return imageTensor.mean(2) as tf.Tensor2D;
  });

  // Suavizar a imagem com reshape explícito
  const blurred = tf.tidy(() => {
    const kernel = tf.tensor2d(
      [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
      [3, 3]
    ).div(tf.scalar(9));
    
    // Converter explicitamente para Tensor4D
    const input4D = grayscale.reshape([1, ...grayscale.shape, 1]) as tf.Tensor4D;
    const kernel4D = kernel.reshape([3, 3, 1, 1]) as tf.Tensor4D;
    
    return tf.conv2d(
      input4D,
      kernel4D,
      1,
      'same'
    ).squeeze([0, 3]) as tf.Tensor2D; // Remover dimensões extras
  });

  // Limiarização com tipagem explícita
  const thresholdValue = (await grayscale.mean().data())[0];
  const binary = blurred.greater(tf.scalar(thresholdValue * 0.8));
  
  // Converter para array booleano com tipagem segura
  const binaryArray = await binary.array() as number[][];
  const binaryImage = binaryArray.map(row => row.map(val => val > 0));

  // Encontrar contornos
  return findContours(binaryImage);
}

export function calculateCentroids(shapes: Contour[]): Array<{
  x: number; 
  y: number; 
  confidence: number 
}> {
  return shapes.map(shape => {
    const area = shape.points.length;
    const sumX = shape.points.reduce((s, p) => s + p.x, 0);
    const sumY = shape.points.reduce((s, p) => s + p.y, 0);
    return {
      x: sumX / area,
      y: sumY / area,
      confidence: Math.min(1, area / 100)
    };
  });
}