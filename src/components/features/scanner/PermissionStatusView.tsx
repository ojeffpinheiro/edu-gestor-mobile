import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import PermissionRequestCard from './PermissionRequestCard';

interface PermissionStatusViewProps {
  status: 'denied' | 'undetermined' | 'null' | 'false';
  onRequestPermission: () => void;
  onBack: () => void;
  openSettings?: () => void;
}

const PermissionStatusView: React.FC<PermissionStatusViewProps> = ({
  status,
  onRequestPermission,
  onBack,
  openSettings
}) => {
  const { colors } = useTheme();

  if (status === 'denied' || status === 'undetermined') {
    return (
      <PermissionRequestCard
        onRequestPermission={onRequestPermission}
        onBack={onBack}
        isError={status === 'denied'}
      />
    );
  }

  if (status === 'null') {
    return (
      <View style={[styles.permissionContainer, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.permissionText, { color: colors.text.primary }]}>
          Solicitando permissão para a câmera...
        </Text>
      </View>
    );
  }

  if (status === 'false') {
    return (
      <View style={[styles.permissionContainer, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.permissionText, { color: colors.text.primary }]}>
          Permissão para câmera negada
        </Text>
        <TouchableOpacity
          style={[styles.permissionButton, { backgroundColor: colors.component.primaryButton }]}
          onPress={openSettings}
        >
          <Text style={[styles.permissionButtonText, { color: colors.text.onPrimary }]}>
            Abrir Configurações
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  permissionButton: {
    padding: 15,
    borderRadius: 10,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PermissionStatusView;