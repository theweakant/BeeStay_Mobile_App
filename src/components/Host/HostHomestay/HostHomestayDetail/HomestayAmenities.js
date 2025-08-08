import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HomestayAmenities({ amenities = [] }) {
  const [showAll, setShowAll] = useState(false);
  
  // Default amenities if none provided
  const defaultAmenities = [
    { name: 'WiFi miễn phí', icon: 'wifi', type: 'ionicons' },
    { name: 'Nhà bếp', icon: 'restaurant', type: 'material' },
    { name: 'Phòng tắm riêng', icon: 'bathtub', type: 'material' },
    { name: 'Cho phép thú cưng', icon: 'pets', type: 'material' },
    { name: 'Chỗ đậu xe', icon: 'car-outline', type: 'ionicons' },
    { name: 'Ban công', icon: 'balcony', type: 'material' },
  ];

  const amenityList = amenities.length > 0 ? amenities.map(amenity => ({
    name: amenity,
    icon: 'checkmark-circle',
    type: 'ionicons'
  })) : defaultAmenities;

  const displayAmenities = showAll ? amenityList : amenityList.slice(0, 6);
  const remainingCount = amenityList.length - 6;

  return (
    <View style={styles.amenitiesContainer}>
      <Text style={styles.sectionTitle}>Tiện ích</Text>
      
      <View style={styles.amenitiesGrid}>
        {displayAmenities.map((amenity, index) => (
          <View key={index} style={styles.amenityItem}>
            {amenity.type === 'material' ? (
              <MaterialIcons name={amenity.icon} size={16} color="#4A90E2" />
            ) : (
              <Ionicons name={amenity.icon} size={16} color="#4A90E2" />
            )}
            <Text style={styles.amenityText}>{amenity.name}</Text>
          </View>
        ))}
      </View>

      {!showAll && remainingCount > 0 && (
        <TouchableOpacity 
          style={styles.showMoreButton} 
          onPress={() => setShowAll(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.showMoreText}>
            Xem thêm {remainingCount} tiện ích
          </Text>
          <Ionicons name="chevron-down" size={16} color="#4A90E2" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  amenitiesContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#F5F5F5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingRight: 8,
  },
  amenityText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    paddingVertical: 8,
  },
  showMoreText: {
    fontSize: 14,
    color: '#4A90E2',
    marginRight: 4,
  },
});