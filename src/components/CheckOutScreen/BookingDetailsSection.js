// components/CheckOutScreen/BookingDetailsSection.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BookingDetailsSection({ 
  bookingType, 
  checkIn, 
  checkOut, 
  onChangeBooking 
}) {
  return (
    <View style={styles.bookingDetailsContainer}>
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingType}>{bookingType}</Text>
        <TouchableOpacity onPress={onChangeBooking}>
          <Text style={styles.changeButton}>Thay đổi</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.timeContainer}>
        <View style={styles.timeBlock}>
          <Text style={styles.timeLabel}>Nhận phòng</Text>
          <Text style={styles.timeValue}>{checkIn}</Text>
        </View>
        <View style={styles.timeSeparator}>
          <Ionicons name="arrow-forward" size={16} color="#999" />
        </View>
        <View style={styles.timeBlock}>
          <Text style={styles.timeLabel}>Trả phòng</Text>
          <Text style={styles.timeValue}>{checkOut}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookingDetailsContainer: {
    backgroundColor: '#FFF9E6',
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bookingType: {
    fontSize: 14,
    fontWeight: '500',
  },
  changeButton: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  timeBlock: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  timeSeparator: {
    paddingHorizontal: 8,
  },
});