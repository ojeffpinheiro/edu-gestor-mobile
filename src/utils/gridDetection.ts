// utils/gridDetection.js
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

interface Region {
  pixels: [number, number][];
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  center: { x: number; y: number };
  width: number;
  height: number;
  area: number;
}

interface Corners {
  topLeft: Region;
  topRight: Region;
  bottomLeft: Region;
  bottomRight: Region;
}

interface GridInfo {
  bounds: {
    topLeft: { x: number; y: number };
    topRight: { x: number; y: number };
    bottomLeft: { x: number; y: number };
    bottomRight: { x: number; y: number };
  };
  width: number;
  height: number;
  center: { x: number; y: number };
}

export class GridDetector {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private imageData: ImageData | null = null;
  private width: number = 0;
  private height: number = 0;

  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.imageData = null;
    this.width = 0;
    this.height = 0;
  }

  // Converte imagem para canvas e obtém dados dos pixels
  async loadImage(imageUri: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.width = img.width;
        this.height = img.height;

        // Cria canvas para processamento
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');

        if (!this.ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Desenha imagem no canvas
        this.ctx.drawImage(img, 0, 0);
        this.imageData = this.ctx.getImageData(0, 0, this.width, this.height);

        resolve();
      };
      img.onerror = reject;
      img.src = imageUri;
    });
  }

  // Converte pixel para escala de cinza
  getGrayscale(x: number, y: number): number {
    if (!this.imageData) return 0;

    const index = (y * this.width + x) * 4;
    const r = this.imageData.data[index];
    const g = this.imageData.data[index + 1];
    const b = this.imageData.data[index + 2];
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  // Detecta se um pixel é preto (marcador)
  isBlackPixel(x: number, y: number, threshold = 80): boolean {
    const gray = this.getGrayscale(x, y);
    return gray < threshold;
  }

  // Encontra regiões conectadas de pixels pretos
  findBlackRegions(minSize = 100): Region[] {
    if (!this.imageData) return [];

    const visited = new Set<string>();
    const regions: Region[] = [];

    for (let y = 0; y < this.height; y += 3) { // Skip pixels para performance
      for (let x = 0; x < this.width; x += 3) {
        const key = `${x},${y}`;
        if (!visited.has(key) && this.isBlackPixel(x, y)) {
          const region = this.floodFill(x, y, visited);
          if (region.pixels.length > minSize) {
            regions.push(region);
          }
        }
      }
    }

    return regions;
  }

  // Flood fill para encontrar região conectada
  floodFill(startX: number, startY: number, visited: Set<string>): Region {
    const stack: [number, number][] = [[startX, startY]];
    const pixels: [number, number][] = [];
    let minX = startX, maxX = startX, minY = startY, maxY = startY;

    while (stack.length > 0) {
      const [x, y] = stack.pop()!;
      const key = `${x},${y}`;

      if (visited.has(key) || x < 0 || x >= this.width || y < 0 || y >= this.height) {
        continue;
      }

      if (!this.isBlackPixel(x, y)) {
        continue;
      }

      visited.add(key);
      pixels.push([x, y]);

      // Atualiza bounding box
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);

      // Adiciona vizinhos
      stack.push([x + 3, y], [x - 3, y], [x, y + 3], [x, y - 3]);
    }

    return {
      pixels,
      bounds: { minX, maxX, minY, maxY },
      center: { x: (minX + maxX) / 2, y: (minY + maxY) / 2 },
      width: maxX - minX,
      height: maxY - minY,
      area: pixels.length
    };
  }

  // Identifica os 4 marcadores de canto
  identifyCornerMarkers(regions: Region[]): Corners {
    // Filtra regiões que podem ser marcadores (aproximadamente quadradas)
    const candidates = regions.filter(region => {
      const aspectRatio = region.width / region.height;
      return aspectRatio > 0.5 && aspectRatio < 2.0 && region.area > 50;
    });

    if (candidates.length < 4) {
      throw new Error('Não foram encontrados marcadores de canto suficientes');
    }

    // Ordena por posição para identificar cantos
    candidates.sort((a, b) => a.center.y - b.center.y || a.center.x - b.center.x);

    // Identifica os 4 cantos
    const topCandidates = candidates.slice(0, Math.ceil(candidates.length / 2));
    const bottomCandidates = candidates.slice(Math.ceil(candidates.length / 2));

    topCandidates.sort((a, b) => a.center.x - b.center.x);
    bottomCandidates.sort((a, b) => a.center.x - b.center.x);

    return {
      topLeft: topCandidates[0],
      topRight: topCandidates[topCandidates.length - 1],
      bottomLeft: bottomCandidates[0],
      bottomRight: bottomCandidates[bottomCandidates.length - 1]
    };
  }

  // Calcula os limites da grade baseado nos marcadores
  calculateGridBounds(corners: Corners): GridInfo {
    const { topLeft, topRight, bottomLeft, bottomRight } = corners;

    // Calcula área entre os marcadores
    const gridBounds = {
      topLeft: {
        x: topLeft.center.x + topLeft.width / 2,
        y: topLeft.center.y + topLeft.height / 2
      },
      topRight: {
        x: topRight.center.x - topRight.width / 2,
        y: topRight.center.y + topRight.height / 2
      },
      bottomLeft: {
        x: bottomLeft.center.x + bottomLeft.width / 2,
        y: bottomLeft.center.y - bottomLeft.height / 2
      },
      bottomRight: {
        x: bottomRight.center.x - bottomRight.width / 2,
        y: bottomRight.center.y - bottomRight.height / 2
      }
    };

    // Calcula dimensões da grade
    const width = Math.max(
      gridBounds.topRight.x - gridBounds.topLeft.x,
      gridBounds.bottomRight.x - gridBounds.bottomLeft.x
    );

    const height = Math.max(
      gridBounds.bottomLeft.y - gridBounds.topLeft.y,
      gridBounds.bottomRight.y - gridBounds.topRight.y
    );

    return {
      bounds: gridBounds,
      width,
      height,
      center: {
        x: (gridBounds.topLeft.x + gridBounds.topRight.x) / 2,
        y: (gridBounds.topLeft.y + gridBounds.bottomLeft.y) / 2
      }
    };
  }

  // Detecta a grade completa
  async detectGrid(imageUri: string): Promise<{
    success: boolean;
    corners?: Corners;
    grid?: GridInfo;
    error?: string;
    debug?: {
      totalRegions: number;
      imageSize: { width: number; height: number };
    };
  }> {
    try {
      console.log('Carregando imagem...');
      await this.loadImage(imageUri);

      console.log('Procurando regiões pretas...');
      const blackRegions = this.findBlackRegions();

      console.log(`Encontradas ${blackRegions.length} regiões pretas`);

      if (blackRegions.length < 4) {
        throw new Error('Poucos marcadores encontrados na imagem');
      }

      console.log('Identificando marcadores de canto...');
      const corners = this.identifyCornerMarkers(blackRegions);

      console.log('Calculando limites da grade...');
      const gridInfo = this.calculateGridBounds(corners);

      return {
        success: true,
        corners,
        grid: gridInfo,
        debug: {
          totalRegions: blackRegions.length,
          imageSize: { width: this.width, height: this.height }
        }
      };

    } catch (error) {
      console.error('Erro na detecção da grade:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  // Extrai a área da grade da imagem
  async extractGridArea(imageUri: string, gridInfo: GridInfo): Promise<string> {
    try {
      const { bounds, width, height } = gridInfo;

      // Usa expo-image-manipulator para extrair a área
      const result = await manipulateAsync(
        imageUri,
        [
          {
            crop: {
              originX: bounds.topLeft.x,
              originY: bounds.topLeft.y,
              width: width,
              height: height
            }
          }
        ],
        { compress: 0.8, format: SaveFormat.PNG }
      );

      return result.uri;
    } catch (error) {
      console.error('Erro ao extrair área da grade:', error);
      throw error;
    }
  }
}

// Função principal para detectar e extrair grade
export async function detectAndExtractGrid(imageUri: string): Promise<{
  success: boolean;
  gridDetection?: {
    success: boolean;
    corners?: Corners;
    grid?: GridInfo;
    error?: string;
    debug?: {
      totalRegions: number;
      imageSize: { width: number; height: number };
    };
  };
  extractedGridUri?: string;
  error?: string;
}> {
  try {
    const detector = new GridDetector(); // Instanciando corretamente
    const detection = await detector.detectGrid(imageUri);

    if (!detection.success) {
      return {
        success: false,
        error: detection.error
      };
    }

    const extractedUri = await detector.extractGridArea(imageUri, detection.grid!);
    return {
      success: true,
      gridDetection: detection,
      extractedGridUri: extractedUri
    };
  } catch (error) {
    console.error('Error in detectAndExtractGrid:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
}

// Função para validar se a imagem contém uma grade válida
export function validateGridDetection(detection: {
  success: boolean;
  corners?: Corners;
  grid?: GridInfo;
  error?: string;
}): { valid: boolean; reason?: string } {
  const MIN_MARKER_SIZE = 20;
  const MAX_MARKER_SIZE = 200;

  // Validar tamanho dos marcadores
  const markers = Object.values(detection.corners);
  const invalidMarkers = markers.filter(m =>
    m.width < MIN_MARKER_SIZE ||
    m.width > MAX_MARKER_SIZE ||
    m.height < MIN_MARKER_SIZE ||
    m.height > MAX_MARKER_SIZE
  );

  if (invalidMarkers.length > 0) {
    return {
      valid: false,
      reason: 'Marcadores com tamanho inválido'
    };
  }

  // Calcular qualidade baseada na consistência dos marcadores
  const avgSize = markers.reduce((sum, m) => sum + m.width + m.height, 0) / (markers.length * 2);
  const sizeVariance = markers.reduce((sum, m) => {
    return sum + Math.pow(m.width - avgSize, 2) + Math.pow(m.height - avgSize, 2);
  }, 0) / markers.length;

  const quality = Math.max(0, 100 - sizeVariance * 10);

  if (!detection || !detection.success) {
    return { valid: false, reason: 'Detecção falhou' };
  }

  const { corners, grid } = detection;

  // Verifica se todos os cantos foram encontrados
  if (!corners?.topLeft || !corners?.topRight || !corners?.bottomLeft || !corners?.bottomRight) {
    return { valid: false, reason: 'Marcadores de canto não encontrados' };
  }

  // Verifica se a grade tem dimensões razoáveis
  if (grid && (grid.width < 100 || grid.height < 100)) {
    return { valid: false, reason: 'Grade muito pequena' };
  }

  // Verifica proporção da grade (deve ser aproximadamente retangular)
  if (grid) {
    const aspectRatio = grid.width / grid.height;
    if (aspectRatio < 0.3 || aspectRatio > 3.0) {
      return { valid: false, reason: 'Proporção da grade inválida' };
    }
  }
  return {
    valid: quality > 50,
    reason: quality > 50 ? undefined : 'Marcadores inconsistentes',
  };
}

// Função para debug - desenha os marcadores detectados
export function drawDetectionDebug(imageUri: string, detection: {
  success: boolean;
  corners?: Corners;
  grid?: GridInfo;
}): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve('');
        return;
      }

      // Desenha imagem original
      ctx.drawImage(img, 0, 0);

      if (detection.success && detection.corners && detection.grid) {
        const { corners, grid } = detection;

        // Desenha marcadores de canto
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;

        Object.values(corners).forEach(corner => {
          ctx.strokeRect(
            corner.bounds.minX - 5,
            corner.bounds.minY - 5,
            corner.width + 10,
            corner.height + 10
          );
        });

        // Desenha limites da grade
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.strokeRect(
          grid.bounds.topLeft.x,
          grid.bounds.topLeft.y,
          grid.width,
          grid.height
        );

        // Desenha centro da grade
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(grid.center.x, grid.center.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      }

      resolve(canvas.toDataURL());
    };
    img.src = imageUri;
  });
}