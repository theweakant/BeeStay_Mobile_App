// components/CheckOutScreen/RoomImageSection.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function RoomImageSection({ imageUrl }) {
  return (
    <View style={styles.imageContainer}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.roomImage}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 200,
  },
  roomImage: {
    width: '100%',
    height: '100%',
  },
});