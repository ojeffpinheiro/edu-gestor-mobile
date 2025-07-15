import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, BarChart3, Settings } from 'lucide-react-native';
import styles from './NavigationStyles';

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

export default Navigation;