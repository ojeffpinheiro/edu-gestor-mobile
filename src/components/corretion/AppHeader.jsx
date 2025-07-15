import { View, Text, TouchableOpacity } from 'react-native';
import { User } from 'lucide-react-native';
import styles from './AppHeaderStyles';

const AppHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Correção de Provas</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerButton}>
          <User size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppHeader;