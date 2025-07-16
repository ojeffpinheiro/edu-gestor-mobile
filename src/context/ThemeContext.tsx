import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import { useColorScheme, Appearance } from 'react-native';
import { ColorScheme, darkColors, lightColors } from '../styles/colors';

type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextType {
  colors: ColorScheme;
  isDarkMode: boolean;
  currentTheme: ThemePreference;
  toggleTheme: () => void;
  setAppTheme: (theme: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemePreference;
}

export const ThemeProvider = ({ 
  children, 
  initialTheme = 'system' 
}: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemePreference>(initialTheme);

  const isDarkMode = useMemo(
    () => (theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark'),
    [theme, systemColorScheme]
  );

  const colors = isDarkMode ? darkColors : lightColors;

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === 'system') {
        // Force re-render when system theme changes and we're in system mode
        setTheme('system');
      }
    });
    return () => subscription.remove();
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'system') {
        return systemColorScheme === 'dark' ? 'light' : 'dark';
      }
      return prevTheme === 'light' ? 'dark' : 'light';
    });
  };

  const setAppTheme = (newTheme: ThemePreference) => {
    setTheme(newTheme);
  };

  const contextValue = useMemo(
    () => ({
      colors,
      isDarkMode,
      currentTheme: theme,
      toggleTheme,
      setAppTheme,
    }),
    [colors, isDarkMode, theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};