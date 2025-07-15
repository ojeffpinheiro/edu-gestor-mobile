import { StyleSheet } from "react-native";

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

export default styles;