import React from 'react';
import { View, Text, Alert, Linking } from 'react-native';
import { CameraIcon, X } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { Spacing } from '../../styles/designTokens';
import Button from '../common/Button';
import Card from '../common/Card';

interface PermissionRequestCardProps {
  onRequestPermission: () => void;
  onBack: () => void;
  isError?: boolean;
}

const PermissionRequestCard = ({ onRequestPermission, onBack, isError = false }: PermissionRequestCardProps) => {
  const { colors } = useTheme();

  return (
    <Card variant='base' >
      <View style={{ alignItems: 'center', marginBottom: Spacing.lg }}>
        <Button  onPress={() => {}}
          variant='primary' style={[{ backgroundColor: isError ? colors.error + '15' : colors.primary + '15' }]} 
          icon={isError ? <X size={28} color={colors.error} /> : <CameraIcon size={28} color={colors.primary} />}/>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.textPrimary, marginTop: Spacing.md }}>
          {isError ? 'Permissão Necessária' : 'Solicitando permissão...'}
        </Text>
        <Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: Spacing.sm }}>
          {isError
            ? 'É necessário permitir o acesso à câmera para usar o scanner'
            : 'Aguardando permissão da câmera'}
        </Text>
      </View>

      <Button
        title="Permitir Acesso à Câmera"
        onPress={onRequestPermission}
        variant="primary"
        icon={<CameraIcon size={20} />}
        iconPosition="left"
      />

      <Button
        title="Voltar"
        onPress={onBack}
        variant="ghost"
      />
    </Card>
  );
};

export default PermissionRequestCard;