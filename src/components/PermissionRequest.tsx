import { CameraIcon } from "lucide-react-native";
import { useTheme } from "../context/ThemeContext";
import Card from "./common/Card";

interface PermissionRequestProps {
  permissionType: 'camera' | 'location' | 'microphone';
  onRequestPermission: () => void;
  onBack: () => void;
  isError?: boolean;
}

const PermissionRequest = ({ permissionType, onRequestPermission, onBack, isError = false }: PermissionRequestProps) => {
  const { colors } = useTheme();
  
  const config = {
    camera: {
      icon: <CameraIcon size={28} color={isError ? colors.error : colors.primary} />,
      title: isError ? 'Permissão Necessária' : 'Solicitando permissão...',
      description: isError 
        ? 'É necessário permitir o acesso à câmera para usar este recurso' 
        : 'Aguardando permissão da câmera',
      buttonText: 'Permitir Acesso à Câmera'
    },
    // Adicionar outros tipos conforme necessário
  }[permissionType];

  return (
    <Card variant='base'>
      {/* Implementação similar ao PermissionRequestCard existente, mas usando config */}
    </Card>
  );
};