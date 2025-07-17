import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { GalleryVertical, CheckCircle } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { createMainStyles } from '../../styles/mainStyles';
import { Spacing, BorderRadius,  } from '../../styles/designTokens';

const GalleryScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createMainStyles(colors);
  
  // Mock data - replace with actual images
  const images = Array.from({ length: 10 }, (_, i) => ({
    id: `img-${i}`,
    uri: `https://placehold.co/300x400/333/FFF?text=Scan+${i+1}`
  }));

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={localStyles.header}>
          <GalleryVertical size={24} color={colors.primary} />
          <Text style={[styles.title, { marginLeft: Spacing.sm }]}>Galeria de Scans</Text>
        </View>
        
        <FlatList
          data={images}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={localStyles.imageContainer}
              onPress={() => navigation.navigate('Results', { image: item })}
            >
              <Image 
                source={{ uri: item.uri }} 
                style={localStyles.image}
              />
              <View style={localStyles.checkBadge}>
                <CheckCircle size={16} color={colors.success} />
              </View>
            </TouchableOpacity>
          )}
          columnWrapperStyle={localStyles.columnWrapper}
        />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg
  },
  imageContainer: {
    flex: 1,
    margin: Spacing.sm,
    borderRadius: BorderRadius.md,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0'
  },
  checkBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: BorderRadius.round,
    padding: Spacing.xxs
  },
  columnWrapper: {
    justifyContent: 'space-between'
  }
});

export default GalleryScreen;
