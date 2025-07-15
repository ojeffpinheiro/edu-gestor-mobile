import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  settingsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  answerKeyText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  settingsButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default styles;