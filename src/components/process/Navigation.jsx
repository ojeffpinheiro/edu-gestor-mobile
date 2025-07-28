import { View, Text } from 'react-native';
import { Camera, BarChart3, Settings } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import NavButton from './NavButton';
import { createNavigationStyles } from './NavigationStyles';

const Navigation = ({ currentScreen, onNavigate }) => {
  const { colors } = useTheme();
  const styles = createNavigationStyles(colors);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Correção Auto</Text>
      <View style={styles.navButtons}>
        <NavButton
          icon={<Camera size={20} color={currentScreen === 'home' ? colors.text.onPrimary : colors.text.card} />}
          active={currentScreen === 'home'}
          onPress={() => onNavigate('home')}
        />
        <NavButton
          icon={<BarChart3 size={20} color={currentScreen === 'results' ? colors.text.onPrimary : colors.text.card} />}
          active={currentScreen === 'results'}
          onPress={() => onNavigate('results')}
        />
        <NavButton
          icon={<Settings size={20} color={currentScreen === 'settings' ? colors.text.onPrimary : colors.text.card} />}
          active={currentScreen === 'settings'}
          onPress={() => onNavigate('settings')}
        />
      </View>
    </View>
  );
};

export default Navigation;