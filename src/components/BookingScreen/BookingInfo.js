import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

// CÁCH 1: StyleSheet tại component (Khuyên dùng)
const BookingInfo = ({ homestayData, starRating, locationRender, handleMapPress }) => (
  <View style={localStyles.container}>
    <Text style={localStyles.hotelName}>{homestayData.name || 'Chưa có tên'}</Text>
    
    <View style={localStyles.ratingContainer}>
      <View style={localStyles.starContainer}>
        {starRating.map(star => (
          <FontAwesome 
            key={star.key} 
            name={star.type === 'full' ? "star" : star.type === 'half' ? "star-half-empty" : "star-o"} 
            size={14} 
            color="#FFD700" 
          />
        ))}
      </View>
      <Text style={localStyles.ratingText}>
        {homestayData.averageRating || 0} ({homestayData.reviewCount || 0} đánh giá)
      </Text>
    </View>

    <View style={localStyles.locationContainer}>
      <Ionicons name="location-outline" size={16} color="#666666" />
      <Text style={localStyles.locationText}>{locationRender(homestayData.location)}</Text>
      <TouchableOpacity style={localStyles.mapButton} onPress={handleMapPress}>
        <Text style={localStyles.mapButtonText}>Xem bản đồ</Text>
      </TouchableOpacity>
    </View>

    {/* Room Details */}
    <View style={localStyles.roomDetailsContainer}>
      <View style={localStyles.roomDetailItem}>
        <MaterialIcons name="people" size={16} color="#666666" />
        <Text style={localStyles.roomDetailText}>Tối đa {homestayData.maxGuests || 0} khách</Text>
      </View>
      <View style={localStyles.roomDetailItem}>
        <MaterialIcons name="bed" size={16} color="#666666" />
        <Text style={localStyles.roomDetailText}>{homestayData.bedCount || 0} giường</Text>
      </View>
      <View style={localStyles.roomDetailItem}>
        <MaterialIcons name="bathtub" size={16} color="#666666" />
        <Text style={localStyles.roomDetailText}>{homestayData.bathroomCount || 0} phòng tắm</Text>
      </View>
      <View style={localStyles.roomDetailItem}>
        <MaterialIcons name="home" size={16} color="#666666" />
        <Text style={localStyles.roomDetailText}>{homestayData.roomCount || 0} phòng</Text>
      </View>
    </View>

    {/* Badges */}
    <View style={localStyles.badgeContainer}>
      {homestayData.flashSale && (
        <View style={localStyles.flashSaleBadge}>
          <Text style={localStyles.badgeText}>
            ⚡ Flash Sale - Giảm {homestayData.discountPercentage || 0}%
          </Text>
        </View>
      )}
      
      {homestayData.instantBook && (
        <View style={localStyles.instantBookBadge}>
          <Text style={localStyles.badgeText}>🚀 Đặt ngay - Xác nhận tức thì</Text>
        </View>
      )}
      
      {homestayData.recommended && (
        <View style={localStyles.recommendedBadge}>
          <Text style={localStyles.badgeText}>⭐ Được đề xuất</Text>
        </View>
      )}
    </View>

    <View style={localStyles.distanceContainer}>
      <Ionicons name="location-outline" size={14} color="#666666" />
      <Text style={localStyles.distanceText}>
        Cách bạn {homestayData.distanceToCenter || 0}km
      </Text>
    </View>
  </View>
);

// StyleSheet riêng cho component này
const localStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  hotelName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
    flex: 1,
  },
  mapButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  mapButtonText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '500',
  },
  roomDetailsContainer: {
    marginBottom: 12,
  },
  roomDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  roomDetailText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 8,
  },
  badgeContainer: {
    marginBottom: 12,
  },
  flashSaleBadge: {
    backgroundColor: '#FFE4E1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#FFB3B3',
  },
  instantBookBadge: {
    backgroundColor: '#FFF4E6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#FFD480',
  },
  recommendedBadge: {
    backgroundColor: '#E6FFF2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#80FFCC',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
});

export default BookingInfo;

