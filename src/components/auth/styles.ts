import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },

  header: {
    alignItems: 'center',
    marginBottom: 32,
  },

  iconContainer: {
    marginBottom: 20,
  },

  iconGradient: {
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
  },

  inputSection: {
    marginBottom: 32,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginLeft: 4,
  },

  inputContainer: {
    position: 'relative',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    paddingVertical: 16,
    paddingHorizontal: 0,
    fontWeight: '500',
  },

  inputFocused: {
    borderColor: '#3b82f6',
    backgroundColor: '#ffffff',
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },

  buttonSection: {
    marginBottom: 24,
  },

  primaryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  disabledButton: {
    backgroundColor: '#94a3b8',
    opacity: 0.6,
    shadowOpacity: 0.1,
  },

  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: '#e2e8f0',
    borderWidth: 2,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  secondaryButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  demoBox: {
    backgroundColor: '#fef3c7',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f59e0b',
    marginTop: 8,
  },

  demoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  demoBadge: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },

  demoBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  demoText: {
    color: '#92400e',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },

  demoPassword: {
    fontWeight: '700',
    backgroundColor: '#f59e0b',
    color: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 13,
    letterSpacing: 0.5,
  },

  // Estilos existentes do scanner (mantidos para compatibilidade)
  scannerContainer: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    marginBottom: 20,
  },

  cameraContainer: {
    flex: 1,
    position: 'relative',
  },

  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  scannerFrame: {
    width: 200,
    height: 200,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },

  scannerCorner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#3b82f6',
    borderWidth: 3,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    top: -2,
    left: -2,
  },

  topRight: {
    top: -2,
    right: -2,
    left: 'auto',
    transform: [{ rotate: '90deg' }],
  },

  bottomLeft: {
    bottom: -2,
    left: -2,
    top: 'auto',
    transform: [{ rotate: '270deg' }],
  },

  bottomRight: {
    bottom: -2,
    right: -2,
    top: 'auto',
    left: 'auto',
    transform: [{ rotate: '180deg' }],
  },

  scannerInstructions: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    fontWeight: '500',
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  scannerPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    minHeight: 200,
  },

  scannerInactive: {
    alignItems: 'center',
  },

  scannerText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 10,
    textAlign: 'center',
  },

  successBox: {
    backgroundColor: '#f0fdf4',
    borderColor: '#22c55e',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  successTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22c55e',
    marginLeft: 8,
  },

  successCode: {
    fontSize: 16,
    fontWeight: '700',
    color: '#16a34a',
    marginLeft: 28,
  },

  successButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#22c55e',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  // Estilos para lista de estudantes
  studentsList: {
    maxHeight: 300,
    marginBottom: 24,
  },

  studentItem: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },

  selectedStudent: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },

  studentInfo: {
    marginBottom: 8,
  },

  studentName: {
    fontWeight: '600',
    color: '#1e293b',
    fontSize: 16,
  },

  studentClass: {
    color: '#64748b',
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

  scannerActive: {
    alignItems: 'center',
  },

  successText: {
    color: '#16a34a',
  },

  buttonContainer: {
    width: '100%',
    marginBottom: 10,
  },

  infoBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },

  infoTitle: {
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
    fontSize: 16,
  },

  infoText: {
    color: '#1e40af',
    fontSize: 14,
    lineHeight: 20,
  },

  infoList: {
    marginTop: 8,
  },

  infoItem: {
    color: '#1e40af',
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
  },

  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});