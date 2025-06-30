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
import { getFullLocation } from '../../../utils/textUtils'; 
import HomestayUpdateModal from '../../../components/Modal/HomestayDetail/HomestayUpdateModal';

import defaultHomestayImage from '../../../../assets/AvailableImage/default_homestay_image.png'; 


export default function HostHomestayDetailScreen({ 
  route,
  navigation,
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
            // dispatch(toggleHomestayStatus({ id: selectedHomestay.id, status: newStatus }));
            console.log(`Toggle status for homestay ${selectedHomestay.id} to ${newStatus}`);
          }
        }
      ]
    );
  };

  // Handle edit - Navigate to update modal
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
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text style={styles.loadingText}>Đang tải thông tin...</Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.errorTitle}>Có lỗi xảy ra</Text>
      <Text style={styles.errorDescription}>
        Không thể tải thông tin homestay. Vui lòng thử lại.
      </Text>
      <TouchableOpacity 
        style={styles.retryButton}
        onPress={handleRetry}
      >
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
          <Text style={styles.errorDescription}>Không tìm thấy thông tin homestay</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Image */}
<Image
  source={
    selectedHomestay.images && selectedHomestay.images.length > 0 && selectedHomestay.images[0]
      ? { uri: selectedHomestay.images[0] }
      : defaultHomestayImage
  }
  style={styles.mainImage}
  resizeMode="cover"
/>

        {/* Basic Info */}
        <View style={styles.section}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{selectedHomestay.name}</Text>
            <View style={[
              styles.statusBadge,
              selectedHomestay.status === 'active' ? styles.activeBadge : styles.inactiveBadge
            ]}>
              <Text style={[
                styles.statusText,
                selectedHomestay.status === 'active' ? styles.activeText : styles.inactiveText
              ]}>
                {selectedHomestay.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
              </Text>
            </View>
          </View>
          
          <Text style={styles.location}>📍 {getFullLocation(selectedHomestay.location)}</Text>
          <Text style={styles.price}>
            {formatCurrency ? formatCurrency(selectedHomestay.price) : `${selectedHomestay.price?.toLocaleString()} VND`}/đêm
          </Text>
        </View>

        {/* Rating */}
        {selectedHomestay.rating && (
          <View style={styles.section}>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>⭐ {selectedHomestay.rating}</Text>
              <Text style={styles.reviewCount}>
                ({selectedHomestay.reviewCount || 0} đánh giá)
              </Text>
            </View>
          </View>
        )}

        {/* Description */}
        {selectedHomestay.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mô tả</Text>
            <Text style={styles.description}>{selectedHomestay.description}</Text>
          </View>
        )}

        {/* Amenities */}
        {selectedHomestay.amenities && selectedHomestay.amenities.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tiện nghi</Text>
            <View style={styles.amenitiesContainer}>
              {selectedHomestay.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Text style={styles.amenityText}>• {amenity}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Additional Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin chi tiết</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số phòng:</Text>
            <Text style={styles.infoValue}>{selectedHomestay.roomCount || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số khách tối đa:</Text>
            <Text style={styles.infoValue}>{selectedHomestay.maxGuests || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ngày tạo:</Text>
            <Text style={styles.infoValue}>
              {selectedHomestay.createdAt ? new Date(selectedHomestay.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
            </Text>
          </View>
        </View>

        {/* Images Gallery */}
        {selectedHomestay.images && selectedHomestay.images.length > 1 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hình ảnh ({selectedHomestay.images.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.imageGallery}>
                {selectedHomestay.images.map((image, index) => (
                  <Image 
                    key={index}
                    source={{ uri: image }}
                    style={styles.galleryImage}
                    resizeMode="cover"
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.editButton]}
            onPress={handleEdit}
            activeOpacity={0.7}
            disabled={!selectedHomestay}
          >
            <Text style={styles.editButtonText}>✏️ Chỉnh sửa</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.actionButton,
              selectedHomestay.status === 'active' ? styles.deactivateButton : styles.activateButton
            ]}
            onPress={handleToggleStatus}
          >
            <Text style={[
              styles.actionButtonText,
              selectedHomestay.status === 'active' ? styles.deactivateText : styles.activateText
            ]}>
              {selectedHomestay.status === 'active' ? '🔴 Vô hiệu hóa' : '🟢 Kích hoạt'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Content */}
      {renderContent()}

      {/* Update Modal */}
      <HomestayUpdateModal
        visible={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        homestay={selectedHomestay}
        onUpdateSuccess={handleUpdateSuccess}
      />
      {console.log('📦 showUpdateModal:', showUpdateModal)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#6b7280',
    fontWeight: '500',
  },
  headerRight: {
    width: 32,
    height: 32,
  },
  content: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 12,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  mainImage: {
    width: '100%',
    height: 240,
    backgroundColor: '#f3f4f6',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: '#dcfce7',
  },
  inactiveBadge: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeText: {
    color: '#166534',
  },
  inactiveText: {
    color: '#dc2626',
  },
  location: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f59e0b',
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    width: '50%',
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 14,
    color: '#374151',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  imageGallery: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  galleryImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f3f4f6',
  },
  actionSection: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#3b82f6',
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  activateButton: {
    backgroundColor: '#10b981',
  },
  deactivateButton: {
    backgroundColor: '#f59e0b',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  activateText: {
    color: '#ffffff',
  },
  deactivateText: {
    color: '#ffffff',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 20,
  },
});