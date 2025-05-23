import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 16px padding x 2 + 16px spacing between cards

export default function HomestayList({ homestay, isLeft }) {
  return (
    <View style={[styles.card, isLeft && { marginRight: 16 }]}>
      <Image source={{ uri: homestay.image }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.ratingRow}>
          <Text style={styles.rating}>{homestay.rating}</Text>
          <Text style={styles.reviews}>({homestay.reviews})</Text>
          <Text style={styles.star}>★</Text>
        </View>
        <Text style={styles.name}>{homestay.name}</Text>
        <Text style={styles.priceLabel}>Chỉ từ</Text>
        <Text style={styles.price}>{homestay.price}</Text>
        <View style={styles.discountTag}>
          <Text style={styles.discount}>Mã giảm {homestay.discount}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    width: cardWidth,
  },
  image: {
    width: '100%',
    height: 120,
  },
  info: {
    padding: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center', // sửa lỗi chính tả: alignhomestays -> alignItems
    marginBottom: 4,
  },
  rating: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 4,
  },
  reviews: {
    fontSize: 12,
    color: '#999',
    marginRight: 4,
  },
  star: {
    fontSize: 14,
    color: '#F5B041',
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  discountTag: {
    backgroundColor: '#FFEB3B',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  discount: {
    fontSize: 12,
    fontWeight: '500',
  },
});
