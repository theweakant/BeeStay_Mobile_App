import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, FlatList } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BookingScreen() {
  const navigation = useNavigation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  

  const hotelImages = [
    { id: '1', uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
    { id: '2', uri: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80' },
    { id: '3', uri: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
    { id: '4', uri: 'https://images.unsplash.com/photo-1584132905271-512c958d674a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
  ];

  const amenities = [
    { id: '1', name: 'Wifi', icon: 'wifi', type: 'font-awesome' },
    { id: '2', name: 'Nước nóng', icon: 'hot-tub', type: 'material' },
    { id: '3', name: 'Máy lạnh', icon: 'air-conditioner', type: 'material-community' },
    { id: '4', name: 'Hồ bơi', icon: 'pool', type: 'material' },
    { id: '5', name: 'Bãi đỗ xe', icon: 'local-parking', type: 'material' },
    { id: '6', name: 'Thang máy', icon: 'elevator', type: 'material-community' },
  ];


  const renderThumbnail = ({ item, index }) => (
    <TouchableOpacity 
      style={[styles.thumbnailContainer, selectedImageIndex === index && styles.selectedThumbnail]} 
      onPress={() => setSelectedImageIndex(index)}
    >
      <Image source={{ uri: item.uri }} style={styles.thumbnailImage} />
    </TouchableOpacity>
  );

  // Render amenity item
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
            <Text style={styles.ratingValue}>4.9</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <FontAwesome 
                  key={star} 
                  name={star <= 4 ? "star" : "star-half-empty"} 
                  size={14} 
                  color="#FFD700" 
                  style={styles.starIcon}
                />
              ))}
            </View>
          </View>
          
          <Text style={styles.hotelName}>BEESTAY HOLTEL</Text>
          <Text style={styles.hotelAddress}>123A Nguyễn Lương Bằng, P. Tân Phong, Quận 7, TP.HCM</Text>
          
          <View style={styles.distanceContainer}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.distanceText}>Cách trung tâm 1.7km</Text>
          </View>
          
          {/* Promotion Badge */}
          <View style={styles.promotionContainer}>
            <View style={styles.promotionBadge}>
              <Text style={styles.promotionText}>Giảm 5% khi đặt phòng trực tuyến</Text>
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
            <Text style={styles.priceValue}>269.000đ</Text>
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
            <Text style={styles.policyText}>• Đặt phòng này không thể hủy hoặc thay đổi</Text>
            <Text style={styles.policyText}>• Không hoàn tiền nếu hủy hoặc không đến</Text>
            <Text style={styles.policyText}>• Có thể thay đổi ngày đặt phòng trước 1 ngày với phí 0đ (tùy vào tình trạng phòng trống)</Text>
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
    backgroundColor: '#f8f8f8',
  },
  mainImageContainer: {
    width: '100%',
    height: 220,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailsContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
  },
  thumbnailsList: {
    paddingHorizontal: 16,
  },
  thumbnailContainer: {
    width: 80,
    height: 60,
    marginRight: 8,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: '#FF9800',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  hotelInfoContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    marginRight: 2,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  hotelAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  distanceText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  promotionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  promotionBadge: {
    backgroundColor: '#FFE8E8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#FF5252',
  },
  promotionText: {
    fontSize: 12,
    color: '#FF5252',
  },
  registrationButton: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  registrationButtonText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  separator: {
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  separatorText: {
    fontSize: 14,
    color: '#999',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  amenitiesList: {
    paddingBottom: 8,
  },
  amenityItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  amenityText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
  policyItem: {
    marginBottom: 16,
  },
  policyTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  policyText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 20,
  },
});