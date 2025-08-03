import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import { debugLog, ReferencePoint } from '../../../utils/coordinateUtils';
import { useTheme } from '../../../context/ThemeContext';

interface AlignmentGuideProps {
  referencePoints: ReferencePoint[];
  isLandscape: boolean;
  pointsStatus?: { [key: number]: boolean };
  pointsColors?: {
    [key: number]: {
      r: number;
      g: number;
      b: number;
      percentage?: number;
    }
  };
  correctPoints?: number;
  totalPoints?: number;
}

const AlignmentGuide: React.FC<AlignmentGuideProps> = ({
  referencePoints,
  isLandscape,
  pointsStatus = {},
  pointsColors = {},
  correctPoints = 0,
  totalPoints = 6
}) => {
  const scanAnim = useRef(new Animated.Value(0)).current;
  const pulseAnims = useRef<{ [key: number]: Animated.Value }>({}).current;
  const { colors } = useTheme();

  referencePoints.forEach(point => {
    if (!pulseAnims[point.id]) {
      pulseAnims[point.id] = new Animated.Value(1);
    }
  });

  useEffect(() => {
    startScanAnimation();

    // Start pulse animations for points with low alignment
    referencePoints.forEach(point => {
      if (pointsColors[point.id]?.percentage !== undefined && pointsColors[point.id].percentage < 60) {
        startPulseAnimation(point.id);
      }
    });
  }, [pointsColors]);

  const startScanAnimation = () => {
    scanAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.delay(500)
      ])
    ).start();
  };

  const startPulseAnimation = (pointId: number) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnims[pointId], {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnims[pointId], {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        })
      ])
    ).start();
  };



  debugLog('AlignmentGuide - rendering points', {
    referencePoints,
    pointsStatus,
    pointsColors
  });

  return (
    <View style={[styles.card, isLandscape ? styles.landscapeCard : styles.portraitCard]}>
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          Posicione o gabarito dentro da área destacada
        </Text>
        <Text style={styles.subInstructionText}>
          Certifique-se que todos os pontos de referência estão visíveis
        </Text>
      </View>

      {/* Feedback de pontos corretos */}
      <View style={styles.pointsFeedback}>
        <Text style={styles.pointsText}>
          Pontos corretos: {correctPoints}/{totalPoints}
        </Text>
      </View>

      {/* Pontos de referência */}
      {referencePoints.map((point) => {
        const pointStatus = pointsStatus[point.id] || false;
        const pointColor = pointsColors[point.id];

        return (
          <View key={point.id} style={[styles.pointContainer, {
            left: `${point.position.x * 100}%`,
            top: `${point.position.y * 100}%`,
          }]}>
            <Animated.View style={[
              styles.alignmentPoint,
              {
                transform: [{ scale: pulseAnims[point.id] }],
                backgroundColor: pointStatus ? colors.feedback.success : colors.feedback.error,
                width: pointStatus ? 40 : 30, // Aumenta quando detectado
                height: pointStatus ? 40 : 30,
              }
            ]}>
              <Text style={styles.pointText}>{point.id}</Text>
              {pointStatus && (
                <Text style={styles.statusText}>✓</Text>
              )}
            </Animated.View>
          </View>
        );
      })}

      {/* Linha de varredura animada */}
      <Animated.View
        style={[
          styles.scanLine,
          {
            transform: [{
              translateY: scanAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
            }]
          }
        ]}
      />

      <View style={styles.centerPoint} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(0, 150, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    // Adicione estas propriedades:
    width: '80%',
    height: '70%',
    backgroundColor: 'transparent', // Garanta que o fundo é transparente
    zIndex: 1, // Garanta que está acima da câmera
  },
  portraitCard: {
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '20%',
  },
  landscapeCard: {
    top: '5%',
    left: '15%',
    right: '15%',
    bottom: '15%',
  },
  instructionContainer: {
    position: 'absolute',
    top: -50,
    width: '100%',
    alignItems: 'center',
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subInstructionText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  alignmentPoint: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  pointContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  colorIndicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    bottom: -5,
    right: -5,
    borderWidth: 1,
    borderColor: 'white',
  },
  centerPoint: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(0, 150, 255, 0.8)',
  },
  pointsFeedback: {
    position: 'absolute',
    bottom: -40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    borderRadius: 8,
  },
  pointsText: {
    color: 'white',
    fontSize: 14,
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(0, 255, 0, 0.7)',
    left: 0,
  },
  statusText: {
    position: 'absolute',
    bottom: -15,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AlignmentGuide;