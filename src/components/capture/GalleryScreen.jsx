import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { BookOpen, X } from 'lucide-react-native';
import styles from './styles';

const GalleryScreen = ({ capturedImages, setCapturedImages, setCurrentScreen }) => (
  <View style={styles.galleryContainer}>
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
            <View key={image.id} style={styles.imageCard}>
              <Image
                source={{ uri: image.uri }}
                style={styles.galleryImage}
              />
              <View style={styles.imageInfo}>
                <Text style={styles.imageTimestamp}>{image.timestamp}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCapturedImages(capturedImages.filter(img => img.id !== image.id));
                  }}
                >
                  <Text style={styles.removeButton}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  </View>
);

export default GalleryScreen;