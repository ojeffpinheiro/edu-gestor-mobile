import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const GridDetectionOverlay = ({ detected, edges }) => {
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
              width: Math.sqrt(
                Math.pow(edges.topRight.x - edges.topLeft.x, 2) + 
                Math.pow(edges.topRight.y - edges.topLeft.y, 2)
              ),
              transform: [
                { 
                  rotate: Math.atan2(
                    edges.topRight.y - edges.topLeft.y,
                    edges.topRight.x - edges.topLeft.x
                  ) + 'rad' 
                }
              ]
            }
          ]} />
          
          {/* Repetir para outras linhas */}
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