import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, Typography } from '../../styles/designTokens';

// Interface para as props do ícone
interface IconProps {
  color?: string;
  size?: number;
}

interface Tab {
  id: string;
  label: string;
  icon: React.ReactElement<IconProps>; // Especificamos que o ícone deve aceitar color e size
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabPress: (id: string) => void;
  containerStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  activeTabStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabPress,
  containerStyle,
  tabStyle,
  activeTabStyle,
  labelStyle,
}) => {
  const { colors } = useTheme();

  const defaultActiveStyle: ViewStyle = {
    borderTopWidth: 2,
    borderTopColor: colors.primary.main,
  };

  const renderIcon = (icon: React.ReactElement<IconProps>, isActive: boolean) => {
    return React.cloneElement(icon, {
      color: isActive ? colors.primary.main : colors.text.secondary,
      size: icon.props.size || 24, // Tamanho padrão 24 se não especificado
    });
  };

  return (
    <View style={[
      styles.container, 
      { backgroundColor: colors.background.secondary },
      containerStyle
    ]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab, 
              tabStyle, 
              isActive && [defaultActiveStyle, activeTabStyle]
            ]}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.7}
          >
            {renderIcon(tab.icon, isActive)}
            <Text style={[
              styles.label, 
              { 
                color: isActive ? colors.primary.main : colors.text.secondary 
              },
              labelStyle
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginTop: Spacing.xxs,
  },
});

export default TabNavigation;