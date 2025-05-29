// components/VerticalItemCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { formatCurrency } from '../../utils/textUtils';

const VerticalItemCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.homestayCard} onPress={() => onPress && onPress(item)}>
      <Image source={{ uri: item.image }} style={styles.homestayImage} />
      <View style={styles.homestayInfo}>
        <Text style={styles.homestayName}>{item.name}</Text>
        <Text style={styles.homestayEarnings}>{formatCurrency(item.totalEarnings)}</Text>
        <View style={styles.homestayStats}>
          <Text style={styles.statText}>📅 {item.bookings} bookings</Text>
          <Text style={styles.statText}>📊 {item.occupancyRate}% occupancy</Text>
        </View>
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
  },
  statText: {
    fontSize: 12,
    color: '#6c757d',
  },
});

export default VerticalItemCard;