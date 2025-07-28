import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface ProgressIndicatorProps {
  progress: number;
  statusText?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress, statusText }) => {
  const { colors } = useTheme();
  const widthAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress, widthAnim]);

  return (
    <View style={styles.container}>
      <Text style={[styles.statusText, { color: colors.text.primary }]}>
        {statusText || 'Processando...'}
      </Text>
      <View style={[styles.progressBar, { backgroundColor: colors.background.secondary }]}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: colors.primary.main,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '80%',
    alignSelf: 'center',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
  },
  statusText: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
});

export default ProgressIndicator;