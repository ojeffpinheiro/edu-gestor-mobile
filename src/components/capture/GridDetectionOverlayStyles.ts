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
    borderRadius: 4,
    backgroundColor: 'rgba(59, 130, 246, 0.1)'
  },
  gridLine: {
    position: 'absolute',
    width: '100%',
    borderTopWidth: 1,
    borderStyle: 'dashed'
  },
  gridLineVertical: {
    position: 'absolute',
    height: '100%',
    borderLeftWidth: 1,
    borderStyle: 'dashed'
  },
  cornerMarker: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white'
  },
  feedbackContainer: {
    position: 'absolute',
    bottom: 130,
    left: '10%',
    right: '10%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  feedbackTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  feedbackText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  helpText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  qualityMeterContainer: {
    marginTop: 8,
  },
  qualityText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 4
  },
  qualityMeter: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden'
  },
  qualityBar: {
    height: '100%'
  }
});

export default styles;