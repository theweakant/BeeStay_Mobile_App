import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

const BookingInfo = ({ homestayData, starRating, styles, locationRender, handleMapPress }) => (
  <View style={styles.hotelInfoContainer}>
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingValue}>{homestayData.averageRating || 0}</Text>
      <View style={styles.starsContainer}>
        {starRating.map(star => (
          <FontAwesome 
            key={star.key} 
            name={star.type === 'full' ? "star" : star.type === 'half' ? "star-half-empty" : "star-o"} 
            size={14} 
            color="#FFD700" 
            style={styles.starIcon}
          />
        ))}
      </View>
      <Text style={styles.reviewCount}>({homestayData.reviewCount || 0} đánh giá)</Text>
    </View>
    <Text style={styles.hotelName}>{homestayData.name || 'Chưa có tên'}</Text>
    <Text style={styles.hotelAddress}>{locationRender(homestayData.location)}</Text>
    <View style={styles.distanceContainer}>
      <Ionicons name="location-outline" size={14} color="#666" />
      <Text style={styles.distanceText}>Cách bạn {homestayData.distanceToCenter || 0}km</Text>
      <TouchableOpacity style={styles.mapButton} onPress={handleMapPress}>
        <Text style={styles.mapButtonText}>Xem bản đồ</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.roomDetailsContainer}>
      <View style={styles.roomDetailItem}>
        <MaterialIcons name="people" size={16} color="#666" />
        <Text style={styles.roomDetailText}>Tối đa {homestayData.maxGuests || 0} khách</Text>
      </View>
      <View style={styles.roomDetailItem}>
        <MaterialIcons name="bed" size={16} color="#666" />
        <Text style={styles.roomDetailText}>{homestayData.bedCount || 0} giường</Text>
      </View>
      <View style={styles.roomDetailItem}>
        <MaterialIcons name="bathtub" size={16} color="#666" />
        <Text style={styles.roomDetailText}>{homestayData.bathroomCount || 0} phòng tắm</Text>
      </View>
      <View style={styles.roomDetailItem}>
        <MaterialIcons name="home" size={16} color="#666" />
        <Text style={styles.roomDetailText}>{homestayData.roomCount || 0} phòng</Text>
      </View>
    </View>
    <View style={styles.badgeContainer}>
      {homestayData.flashSale && (
        <View style={styles.redBadge}>
          <Text style={styles.badgeText}>⚡ Flash Sale - Giảm {homestayData.discountPercentage || 0}%</Text>
        </View>
      )}
      {homestayData.instantBook && (
        <View style={styles.orangeBadge}>
          <Text style={styles.badgeText}>🚀 Đặt ngay - Xác nhận tức thì</Text>
        </View>
      )}
      {homestayData.recommended && (
        <View style={styles.greenBadge}>
          <Text style={styles.badgeText}>⭐ Được đề xuất</Text>
        </View>
      )}
      <TouchableOpacity style={styles.nightButton}>
        <Text style={styles.nightButtonText}>🌙 Đi đêm | 22:00, 22/05 → 12:00, 17/03</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default BookingInfo;
