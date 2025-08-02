import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { DetectedPoint } from '../../../utils/coordinateUtils';

interface PreviewOverlayProps {
  alignmentPoints: DetectedPoint[];
  imageUri: string;
}

const PreviewOverlay: React.FC<PreviewOverlayProps> = ({
  alignmentPoints,
  imageUri
}) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (imageUri) {
      Image.getSize(imageUri, (width, height) => {
        setImageSize({ width, height });
      });
    }
  }, [imageUri]);

  return (
    <View style={StyleSheet.absoluteFill}>
      {alignmentPoints.map((point, index) => (
        <View
          key={point.id} // Use o id em vez do index
          style={[
            styles.detectedPoint,
            {
              left: `${point.position.x * 100}%`,
              top: `${point.position.y * 100}%`,
              backgroundColor: point.matched ? '#4CAF50' : '#F44336',
            }
          ]}
        ><Text>{point.id}</Text></View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  detectedPoint: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 3,
    borderColor: 'white',
    marginLeft: -9,
    marginTop: -9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default PreviewOverlay;