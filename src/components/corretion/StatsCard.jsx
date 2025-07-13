import { View, Text, StyleSheet } from 'react-native';

const StatsCard = ({ title, value, icon: IconComponent, color }) => (
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

const styles = StyleSheet.create({
  statsCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statsCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default StatsCard;