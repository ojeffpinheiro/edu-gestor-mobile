interface GrayScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

interface ColorPalette {
  primary: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  accent: string[];
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    overlay: {
      main: string;
      light: string;
    }
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    card: string;
    onPrimary: string;
  };
  border: {
    light: string;
    medium: string;
    dark: string;
  };
  feedback: {
    success: string;
    error: string;
    warning: string;
    info: string;
  };
  icons: {
    primary: string;
    secondary: string;
    inactive: string;
  };
  component: {
    primaryButton: string;
    primaryButtonHover: string;
    secondaryButton: string;
    secondaryButtonHover: string;
    card: string;
    text: string;
    disabled: string;
    input: string;
    inputBorder: string;
    inputFocus: string;
  };
  gray: GrayScale;
}

export const lightColors: ColorPalette = {
  primary: {
    main: '#2563EB',
    light: '#3B82F6',
    dark: '#1D4ED8',
    contrast: '#FFFFFF',
  },
  secondary: {
    main: '#059669',
    light: '#10B981',
    dark: '#047857',
    contrast: '#FFFFFF',
  },
  accent: ['#8B5CF6', '#EC4899', '#F59E0B'], // Roxo, Rosa, Amarelo
  background: {
    primary: '#EEEEEE', // Fundo claro principal
    secondary: '#FFFFFF', // Branco puro
    tertiary: '#F3F4F6', // Cinza muito claro
    overlay: {
      main: 'rgba(255, 255, 255, 0.7)',
      light: 'rgba(0, 0, 0, 0.8)'
    }
  },
  text: {
    primary: '#111827', // Preto suave
    secondary: '#4B5563', // Cinza médio
    tertiary: '#6B7280', // Cinza mais claro
    card: '#EEEEEE', // Texto para cards
    onPrimary: '#FFFFFF', // Texto sobre cores primárias
  },
  border: {
    light: '#E5E7EB', // Bordas claras
    medium: '#D1D5DB', // Bordas médias
    dark: '#9CA3AF', // Bordas escuras
  },
  feedback: {
    success: '#16A34A', // Verde sucesso
    error: '#DC2626', // Vermelho erro
    warning: '#F59E0B', // Amarelo alerta
    info: '#2563EB', // Azul informação
  },
  icons: {
    primary: '#374151', // Ícones principais
    secondary: '#6B7280', // Ícones secundários
    inactive: '#9CA3AF', // Ícones inativos
  },
  component: {
    primaryButton: '#2563EB',
    primaryButtonHover: '#1D4ED8',
    secondaryButton: '#FFFFFF',
    secondaryButtonHover: '#F3F4F6',
    card: '#FFFFFF',
    text: '#111827',
    disabled: '#E5E7EB',
    input: '#FFFFFF',
    inputBorder: '#D1D5DB',
    inputFocus: '#93C5FD',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

export const darkColors: ColorPalette = {
  primary: {
    main: '#3B82F6',
    light: '#60A5FA',
    dark: '#2563EB',
    contrast: '#FFFFFF',
  },
  secondary: {
    main: '#10B981',
    light: '#34D399',
    dark: '#059669',
    contrast: '#FFFFFF',
  },
  accent: ['#8B5CF6', '#EC4899', '#F59E0B'],
  background: {
    primary: '#121212', // Fundo escuro principal
    secondary: '#1E1E1E', // Preto mais claro
    tertiary: '#2D2D2D', // Cinza escuro
    overlay: {
      main: 'rgba(0, 0, 0, 0.8)',
      light: 'rgba(255, 255, 255, 0.7)'
    }
  },
  text: {
    primary: '#E5E7EB', // Branco suave
    secondary: '#9CA3AF', // Cinza claro
    tertiary: '#6B7280', // Cinza médio
    card: '#F3F4F6', // Texto para cards
    onPrimary: '#FFFFFF', // Texto sobre cores primárias
  },
  border: {
    light: '#374151', // Bordas claras
    medium: '#4B5563', // Bordas médias
    dark: '#6B7280', // Bordas escuras
  },
  feedback: {
    success: '#16A34A',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  },
  icons: {
    primary: '#E5E7EB',
    secondary: '#9CA3AF',
    inactive: '#6B7280',
  },
  component: {
    primaryButton: '#3B82F6',
    primaryButtonHover: '#2563EB',
    secondaryButton: '#1F2937',
    secondaryButtonHover: '#374151',
    card: '#1F2937',
    text: '#E5E7EB',
    disabled: '#374151',
    input: '#1F2937',
    inputBorder: '#4B5563',
    inputFocus: '#93C5FD',
  },
  gray: {
    50: '#1F2937',
    100: '#374151',
    200: '#4B5563',
    300: '#6B7280',
    400: '#9CA3AF',
    500: '#D1D5DB',
    600: '#E5E7EB',
    700: '#F3F4F6',
    800: '#F9FAFB',
    900: '#FFFFFF',
  },
};

export type ColorScheme = ColorPalette;