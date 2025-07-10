import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(239, 246, 255, 0.5)',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    backgroundColor: '#dbeafe',
    borderRadius: 999,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  infoText: {
    color: '#1e40af',
    fontSize: 14,
  },
  infoList: {
    marginTop: 8,
  },
  infoItem: {
    color: '#1e40af',
    fontSize: 14,
    marginBottom: 4,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    paddingRight: 48,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  successButton: {
    backgroundColor: '#16a34a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  secondaryButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  demoBox: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  demoText: {
    color: '#92400e',
    fontSize: 14,
  },
  scannerPlaceholder: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    height: 200,
  },
  scannerActive: {
    alignItems: 'center',
  },
  scannerInactive: {
    alignItems: 'center',
  },
  scannerText: {
    color: '#6b7280',
    marginTop: 16,
  },
  successBox: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  successTitle: {
    fontWeight: '600',
    color: '#166534',
    marginLeft: 8,
  },
  successText: {
    color: '#166534',
  },
  successCode: {
    color: '#166534',
    fontFamily: 'monospace',
    fontSize: 18,
  },
  studentsList: {
    maxHeight: 300,
    marginBottom: 24,
  },
  studentItem: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedStudent: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  studentInfo: {
    marginBottom: 8,
  },
  studentName: {
    fontWeight: '600',
    color: '#1f2937',
    fontSize: 16,
  },
  studentClass: {
    color: '#6b7280',
    fontSize: 14,
  },
  studentIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  studentId: {
    color: '#9ca3af',
    fontSize: 14,
  },
});