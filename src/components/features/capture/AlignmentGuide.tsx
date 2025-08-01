import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ReferencePoint } from '../../../utils/coordinateUtils';

interface AlignmentGuideProps {
  referencePoints: ReferencePoint[];
  isLandscape: boolean;
}

const AlignmentGuide: React.FC<AlignmentGuideProps> = ({ referencePoints, isLandscape }) => {
  return (
    <View style={[styles.card, isLandscape ? styles.landscapeCard : styles.portraitCard]}>
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          Posicione o gabarito dentro da área destacada
        </Text>
        <Text style={styles.subInstructionText}>
          Certifique-se que todos os pontos de referência estão visíveis
        </Text>
      </View>
      {referencePoints.map((point) => (
        <View
          key={point.id}
          style={[
            styles.alignmentPoint,
            {
              left: `${point.position.x * 100}%`,
              top: `${point.position.y * 100}%`,
            }
          ]}
        />
      ))}
      <View style={styles.centerPoint} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(0, 150, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  portraitCard: {
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '20%',
  },
  landscapeCard: {
    top: '5%',
    left: '15%',
    right: '15%',
    bottom: '15%',
  },
  instructionContainer: {
    position: 'absolute',
    top: -50,
    width: '100%',
    alignItems: 'center',
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subInstructionText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  alignmentPoint: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 150, 255, 0.8)',
    borderWidth: 3,
    borderColor: 'white',
  },
  centerPoint: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(0, 150, 255, 0.8)',
  },
});

export default AlignmentGuide;