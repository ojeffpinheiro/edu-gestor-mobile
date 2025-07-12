import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';

const GridDetectionOverlay = ({ onAlignmentStatusChange }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [isAligned, setIsAligned] = useState(false);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.03,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.97,
          duration: 800,
          useNativeDriver: true
        })
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const aligned = Math.random() > 0.5; // Simulação
      setIsAligned(aligned);
      onAlignmentStatusChange(aligned);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View
        style={[
          styles.captureArea,
          {
            transform: [{ scale: pulseAnim }],
            borderColor: isAligned ? '#4ADE80' : '#FACC15'
          }
        ]}
      >
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </Animated.View>
      
      <Text style={styles.guideText}>
        {isAligned ? 'Alinhamento correto!' : 'Alinhe a prova com a borda'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  captureArea: {
    width: '80%',
    height: '60%',
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.1)'
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: 'white'
  },
  topLeft: {
    top: -1,
    left: -1,
    borderTopWidth: 3,
    borderLeftWidth: 3
  },
  topRight: {
    top: -1,
    right: -1,
    borderTopWidth: 3,
    borderRightWidth: 3
  },
  bottomLeft: {
    bottom: -1,
    left: -1,
    borderBottomWidth: 3,
    borderLeftWidth: 3
  },
  bottomRight: {
    bottom: -1,
    right: -1,
    borderBottomWidth: 3,
    borderRightWidth: 3
  },
  guideText: {
    position: 'absolute',
    bottom: '25%',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 8
  }
});

export default GridDetectionOverlay;