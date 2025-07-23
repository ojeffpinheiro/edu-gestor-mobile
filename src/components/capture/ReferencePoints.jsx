import React, { useEffect } from 'react';
import { View, Animated, Easing, StyleSheet, Text } from 'react-native';

const ReferencePoints = ({ pointsStatus, pointsColors, isLandscape }) => {
  const scanAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startScanAnimation();
  }, []);

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

  return (
    <>
      <View style={styles.guideFrame}>
        {/* Cantos da moldura */}
        <View style={[styles.corner, styles.cornerTL]} />
        <View style={[styles.corner, styles.cornerTR]} />
        <View style={[styles.corner, styles.cornerBL]} />
        <View style={[styles.corner, styles.cornerBR]} />
      </View>

      {/* Pontos de referência */}
      {referencePoints.map((point) => {
        const color = pointsColors[point.id]
          ? `rgb(${pointsColors[point.id].r}, ${pointsColors[point.id].g}, ${pointsColors[point.id].b})`
          : pointsStatus[point.id] ? '#00FF00' : '#FF0000';

        return (
          <View
            key={point.id}
            style={[
              styles.point,
              {
                left: `${point.x * 100}%`,
                top: `${point.y * 100}%`,
                backgroundColor: color
              }
            ]}
          >
            <Text style={styles.pointText}>{point.id}</Text>
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

const styles = StyleSheet.create({
  guideFrame: {
    width: '95%',
    height: '65%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderColor: '#00FF00',
  },
  cornerTL: {
    top: -1,
    left: -1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  cornerTR: {
    top: -1,
    right: -1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  cornerBL: {
    bottom: -1,
    left: -1,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  cornerBR: {
    bottom: -1,
    right: -1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  point: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    transform: [{ translateX: -15 }, { translateY: -15 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  scanLine: {
    position: 'absolute',
    width: '80%',
    height: 2,
    backgroundColor: 'rgba(0, 255, 0, 0.7)',
  },
});

export default ReferencePoints;