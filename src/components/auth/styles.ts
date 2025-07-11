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
  scannerActive: {
    alignItems: 'center',
  },
  successText: {
    color: '#166534',
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
  scannerContainer: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    marginBottom: 20,
  },
  
  // Container da câmera
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  
  // Estilo da câmera
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
  // Overlay do scanner
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
  
  // Frame do scanner
  scannerFrame: {
    width: 200,
    height: 200,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  
  // Cantos do frame
  scannerCorner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#2563eb',
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
  
  // Instruções do scanner
  scannerInstructions: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    fontWeight: '500',
  },
  
  // Botão de fechar
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
  
  // Container dos botões
  buttonContainer: {
    width: '100%',
    marginBottom: 10,
  },
  
  // Botão desabilitado
  disabledButton: {
    backgroundColor: '#9ca3af',
    opacity: 0.6,
  },
  
  // Ajustes no placeholder do scanner
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
    color: '#6b7280',
    marginTop: 10,
    textAlign: 'center',
  },
  
  // Caixa de sucesso
  successBox: {
    backgroundColor: '#f0fdf4',
    borderColor: '#16a34a',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
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
    color: '#16a34a',
    marginLeft: 8,
  },
  successCode: {
    fontSize: 16,
    fontWeight: '700',
    color: '#15803d',
    marginLeft: 28,
  },
  
  // Botão de sucesso
  successButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  
  // Botões primário e secundário
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: '#d1d5db',
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
  },
});