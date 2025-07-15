import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  examItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  studentId: {
    fontSize: 14,
    color: '#6B7280',
  },
  examDetails: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  examSubject: {
    fontSize: 14,
    color: '#374151',
  },
  examDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  examScore: {
    fontSize: 14,
    fontWeight: '600',
  },
  examStatus: {
    marginLeft: 8,
  },
});

export default styles;