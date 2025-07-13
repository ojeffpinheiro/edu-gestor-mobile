import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from 'lucide-react-native';

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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
  },
});

export default AppHeader;