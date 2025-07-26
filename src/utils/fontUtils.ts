import { Typography } from '../styles/designTokens';
import { scaleFont } from './responsiveUtils';

export const getScaledFontSize = (sizeKey: keyof typeof Typography.fontSize) => {
  return scaleFont(Typography.fontSize[sizeKey]);
};

export const getScaledLineHeight = (sizeKey: keyof typeof Typography.lineHeight) => {
  return scaleFont(Typography.lineHeight[sizeKey]);
};