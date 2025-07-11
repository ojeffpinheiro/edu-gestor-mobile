import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Base containers
  homeContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  galleryContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 24,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 24,
  },
  processingContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  maxWidthContainer: {
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },

  // Home screen styles
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 9999,
    padding: 16,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
  },
  secondaryButton: {
    backgroundColor: 'white',
  },
  successButton: {
    backgroundColor: '#16a34a',
  },
  purpleButton: {
    backgroundColor: '#7c3aed',
  },
  disabledButton: {
    backgroundColor: '#e5e7eb',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#374151',
  },
  disabledButtonText: {
    color: '#6b7280',
  },
  clearButton: {
    marginTop: 32,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#dc2626',
    fontWeight: '500',
  },

  // Camera screen styles
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startCameraButton: {
    paddingHorizontal: 32,
  },
  cameraHeader: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraHeaderButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 9999,
  },
  imageCounter: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  imageCounterText: {
    color: 'white',
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
  alignmentBox: {
    width: '80%',
    height: '60%',
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed',
    borderRadius: 8,
    opacity: 0.7,
  },
  alignmentContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    padding: 16,
  },
  alignmentText: {
    color: 'white',
    textAlign: 'center',
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  captureButtonInner: {
    backgroundColor: '#3b82f6',
    width: 64,
    height: 64,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Gallery screen styles
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  emptyGallery: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    color: '#6b7280',
    marginTop: 16,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  imageCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  galleryImage: {
    width: '100%',
    height: 128,
  },
  imageInfo: {
    padding: 12,
  },
  imageTimestamp: {
    fontSize: 12,
    color: '#6b7280',
  },
  removeButton: {
    color: '#dc2626',
    fontSize: 14,
    marginTop: 8,
  },

  // Results screen styles
  resultsContent: {
    gap: 16,
  },
  scoreCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8,
  },
  scoreSubtext: {
    color: '#64748b',
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailsTitle: {
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  detailsList: {
    maxHeight: 256,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 8,
  },
  detailQuestion: {
    fontWeight: '500',
    color: '#1e293b',
  },
  detailAnswerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailAnswer: {
    fontSize: 14,
  },
  exportButton: {
    marginTop: 16,
  },

  // Processing screen styles
  processingTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    color: '#1e293b',
  },
  processingText: {
    color: '#64748b',
    marginTop: 8,
  },
});