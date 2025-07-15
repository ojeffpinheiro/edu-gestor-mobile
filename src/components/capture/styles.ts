import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default StyleSheet.create({
  // Base containers com gradientes e glassmorphism
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  
  homeContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 24
  },
  
  cameraWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 20,
    overflow: 'hidden',
  },
  
  galleryContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 24,
  },
  
  resultsContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 24,
  },
  
  processingContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  
  maxWidthContainer: {
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },

  // Home screen com design futurista
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingVertical: 20,
  },
  
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 28,
    padding: 20,
    width: 96,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(59, 130, 246, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  
  subtitle: {
    fontSize: 18,
    color: '#cbd5e1',
    textAlign: 'center',
    fontWeight: '300',
    opacity: 0.9,
  },
  
  buttonContainer: {
    gap: 20,
    marginBottom: 32,
  },
  
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 28,
    borderRadius: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  
  primaryButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.9)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    shadowColor: '#3b82f6',
  },
  
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  successButton: {
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    shadowColor: '#10b981',
  },
  
  purpleButton: {
    backgroundColor: 'rgba(124, 58, 237, 0.9)',
    borderColor: 'rgba(124, 58, 237, 0.3)',
    shadowColor: '#7c3aed',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  secondaryButtonText: {
    color: '#f1f5f9',
  },
  disabledButton: {
    color: '#9ca3af',
    backgroundColor: 'rgba(107, 114, 128, 0.5)',
    opacity: 0.6,
    borderColor: 'rgba(75, 85, 99, 0.3)',
  },
  
  clearButton: {
    marginTop: 24,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  
  clearButtonText: {
    color: '#f87171',
    fontWeight: '600',
    fontSize: 16,
  },

  // Camera screen com elementos futuristas
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  
  startCameraButton: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.9)',
    borderRadius: 12,
  },
  
  cameraHeader: {
    position: 'absolute',
    top: 60,
    left: 24,
    right: 24,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  cameraHeaderButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  imageCounter: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  imageCounterText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  
  alignmentGuide: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Corner markers com glow effect
  cornerCircleTopLeft: {
    position: 'absolute',
    top: -12,
    left: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  
  cornerCircleTopRight: {
    position: 'absolute',
    top: -12,
    right: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  
  cornerCircleBottomLeft: {
    position: 'absolute',
    bottom: -12,
    left: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  
  cornerCircleBottomRight: {
    position: 'absolute',
    bottom: -12,
    right: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  
  alignmentBox: {
    width: '85%',
    height: '65%',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderStyle: 'dashed',
    borderRadius: 12,
    opacity: 0.9,
    overflow: 'hidden',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  
  alignmentContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
    padding: 20,
  },
  
  alignmentText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  
  captureButtonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  
  captureButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  captureButtonInner: {
    backgroundColor: '#3b82f6',
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },

  // Gallery screen com cards modernos
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  
  headerButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
  },
  
  emptyGallery: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    opacity: 0.7,
  },
  
  emptyText: {
    color: '#cbd5e1',
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',
  },
  
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'space-between',
  },
  
  imageCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    overflow: 'hidden',
    width: '48%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  
  galleryImage: {
    width: '100%',
    height: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  
  imageInfo: {
    padding: 16,
  },
  
  imageTimestamp: {
    fontSize: 13,
    color: '#cbd5e1',
    fontWeight: '500',
  },
  
  removeButton: {
    color: '#f87171',
    fontSize: 15,
    marginTop: 8,
    fontWeight: '600',
  },

  // Results screen com cards elegantes
  resultsContent: {
    gap: 24,
  },
  
  scoreCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  
  scoreText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#3b82f6',
    marginBottom: 12,
    textShadowColor: 'rgba(59, 130, 246, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  
  scoreSubtext: {
    color: '#cbd5e1',
    fontSize: 18,
    fontWeight: '500',
  },
  
  detailsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  
  detailsTitle: {
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 20,
    fontSize: 18,
  },
  
  detailsList: {
    maxHeight: 300,
  },
  
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  detailQuestion: {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: 16,
  },
  
  detailAnswerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  
  detailAnswer: {
    fontSize: 16,
    fontWeight: '500',
    color: '#cbd5e1',
  },
  
  exportButton: {
    marginTop: 20,
    backgroundColor: 'rgba(124, 58, 237, 0.9)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },

  // Processing screen com animações
  processingTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  
  processingText: {
    color: '#cbd5e1',
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  
  cameraGuide: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
    bottom: '20%',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  
  guideText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  // Controles da câmera modernos
  controlsContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  
  text: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  }
});