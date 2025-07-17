import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { BookOpen, X, Trash2 } from 'lucide-react-native';
import styles from './styles';
import additionalStyles from './GalleryScreenStyles';

const GalleryScreen = ({ capturedImages = [], setCapturedImages, onBack }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [sortOption, setSortOption] = useState('date');

  const toggleSelectImage = (imageId) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId) 
        : [...prev, imageId]
    );
  };

  const deleteSelected = () => {
    setCapturedImages(prev => 
      prev.filter(img => !selectedImages.includes(img.id))
    );
    setSelectedImages([]);
  };

  const sortedImages = useMemo(() => {
    return [...capturedImages].sort((a, b) => {
      if (sortOption === 'date') {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else {
        return b.gridQuality - a.gridQuality;
      }
    });
  }, [capturedImages, sortOption]);

  return (
    <View style={styles.galleryContainer}>
      {selectedImages.length > 0 && (
        <View style={additionalStyles.actionBar}>
          <Text style={additionalStyles.actionBarText}>
            {selectedImages.length} selecionada(s)
          </Text>
          <TouchableOpacity 
            onPress={deleteSelected}
            style={additionalStyles.deleteButton}
          >
            <Trash2 size={20} color="#EF4444" />
            <Text style={additionalStyles.deleteButtonText}>Remover</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.maxWidthContainer}>
        <View style={styles.screenHeader}>
          <TouchableOpacity
            onPress={onBack} 
            style={styles.headerButton}
          >
            <X size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Provas Capturadas</Text>
          <View style={{ width: 32 }} />
        </View>

        {sortedImages.length === 0 ? (
          <View style={styles.emptyGallery}>
            <BookOpen size={64} color="#9ca3af" />
            <Text style={styles.emptyText}>Nenhuma prova capturada</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.galleryGrid}>
            {sortedImages.map((image) => (
              <TouchableOpacity
                key={image.id}
                style={[
                  styles.imageCard,
                  selectedImages.includes(image.id) && additionalStyles.selectedImageCard
                ]}
                onPress={() => toggleSelectImage(image.id)}
                onLongPress={() => toggleSelectImage(image.id)}
              >
                <Image
                  source={{ uri: image.uri }}
                  style={styles.galleryImage}
                />
                <View style={styles.imageInfo}>
                  <Text style={styles.imageTimestamp}>{image.timestamp}</Text>
                  <Text style={additionalStyles.gridQualityText}>
                    Qualidade: {image.gridQuality}%
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default GalleryScreen;