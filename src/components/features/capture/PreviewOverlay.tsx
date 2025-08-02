import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { DetectedPoint } from '../../../utils/coordinateUtils';
import { useTheme } from '../../../context/ThemeContext';

interface PreviewOverlayProps {
  alignmentPoints: DetectedPoint[];
  imageUri: string;
  imageWidth?: number;
  imageHeight?: number;
}

const PreviewOverlay: React.FC<PreviewOverlayProps> = ({
  alignmentPoints,
  imageUri,
  imageWidth = Dimensions.get('window').width,
  imageHeight = Dimensions.get('window').height * 0.7
}) => {
  const { colors } = useTheme();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  if (!alignmentPoints || alignmentPoints.length === 0) return null;

  return (
    <View style={StyleSheet.absoluteFill}>
      {alignmentPoints.map((point) => (
        <View
          key={`${point.id}-${point.cell.row}-${point.cell.col}`}
          style={{
            position: 'absolute',
            left: point.position?.x ? point.position.x * imageWidth : 0,
            top: point.position?.y ? point.position.y * imageHeight : 0,
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: point.success ? colors.feedback.success : colors.feedback.error,
            borderWidth: 2,
            borderColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>
            {point.id}
          </Text>
        </View>
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