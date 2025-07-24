import { View, Text, TouchableOpacity } from 'react-native';
import { User } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import createHeaderstyles from './AppHeaderStyles';

const AppHeader = () => {
  const { colors } = useTheme();
  const styles = createHeaderstyles(colors);

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Correção de Provas</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerButton}>
          <User size={24} color={colors.gray[500]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppHeader;