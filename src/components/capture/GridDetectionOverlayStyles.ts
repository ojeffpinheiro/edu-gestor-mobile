import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
  },
  
  gridContainer: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  
  gridLine: {
    position: 'absolute',
    width: '100%',
    borderTopWidth: 1,
    borderStyle: 'dashed',
    opacity: 0.7,
  },
  
  gridLineVertical: {
    position: 'absolute',
    height: '100%',
    borderLeftWidth: 1,
    borderStyle: 'dashed',
    opacity: 0.7,
  },
  
  cornerMarker: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  
  feedbackContainer: {
    position: 'absolute',
    bottom: 140,
    left: '8%',
    right: '8%',
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  feedbackTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  
  feedbackText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  
  helpText: {
    color: '#cbd5e1',
    fontSize: 15,
    opacity: 0.9,
    marginTop: 6,
    fontWeight: '500',
    lineHeight: 20,
  },
  
  qualityMeterContainer: {
    marginTop: 16,
  },
  
  qualityText: {
    color: '#f1f5f9',
    fontSize: 15,
    marginBottom: 8,
    fontWeight: '600',
  },
  
  qualityMeter: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  qualityBar: {
    height: '100%',
    borderRadius: 4,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  
  // Novos estilos para animações e efeitos
  pulseAnimation: {
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 12,
  },
  
  glowEffect: {
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 16,
  },
  
  errorGlow: {
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 12,
  },
  
  // Efeitos de sobreposição
  overlayGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
    borderRadius: 16,
    pointerEvents: 'none',
  },
  
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  
  statusIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  
  // Indicadores de qualidade com cores vibrantes
  qualityExcellent: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
  },
  
  qualityGood: {
    backgroundColor: '#f59e0b',
    shadowColor: '#f59e0b',
  },
  
  qualityPoor: {
    backgroundColor: '#ef4444',
    shadowColor: '#ef4444',
  },
  
  // Animações de transição
  fadeInAnimation: {
    opacity: 0,
  },
  
  slideUpAnimation: {
    transform: [{ translateY: 50 }],
  },
  
  scaleInAnimation: {
    transform: [{ scale: 0.8 }],
  },
});

export default styles;