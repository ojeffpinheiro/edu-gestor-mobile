import { StyleSheet } from "react-native";

const additionalStyles = StyleSheet.create({
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  actionBarText: {
    color: '#374151',
    fontWeight: '500'
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  deleteButtonText: {
    color: '#EF4444',
    fontWeight: '500'
  },
  selectedImageCard: {
    borderWidth: 2,
    borderColor: '#3B82F6'
  },
  gridQualityText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4
  }
});

export default additionalStyles;