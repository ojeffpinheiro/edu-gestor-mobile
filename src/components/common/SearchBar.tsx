import React, { useState, useRef } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Animated,
  Keyboard,
  Platform
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Search, X, ChevronLeft } from 'lucide-react-native';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
  autoFocus?: boolean;
  style?: any;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar...',
  value,
  onChangeText,
  onFocus,
  onBlur,
  onClear,
  showBackButton = false,
  onBackPress,
  autoFocus = false,
  style
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const borderAnim = useRef(new Animated.Value(0)).current;
  const bgAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.parallel([
      Animated.timing(borderAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(bgAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      })
    ]).start();
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.parallel([
      Animated.timing(borderAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(bgAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      })
    ]).start();
    onBlur?.();
  };

  const handleClear = () => {
    onChangeText('');
    onClear?.();
    if (Platform.OS === 'web') {
      inputRef.current?.focus();
    }
  };

  const handleBackPress = () => {
    Keyboard.dismiss();
    onBackPress?.();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border.light, colors.primary.main]
  });

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.background.secondary, colors.component.card]
  });

  const styles = createStyles(colors);

  return (
    <Animated.View 
      style={[
        styles.container,
        { 
          borderColor,
          backgroundColor,
        },
        style
      ]}
    >
      {showBackButton && (
        <TouchableOpacity 
          onPress={handleBackPress}
          style={styles.backButton}
          accessibilityLabel="Voltar"
          accessibilityRole="button"
        >
          <ChevronLeft 
            size={24} 
            color={isFocused ? colors.primary.main : colors.text.secondary} 
          />
        </TouchableOpacity>
      )}

      <Search 
        size={20} 
        color={isFocused ? colors.primary.main : colors.text.secondary} 
        style={styles.searchIcon} 
      />

      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.text.tertiary}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel="Campo de busca"
        accessibilityHint="Digite para buscar"
      />

      {value.length > 0 && (
        <TouchableOpacity 
          onPress={handleClear}
          style={styles.clearButton}
          accessibilityLabel="Limpar busca"
          accessibilityRole="button"
        >
          <X 
            size={20} 
            color={isFocused ? colors.primary.main : colors.text.secondary} 
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const createStyles = (colors: any) => 
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 1,
      paddingHorizontal: 16,
      paddingVertical: Platform.select({ ios: 12, android: 8 }),
      marginVertical: 8,
    },
    backButton: {
      marginRight: 8,
    },
    searchIcon: {
      marginRight: 12,
    },
    input: {
      flex: 1,
      height: Platform.select({ ios: 30, android: 40 }),
      color: colors.text.primary,
      fontSize: 16,
      padding: 0,
      margin: 0,
    },
    clearButton: {
      marginLeft: 8,
      padding: 4,
    },
  });

export default React.memo(SearchBar);