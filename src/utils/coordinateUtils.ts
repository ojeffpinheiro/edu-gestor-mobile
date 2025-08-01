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
}

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