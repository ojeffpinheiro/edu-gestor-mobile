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
  color?: string;
  status?: boolean;
  percentage?: number;
}

// Interfaces específicas para pontos detectados (pré-visualização)
export interface DetectedPoint {
  id: number;
  position: Point;
  matched: boolean;
  confidence?: number;
}

const TEMPLATE_DIMENSIONS = {
  portrait: { width: 1000, height: 1400 }, // Novas dimensões em pixels
  landscape: { width: 900, height: 950 }   // Novas dimensões em pixels
};

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
  { id: 1, position: { x: 116.7, y: 266.7 }, matched: false },   // Superior esquerdo
  { id: 2, position: { x: 780.2, y: 266.5 }, matched: false },   // Superior direito
  { id: 3, position: { x: 116.7, y: 700 }, matched: false },   // Meio esquerdo
  { id: 4, position: { x: 779, y: 700 }, matched: false },   // Meio direito
  { id: 5, position: { x: 116.7, y: 1300 }, matched: false },   // Inferior esquerdo
  { id: 6, position: { x: 779, y: 1290 }, matched: false },   // Inferior direito
];

const REAL_LANDSCAPE_POINTS: DetectedPoint[] = [
  { id: 1, position: { x: 50, y: 400 }, matched: false },    // Superior esquerdo
  { id: 2, position: { x: 450, y: 400 }, matched: false  },   // Superior centro
  { id: 3, position: { x: 850, y: 400 }, matched: false  },   // Superior direito
  { id: 4, position: { x: 50, y: 750 }, matched: false  },    // Inferior esquerdo
  { id: 5, position: { x: 450, y: 750 }, matched: false  },   // Inferior centro
  { id: 6, position: { x: 850, y: 750 }, matched: false  }    // Inferior direito
];

// Funções para pontos de referência (câmera)
export const getReferencePoints = (): ReferencePoint[] => {
  return [...REFERENCE_POINTS];
};

const normalizePoints = (points: DetectedPoint[], isLandscape: boolean): DetectedPoint[] => {
  const dimensions = isLandscape ? TEMPLATE_DIMENSIONS.landscape : TEMPLATE_DIMENSIONS.portrait;
  return points.map(point => ({
    ...point,
    position: {
      x: point.position.x / dimensions.width,
      y: point.position.y / dimensions.height
    }
  }));
};

// Funções para pontos detectados (pré-visualização)
export const detectPoints = (isLandscape: boolean = false): Promise<DetectedPoint[]> => {
  return new Promise((resolve) => {
    const realPoints = isLandscape ? REAL_PORTRAIT_POINTS : REAL_PORTRAIT_POINTS;
    const normalizedPoints = normalizePoints(realPoints, isLandscape);
    // Simula um pequeno delay como se fosse uma operação assíncrona
    setTimeout(() => resolve(normalizedPoints), 100);
  });
};

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