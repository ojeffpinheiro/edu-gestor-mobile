import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CheckCircle, BarChart3, Settings } from 'lucide-react-native';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => (
  <View style={styles.bottomNav}>
    <TouchableOpacity 
      style={[styles.navItem, activeTab === 'correction' && styles.navItemActive]}
      onPress={() => setActiveTab('correction')}
    >
      <CheckCircle size={24} color={activeTab === 'correction' ? '#3B82F6' : '#6B7280'} />
      <Text style={[styles.navText, activeTab === 'correction' && styles.navTextActive]}>
        Correção
      </Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
      style={[styles.navItem, activeTab === 'reports' && styles.navItemActive]}
      onPress={() => setActiveTab('reports')}
    >
      <BarChart3 size={24} color={activeTab === 'reports' ? '#3B82F6' : '#6B7280'} />
      <Text style={[styles.navText, activeTab === 'reports' && styles.navTextActive]}>
        Relatórios
      </Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
      style={[styles.navItem, activeTab === 'settings' && styles.navItemActive]}
      onPress={() => setActiveTab('settings')}
    >
      <Settings size={24} color={activeTab === 'settings' ? '#3B82F6' : '#6B7280'} />
      <Text style={[styles.navText, activeTab === 'settings' && styles.navTextActive]}>
        Configurações
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    backgroundColor: '#EBF4FF',
  },
  navText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  navTextActive: {
    color: '#3B82F6',
    fontWeight: '600',
  },
});

export default TabNavigation;