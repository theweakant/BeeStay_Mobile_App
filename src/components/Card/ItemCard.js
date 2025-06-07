import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 45) / 2;

const formatLocation = (location) => {
  if (!location || typeof location !== 'object') return '';
  const { address, district, city, province } = location;

  return [address, district, city, province]
    .filter(Boolean) 
    .join(', ');
};


const ItemCard = ({ item, index, toggleHomestayStatus, viewDetails, formatCurrency }) => (
  <View style={[styles.cardContainer, { marginRight: index % 2 === 0 ? 15 : 0 }]}>
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />

      {item.promotion && (
        <View style={[styles.promotionBadge, { backgroundColor: item.promotion.type === 'discount' ? '#FF6B35' : '#4CAF50' }]}>
          <Text style={styles.promotionText}>{item.promotion.banner}</Text>
        </View>
      )}

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
          <Switch
            value={item.status === 'active'}
            onValueChange={() => toggleHomestayStatus(item.id)}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={item.status === 'active' ? '#fff' : '#f4f3f4'}
            style={styles.switch}
          />
        </View>

        <Text style={styles.cardLocation} numberOfLines={1}>📍 {formatLocation(item.location)}</Text>
        <Text style={styles.cardPrice}>{formatCurrency(item.price)}/đêm</Text>

        <View style={styles.cardStats}>
          <Text style={styles.cardRating} numberOfLines={1}>⭐ {item.rating}</Text>
          <Text style={styles.cardBookings} numberOfLines={1}>📅 {item.bookings}</Text>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.viewButton]}
            onPress={() => viewDetails(item)}
          >
            <Text style={styles.actionButtonText}>👁️</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => Alert.alert('Sửa', `Sửa ${item.name}`)}
          >
            <Text style={styles.actionButtonText}>✏️</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.promotionButton]}
            onPress={() => Alert.alert('Khuyến mãi', `Thêm KM cho ${item.name}`)}
          >
            <Text style={styles.actionButtonText}>➕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: { width: CARD_WIDTH },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  promotionBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  promotionText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  cardLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardRating: {
    fontSize: 11,
    color: '#666',
  },
  cardBookings: {
    fontSize: 11,
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 4,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#4CAF50',
  },
  editButton: {
    backgroundColor: '#FF9800',
  },
  promotionButton: {
    backgroundColor: '#9C27B0',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ItemCard;
