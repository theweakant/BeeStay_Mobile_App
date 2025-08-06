import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const BookingInfo = ({ homestayData, locationRender, handleMapPress }) => (
  <View style={localStyles.container}>
    {/* Header với tên và badges */}
    <View style={localStyles.header}>
      <Text style={localStyles.hotelName} numberOfLines={2}>
        {homestayData.name || 'Chưa có tên'}
      </Text>


      {/* Address */}
      <View style={localStyles.addressContainer}>
        <Text style={localStyles.addressText} numberOfLines={1}>
          {locationRender(homestayData.location)}
        </Text>
      </View>

          {/* Location và rating trong 1 hàng */}
    <View style={localStyles.locationRatingRow}>
      <View style={localStyles.locationInfo}>
        <Ionicons name="location-outline" size={14} color="#666666" />
        <Text style={localStyles.distanceText}>
          {homestayData.distanceToCenter || 0}km
        </Text>
      </View>
      
      <View style={localStyles.ratingInfo}>
        <Ionicons name="star" size={14} color="#FFD700" />
        <Text style={localStyles.ratingText}>
          {homestayData.averageRating || 0} ({homestayData.reviewCount || 0})
        </Text>
      </View>
      
      <TouchableOpacity style={localStyles.mapButton} onPress={handleMapPress}>
        <Ionicons name="map-outline" size={14} color="#007AFF" />
      </TouchableOpacity>
    </View>
      
      {/* Badges nằm ngang */}
      <View style={localStyles.badgeRow}>
        {homestayData.flashSale && (
          <View style={localStyles.flashSaleBadge}>
            <Text style={localStyles.badgeText}>Sale</Text>
          </View>
        )}
        {homestayData.instantBook && (
          <View style={localStyles.instantBookBadge}>
            <Text style={localStyles.badgeText}>Available</Text>
          </View>
        )}
        {homestayData.recommended && (
          <View style={localStyles.recommendedBadge}>
            <Text style={localStyles.badgeText}>Recommend</Text>
          </View>
        )}
      </View>
    </View>





    {/* Room Details - 2x2 grid */}
    <View style={localStyles.roomGrid}>
      <View style={localStyles.roomGridRow}>
        <View style={localStyles.roomDetailItem}>
          <MaterialIcons name="people" size={16} color="#007AFF" />
          <Text style={localStyles.roomDetailText}>{homestayData.maxGuests || 0} người</Text>
        </View>
        <View style={localStyles.roomDetailItem}>
          <MaterialIcons name="bed" size={16} color="#007AFF" />
          <Text style={localStyles.roomDetailText}>{homestayData.bedCount || 0} giường</Text>
        </View>
      </View>
      
      <View style={localStyles.roomGridRow}>
        <View style={localStyles.roomDetailItem}>
          <MaterialIcons name="bathtub" size={16} color="#007AFF" />
          <Text style={localStyles.roomDetailText}>{homestayData.bathroomCount || 0} bồn tắm</Text>
        </View>
        <View style={localStyles.roomDetailItem}>
          <MaterialIcons name="home" size={16} color="#007AFF" />
          <Text style={localStyles.roomDetailText}>{homestayData.roomCount || 0} phòng</Text>
        </View>
      </View>
    </View>
  </View>
);

const localStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  
  header: {
    marginBottom: 12,
  },
  
  hotelName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    lineHeight: 28,
  },
  
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  
  flashSaleBadge: {
    backgroundColor: '#FFE4E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFB3B3',
  },
  
  instantBookBadge: {
    backgroundColor: '#FFF4E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD480',
  },
  
  recommendedBadge: {
    backgroundColor: '#E6FFF2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#80FFCC',
  },
  
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333333',
  },
  
locationRatingRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
  paddingHorizontal: 4,
},
  
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0,
  },
  
  distanceText: {
    fontSize: 13,
    color: '#666666',
    marginLeft: 4,
    fontWeight: '500',
  },
  
ratingInfo: {
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 16, // Khoảng cách cố định từ locationInfo
},
  
  ratingText: {
    fontSize: 13,
    color: '#666666',
    marginLeft: 4,
    fontWeight: '500',
  },
  
  mapButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    borderWidth: 1,
    borderColor: '#007AFF',
      marginLeft: 'auto', // Đẩy về phía bên phải

  },
  
  addressContainer: {
    marginVertical: 8,
    paddingHorizontal: 4,
  },
  
  addressText: {
    fontSize: 13,
    color: '#888888',
    fontStyle: 'italic',
  },
  
  roomGrid: {
    gap: 8,
  },
  
  roomGridRow: {
    flexDirection: 'row',
    gap: 8,
  },
  
  roomDetailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 12,

  },
  
  roomDetailText: {
    fontSize: 14,
    color: 'black',
    marginLeft: 8,
  },
});

export default BookingInfo;