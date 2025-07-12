import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { BookOpen, X, Trash2 } from 'lucide-react-native';
import styles from './styles';

/**
 * Componente que exibe a galeria de imagens capturadas
 * @param {Array} capturedImages - Lista de imagens capturadas
 * @param {function} setCapturedImages - Função para atualizar a lista de imagens
 * @param {function} setCurrentScreen - Função para navegar entre telas
 */
const GalleryScreen = ({ capturedImages, setCapturedImages, setCurrentScreen }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  /**
   * Alterna a seleção de uma imagem
   * @param {string} imageId - ID da imagem
   */
  const toggleSelectImage = (imageId) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId) 
        : [...prev, imageId]
    );
  };

  /**
   * Remove as imagens selecionadas
   */
  const deleteSelected = () => {
    setCapturedImages(prev => 
      prev.filter(img => !selectedImages.includes(img.id))
    );
    setSelectedImages([]);
  };

  return (
    <View style={styles.galleryContainer}>
      {/* Barra de ações quando há imagens selecionadas */}
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
            onPress={() => setCurrentScreen('home')}
            style={styles.headerButton}
          >
            <X size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Provas Capturadas</Text>
          <View style={{ width: 32 }} />
        </View>

        {capturedImages.length === 0 ? (
          <View style={styles.emptyGallery}>
            <BookOpen size={64} color="#9ca3af" />
            <Text style={styles.emptyText}>Nenhuma prova capturada</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.galleryGrid}>
            {capturedImages.map((image) => (
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

const additionalStyles = StyleSheet.create({
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  actionBarText: {
    color: '#374151',
    fontWeight: '500'
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  deleteButtonText: {
    color: '#EF4444',
    fontWeight: '500'
  },
  selectedImageCard: {
    borderWidth: 2,
    borderColor: '#3B82F6'
  },
  gridQualityText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4
  }
});

export default GalleryScreen;