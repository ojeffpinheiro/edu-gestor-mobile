import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface SelectionCounterProps {
  count: number;
  total: number;
}

const SelectionCounter: React.FC<SelectionCounterProps> = ({ count, total }) => {
  const { colors } = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  
  React.useEffect(() => {
    // Animação quando o contador muda
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [count]);

  const styles = createStyles(colors);

  return (
    <Animated.View 
      style={[
        styles.container,
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      <View style={styles.counterBackground}>
        <Text style={styles.counterText}>
          {count}/{total}
        </Text>
      </View>
      <Text style={styles.labelText}>Selecionados</Text>
    </Animated.View>
  );
};

const createStyles = (colors: any) => 
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: 16,
      right: 16,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.secondary,
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 12,
      shadowColor: colors.primary.main,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      zIndex: 10,
    },
    counterBackground: {
      backgroundColor: colors.primary.main,
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginRight: 8,
    },
    counterText: {
      color: colors.text.onPrimary,
      fontWeight: 'bold',
      fontSize: 14,
    },
    labelText: {
      color: colors.text.primary,
      fontSize: 14,
    },
  });

export default React.memo(SelectionCounter);