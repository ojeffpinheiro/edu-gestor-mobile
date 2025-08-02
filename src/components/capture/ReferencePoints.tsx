import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { createReferencePointsStyles } from './CameraStyles';
import { calculateGridPositions } from '../../utils/coordinateUtils';

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


  const referencePoints = calculateGridPositions(6, 6, isLandscape);

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
        const pointStatus = pointsStatus[point.id];
        const pointColor = pointsColors[point.id];

        return (
          <View key={point.id} style={[styles.pointContainer, {
            left: `${point.position.x * 100}%`,
            top: `${point.position.y * 100}%`,
          }]}>
            <Animated.View style={[
              styles.point,
              {
                transform: [{ scale: pulseAnims[point.id] }],
                backgroundColor: pointStatus ? colors.feedback.success : colors.feedback.error
              }
            ]}>
              <Text style={styles.pointText}>{point.id}</Text>
            </Animated.View>

            {pointColor && (
              <View style={[
                styles.colorIndicator,
                { backgroundColor: `rgb(${pointColor.r}, ${pointColor.g}, ${pointColor.b})` }
              ]} />
            )}
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