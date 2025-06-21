import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { formatPrice } from '../../../utils/bookingUtils';

const BookingPriceSection = ({ homestayData, styles, onChooseRoom }) => (
  <View style={styles.priceSection}>
    <View>
      <Text style={styles.priceLabel}>Chỉ từ</Text>
      <View style={styles.priceRow}>
        <Text style={styles.originalPrice}>
          {formatPrice(homestayData.originalPricePerNight || 0)}
        </Text>
        <Text style={styles.discountedPrice}>
          {formatPrice(homestayData.pricePerNight || 0)}
        </Text>
      </View>
    </View>
    <TouchableOpacity 
      style={styles.chooseRoomButton}
      onPress={onChooseRoom}
    >
      <Text style={styles.chooseRoomButtonText}>Chọn phòng</Text>
    </TouchableOpacity>
  </View>
);

export default BookingPriceSection;
