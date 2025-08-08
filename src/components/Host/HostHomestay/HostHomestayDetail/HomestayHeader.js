import React, { useState } from 'react';
import { View, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const HomestayHeader = ({ imageList, defaultImage }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Convert imageList to format similar to BookingImages
  const hotelImages = imageList && imageList.length > 0 
    ? imageList.map((url, index) => ({ id: index.toString(), uri: url }))
    : [];
  
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

export default HomestayHeader;

// StyleSheet riêng cho component (dựa trên BookingImages nhưng điều chỉnh cho header)
const localStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  mainImageContainer: {
    height: 300, // Header height lớn hơn BookingImages (250)
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
    borderColor: '#FF6B35', 
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});