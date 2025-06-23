import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const BookingAmenities = ({ amenities }) => (
  amenities.length > 0 && (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Tiện ích homestay</Text>
      <View style={styles.amenitiesGrid}>
        {amenities.map((item) => (
          <View key={item.id} style={styles.amenityItem}>
            {item.type === 'font-awesome' && <FontAwesome name={item.icon} size={20} color="#666" />}
            {item.type === 'material' && <MaterialIcons name={item.icon} size={20} color="#666" />}
            {item.type === 'material-community' && <MaterialCommunityIcons name={item.icon} size={20} color="#666" />}
            <Text style={styles.amenityText}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  )
);

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  amenitiesGrid: {
    // Add any grid-specific styles if needed
  },
  amenityItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  amenityText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
});

export default BookingAmenities;