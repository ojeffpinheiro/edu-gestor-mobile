import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { scaleFont, scaleWidth, scaleHeight, isTablet } from '../utils/responsiveUtils';

export const useResponsiveStyles = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const responsiveValue = (value: number, type: 'width' | 'height' | 'font') => {
    switch (type) {
      case 'width':
        return scaleWidth(value);
      case 'height':
        return scaleHeight(value);
      case 'font':
        return scaleFont(value);
      default:
        return value;
    }
  };

  return {
    scaleWidth,
    scaleHeight,
    scaleFont,
    isTablet: isTablet(),
    isLandscape: dimensions.width > dimensions.height,
    responsiveValue,
    screenWidth: dimensions.width,
    screenHeight: dimensions.height,
  };
};