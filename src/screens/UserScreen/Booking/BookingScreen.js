import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, Text, View, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../redux/hooks/useAuth';

import { fetchHomestayById } from '../../../redux/slices/homestay.slice';
import { convertToHotelImages, formatPrice, getStarRating } from '../../../utils/bookingUtils';
import { openGoogleMaps } from '../../../utils/mapUtil';
import { PolicyData } from '../../../data/MockData';

// BookingScreen components
import BookingImages from '../../../components/BookingScreen/BookingImages';
import BookingInfo from '../../../components/BookingScreen/BookingInfo';
import BookingPriceSection from '../../../components/BookingScreen/BookingPriceSection';
import BookingAmenities from '../../../components/BookingScreen/BookingAmenities';
import BookingFeatures from '../../../components/BookingScreen/BookingFeatures';
import BookingDescription from '../../../components/BookingScreen/BookingDescription';
import BookingHostInfo from '../../../components/BookingScreen/BookingHostInfo';
import BookingPolicies from '../../../components/BookingScreen/BookingPolicies';

import ReviewListSection from '../../../components/BookingScreen/ReviewSection/ReviewListSection';
import AddReviewSection from '../../../components/BookingScreen/ReviewSection/AddReviewSection';

export default function BookingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch()
  const { user } = useAuth();
  const accountId = user?.accountId;;
  const { homestayId } = route.params || {};
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { selectedHomestay: homestayData, fetchingById: loading, fetchByIdError: error } = useSelector(state => state.homestay);

  useEffect(() => {
    if (homestayId) {
      dispatch(fetchHomestayById(homestayId));
    }
  }, [homestayId, dispatch]);

  const getAmenitiesArray = (amenities) => {
    if (!amenities) return [];
    const amenityMapping = {
      wifi: { name: 'WiFi miễn phí', icon: 'wifi', type: 'material' },
      airConditioner: { name: 'Máy lạnh', icon: 'ac-unit', type: 'material' },
      kitchen: { name: 'Nhà bếp', icon: 'kitchen', type: 'material' },
      privateBathroom: { name: 'Phòng tắm riêng', icon: 'bathroom', type: 'material' },
      pool: { name: 'Hồ bơi', icon: 'pool', type: 'material' },
      petAllowed: { name: 'Cho phép thú cưng', icon: 'pets', type: 'material' },
      parking: { name: 'Chỗ đậu xe', icon: 'local-parking', type: 'material' },
      balcony: { name: 'Ban công', icon: 'balcony', type: 'material' },
      bbqArea: { name: 'Khu vực BBQ', icon: 'outdoor-grill', type: 'material' },
      roomService: { name: 'Dịch vụ phòng', icon: 'room-service', type: 'material' },
      securityCamera: { name: 'Camera an ninh', icon: 'security', type: 'material' }
    };
    return Object.entries(amenities)
      .filter(([key, value]) => value === true)
      .map(([key, value], index) => ({
        id: `${key}_${index}`,
        name: amenityMapping[key]?.name || key,
        icon: amenityMapping[key]?.icon || 'help',
        type: amenityMapping[key]?.type || 'material'
      }));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Đang tải thông tin homestay...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Không thể tải thông tin homestay</Text>
          <Text style={styles.errorSubText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => dispatch(fetchHomestayById(homestayId))}
          >
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!homestayData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Không tìm thấy thông tin homestay</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryButtonText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const hotelImages = convertToHotelImages(homestayData.imageList || []);
  const amenities = getAmenitiesArray(homestayData.amenities || {});
  const starRating = getStarRating(homestayData.averageRating || 0);
  
  const locationRender = (location) => {
    if (!location) return 'Chưa có thông tin địa chỉ';
    return `${location.address || ''}, ${location.district || ''}, ${location.city || ''}, ${location.province || ''}`;
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

  const handleChooseRoom = () => {
    navigation.navigate('CheckOut', { homestayId: homestayData.id });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <BookingImages 
          hotelImages={hotelImages} 
          selectedImageIndex={selectedImageIndex} 
          setSelectedImageIndex={setSelectedImageIndex} 
          renderThumbnail={renderThumbnail}
        />
        <BookingInfo 
          homestayData={homestayData} 
          starRating={starRating} 
          locationRender={locationRender} 
          handleMapPress={handleMapPress}
        />
        <BookingPriceSection 
          homestayData={homestayData} 
          onChooseRoom={handleChooseRoom}
        />
        <BookingAmenities amenities={amenities} />
        <BookingFeatures features={homestayData.features} />
        <BookingDescription description={homestayData.description} />



        <BookingHostInfo host={homestayData.host} />
        <BookingPolicies homestayPolicies={homestayData.policies} policyData={PolicyData} />

        {accountId && homestayData && (
          <AddReviewSection
            accountId={accountId}
            stayCationId={homestayData.id}
            onReviewSubmitted={() => {
              dispatch(fetchHomestayById(homestayData.id)); 
            }}
          />
        )}

        <ReviewListSection 
          reviews={homestayData.reviews} 
          averageRating={homestayData.averageRating}
          reviewCount={homestayData.reviewCount}
        />

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Main container styles
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Loading states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },

  // Error states
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Image gallery styles (only what's used in this component)
  thumbnailContainer: {
    width: 60,
    height: 40,
    marginHorizontal: 4,
    borderRadius: 4,
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
    resizeMode: 'cover',
  },

  // General styles
  bottomPadding: {
    height: 20,
  },
});