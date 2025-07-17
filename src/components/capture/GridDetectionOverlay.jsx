import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const GridDetectionOverlay = ({ detected }) => {
  const { colors } = useTheme();
  
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <View style={[localStyles.grid, { borderColor: detected ? colors.success : colors.warning }]}>
        {/* Vertical lines */}
        <View style={[localStyles.line, localStyles.lineVertical1]} />
        <View style={[localStyles.line, localStyles.lineVertical2]} />
        
        {/* Horizontal lines */}
        <View style={[localStyles.line, localStyles.lineHorizontal1]} />
        <View style={[localStyles.line, localStyles.lineHorizontal2]} />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  grid: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
    bottom: '20%',
    borderWidth: 2
  },
  line: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)'
  },
  lineVertical1: {
    width: 1,
    left: '33%',
    top: 0,
    bottom: 0
  },
  lineVertical2: {
    width: 1,
    left: '66%',
    top: 0,
    bottom: 0
  },
  lineHorizontal1: {
    height: 1,
    top: '33%',
    left: 0,
    right: 0
  },
  lineHorizontal2: {
    height: 1,
    top: '66%',
    left: 0,
    right: 0
  }
});

export default GridDetectionOverlay;
