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

export interface ReferencePoint {
  id: number;
  position: Point;
  color?: string;
  status?: boolean;
  percentage?: number;
  matched?: boolean;
}



const PORTRAIT_POINTS: ReferencePoint[] = [
  { id: 1, position: { x: 70 / 950, y: 180 / 1320 } },  // Superior esquerdo
  { id: 2, position: { x: 930 / 950, y: 180 / 1320 } }, // Superior direito
  { id: 3, position: { x: 70 / 950, y: 720 / 1320 } },  // Meio esquerdo
  { id: 4, position: { x: 930 / 950, y: 720 / 1320 } },  // Meio direito
  { id: 5, position: { x: 70 / 950, y: 1140 / 1320 } }, // Inferior esquerdo
  { id: 6, position: { x: 930 / 950, y: 1140 / 1320 } }  // Inferior direito
];

// Pontos de referência para paisagem (celular na horizontal)
const LANDSCAPE_POINTS: ReferencePoint[] = [
  { id: 1, position: { x: 50 / 830, y: 380 / 880 } },   // Superior esquerdo
  { id: 2, position: { x: 370 / 830, y: 380 / 880 } },  // Superior centro
  { id: 3, position: { x: 780 / 830, y: 380 / 880 } },  // Superior direito
  { id: 4, position: { x: 50 / 830, y: 680 / 880 } },    // Inferior esquerdo
  { id: 5, position: { x: 370 / 830, y: 680 / 880 } },  // Inferior centro
  { id: 6, position: { x: 780 / 830, y: 680 / 880 } }   // Inferior direito
];

export const getReferencePoints = (isLandscape: boolean): ReferencePoint[] => {
  return isLandscape ? [...LANDSCAPE_POINTS] : [...PORTRAIT_POINTS];
};

export const detectPoints = async (imageUri: string): Promise<ReferencePoint[]> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const points = getReferencePoints(false);
  return points.map(point => ({
    ...point,
    matched: Math.random() > 0.3, // 70% chance of being matched
    color: Math.random() > 0.3 ? '#4CAF50' : '#F44336'
  }));
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