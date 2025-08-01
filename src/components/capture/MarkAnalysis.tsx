import React from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity, Image } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { createMarkAnalysisStyles } from './CameraStyles';
import { useMarkDetection } from '../../hooks/useMarkDetection';
import { getFixedUri } from '../../utils/imageUtils';

interface MarkAnalysisProps {
  image: { uri: string } | null;
  gridSize?: { rows: number; cols: number };
  onBack?: () => void;
}

const MarkAnalysis: React.FC<MarkAnalysisProps> = ({
  image,
  gridSize = { rows: 5, cols: 5 },
  onBack
}) => {
  console.log(`URI DA IMAGEM: ${image.uri}`);
  const { colors } = useTheme();
  const styles = createMarkAnalysisStyles(colors);

  const { uri } = image

  const {
    marks,
    isProcessing,
    error,
    analyzeImage // Função para reanalisar manualmente
  } = useMarkDetection({ imageUri: uri, gridSize });

  const handleRetry = () => {
    Alert.alert(
      'Reanalisar Imagem',
      'Deseja processar a imagem novamente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Reanalisar', onPress: analyzeImage }
      ]
    );
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={analyzeImage}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!image.uri) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Nenhuma imagem selecionada</Text>
      {onBack && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

  return (
    <View style={styles.container}>
      {isProcessing && (
        <View style={styles.processingOverlay}>
          <Text style={styles.processingText}>Processando imagem...</Text>
        </View>
      )}

      <Image
        source={{ uri: getFixedUri(uri) }}
        style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />

      {/* Overlay com grade e marcações */}
      <View style={[StyleSheet.absoluteFill, styles.overlay]}>
        {/* Renderizar grade */}
        {Array.from({ length: gridSize.rows }).map((_, row) => (
          Array.from({ length: gridSize.cols }).map((_, col) => {
            const cellMark = marks.find(m => m.cell.row === row && m.cell.col === col);
            return (
              <View
                key={`${row}-${col}`}
                style={[
                  styles.cell,
                  cellMark && styles.markedCell,
                  {
                    left: `${(col / gridSize.cols) * 100}%`,
                    top: `${(row / gridSize.rows) * 100}%`,
                    width: `${100 / gridSize.cols}%`,
                    height: `${100 / gridSize.rows}%`,
                  }
                ]}
              >
                {cellMark && (
                  <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>
                      Confiança: {Math.round(cellMark.confidence * 100)}%
                    </Text>
                  </View>
                )}
              </View>
            );
          })
        ))}
      </View>

      {/* Botão de teste para reanálise */}
      <TouchableOpacity
        style={styles.testButton}
        onPress={handleRetry}
        disabled={isProcessing}
      >
        <Text style={styles.testButtonText}>
          {isProcessing ? 'Processando...' : 'Testar Reanálise'}
        </Text>
      </TouchableOpacity>

      {/* Botão de voltar (se necessário) */}
      {onBack && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MarkAnalysis;