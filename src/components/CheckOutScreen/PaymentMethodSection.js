// components/CheckOutScreen/PaymentMethodSection.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function PaymentMethodSection({ onPress }) {
  return (
    <TouchableOpacity 
      style={styles.paymentMethodContainer}
      onPress={onPress}
    >
      <View style={styles.paymentMethodLeft}>
        <View style={styles.paymentIcon}>
          <FontAwesome name="credit-card" size={18} color="#4CAF50" />
        </View>
        <Text style={styles.paymentMethodText}>Chọn phương thức thanh toán</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  paymentMethodContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: '500',
  },
});