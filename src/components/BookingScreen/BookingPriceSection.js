import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { formatPrice } from '../../utils/bookingUtils';

const BookingPriceSection = ({ homestayData, onChooseRoom }) => {
  const hasDiscount = homestayData.originalPricePerNight && 
                     homestayData.originalPricePerNight > homestayData.pricePerNight;
  
  const discountPercentage = hasDiscount ? 
    Math.round(((homestayData.originalPricePerNight - homestayData.pricePerNight) / homestayData.originalPricePerNight) * 100) : 0;

  return (
    <View style={localStyles.container}>
      {/* Price Section */}
      <View style={localStyles.priceContainer}>
        <View style={localStyles.priceHeader}>
          <Text style={localStyles.priceLabel}>Giá phòng</Text>
          {hasDiscount && (
            <View style={localStyles.discountBadge}>
              <Text style={localStyles.discountText}>-{discountPercentage}%</Text>
            </View>
          )}
        </View>
        
        <View style={localStyles.priceRow}>
          <View>
            <View style={localStyles.mainPriceRow}>
              <Text style={localStyles.currentPrice}>
                {formatPrice(homestayData.pricePerNight || 0)}
              </Text>
              <Text style={localStyles.priceUnit}>/đêm</Text>
            </View>
            
            {hasDiscount && (
              <Text style={localStyles.originalPrice}>
                {formatPrice(homestayData.originalPricePerNight)}
              </Text>
            )}
          </View>
        </View>
      </View>
      
      {/* Action Button */}
      <TouchableOpacity 
        style={localStyles.chooseButton}
        onPress={onChooseRoom}
        activeOpacity={0.85}
      >
        <Text style={localStyles.buttonText}>Chọn phòng</Text>
      </TouchableOpacity>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  
  priceContainer: {
    flex: 1,
    marginRight: 16,
  },
  
  priceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  
  priceLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    marginRight: 8,
  },
  
  discountBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  
  discountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  
  mainPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  
  currentPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: -0.5,
  },
  
  priceUnit: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginLeft: 4,
  },
  
  originalPrice: {
    fontSize: 13,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    fontWeight: '400',
    marginTop: 2,
  },
  
  chooseButton: {
    backgroundColor: '#F97316',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 20,
    minWidth: 120,
    shadowColor: '#F97316',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginRight: 6,
  },
});

export default BookingPriceSection;