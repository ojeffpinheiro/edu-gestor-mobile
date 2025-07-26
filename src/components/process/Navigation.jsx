import { View, Text } from 'react-native';
import { Camera, BarChart3, Settings } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import createNavigationStyles from './NavigationStyles';
import NavButton from './NavButton';

const Navigation = ({ currentScreen, onNavigate }) => {
  const { colors } = useTheme();
  const styles = createNavigationStyles(colors);
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading2}>CorreçãoAuto</Text>
      <View style={styles.navButtons}>
        <NavButton
          icon={<Camera size={20} color={currentScreen === 'home' ? colors.text.onPrimary : colors.text.secondary} />}
          active={currentScreen === 'home'}
          onPress={() => onNavigate('home')}
        />
        <NavButton
          icon={<BarChart3 size={20} color={currentScreen === 'results' ? colors.text.onPrimary : colors.text.secondary} />}
          active={currentScreen === 'results'}
          onPress={() => onNavigate('results')}
        />
        <NavButton
          icon={<Settings size={20} color={currentScreen === 'settings' ? colors.text.onPrimary : colors.text.secondary} />}
          active={currentScreen === 'settings'}
          onPress={() => onNavigate('settings')}
        />
      </View>
    </View>
  );
};

export default Navigation;