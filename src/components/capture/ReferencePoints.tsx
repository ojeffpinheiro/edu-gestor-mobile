import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { createReferencePointsStyles } from './CameraStyles';

interface ReferencePointsProps {
  pointsStatus: { [key: number]: boolean };
  pointsColors: {
    [key: number]: {
      r: number;
      g: number;
      b: number;
      percentage?: number;
    }
  };
  isLandscape: boolean;
  correctPoints?: number;
  totalPoints?: number;
}

const ReferencePoints: React.FC<ReferencePointsProps> = ({
  pointsStatus,
  pointsColors,
  isLandscape,
  correctPoints = 0,
  totalPoints = 6
}) => {
  const { colors } = useTheme();
  const styles = createReferencePointsStyles(colors);

  const scanAnim = useRef(new Animated.Value(0)).current;
  const pulseAnims = useRef<{ [key: number]: Animated.Value }>({}).current;

  const referencePoints = isLandscape
    ? [
      { id: 1, x: 0.26, y: 0.1 },
      { id: 2, x: 0.26, y: 0.85 },
      { id: 3, x: 0.35, y: 0.1 },
      { id: 4, x: 0.5, y: 0.85 },
      { id: 5, x: 0.8, y: 0.1 },
      { id: 6, x: 0.8, y: 0.85 }
    ]
    : [
      { id: 1, x: 0.1, y: 0.2 },
      { id: 2, x: 1, y: 0.2 },
      { id: 3, x: 0.1, y: 0.55 },
      { id: 4, x: 1, y: 0.55 },
      { id: 5, x: 0.1, y: 0.84 },
      { id: 6, x: 1, y: 0.84 }
    ];

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

  return (
    <>
      <View style={styles.guideFrame}>
        {/* Cantos da moldura */}
        <View style={[styles.corner, styles.cornerTL, { backgroundColor: colors.feedback.success }]} />
        <View style={[styles.corner, styles.cornerTR, { backgroundColor: colors.feedback.success }]} />
        <View style={[styles.corner, styles.cornerBL, { backgroundColor: colors.feedback.success }]} />
        <View style={[styles.corner, styles.cornerBR, { backgroundColor: colors.feedback.success }]} />
      </View>

      {/* Feedback de pontos corretos */}
      <View style={styles.pointsFeedback}>
        <Text style={styles.pointsText}>
          Pontos corretos: {correctPoints}/{totalPoints}
        </Text>
      </View>

      {/* Pontos de referência */}
      {referencePoints.map((point) => {
        const pointData = pointsColors[point.id];
        const percentage = pointData?.percentage ?? 0;
        const color = pointData
          ? `rgb(${pointData.r}, ${pointData.g}, ${pointData.b})`
          : pointsStatus[point.id] ? '#00FF00' : '#FF0000';

        return (
          <View key={point.id} style={[styles.pointContainer, {
            left: `${point.x * 100}%`,
            top: `${point.y * 100}%`,
          }]}>
            <View style={[styles.point]}>
              <Text style={styles.pointText}>{point.id}</Text>
            </View>
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
    </>
  );
};

export default ReferencePoints;