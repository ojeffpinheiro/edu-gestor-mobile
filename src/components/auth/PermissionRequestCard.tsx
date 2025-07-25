import React from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';
import { Camera, X } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import Card from '../common/Card';
import Button from '../common/Button';
import StatusIcon from '../StatusIcon';
import { createPermissionRequestCardStyles } from './styles';

interface PermissionRequestCardProps {
  onRequestPermission: () => Promise<void>;
  onBack: () => void;
  isError?: boolean;
}

const PermissionRequestCard = ({ 
  onRequestPermission, 
  onBack, 
  isError = false 
}: PermissionRequestCardProps) => {
  const { colors } = useTheme();
  const styles = createPermissionRequestCardStyles(colors);

  const handleOpenSettings = async () => {
    await Linking.openSettings();
  };

  return (
    <Card style={styles.permissionCard}>
      <View style={styles.contentContainer}>
        <StatusIcon
          icon={isError ? X : Camera}
          variant={isError ? 'error' : 'info'}
          size="lg"
        />

        <Text style={styles.title}>
          {isError ? 'Permissão Necessária' : 'Solicitando Permissão'}
        </Text>

        <Text style={styles.message}>
          {isError
            ? 'Para usar o scanner, é necessário permitir o acesso à câmera nas configurações do dispositivo.'
            : 'Estamos solicitando permissão para acessar a câmera do seu dispositivo.'}
        </Text>

        <View style={styles.buttonsContainer}>
          <Button
            title={isError ? 'Abrir Configurações' : 'Permitir Acesso'}
            onPress={isError ? handleOpenSettings : onRequestPermission}
            variant={isError ? 'primary' : 'primary'}
            icon={isError ? null : <Camera size={20} />}
            style={styles.mainButton}
          />

          <Button
            title="Voltar"
            onPress={onBack}
            variant="secondary"
          />
        </View>
      </View>
    </Card>
  );
};

export default PermissionRequestCard;