// utils/responsiveUtils.ts
import { Dimensions, PixelRatio, Platform, ScaledSize } from 'react-native';

const { width, height }: ScaledSize = Dimensions.get('window');

// Base de referência (iPhone 11)
const BASE_WIDTH = 414;
const BASE_HEIGHT = 896;

// Verificar se é tablet
export const isTablet = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;
  return (adjustedWidth >= 1000 || adjustedHeight >= 1000);
};

// Dimensionamento horizontal responsivo
export const scaleWidth = (size: number) => {
  const scaleFactor = width / BASE_WIDTH;
  const scaledSize = size * scaleFactor;
  
  // Limitar scaling para não ficar muito grande em tablets
  return Math.min(scaledSize, size * (isTablet() ? 1.3 : 1));
};

// Dimensionamento vertical responsivo
export const scaleHeight = (size: number) => {
  const scaleFactor = height / BASE_HEIGHT;
  const scaledSize = size * scaleFactor;
  
  return Math.min(scaledSize, size * (isTablet() ? 1.2 : 1));
};

// Dimensionamento de fonte responsivo
export const scaleFont = (size: number) => {
  const scaleFactor = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
  const scaledSize = size * scaleFactor;
  
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(scaledSize)) - 1;
  }
};

// Gerar proporções para Grid Layout
export const gridUnits = (units: number) => {
  return (width / 12) * units;
};

// Verificar orientação
export const isLandscape = () => width > height;