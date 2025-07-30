import React from 'react';
import { View, Text, Linking } from 'react-native';
import { Camera, X, Settings } from 'lucide-react-native';

import { useTheme } from '../../../context/ThemeContext';

import Button from '../../common/Button';

import StatusIcon from '../../StatusIcon';

import { createPermissionRequestCardStyles } from '../../auth/styles';

interface PermissionRequestCardProps {
  onRequestPermission: () => Promise<void>;
  onBack: () => void;
  isError?: boolean;
}

const PermissionRequestCard: React.FC<PermissionRequestCardProps> = ({
  onRequestPermission,
  onBack,
  isError = false
}) => {
  const { colors } = useTheme();
  const styles = createPermissionRequestCardStyles(colors);

  const handleOpenSettings = async () => {
    await Linking.openSettings();
  };

  return (
    <View style={[
      styles.permissionCard,
      { backgroundColor: colors.background.primary }
    ]}>
      <View style={styles.contentContainer}>
        <StatusIcon
          icon={isError ? X : Camera}
          variant={isError ? 'error' : 'info'}
          size="lg"
        />

        <Text style={[styles.title, { color: colors.text.primary }]}>
          {isError ? 'Permissão Negada' : 'Permissão Necessária'}
        </Text>

        <Text style={[styles.message, { color: colors.text.secondary }]}>
          {isError
            ? 'Para usar o scanner, precisamos do acesso à câmera. Por favor, habilite a permissão nas configurações do dispositivo.'
            : 'Precisamos da sua permissão para acessar a câmera do dispositivo para escanear códigos.'}
        </Text>

        <View style={styles.buttonsContainer}>
          <Button
            title={isError ? 'Abrir Configurações' : 'Permitir Acesso'}
            onPress={isError ? handleOpenSettings : onRequestPermission}
            variant="primary"
            icon={isError ? <Settings size={20} /> : <Camera size={20} />}
            style={styles.mainButton}
          />

          <Button
            title="Voltar"
            onPress={onBack}
            variant="secondary"
          />
        </View>
      </View>
    </View>
  );
};

export default PermissionRequestCard;