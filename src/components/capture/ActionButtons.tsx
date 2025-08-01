import React from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Button from '../common/Button';
import { useAnimation } from '../../hooks/useAnimation';

const ActionButtons = ({ 
  onCameraPress,
  onAnalysis,
  onGalleryPress, 
  onDetectorPress,
  disabled,
  colors,
  isLoading 
}) => {
  const { pressAnimation } = useAnimation();
  
  const handlePress = (action: () => void) => {
    pressAnimation({
      onPress: action,
      scaleTo: 0.95,
      hapticType: 'light'
    });
  };

  const buttonContainerStyle: ViewStyle = {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
    gap: 10
  };

  const buttonStyle = {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 8,
  };

  return (
    <View style={buttonContainerStyle}>
      <Button
        title={isLoading ? 'Processando...' : 'Abrir Câmera'}
        variant='ghost'
        style={{ 
          backgroundColor: isLoading 
            ? colors.gray[400] 
            : colors.component.primaryButton,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        textStyle={{ color: colors.text.card }}
        onPress={() => handlePress(onCameraPress)}
        icon={
          isLoading 
          ? (<ActivityIndicator size="small" color={colors.text.card} />) 
          : (<MaterialIcons name="photo-camera" size={20} color="white" />)
        }
        accessibility={{
          label: "Abrir câmera",
          hint: "Abre a câmera para tirar uma nova foto"
        }}
        disabled={disabled || isLoading}
      />

      <Button
        title={isLoading ? 'Processando...' : 'Abrir Galeria'}
        variant='ghost'
        onPress={() => handlePress(onGalleryPress)}
        style={[{ 
          backgroundColor: isLoading 
            ? colors.gray[400] 
            : colors.component.secondaryButton,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }]}
        icon={
          isLoading 
          ? (<ActivityIndicator size="small" color={colors.text.card} />) 
          : (<MaterialIcons name="photo-library" size={20} color="white" />)
        }
        accessibility={{
          label: "Abrir galeria",
          hint: "Abre a galeria para selecionar uma imagem existente"
        }}
        disabled={disabled || isLoading}
      />

      <Button
        title={isLoading ? 'Processando...' : 'Detector de Azul'}
        variant='ghost'
        onPress={() => handlePress(onDetectorPress)}
        style={[buttonStyle, { 
          backgroundColor: isLoading 
            ? colors.gray[400] 
            : colors.component.card,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }]}
        icon={
          isLoading 
          ? (<ActivityIndicator size="small" color={colors.text.card} />) 
          : (<FontAwesome name="tint" size={20} color="white" />)
        }
        accessibility={{
          label: "Abrir detector de cor azul",
          hint: "Abre a ferramenta de detecção de cor azul"
        }}
        disabled={disabled || isLoading}
      />

      <Button 
        title={isLoading ? 'Processando...' : 'Analise'}
        variant='ghost'
        onPress={() => handlePress(onAnalysis)}
        style={[buttonStyle, { 
          backgroundColor: isLoading 
            ? colors.gray[400] 
            : colors.component.card,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }]}
        icon={
          isLoading 
          ? (<ActivityIndicator size="small" color={colors.text.card} />) 
          : (<FontAwesome name="tint" size={20} color="white" />)
        }
        accessibility={{
          label: "Abrir detector de cor azul",
          hint: "Abre a ferramenta de detecção de cor azul"
        }}
        disabled={disabled || isLoading}  />
    </View>
  );
};

export default ActionButtons;