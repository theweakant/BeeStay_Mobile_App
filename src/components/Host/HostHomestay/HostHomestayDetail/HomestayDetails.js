import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HomestayDetails({ homestay }) {
  const details = [
    {
      icon: 'people',
      iconType: 'material',
      label: `${homestay.maxGuests || 0} người`,
    },
    {
      icon: 'bed',
      iconType: 'material',
      label: `${homestay.bedCount || 0} giường`,
    },
    {
      icon: 'water',
      iconType: 'ionicons',
      label: `${homestay.bathroomCount || 0} bồn tắm`,
    },
    {
      icon: 'home',
      iconType: 'material',
      label: `${homestay.roomCount || 0} phòng`,
    },
  ];

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsGrid}>
        {details.map((detail, index) => (
          <View key={index} style={styles.detailItem}>
            {detail.iconType === 'material' ? (
              <MaterialIcons name={detail.icon} size={20} color="#4A90E2" />
            ) : (
              <Ionicons name={detail.icon} size={20} color="#4A90E2" />
            )}
            <Text style={styles.detailText}>{detail.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
});