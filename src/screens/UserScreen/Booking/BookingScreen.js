import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, FlatList } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { 
  convertToHotelImages, 
  getAmenitiesArray, 
  formatPrice, 
  getStarRating,
  getPolicyTexts 
} from '../../../utils/bookingUtils';
import { openGoogleMaps } from '../../../utils/mapUtil';
import {HomestayData, PolicyData} from '../../../data/MockData';

export default function BookingScreen() {
  const navigation = useNavigation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Use the first homestay from mock data
  const homestayData = HomestayData[0];

  // Convert imageList to the format expected by the component
  const hotelImages = convertToHotelImages(homestayData.imageList);

  // Create amenities array from homestayData.amenities
  const amenities = getAmenitiesArray(homestayData.amenities);



  // Get star rating array
  const starRating = getStarRating(homestayData.averageRating);

  const locationRender = (location) => {
    return `${location.address}, ${location.district}, ${location.city}, ${location.province}`;
  };

  const handleMapPress = () => {
    const fullAddress = locationRender(homestayData.location);
    openGoogleMaps(fullAddress);
  };

  const renderThumbnail = ({ item, index }) => (
    <TouchableOpacity 
      style={[styles.thumbnailContainer, selectedImageIndex === index && styles.selectedThumbnail]} 
      onPress={() => setSelectedImageIndex(index)}
    >
      <Image source={{ uri: item.uri }} style={styles.thumbnailImage} />
    </TouchableOpacity>
  );

  const renderAmenity = ({ item }) => (
    <View style={styles.amenityItem}>
      {item.type === 'font-awesome' && <FontAwesome name={item.icon} size={20} color="#666" />}
      {item.type === 'material' && <MaterialIcons name={item.icon} size={20} color="#666" />}
      {item.type === 'material-community' && <MaterialCommunityIcons name={item.icon} size={20} color="#666" />}
      <Text style={styles.amenityText}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Main Image */}
        <View style={styles.mainImageContainer}>
          <Image 
            source={{ uri: hotelImages[selectedImageIndex].uri }} 
            style={styles.mainImage}
            resizeMode="cover"
          />
        </View>
        
        {/* Image Thumbnails */}
        <View style={styles.thumbnailsContainer}>
          <FlatList
            data={hotelImages}
            renderItem={renderThumbnail}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailsList}
          />
        </View>
        
        {/* Hotel Rating and Name */}
        <View style={styles.hotelInfoContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingValue}>{homestayData.averageRating}</Text>
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
            <Text style={styles.reviewCount}>({homestayData.reviewCount} đánh giá)</Text>
          </View>
          <Text style={styles.hotelName}>{homestayData.name}</Text>
          <Text style={styles.hotelAddress}>{locationRender(homestayData.location)}</Text>
          
          <View style={styles.distanceContainer}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.distanceText}>Cách bạn {homestayData.distanceToCenter}km</Text>
            <TouchableOpacity style={styles.mapButton} onPress={handleMapPress}>
              <Text style={styles.mapButtonText}>Xem bản đồ</Text>
            </TouchableOpacity>
          </View>
          
          {/* Promotion Badge */}
          <View style={styles.badgeContainer}>
            <View style={styles.redBadge}>
              <Text style={styles.badgeText}>🎁 Nhận 1 blindbox khi đặt phòng thành công</Text>
            </View>
            
            <View style={styles.orangeBadge}>
              <Text style={styles.badgeText}>🎫 Nhiều voucher hấp dẫn cho thành viên VIP</Text>
            </View>
            
            <TouchableOpacity style={styles.nightButton}>
              <Text style={styles.nightButtonText}>🌙 Đi đêm | 22:00, 22/05 → 12:00, 17/03</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Price and Book Button */}
        <View style={styles.priceSection}>
          <View>
            <Text style={styles.priceLabel}>Chỉ từ</Text>
            <View style={styles.priceRow}>
              <Text style={styles.originalPrice}>
                {formatPrice(homestayData.originalPricePerNight)}
              </Text>
              <Text style={styles.discountedPrice}>
                {formatPrice(homestayData.pricePerNight)}
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.chooseRoomButton}
            onPress={() => navigation.navigate('CheckOut')}
          >
            <Text style={styles.chooseRoomButtonText}>Chọn phòng</Text>
          </TouchableOpacity>
        </View>

        {/* Amenities Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tiện ích homestay</Text>
          <FlatList
            data={amenities}
            renderItem={renderAmenity}
            keyExtractor={item => item.id}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={styles.amenitiesList}
          />
        </View>
        
        {/* Features Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Mô tả</Text>
          <Text style={styles.policyText}>{homestayData.description}</Text>
        </View>
        
        {/* Policies Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quy định</Text>
          
          {PolicyData.map((policy, index) => (
            <View key={index} style={styles.policyItem}>
              <Text style={styles.policyTitle}>{policy.policyHeader}</Text>
              {policy.policyContent.map((content, contentIndex) => (
                <Text key={contentIndex} style={styles.policyText}>• {content}</Text>
              ))}
            </View>
          ))}
        </View>
        
        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  mainImageContainer: {
    height: 250,
    width: '100%',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  thumbnailsList: {
    gap: 10,
  },
  thumbnailContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: '#007AFF',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  hotelInfoContainer: {
    padding: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  starIcon: {
    marginRight: 2,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hotelAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  distanceText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
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
  badgeContainer: {
    marginBottom: 15,
  },
  redBadge: {
    backgroundColor: '#FFE4E1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FFB3B3',
  },
  orangeBadge: {
    backgroundColor: '#FFF4E6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FFD480',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  nightButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 5,
  },
  nightButtonText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  priceSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  priceLabel: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    color: '#9ca3af',
    textDecorationLine: 'line-through',
    fontSize: 14,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  chooseRoomButton: {
    backgroundColor: '#f97316',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  chooseRoomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  amenitiesList: {
    gap: 15,
  },
  amenityItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  amenityText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  policyItem: {
    marginBottom: 20,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  policyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 3,
  },
  bottomPadding: {
    height: 50,
  },
});