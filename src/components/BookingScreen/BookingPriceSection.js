import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatPrice } from '../../utils/bookingUtils';

const BookingPriceSection = ({ homestayData, onChooseRoom }) => (
  <View style={localStyles.priceSection}>
    <View style={localStyles.priceContainer}>
      <Text style={localStyles.priceLabel}>Chỉ từ</Text>
      <View style={localStyles.priceRow}>
        {/* Chỉ hiện originalPrice nếu có discount */}
        {homestayData.originalPricePerNight && homestayData.originalPricePerNight > homestayData.pricePerNight && (
          <Text style={localStyles.originalPrice}>
            {formatPrice(homestayData.originalPricePerNight)}
          </Text>
        )}
        <Text style={localStyles.discountedPrice}>
          {formatPrice(homestayData.pricePerNight || 0)}
        </Text>
        <Text style={localStyles.priceUnit}>/đêm</Text>
      </View>
    </View>
    
    <TouchableOpacity 
      style={localStyles.chooseRoomButton}
      onPress={onChooseRoom}
      activeOpacity={0.8}
    >
      <Text style={localStyles.chooseRoomButtonText}>Chọn phòng</Text>
    </TouchableOpacity>
  </View>
);

export default BookingPriceSection;

// StyleSheet riêng cho component
const localStyles = StyleSheet.create({
  priceSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  originalPrice: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    fontSize: 14,
    fontWeight: '400',
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EF4444',
  },
  priceUnit: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  chooseRoomButton: {
    backgroundColor: '#F97316',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    minWidth: 100,
  },
  chooseRoomButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});