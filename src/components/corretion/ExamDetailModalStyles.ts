import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalBody: {
    flex: 1,
  },
  studentInfo: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  studentNameModal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  studentIdModal: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  examSubjectModal: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  scoreModal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  correctionsContainer: {
    gap: 12,
  },
  correctionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  correctionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    gap: 12,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    minWidth: 24,
  },
  studentAnswerText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  correctAnswerText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
  },
});

export default styles;