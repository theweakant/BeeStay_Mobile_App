import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomestayById } from '../../../redux/slices/homestay.slice';
import HomestayUpdateModal from '../../../components/Modal/HomestayDetail/HomestayUpdateModal';

// Import components
import HomestayHeader from '../../../components/Host/HostHomestay/HostHomestayDetail/HomestayHeader';
import HomestayInfo from '../../../components/Host/HostHomestay/HostHomestayDetail/HomestayInfo';
import HomestayDetails from '../../../components/Host/HostHomestay/HostHomestayDetail/HomestayDetails';
import HomestayAmenities from '../../../components/Host/HostHomestay/HostHomestayDetail/HomestayAmenities';
import HomestayDescription from '../../../components/Host/HostHomestay/HostHomestayDetail/HomestayDescription';
import HomestayReview from '../../../components/Host/HostHomestay/HostHomestayDetail/HomestayReview';
import HomestayActionButtons from '../../../components/Host/HostHomestay/HostHomestayDetail/HomestayActionButtons';

import defaultHomestayImage from '../../../../assets/AvailableImage/default_homestay_image.png'; 

export default function HostHomestayDetailScreen({ 
  route,
  formatCurrency 
}) {
  const dispatch = useDispatch();
  const { homestayId } = route.params;
  
  const {
    selectedHomestay,
    fetchingById,
    fetchByIdError
  } = useSelector(state => state.homestay);
  
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    if (homestayId) {
      dispatch(fetchHomestayById(homestayId));
    }
  }, [homestayId, dispatch]);

  // Handle retry
  const handleRetry = () => {
    if (homestayId) {
      dispatch(fetchHomestayById(homestayId));
    }
  };

  // Handle toggle status
  const handleToggleStatus = () => {
    if (!selectedHomestay) return;
    
    const newStatus = selectedHomestay.status === 'active' ? 'inactive' : 'active';
    const statusText = newStatus === 'active' ? 'kích hoạt' : 'vô hiệu hóa';
    
    Alert.alert(
      'Xác nhận',
      `Bạn có muốn ${statusText} homestay "${selectedHomestay.name}"?`,
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Xác nhận', 
          onPress: () => {
            // TODO: Implement toggle status API call
            console.log(`Toggle status for homestay ${selectedHomestay.id} to ${newStatus}`);
          }
        }
      ]
    );
  };

  // Handle edit
  const handleEdit = () => {
    if (!selectedHomestay) {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin homestay để chỉnh sửa');
      return;
    }
    setShowUpdateModal(true);
  };

  // Handle update success
  const handleUpdateSuccess = () => {
    if (homestayId) {
      dispatch(fetchHomestayById(homestayId));
    }
  };

  const renderLoadingState = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color="#FF6B35" />
      <Text style={styles.loadingText}>Đang tải thông tin...</Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>Không thể tải thông tin</Text>
      <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
        <Text style={styles.retryButtonText}>Thử lại</Text>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    if (fetchingById) {
      return renderLoadingState();
    }

    if (fetchByIdError) {
      return renderErrorState();
    }

    if (!selectedHomestay) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Không tìm thấy thông tin homestay</Text>
        </View>
      );
    }

    return (
      <>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Header with Image and Back Button */}
          <HomestayHeader 
            imageList={selectedHomestay.imageList || []}
            defaultImage={defaultHomestayImage}
          />

          {/* Main Info Section */}
          <HomestayInfo
            homestay={selectedHomestay}
            formatCurrency={formatCurrency}
          />

          {/* Details Grid */}
          <HomestayDetails homestay={selectedHomestay} />

          {/* Amenities */}
          <HomestayAmenities amenities={selectedHomestay.amenities} />

          {/* Description */}
          <HomestayDescription 
            description={selectedHomestay.description}
            features={selectedHomestay.features}
          />
          
          <HomestayReview 
            reviews={selectedHomestay?.reviews}
            averageRating={selectedHomestay?.averageRating}
            reviewCount={selectedHomestay?.reviewCount}
          />

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Fixed Action Buttons */}
        <HomestayActionButtons
          homestay={selectedHomestay}
          onEdit={handleEdit}
          onToggleStatus={handleToggleStatus}
          formatCurrency={formatCurrency}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Content */}
      {renderContent()}

      {/* Update Modal */}
      <HomestayUpdateModal
        visible={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        homestay={selectedHomestay}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Main Structure
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  
  // Loading & Error States
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  loadingText: {
    fontSize: 14,
    color: '#333333',
    marginTop: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

});