import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { CheckCircle, BarChart3, Settings } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import createTabNavigationStyles from './TabNavigationStyles';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const { colors } = useTheme();
  const styles = createTabNavigationStyles(colors);

  return(
  <View style={styles.bottomNav}>
    <TouchableOpacity 
      style={[styles.navItem, activeTab === 'correction' && styles.navItemActive]}
      onPress={() => setActiveTab('correction')}
    >
      <CheckCircle size={24} color={activeTab === 'correction' ? colors.primary : colors.gray[500]} />
      <Text style={[styles.navText, activeTab === 'correction' && styles.navTextActive]}>
        Correção
      </Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
      style={[styles.navItem, activeTab === 'reports' && styles.navItemActive]}
      onPress={() => setActiveTab('reports')}
    >
      <BarChart3 size={24} color={activeTab === 'reports' ? colors.primary : colors.gray[500]} />
      <Text style={[styles.navText, activeTab === 'reports' && styles.navTextActive]}>
        Relatórios
      </Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
      style={[styles.navItem, activeTab === 'settings' && styles.navItemActive]}
      onPress={() => setActiveTab('settings')}
    >
      <Settings size={24} color={activeTab === 'settings' ? colors.primary : colors.gray[500]} />
      <Text style={[styles.navText, activeTab === 'settings' && styles.navTextActive]}>
        Configurações
      </Text>
    </TouchableOpacity>
  </View>
);
}

export default TabNavigation;