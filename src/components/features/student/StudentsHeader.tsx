import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Text } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

import { useTheme } from '../../../context/ThemeContext';

import SearchBar from '../../common/SearchBar';

interface StudentsHeaderProps {
  searchTerm: string;
  onBack: () => void;
  onSearch: (text: string) => void;
}

// Definindo tipos para os estilos
interface StudentsHeaderStyles {
  container: ViewStyle;
  headerRow: ViewStyle;
  backButton: ViewStyle;
  title: TextStyle;
}

const StudentsHeader = ({ searchTerm, onBack, onSearch }: StudentsHeaderProps) => {
  const { colors } = useTheme();
  const styles = createStudentsHeaderStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Seleção de Alunos</Text>
      </View>

      <SearchBar
        value={searchTerm}
        onChangeText={onSearch}
        placeholder="Buscar alunos..."
      />
    </View>
  );
};

const createStudentsHeaderStyles = (colors: any): StudentsHeaderStyles =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      backgroundColor: colors.background.primary,
      zIndex: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.light,
    },
    headerRow: {
      flexDirection: 'row' as const, // Tipo específico para flexDirection
      alignItems: 'center' as const, // Tipo específico para alignItems
      marginBottom: 16,
    },
    backButton: {
      padding: 8,
      marginRight: 8,
    },
    title: {
      fontSize: 22,
      fontWeight: '600' as const, // Tipo específico para fontWeight
      color: colors.text.primary,
      marginLeft: 8,
    },
  });

export default React.memo(StudentsHeader);