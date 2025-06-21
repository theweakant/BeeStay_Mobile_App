import React from 'react';
import { View, Image, TouchableOpacity, FlatList } from 'react-native';

const BookingImages = ({ hotelImages, selectedImageIndex, setSelectedImageIndex, styles, renderThumbnail }) => (
  <>
    {hotelImages.length > 0 && (
      <View style={styles.mainImageContainer}>
        <Image 
          source={{ uri: hotelImages[selectedImageIndex].uri }} 
          style={styles.mainImage}
          resizeMode="cover"
        />
      </View>
    )}
    {hotelImages.length > 1 && (
      <View style={styles.thumbnailsContainer}>
        <FlatList
          data={hotelImages}
          renderItem={renderThumbnail}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailsList}
        />
      </View>
    )}
  </>
);

export default BookingImages;
