import { StyleSheet } from 'react-native';

// Configurações
const POINT_RADIUS = 10;

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000'
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20
  },
  permissionText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center'
  },
  cameraContainer: {
    flex: 1,
    position: 'relative'
  },
  camera: {
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dashedBorder: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderStyle: 'dashed',
    width: '80%',
    height: '80%',
    borderRadius: 10
  },
  point: {
    position: 'absolute',
    width: POINT_RADIUS * 2,
    height: POINT_RADIUS * 2,
    borderRadius: POINT_RADIUS,
    transform: [{ translateX: -POINT_RADIUS }, { translateY: -POINT_RADIUS }]
  },
  scanLine: {
    position: 'absolute',
    width: '80%',
    height: 2,
    backgroundColor: 'rgba(0, 255, 0, 0.7)'
  },
  statusBar: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#FFF'
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  controlButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  galleryButton: {
    backgroundColor: '#4285F4'
  },
  autoButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#FFF'
  },
  autoButtonActive: {
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
    borderColor: '#0F0'
  },
  captureButton: {
    backgroundColor: '#EA4335',
    width: 70,
    height: 70,
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
    backgroundColor: '#000'
  },
  previewControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  retryButton: {
    backgroundColor: '#EA4335',
  },
  confirmButton: {
    backgroundColor: '#34A853',
  },
  previewButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  }
});