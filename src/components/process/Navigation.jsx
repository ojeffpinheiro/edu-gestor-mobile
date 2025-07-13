import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, BarChart3, Settings } from 'lucide-react-native';

const Navigation = ({ currentScreen, onNavigate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CorreçãoAuto</Text>
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={[styles.button, currentScreen === 'home' && styles.activeButton]}
          onPress={() => onNavigate('home')}
        >
          <Camera size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, currentScreen === 'results' && styles.activeButton]}
          onPress={() => onNavigate('results')}
        >
          <BarChart3 size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, currentScreen === 'settings' && styles.activeButton]}
          onPress={() => onNavigate('settings')}
        >
          <Settings size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2563eb',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  navButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    padding: 8,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#1d4ed8',
  },
});

export default Navigation;