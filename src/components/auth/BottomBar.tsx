import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

interface BottomBarProps {
  activeMode: 'qr' | 'barcode' | 'manual' | null;
  setActiveMode: (mode: 'manual') => void;
  toggleTorch: () => void;
  torchOn: boolean;
  startScanning: () => void;
  stopScanning: () => void;
  isScanning: boolean;
  setManualInput: (text: string) => void;
  setShowError: (show: boolean) => void;
}

const BottomBar: React.FC<BottomBarProps> = ({
  activeMode,
  setActiveMode,
  toggleTorch,
  torchOn,
  startScanning,
  stopScanning,
  isScanning,
  setManualInput,
  setShowError,
}) => {
  const { colors } = useTheme();

  if (!activeMode) return null;

  return (
    <View style={[styles.bottomBar, { backgroundColor: colors.background.secondary }]}>
      {activeMode === 'qr' && (
        <>
          <TouchableOpacity
            style={[styles.bottomBarButton, { backgroundColor: colors.component.card }]}
            onPress={toggleTorch}
          >
            <Ionicons name="flashlight" size={24} color={torchOn ? colors.feedback.warning : colors.icons.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomBarButton, { backgroundColor: colors.component.card }]}
            onPress={() => Alert.alert('Switch Camera', 'Funcionalidade será implementada')}
          >
            <MaterialCommunityIcons name="camera-switch" size={24} color={colors.icons.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomBarButton, { backgroundColor: colors.component.card }]}
            onPress={() => Alert.alert('Smile Mode', 'Funcionalidade será implementada')}
          >
            <FontAwesome name="smile-o" size={24} color={colors.icons.primary} />
          </TouchableOpacity>
        </>
      )}

      {activeMode === 'barcode' && (
        <>
          <TouchableOpacity
            style={[styles.bottomBarButton, { backgroundColor: colors.component.card }]}
            onPress={() => setActiveMode('manual')}
          >
            <MaterialCommunityIcons name="keyboard-outline" size={24} color={colors.icons.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomBarButton, { backgroundColor: colors.component.card }]}
            onPress={startScanning}
          >
            <MaterialCommunityIcons name="barcode-scan" size={24} color={isScanning ? colors.feedback.warning : colors.icons.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomBarButton, { backgroundColor: colors.component.card }]}
            onPress={stopScanning}
          >
            <Ionicons name="refresh" size={24} color={colors.icons.primary} />
          </TouchableOpacity>
        </>
      )}

      {activeMode === 'manual' && (
        <>
          <TouchableOpacity
            style={[styles.bottomBarButton, { backgroundColor: colors.component.card }]}
            onPress={() => Alert.alert('Scan', 'Funcionalidade será implementada')}
          >
            <MaterialCommunityIcons name="line-scan" size={24} color={colors.icons.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomBarButton, { backgroundColor: colors.component.card }]}
            onPress={() => {
              setManualInput('');
              setShowError(false);
            }}
          >
            <MaterialCommunityIcons name="backspace-outline" size={24} color={colors.icons.primary} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 12,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomBarButton: {
    borderRadius: 999,
    padding: 12,
  },
});

export default BottomBar;