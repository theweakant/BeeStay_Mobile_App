import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const BookingAmenities = ({ amenities, styles }) => (
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

export default BookingAmenities;
