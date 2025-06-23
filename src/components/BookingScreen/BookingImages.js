import React from 'react';
import { View, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const BookingImages = ({ hotelImages, selectedImageIndex, setSelectedImageIndex }) => {
  // Default image fallback
  const defaultImage = require('../../../assets/AvailableImage/default_homestay_image.png');
  
  // Check if we have valid images
  const hasImages = hotelImages && hotelImages.length > 0;
  
  // Render thumbnail item
  const renderThumbnail = ({ item, index }) => (
    <TouchableOpacity
      style={[
        localStyles.thumbnailContainer,
        selectedImageIndex === index && localStyles.selectedThumbnail,
      ]}
      onPress={() => setSelectedImageIndex(index)}
    >
      <Image
        source={item.uri ? { uri: item.uri } : item.source || defaultImage}
        style={localStyles.thumbnailImage}
        defaultSource={defaultImage}
      />
    </TouchableOpacity>
  );

  return (
    <View style={localStyles.container}>
      {/* Main Image */}
      <View style={localStyles.mainImageContainer}>
        <Image
          source={
            hasImages && hotelImages[selectedImageIndex]
              ? hotelImages[selectedImageIndex].uri
                ? { uri: hotelImages[selectedImageIndex].uri }
                : hotelImages[selectedImageIndex].source || defaultImage
              : defaultImage
          }
          style={localStyles.mainImage}
          defaultSource={defaultImage}
          resizeMode="cover"
        />
      </View>

      {/* Thumbnails - Only show if we have more than 1 image */}
      {hasImages && hotelImages.length > 1 && (
        <View style={localStyles.thumbnailsContainer}>
          <FlatList
            data={hotelImages}
            renderItem={renderThumbnail}
            keyExtractor={(item, index) => item.id || index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={localStyles.thumbnailsList}
          />
        </View>
      )}
    </View>
  );
};

export default BookingImages;

// StyleSheet riêng cho component
const localStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  mainImageContainer: {
    height: 250,
    width: '100%',
    backgroundColor: '#F8F8F8',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  thumbnailsList: {
    gap: 10,
  },
  thumbnailContainer: {
    width: 60,
    height: 40,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: '#007AFF',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});