// components/VerticalItemCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { formatCurrency } from '../../utils/textUtils';

const VerticalItemCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.homestayCard} onPress={() => onPress && onPress(item)}>
      <Image source={{ uri: item.imageURL }} style={styles.homestayImage} />
      <View style={styles.homestayInfo}>
        <Text style={styles.homestayName}>{item.name}</Text>
        <Text style={styles.homestayEarnings}>{formatCurrency(item.totalRevenue)}</Text>
        <View style={styles.homestayStats}>
          <Text style={styles.statText}>📅 {item.bookingCount} bookings</Text>
          <Text style={styles.statText}>📊 {Math.round((item.bookedSuccessCount / item.bookingCount) * 100) || 0}% occupancy</Text>
          {item.averageRating && (
            <Text style={styles.statText}>⭐ {item.averageRating}/5</Text>
          )}
        </View>
        {item.location && (
          <Text style={styles.locationText}>
            📍 {item.location.district}, {item.location.city}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  homestayCard: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  homestayImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  homestayInfo: {
    flex: 1,
  },
  homestayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  homestayEarnings: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 8,
  },
  homestayStats: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 4,
  },
  statText: {
    fontSize: 12,
    color: '#6c757d',
  },
  locationText: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
  },
});

export default VerticalItemCard;