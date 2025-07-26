import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { createStatsCardStyles } from './StatsCardStyles';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ size: number; color: string }>;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: IconComponent, 
  color 
}) => {
  const { colors } = useTheme();
  const styles = createStatsCardStyles(colors);

  return (
    <View style={[styles.statsCard, { borderLeftColor: color }]}>
      <View style={styles.statsCardContent}>
        <View>
          <Text style={styles.statsTitle}>{title}</Text>
          <Text style={[styles.statsValue, { color }]}>{value}</Text>
        </View>
        <IconComponent size={24} color={color} />
      </View>
    </View>
  );
};

export default StatsCard;