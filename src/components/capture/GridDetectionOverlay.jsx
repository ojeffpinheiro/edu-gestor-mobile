import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Text, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { detectAndExtractGrid, validateGridDetection } from '../../utils/gridDetection';
import styles from './styles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const GRID_CONFIG = {
  questionCount: 10,
  optionsPerQuestion: 5,
  gridPosition: {
    left: 0.15,
    top: 0.2,
    width: 0.7,
    height: 0.5
  }
};

const GridDetectionOverlay = ({ onAlignmentStatusChange, imageUri }) => {
  const [alignment, setAlignment] = useState({
    isAligned: false,
    quality: 0,
    message: "Posicione a prova corretamente",
    corners: null
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
        setIsProcessing(true);
        const { success, gridDetection } = await detectAndExtractGrid(imageUri);
        
        if (!isMounted) return;

        if (!success || !gridDetection?.success) {
          setAlignment({
            isAligned: false,
            quality: 0,
            message: "Não foi possível detectar a grade",
            corners: null
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
            : validation.reason || "Ajuste a posição",
          corners: gridDetection.corners
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
            message: "Erro no processamento",
            corners: null
          });
          onAlignmentStatusChange(false);
        }
      } finally {
        if (isMounted) {
          setIsProcessing(false);
        }
      }
    };

    processFrame();
    return () => { isMounted = false; };
  }, [imageUri]);

  // Calcula a qualidade baseada nos resultados da detecção
  const calculateQuality = (detection) => {
    if (!detection?.success || !detection.corners) return 0;

    const { corners } = detection;
    const markers = Object.values(corners);

    // 1. Consistência de tamanho (30% peso)
    const avgSize = markers.reduce((sum, m) => sum + m.width + m.height, 0) / (markers.length * 2);
    const sizeVariance = markers.reduce((sum, m) => {
      return sum + Math.pow(m.width - avgSize, 2) + Math.pow(m.height - avgSize, 2);
    }, 0) / markers.length;
    const sizeScore = Math.max(0, 100 - sizeVariance * 10);

    // 2. Simetria de posição (40% peso)
    const centerX = (corners.topLeft.center.x + corners.topRight.center.x +
      corners.bottomLeft.center.x + corners.bottomRight.center.x) / 4;
    const centerY = (corners.topLeft.center.y + corners.topRight.center.y +
      corners.bottomLeft.center.y + corners.bottomRight.center.y) / 4;
    const positionScore = 100 - (Math.abs(centerX - screenWidth / 2) + Math.abs(centerY - screenHeight / 2)) * 2;

    // 3. Proporção da perspectiva (30% peso)
    const diag1 = Math.sqrt(
      Math.pow(corners.bottomRight.center.x - corners.topLeft.center.x, 2) +
      Math.pow(corners.bottomRight.center.y - corners.topLeft.center.y, 2)
    );
    const diag2 = Math.sqrt(
      Math.pow(corners.topRight.center.x - corners.bottomLeft.center.x, 2) +
      Math.pow(corners.topRight.center.y - corners.bottomLeft.center.y, 2)
    );
    const perspectiveScore = 100 - Math.abs(diag1 - diag2) * 5;

    return (sizeScore * 0.3 + positionScore * 0.4 + perspectiveScore * 0.3);
  };

  // Cor baseada na qualidade do alinhamento
  const getQualityColor = (quality) => {
    if (quality > 80) return "#10B981"; // verde
    if (quality > 60) return "#F59E0B"; // amarelo
    return "#EF4444"; // vermelho
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

  // Renderiza os marcadores de canto detectados
  const renderDetectedCorners = () => {
    if (!alignment.corners) return null;

    return (
      <>
        {Object.entries(alignment.corners).map(([position, corner]) => (
          <View
            key={position}
            style={[
              styles.cornerMarker,
              {
                left: corner.center.x - 50,
                top: corner.center.y + 20,
                backgroundColor: getQualityColor(alignment.quality)
              }
            ]}
          />
        ))}
      </>
    );
  };

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Grade de referência */}
      <View style={[
        styles.gridContainer,
        { 
          borderColor: getQualityColor(alignment.quality),
          left: screenWidth * GRID_CONFIG.gridPosition.left,
          top: screenHeight * GRID_CONFIG.gridPosition.top,
          width: screenWidth * GRID_CONFIG.gridPosition.width,
          height: screenHeight * GRID_CONFIG.gridPosition.height
        }
      ]}>
        {/* Linhas horizontais */}
        {[...Array(GRID_CONFIG.questionCount + 1)].map((_, i) => (
          <View
            key={`h-line-${i}`}
            style={[
              styles.gridLine,
              { 
                top: `${(i / GRID_CONFIG.questionCount) * 100}%`,
                borderColor: getQualityColor(alignment.quality)
              }
            ]}
          />
        ))}

        {/* Linhas verticais */}
        {[...Array(GRID_CONFIG.optionsPerQuestion + 1)].map((_, i) => (
          <View
            key={`v-line-${i}`}
            style={[
              styles.gridLineVertical,
              { 
                left: `${(i / GRID_CONFIG.optionsPerQuestion) * 100}%`,
                borderColor: getQualityColor(alignment.quality)
              }
            ]}
          />
        ))}

        {/* Marcadores de canto detectados */}
        {renderDetectedCorners()}
      </View>

      {/* Feedback de alinhamento */}
      <View style={[
        styles.feedbackContainer,
        { backgroundColor: `rgba(0, 0, 0, ${alignment.isAligned ? 0.7 : 0.8})` }
      ]}>
        {renderStatusIcon()}
        
        <View style={styles.feedbackTextContainer}>
          <Text style={styles.feedbackText}>
            {alignment.message}
          </Text>
          {!alignment.isAligned && (
            <Text style={styles.helpText}>
              {getAlignmentTips(alignment.quality)}
            </Text>
          )}

          {/* Medidor de qualidade com porcentagem */}
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
    </View>
  );
};


export default GridDetectionOverlay;