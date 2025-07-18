import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';


const distance = (p1, p2) => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

const getLineColor = (contrast, sharpness) => {
  if (contrast > 70 && sharpness > 60) return 'rgba(0,255,0,0.7)';
  if (contrast > 50 && sharpness > 40) return 'rgba(255,255,0,0.7)';
  return 'rgba(255,0,0,0.7)';
};

const GridDetectionOverlay = ({ detected, edges, contrast, sharpness }) => {
  const { colors } = useTheme();

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {edges && (
        <View style={[
          localStyles.detectedFrame,
          {
            borderColor: detected ? colors.success : colors.warning,
            borderWidth: detected ? 3 : 2
          }
        ]}>
          {/* Linhas conectando os pontos detectados */}
          <View style={[
            localStyles.detectedLine,
            {
              left: edges.topLeft.x,
              top: edges.topLeft.y,
              width: distance(edges.topLeft, edges.topRight),
              transform: [
                {
                  rotate: `${Math.atan2(
                    edges.topRight.y - edges.topLeft.y,
                    edges.topRight.x - edges.topLeft.x
                  )}rad`
                }
              ],
              backgroundColor: getLineColor(contrast, sharpness)
            }
          ]} />

          {/* Repetir para outras linhas */}
          {contrast < 30 && (
            <Text style={[localStyles.warningText, { color: colors.warning }]}>
              Contraste baixo
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  detectedFrame: {
    position: 'absolute',
    borderStyle: 'dashed',
    borderRadius: 5
  },
  detectedLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'rgba(0,255,0,0.7)'
  }
});

export default GridDetectionOverlay;