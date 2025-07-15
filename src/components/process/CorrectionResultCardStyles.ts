import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentName: {
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
  },
  results: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  success: {
    color: '#16a34a',
  },
  error: {
    color: '#dc2626',
  },
  answers: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default styles;