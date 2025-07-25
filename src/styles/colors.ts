interface GrayScale {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
}

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  disabled: string;
  border: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  shadow: string;
  gray: GrayScale;
}

export const lightColors: ColorPalette = {
  primary: '#3B82F6',
  secondary: '#10B981',
  accent: '#8B5CF6',
  background: '#F8FAFC',
  card: '#FFFFFF',
  disabled: '#E5E5EA',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  success: '#16A34A',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  shadow: 'rgba(0, 0, 0, 0.1)',
  gray: {
    100: '#F3F4F6',
    200: '#E5E7Eb',
    300: '#D1D5Db',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
  },
};

export const darkColors: ColorPalette = {
  primary: '#60A5FA',
  secondary: '#34D399',
  accent: '#A78BFA',
  background: '#121212',
  card: '#1F2937',
  disabled: '#3B3F4E',
  textPrimary: '#F8FAFC',
  textSecondary: '#9CA3AF',
  border: '#374151',
  success: '#16a34a',
  error: '#F87171',
  warning: '#FCD34D',
  info: '#60A5FA',
  shadow: 'rgba(0, 0, 0, 0.4)',
  gray: {
    100: '#1F2937',
    200: '#374151',
    300: '#4B5563',
    400: '#6B7280',
    500: '#9CA3AF',
    600: '#D1D5DB',
  },
};

export type ColorScheme = ColorPalette;