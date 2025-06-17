import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { truncateText } from '../../utils/textUtils'; 


const InfoCard = ({ 
  item, 
  onPress, 
  style,
  imageStyle,
  contentStyle 
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress(item);
    }
  };

  const getLocationText = () => {
    if (item.location && item.location.city) {
      return truncateText(item.location.city);
    }
    return 'Chưa cập nhật'; 
  };

  return (
    <TouchableOpacity 
      style={[styles.homestayCard, style]} 
      onPress={handlePress}
    >
      <Image 
        source={{ uri: item.image }} 
        style={[styles.homestayImage, imageStyle]} 
      />
      <View style={[styles.cardContent, contentStyle]}>
        <Text style={styles.homestayName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={12} color="#F5B041" />
          <Text style={styles.ratingText}>{item.averageRating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount}) </Text>
            <Text style={styles.locationText}> • {getLocationText()}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.pricePerNight}VND</Text>
          <Text style={styles.priceOriginalPerNight}>
            {item.originalPricePerNight}VND
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  homestayCard: {
    width: 200,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  homestayImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 12,
  },
  homestayName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF0000',
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
});

export default InfoCard;