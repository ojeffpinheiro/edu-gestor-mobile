import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { processAnswerSheet } from '../../utils/answerSheetProcessor';

const MarkerDetector = ({ imageUri, onDetection }) => {
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const analyzeSheet = async () => {
      try {
        const results = await processAnswerSheet(imageUri);
        onDetection(results);
      } catch (error) {
        onDetection({
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
        <ActivityIndicator size="large" color="#0000ff" />
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
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});

export default MarkerDetector;