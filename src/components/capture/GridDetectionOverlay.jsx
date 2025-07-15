import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { manipulateAsync } from 'expo-image-manipulator';
import { detectAndExtractGrid, validateGridDetection } from '../../utils/gridDetection';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const GRID_CONFIG = {
  questionCount: 10,
  optionsPerQuestion: 5,
  gridPosition: {
    left: 0.15,
    top: 0.3,
    width: 0.7,
    height: 0.5
  }
};

const GridDetectionOverlay = ({ onAlignmentStatusChange, imageUri }) => {
  const [alignment, setAlignment] = useState({
    isAligned: false,
    quality: 0,
    message: "Posicione a prova corretamente"
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(1)).current;

  // Animação de pulsação
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.6,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);

  // Efeito de escala quando alinhado
  useEffect(() => {
    if (alignment.isAligned) {
      Animated.sequence([
        Animated.timing(iconScale, {
          toValue: 1.3,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(iconScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [alignment.isAligned]);


  useEffect(() => {
    if (!imageUri) return;

    let isMounted = true;
    const processFrame = async () => {
      try {
        const { success, gridDetection } = await detectAndExtractGrid(imageUri);
        
        if (!isMounted) return;

        if (!success || !gridDetection?.success) {
          setAlignment({
            isAligned: false,
            quality: 0,
            message: "Não foi possível detectar a grade"
          });
          onAlignmentStatusChange(false);
          return;
        }

        const validation = validateGridDetection(gridDetection);
        const quality = calculateQuality(gridDetection);

        const newAlignment = {
          isAligned: validation.valid,
          quality,
          message: validation.valid 
            ? "Alinhamento correto!" 
            : validation.reason || "Ajuste a posição"
        };

        if (isMounted) {
          setAlignment(newAlignment);
          onAlignmentStatusChange(newAlignment.isAligned);
        }
      } catch (error) {
        if (isMounted) {
          setAlignment({
            isAligned: false,
            quality: 0,
            message: "Erro no processamento"
          });
          onAlignmentStatusChange(false);
        }
      }
    };

    processFrame();
    return () => { isMounted = false; };
  }, [imageUri]);

  // Calculate quality based on detection results
  const calculateDetectionQuality = (detection) => {
    if (!detection?.success) return 0;

    const { corners } = detection;
    const markers = Object.values(corners);

    // 1. Size consistency (30% weight)
    const avgSize = markers.reduce((sum, m) => sum + m.width + m.height, 0) / (markers.length * 2);
    const sizeVariance = markers.reduce((sum, m) => {
      return sum + Math.pow(m.width - avgSize, 2) + Math.pow(m.height - avgSize, 2);
    }, 0) / markers.length;
    const sizeScore = Math.max(0, 100 - sizeVariance * 10);

    // 2. Position symmetry (40% weight)
    const centerX = (corners.topLeft.center.x + corners.topRight.center.x +
      corners.bottomLeft.center.x + corners.bottomRight.center.x) / 4;
    const centerY = (corners.topLeft.center.y + corners.topRight.center.y +
      corners.bottomLeft.center.y + corners.bottomRight.center.y) / 4;
    const positionScore = 100 - (Math.abs(centerX - imageWidth / 2) + Math.abs(centerY - imageHeight / 2)) * 2;

    // 3. Perspective score (30% weight)
    const diag1 = distance(corners.topLeft.center, corners.bottomRight.center);
    const diag2 = distance(corners.topRight.center, corners.bottomLeft.center);
    const perspectiveScore = 100 - Math.abs(diag1 - diag2) * 5;

    return (sizeScore * 0.3 + positionScore * 0.4 + perspectiveScore * 0.3);
  };

  // Cor baseada na qualidade do alinhamento
  const getQualityColor = (quality) => {
    if (quality > 80) return "#10B981"; // green
    if (quality > 60) return "#F59E0B"; // yellow
    return "#EF4444"; // red
  };

  const getAlignmentTips = (quality) => {
    if (quality < 30) return "Mova a câmera mais perto da prova";
    if (quality < 50) return "Centralize a prova no quadro";
    if (quality < 70) return "Ajuste o ângulo para ficar paralelo";
    return "Pequenos ajustes para melhorar";
  };
  // Renderiza o ícone de status
  const renderStatusIcon = () => {
    if (isProcessing) {
      return (
        <View style={styles.iconContainer}>
          <MaterialIcons name="hourglass-empty" size={24} color="#F59E0B" />
        </View>
      );
    }

    if (alignment.isAligned) {
      return (
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: iconScale }] }]}>
          <MaterialIcons name="check-circle" size={28} color="#10B981" />
        </Animated.View>
      );
    }

    return (
      <View style={styles.iconContainer}>
        <MaterialIcons name="error-outline" size={28} color="#EF4444" />
      </View>
    );
  };

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Grade de referência */}
      <View style={[
        styles.gridContainer,
        { borderColor: getQualityColor(alignment.quality) }
      ]}>
        {/* Linhas horizontais */}
        {[...Array(11)].map((_, i) => (
          <View
            key={`h-line-${i}`}
            style={[
              styles.gridLine,
              { top: `${(i / 10) * 100}%`, borderColor: getQualityColor() }
            ]}
          />
        ))}

        {[...Array(6)].map((_, i) => (
          <View
            key={`v-line-${i}`}
            style={[
              styles.gridLineVertical,
              { left: `${(i / 5) * 100}%`, borderColor: getQualityColor() }
            ]}
          />
        ))}
      </View>

      {/* Feedback de alinhamento */}

      <View style={styles.feedbackTextContainer}>
        <Text style={styles.feedbackText}>
          {alignment.message}
        </Text>
        {!alignment.isAligned && (
          <Text style={styles.helpText}>
            {getAlignmentTips(alignment.quality)}
          </Text>
        )}

        {/* Quality meter with percentage */}
        <View style={styles.qualityMeterContainer}>
          <Text style={styles.qualityText}>
            Qualidade: {Math.round(alignment.quality)}%
          </Text>
          <View style={styles.qualityMeter}>
            <View style={[
              styles.qualityBar,
              {
                width: `${alignment.quality}%`,
                backgroundColor: getQualityColor(alignment.quality)
              }
            ]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  gridContainer: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#3B82F6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)'
  },
  gridLine: {
    position: 'absolute',
    width: '100%',
    borderTopWidth: 1,
    borderStyle: 'dashed'
  },
  gridLineVertical: {
    position: 'absolute',
    height: '100%',
    borderLeftWidth: 1,
    borderStyle: 'dashed'
  },
  feedbackContainer: {
    position: 'absolute',
    bottom: 130,
    left: '10%',
    right: '10%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  qualityMeter: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden'
  },
  qualityBar: {
    height: '100%'
  },
  feedbackTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  helpText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  qualityMeterContainer: {
    marginTop: 8,
  },
  statusIndicator: {
    padding: 8,
  },
});

export default GridDetectionOverlay;