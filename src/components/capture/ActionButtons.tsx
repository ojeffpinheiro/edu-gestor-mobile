import React from 'react';
import { View, ViewStyle } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Button from '../common/Button';

const ActionButtons = ({ 
  onCameraPress, 
  onAnalysis,
  onGalleryPress, 
  onDetectorPress,
  disabled,
  colors
}) => {
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
        title="Abrir Câmera"
        variant='ghost'
        style={{ backgroundColor: colors.component.primaryButton }}
        textStyle={{ color: colors.text.card }}
        onPress={onCameraPress}
        icon={<MaterialIcons name="photo-camera" size={20} color="white" />}
        accessibility={{
          label: "Abrir câmera",
          hint: "Abre a câmera para tirar uma nova foto"
        }}
        disabled={disabled}
      />

      <Button
        title="Abrir Galeria"
        variant='ghost'
        onPress={onGalleryPress}
        style={{ backgroundColor: colors.component.secondaryButton }}
        icon={<MaterialIcons name="photo-library" size={20} color="white" />}
        accessibility={{
          label: "Abrir galeria",
          hint: "Abre a galeria para selecionar uma imagem existente"
        }}
        disabled={disabled}
      />

      <Button
        title="Detector de Azul"
        onPress={onDetectorPress}
        style={[buttonStyle, { backgroundColor: colors.component.card }]}
        icon={<FontAwesome name="tint" size={20} color="white" />}
        accessibility={{
          label: "Abrir detector de cor azul",
          hint: "Abre a ferramenta de detecção de cor azul"
        }}
        disabled={disabled}
      />

      <Button 
        title='Analise'
        onPress={onAnalysis}
        style={[buttonStyle, { backgroundColor: colors.component.card }]}  />
    </View>
  );
};

export default ActionButtons;