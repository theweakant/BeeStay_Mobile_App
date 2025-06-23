// components/CheckOutScreen/CheckoutFooter.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CheckoutFooter({ totalPrice, onBooking }) {
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
  };

  return (
    <View style={styles.footer}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Tổng thanh toán</Text>
        <Text style={styles.totalPrice}>{formatPrice(totalPrice)}</Text>
      </View>
      <TouchableOpacity style={styles.bookButton} onPress={onBooking}>
        <Text style={styles.bookButtonText}>Đặt homestay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    color: '#666',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
});