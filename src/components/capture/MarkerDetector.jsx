import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { processAnswerSheet } from '../../utils/answerSheetProcessor';

const MarkerDetector = ({ imageUri, onDetectionComplete }) => {
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const analyzeSheet = async () => {
      try {
        const results = await processAnswerSheet(imageUri);
        onDetectionComplete(results);
      } catch (error) {
        onDetectionComplete({
          success: false,
          error: error.message
        });
      } finally {
        setProcessing(false);
      }
    };

    analyzeSheet();
  }, [imageUri]);

  return (
    <View style={styles.container}>
      {processing ? (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.processingText}>Processando imagem...</Text>
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