import React from 'react';
import { View, StyleSheet } from 'react-native';

interface AlignmentPoint {
  x: number;
  y: number;
  matched: boolean;
}

interface PreviewOverlayProps {
  alignmentPoints: AlignmentPoint[];
}

const PreviewOverlay: React.FC<PreviewOverlayProps> = ({ alignmentPoints }) => {
  return (
    <View style={styles.previewOverlay}>
      {alignmentPoints.map((point, index) => (
        <View key={index}
        style={[
            styles.detectedPoint,
            {
              left: `${point.x * 100}%`,
              top: `${point.y * 100}%`,
              backgroundColor: point.matched ? '#4CAF50' : '#F44336',
            }
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  previewOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  detectedPoint: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: -8,
    marginTop: -8,
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default PreviewOverlay;