import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js';
import chroma from 'chroma-js';
import { ImageManipulator } from 'expo-image-manipulator';


const BLACK_EDGE_THRESHOLD = 30;

const TEMPLATE_DIMENSIONS = {
  portrait: { width: 1000, height: 1400 }, // Novas dimensões em pixels
  landscape: { width: 900, height: 950 }   // Novas dimensões em pixels
};
const SIMPLE_LOGS = true; // Ativar logs simples para desenvolvimento

// Interfaces base
export interface Point {
  x: number;
  y: number;
}

export interface Cell {
  row: number;
  col: number;
}

export interface Mark {
  centroid: Point;
  cell: Cell;
  confidence: number;
}

// Interfaces específicas para pontos de referência (câmera)
export interface ReferencePoint {
  id: number;
  position: Point;
  color?: {  // Mude de string para objeto RGB
    r: number;
    g: number;
    b: number;
  };
  status?: boolean;
  percentage?: number;
}

interface EdgeDetectionResult {
  cell: {
    row: number;
    col: number;
  };
  confidence: number;
  color?: {
    r: number;
    g: number;
    b: number;
  };
  success: boolean;
}

// Interfaces específicas para pontos detectados (pré-visualização)
export interface DetectedPoint {
  id: number; // Tornar obrigatório
  cell: {
    row: number;
    col: number;
  };
  confidence: number;
  color?: {
    r: number;
    g: number;
    b: number;
  };
  success?: boolean;
  position?: {
    x: number;
    y: number;
  };
  matched?: boolean; // Indica se o ponto foi encontrado corretamente
}

// Pontos de referência padrão (para a câmera)
const REFERENCE_POINTS: ReferencePoint[] = [
  { id: 1, position: { x: -.01, y: 0.26 } },
  { id: 2, position: { x: 0.96, y: 0.26 } },
  { id: 3, position: { x: -.01, y: 0.65 } },
  { id: 4, position: { x: 0.96, y: 0.65 } },
  { id: 5, position: { x: -.01, y: .983 } },
  { id: 6, position: { x: 0.96, y: .983 } }
];

// Ponto detectado padrão (para a pré-visualização)
const REAL_PORTRAIT_POINTS: DetectedPoint[] = [
  {
    id: 1,
    position: { x: 116.27, y: 266.58 },
    cell: { row: 1, col: 1 },
    confidence: 0.99,
    success: true
  },   // Superior esquerdo
  {
    id: 2,
    position: { x: 780.7, y: 266.6 },
    cell: { row: 1, col: 2 },
    confidence: 0.98,
    success: true
  },   // Superior direito
  {
    id: 3,
    position: { x: 116.27, y: 546.5 },
    cell: { row: 2, col: 1 },
    confidence: 0.95,
    success: true
  },   // Meio esquerdo
  {
    id: 4,
    position: { x: 780.7, y: 547 },
    cell: { row: 2, col: 2 },
    confidence: 0.97,
    success: true
  },   // Meio direito
  {
    id: 5,
    position: { x: 116.27, y: 750 },
    cell: { row: 3, col: 1 },
    confidence: 0.92,
    success: true
  },   // Inferior esquerdo
  {
    id: 6,
    position: { x: 780.7, y: 750 },
    cell: { row: 3, col: 2 },
    confidence: 0.93,
    success: true
  }    // Inferior direito
];


const REAL_LANDSCAPE_POINTS: DetectedPoint[] = [
  {
    id: 1,
    position: { x: 50, y: 400 },
    cell: { row: 1, col: 1 },
    confidence: 0.99,
    success: true
  },    // Superior esquerdo
  {
    id: 2,
    position: { x: 450, y: 400 },
    cell: { row: 1, col: 2 },
    confidence: 0.98,
    success: true
  },   // Superior centro
  {
    id: 3,
    position: { x: 850, y: 400 },
    cell: { row: 1, col: 3 },
    confidence: 0.97,
    success: true
  },   // Superior direito
  {
    id: 4,
    position: { x: 50, y: 750 },
    cell: { row: 2, col: 1 },
    confidence: 0.96,
    success: true
  },    // Inferior esquerdo
  {
    id: 5,
    position: { x: 450, y: 750 },
    cell: { row: 2, col: 2 },
    confidence: 0.95,
    success: true
  },   // Inferior centro
  {
    id: 6,
    position: { x: 850, y: 750 },
    cell: { row: 2, col: 3 },
    confidence: 0.94,
    success: true
  }    // Inferior direito
];


// Função de log simplificada
export const debugLog = (context: string, data: any, important = false) => {
  if (!__DEV__ && !important) return;
  
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  const header = `=== ${context} (${timestamp}) ===`;
  
  console.groupCollapsed(header);
  
  if (typeof data === 'object') {
    // Formatar objetos de pontos de forma mais legível
    if (Array.isArray(data) && data.some(item => item.id !== undefined)) {
      console.table(data.map(item => ({
        id: item.id,
        x: item.position?.x?.toFixed(2),
        y: item.position?.y?.toFixed(2),
        status: item.status ?? item.success,
        color: item.color ? `rgb(${Math.round(item.color.r)}, ${Math.round(item.color.g)}, ${Math.round(item.color.b)})` : 'N/A',
        confidence: item.confidence?.toFixed(2)
      })));
    } else {
      console.dir(data, { depth: 4, colors: true });
    }
  } else {
    console.log(data);
  }
  
  console.groupEnd();
};

// Funções para pontos de referência (câmera)
export const getReferencePoints = (): ReferencePoint[] => {
  return [...REFERENCE_POINTS];
};

const normalizePoints = (points: DetectedPoint[], isLandscape: boolean): DetectedPoint[] => {
  const dimensions = isLandscape ? TEMPLATE_DIMENSIONS.landscape : TEMPLATE_DIMENSIONS.portrait;
  const normalized = points.map(point => ({
    ...point,
    position: {
      x: point.position.x / dimensions.width,
      y: point.position.y / dimensions.height
    }
  }));
  return normalized;
};

const calculateCellPosition = (id: number) => ({
  row: Math.ceil(id / 2),
  col: id % 2 === 0 ? 2 : 1
});

const createDefaultPoint = (id: number): DetectedPoint => ({
  id,
  position: { x: 0, y: 0 },
  cell: calculateCellPosition(id),
  color: { r: 0, g: 0, b: 0 },
  confidence: 0,
  success: false,
  matched: false
});


// Funções para pontos detectados (pré-visualização)
export const detectPoints = async (uri: string): Promise<DetectedPoint[]> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const base64 = await convertBlobToBase64(blob);
    const base64Data = base64.split(',')[1];
    
    // Decodificação com parâmetros corretos
    const imageData = jpeg.decode(Buffer.from(base64Data, 'base64'), {
      useTArray: true,
      maxMemoryUsageInMB: 30,
      maxResolutionInMP: 4 // Limite de 4 megapixels
    });

    // Restante da função permanece igual...
    return getReferencePoints().map(point => {
      const x = Math.round(point.position.x * imageData.width);
      const y = Math.round(point.position.y * imageData.height);
      
      const idx = (y * imageData.width + x) * 4;
      const r = imageData.data[idx];
      const g = imageData.data[idx + 1];
      const b = imageData.data[idx + 2];
      const darkness = (r + g + b) / 3;
      const isBlack = darkness < BLACK_EDGE_THRESHOLD;

      return {
        id: point.id,
        position: { x, y },
        cell: { row: Math.ceil(point.id / 2), col: point.id % 2 === 0 ? 2 : 1 },
        color: { r, g, b },
        confidence: isBlack ? 0.9 : 0.1,
        success: isBlack,
        matched: isBlack
      };
    });

  } catch (error) {
    console.error('Erro na detecção:', error);
    return getFallbackPoints();
  }
};

// Função auxiliar para pontos de fallback
const getFallbackPoints = (): DetectedPoint[] => {
  return getReferencePoints().map(p => ({
    id: p.id,
    position: { x: 0, y: 0 },
    cell: { row: 0, col: 0 },
    color: { r: 0, g: 0, b: 0 },
    confidence: 0,
    success: false,
    matched: false
  }));
};

export const detectRealEdges = async (uri: string) => {
  try {
    // 1. Carregar a imagem
    const response = await fetch(uri);
    const blob = await response.blob();
    const base64 = await convertBlobToBase64(blob);
    const base64Data = base64.split(',')[1];

    // 2. Decodificar JPEG
    const rawImageData = Buffer.from(base64Data, 'base64');
    const imageData = jpeg.decode(rawImageData, { useTArray: true });

    // 3. Analisar bordas (5% da imagem em cada lado)
    const borderWidth = Math.floor(imageData.width * 0.05);
    const borderHeight = Math.floor(imageData.height * 0.05);

    let edgePixels = [];

    // Coletar pixels das bordas
    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        if (x < borderWidth || x >= imageData.width - borderWidth ||
          y < borderHeight || y >= imageData.height - borderHeight) {
          const idx = (y * imageData.width + x) * 4;
          edgePixels.push([
            imageData.data[idx],     // R
            imageData.data[idx + 1], // G
            imageData.data[idx + 2]  // B
          ]);
        }
      }
    }

    // 4. Calcular média das bordas
    const sum = edgePixels.reduce((acc, pixel) => {
      return [acc[0] + pixel[0], acc[1] + pixel[1], acc[2] + pixel[2]];
    }, [0, 0, 0]);

    const avg = sum.map(v => v / edgePixels.length);
    const avgColor = { r: avg[0], g: avg[1], b: avg[2] };

    // 5. Verificar se é preto
    const color = chroma(avg[0], avg[1], avg[2]);
    const blackDistance = chroma.distance(color, '#000000');
    const isBlackEdges = blackDistance < BLACK_EDGE_THRESHOLD;

    return [{
      cell: { row: 0, col: 0 }, // Usamos (0,0) para representar bordas
      confidence: 1 - (blackDistance / 100),
      color: avgColor,
      success: isBlackEdges
    }];
  } catch (error) {
    return [{
      cell: { row: 0, col: 0 },
      confidence: 0,
      success: false
    }];
  }
};

// Função auxiliar para converter Blob para Base64
const convertBlobToBase64 = (blob: Blob) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => resolve(reader.result as string);
  reader.readAsDataURL(blob);
});

export const calculateGridPositions = (
  rows: number,
  cols: number,
  isLandscape: boolean
): ReferencePoint[] => {
  // Lógica unificada para posicionamento dos pontos
  return isLandscape
    ? [
      { id: 1, position: { x: 0.26, y: 0.1 } },
      { id: 2, position: { x: 0.26, y: 0.85 } },
      { id: 3, position: { x: 0.35, y: 0.1 } },
      { id: 4, position: { x: 0.5, y: 0.85 } },
      { id: 5, position: { x: 0.8, y: 0.1 } },
      { id: 6, position: { x: 0.8, y: 0.85 } }
    ]
    : [
      { id: 1, position: { x: 0.1, y: 0.2 } },
      { id: 2, position: { x: 1, y: 0.2 } },
      { id: 3, position: { x: 0.1, y: 0.55 } },
      { id: 4, position: { x: 1, y: 0.55 } },
      { id: 5, position: { x: 0.1, y: 0.84 } },
      { id: 6, position: { x: 1, y: 0.84 } }
    ];
};

export const mapCentroidsToGrid = (
  centroids: Point[],
  rows: number,
  cols: number,
  imageWidth: number,
  imageHeight: number
): Mark[] => {
  const cellSize = {
    width: imageWidth / cols,
    height: imageHeight / rows
  };

  return centroids.map(centroid => ({
    centroid,
    cell: {
      row: Math.floor(centroid.y / cellSize.height),
      col: Math.floor(centroid.x / cellSize.width)
    },
    confidence: 0.9 // Valor padrão, pode ser calculado
  }));
};