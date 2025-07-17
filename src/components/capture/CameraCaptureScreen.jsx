import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';
import { Flashlight, Scan } from 'lucide-react-native';
import { createMainStyles } from '../../styles/mainStyles';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, BorderRadius } from '../../styles/designTokens';

const CameraScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createMainStyles(colors);
  const [hasPermission, setHasPermission] = useState(null);
  const [torchOn, setTorchOn] = useState(false);
  const cameraRef = useRef(null);

  const toggleTorch = () => {
    if (cameraRef.current) {
      cameraRef.current.toggleTorch();
      setTorchOn(!torchOn);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
      >
        {/* Scanner overlay */}
        <View style={localStyles.overlay}>
          <View style={[localStyles.scanFrame, { borderColor: colors.primary }]}>
            {/* Scanner corners */}
            <View style={[localStyles.corner, localStyles.topLeft]} />
            <View style={[localStyles.corner, localStyles.topRight]} />
            <View style={[localStyles.corner, localStyles.bottomLeft]} />
            <View style={[localStyles.corner, localStyles.bottomRight]} />
          </View>
          
          <Text style={[localStyles.instructionText, { color: colors.card }]}>
            Posicione a folha de resposta dentro do quadro
          </Text>
        </View>

        {/* Bottom controls */}
        <View style={localStyles.controls}>
          <TouchableOpacity
            style={[localStyles.button, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('Processing')}
          >
            <Scan size={24} color={colors.card} />
            <Text style={[localStyles.buttonText, { color: colors.card }]}>Capturar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[localStyles.torchButton, { backgroundColor: colors.card }]}
            onPress={toggleTorch}
          >
            <Flashlight size={24} color={torchOn ? colors.warning : colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  scanFrame: {
    width: '80%',
    aspectRatio: 1,
    borderWidth: 2,
    position: 'relative'
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#ffffff',
    borderWidth: 2
  },
  topLeft: {
    top: -2,
    left: -2,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  topRight: {
    top: -2,
    right: -2,
    borderLeftWidth: 0,
    borderBottomWidth: 0
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderRightWidth: 0,
    borderTopWidth: 0
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  instructionText: {
    marginTop: Spacing.lg,
    fontSize: 16,
    fontWeight: 'bold'
  },
  controls: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.sm
  },
  buttonText: {
    marginLeft: Spacing.sm,
    fontSize: 16,
    fontWeight: 'bold'
  },
  torchButton: {
    padding: Spacing.md,
    borderRadius: BorderRadius.round
  }
});

export default CameraScreen;
