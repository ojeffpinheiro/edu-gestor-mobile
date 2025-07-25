import React from 'react';
import { View } from 'react-native';
import { CheckCircle, BarChart3, Settings } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import createTabNavigationStyles from './TabNavigationStyles';
import Button from '../common/Button';

const tabs = [
  {
    id: 'correction',
    icon: CheckCircle,
    label: 'Correção'
  },
  {
    id: 'reports',
    icon: BarChart3,
    label: 'Relatórios'
  },
  {
    id: 'settings',
    icon: Settings,
    label: 'Configurações'
  }
];

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const { colors } = useTheme();
  const styles = createTabNavigationStyles(colors);

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          onPress={() => setActiveTab(tab.id)}
          icon={
            <tab.icon
              size={24}
              color={activeTab === tab.id ? colors.textPrimary : colors.gray[500]}
            />
          }
          title={tab.label}
          textStyle={[
            styles.navText,
            activeTab === tab.id && styles.navTextActive
          ]}
          style={[
            styles.navItem,
            activeTab === tab.id && styles.navItemActive
          ]}
          iconPosition="top"
        />
      ))}
    </View>
  );
};

export default TabNavigation;