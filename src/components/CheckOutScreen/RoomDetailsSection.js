// components/CheckOutScreen/RoomDetailsSection.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RoomDetailsSection({ roomType, amenities }) {
  return (
    <View style={styles.roomDetailsContainer}>
      <Text style={styles.roomType}>{roomType}</Text>
      <Text style={styles.amenities}>{amenities}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  roomDetailsContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  roomType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  amenities: {
    fontSize: 14,
    color: '#666',
  },
});