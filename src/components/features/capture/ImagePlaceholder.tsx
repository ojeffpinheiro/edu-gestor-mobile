import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { ColorScheme } from '../../../styles/colors';

const ImagePlaceholder = () => {
  const { colors } = useTheme();
  const styles = createImagePlaceholder(colors);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Nenhuma imagem selecionada
      </Text>
    </View>
  );
};

const createImagePlaceholder = (colors: ColorScheme) => {
   return StyleSheet.create({
    container: {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 16,
      backgroundColor: colors.component.card,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border.medium,
    },
    text: {
      color: colors.text.primary
    }
  })
}

export default ImagePlaceholder;