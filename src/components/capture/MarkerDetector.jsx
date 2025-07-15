import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { processAnswerSheet } from '../../utils/answerSheetProcessor';

const MarkerDetector = ({ imageUri, onDetectionComplete }) => {
  const [processing, setProcessing] = useState(true);
  const [status, setStatus] = useState("Analisando imagem...");

  useEffect(() => {
    const processImage = async () => {
      try {
        setStatus("Detectando marcadores...");
        const detector = new GridDetector();
        await detector.loadImage(imageUri);
        setProgress(20);
        
        setStatus("Identificando grade...");
        const detection = await detector.detectGrid(imageUri);
        setProgress(60);
        
        if (detection.success) {
          setStatus("Processando respostas...");
          const results = await processAnswerSheet(imageUri);
          setProgress(100);
          onDetectionComplete(results);
        } else {
          onDetectionComplete({
            success: false,
            error: detection.error || "Falha na detecção"
          });
        }
      } catch (error) {
        onDetectionComplete({
          success: false,
          error: error.message
        });
      }
    };
    
    processImage();
  }, [imageUri]);

  return (
    <View style={styles.container}>
      {processing ? (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.processingText}>{status}</Text>
        </View>
      ) : (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6'
  },
  processingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  processingText: {
    marginTop: 10,
    color: '#64748b'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});

export default MarkerDetector;