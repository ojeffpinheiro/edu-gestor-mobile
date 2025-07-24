import { View, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { createStatsCardStyles } from './StatsCardStyles';

const StatsCard = ({ title, value, icon: IconComponent, color }) => {
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
}

export default StatsCard;