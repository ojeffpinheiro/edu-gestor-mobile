import React from 'react';
import { View, Text, TouchableOpacity, Alert, Linking } from 'react-native';
import { CameraIcon, X } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { ButtonStyles, CardStyles } from '../../styles/sharedComponents';
import { Spacing } from '../../styles/designTokens';

interface PermissionRequestCardProps {
  onRequestPermission: () => void;
  onBack: () => void;
  isError?: boolean;
}

const PermissionRequestCard = ({ onRequestPermission, onBack, isError = false }: PermissionRequestCardProps) => {
  const { colors } = useTheme();

  return (
    <View style={CardStyles.base}>
      <View style={{ alignItems: 'center', marginBottom: Spacing.lg }}>
        <View style={[ButtonStyles.primary, { backgroundColor: isError ? colors.error + '15' : colors.primary + '15' }]}>
          <View style={{ backgroundColor: isError ? colors.error + '25' : colors.primary + '25', padding: Spacing.md, borderRadius: 50 }}>
            {isError ? <X size={28} color={colors.error} /> : <CameraIcon size={28} color={colors.primary} />}
          </View>
        </View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.textPrimary, marginTop: Spacing.md }}>
          {isError ? 'Permissão Necessária' : 'Solicitando permissão...'}
        </Text>
        <Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: Spacing.sm }}>
          {isError 
            ? 'É necessário permitir o acesso à câmera para usar o scanner'
            : 'Aguardando permissão da câmera'}
        </Text>
      </View>

      <TouchableOpacity
        style={[ButtonStyles.primary, { backgroundColor: colors.primary }]}
        onPress={onRequestPermission}
      >
        <CameraIcon size={20} color={colors.card} style={{ marginRight: Spacing.xs }} />
        <Text style={ButtonStyles.text}>
          Permitir Acesso à Câmera
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[ButtonStyles.secondary, { marginTop: Spacing.md }]}
        onPress={onBack}
      >
        <Text style={[ButtonStyles.text, { color: colors.textSecondary }]}>
          Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PermissionRequestCard;