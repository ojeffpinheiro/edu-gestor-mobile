import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import styles from "./GridDetectionOverlayStyles";

const ScanLine = ({ GRID_CONFIG, screenHeight }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[
      styles.scanLine,
      {
        transform: [{
          translateY: translateY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, screenHeight * GRID_CONFIG.gridPosition.height]
          })
        }]
      }
    ]} />
  );
};

export default ScanLine;