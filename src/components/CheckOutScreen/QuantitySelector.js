// components/CheckOutScreen/QuantitySelector.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function QuantitySelector({ quantity, onQuantityChange }) {
  const incrementQuantity = () => {
    onQuantityChange(quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <View style={styles.quantityContainer}>
      <Text style={styles.quantityLabel}>Số lượng người:</Text>
      <View style={styles.quantitySelector}>
        <TouchableOpacity 
          style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]} 
          onPress={decrementQuantity}
          disabled={quantity <= 1}
        >
          <AntDesign name="minus" size={16} color={quantity <= 1 ? "#ccc" : "#333"} />
        </TouchableOpacity>
        <Text style={styles.quantityValue}>{quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
          <AntDesign name="plus" size={16} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quantityContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
  },
  quantityButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 12,
    minWidth: 40,
    textAlign: 'center',
  },
});