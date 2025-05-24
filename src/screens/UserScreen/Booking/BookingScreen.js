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
import {HomestayData} from '../../../data/MockData';



export default function BookingScreen() {
  const navigation = useNavigation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Use the first homestay from mock data
  const homestayData = HomestayData[0];

  // Convert imageList to the format expected by the component
  const hotelImages = convertToHotelImages(homestayData.imageList);

  // Create amenities array from homestayData.amenities
  const amenities = getAmenitiesArray(homestayData.amenities);

  // Get policy texts
  const policyTexts = getPolicyTexts(homestayData.policies);

  // Get star rating array
  const starRating = getStarRating(homestayData.averageRating);

  const renderThumbnail = ({ item, index }) => (
    <TouchableOpacity 
      style={[styles.thumbnailContainer, selectedImageIndex === index && styles.selectedThumbnail]} 
      onPress={() => setSelectedImageIndex(index)}
    >
      <Image source={{ uri: item.uri }} style={styles.thumbnailImage} />
    </TouchableOpacity>
  );

  // Updated render amenity item
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
          <Text style={styles.hotelAddress}>{homestayData.location.address}</Text>
          
          <View style={styles.distanceContainer}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.distanceText}>{homestayData.location.city}, {homestayData.location.province}</Text>
          </View>
          
          {/* Promotion Badge */}
          <View style={styles.promotionContainer}>
            <View style={styles.promotionBadge}>
              <Text style={styles.promotionText}>Giảm {homestayData.discountPercentage}% khi đặt phòng trực tuyến</Text>
            </View>
            <TouchableOpacity style={styles.registrationButton}>
              <Text style={styles.registrationButtonText}>Đang nhận đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Price and Book Button */}
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.priceLabel}>Chỉ từ</Text>
            <View style={styles.priceRow}>
              <Text style={styles.originalPrice}>{formatPrice(homestayData.originalPricePerNight)}</Text>
              <Text style={styles.priceValue}>{formatPrice(homestayData.pricePerNight)}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={() => navigation.navigate('CheckOut')}
          >
            <Text style={styles.bookButtonText}>Chọn phòng</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.separator}>
          <Text style={styles.separatorText}>Xem tất cả ›</Text>
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
          <TouchableOpacity>
            <Text style={styles.viewAllText}>Xem tất cả ›</Text>
          </TouchableOpacity>
        </View>
        
        {/* Features Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Đặc điểm phòng</Text>
          {homestayData.features.map((feature, index) => (
            <Text key={index} style={styles.featureText}>• {feature}</Text>
          ))}
        </View>
        
        {/* Policies Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quy định</Text>
          
          <View style={styles.policyItem}>
            <Text style={styles.policyTitle}>Check-in và trả phòng</Text>
            <Text style={styles.policyText}>• Nhận phòng từ 14:00, trả phòng trước 12:00</Text>
            <Text style={styles.policyText}>• Quý khách vui lòng xuất trình CMND/CCCD/Passport khi nhận phòng</Text>
          </View>
          
          <View style={styles.policyItem}>
            <Text style={styles.policyTitle}>Chính sách hủy phòng</Text>
            <Text style={styles.policyText}>• {policyTexts.refund}</Text>
            <Text style={styles.policyText}>• {policyTexts.pet}</Text>
            <Text style={styles.policyText}>• {policyTexts.smoking}</Text>
          </View>
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
  },
  promotionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promotionBadge: {
    backgroundColor: '#FFE4E1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    flex: 1,
    marginRight: 10,
  },
  promotionText: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  registrationButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  registrationButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  bookButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  separatorText: {
    color: '#007AFF',
    fontSize: 14,
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
  viewAllText: {
    color: '#007AFF',
    fontSize: 14,
    marginTop: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
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