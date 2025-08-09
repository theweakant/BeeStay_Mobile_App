import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, StyleSheet, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/auth.slice";
import { clearUserProfile } from "../../../redux/slices/user.slice";
import { fetchHostByAccount, clearHost } from "../../../redux/slices/host.slice";

import { ActionButtons } from '../../../components/HostProfileScreen/ActionButtons';

// Import modals
import { LogoutConfirmModal } from '../../../components/HostProfileScreen/LogoutConfirmModal';

export default function HostProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  // Get data from Redux store
  const { user } = useSelector(state => state.auth);
  const { host, loading, error } = useSelector(state => state.host);
  const accountId = user?.id || user?.accountId;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Fetch host data on component mount
  useEffect(() => {
    if (accountId) {
      dispatch(fetchHostByAccount(accountId));
    }
  }, [dispatch, accountId]);

  // Update editedData when host data changes
  useEffect(() => {
    if (host) {
      setEditedData(host);
    }
  }, [host]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserProfile());
    dispatch(clearHost());
  };

  const saveProfile = async () => {
    try {
      setIsEditing(false);
      Alert.alert('Thành công', 'Thông tin hồ sơ đã được cập nhật!');
    } catch (err) {
      console.error('Error updating profile:', err);
      Alert.alert('Lỗi', 'Không thể cập nhật hồ sơ. Vui lòng thử lại.');
    }
  };

  const handleRetry = () => {
    if (accountId) {
      dispatch(fetchHostByAccount(accountId));
    }
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {typeof error === 'string' ? error : 'Không thể tải thông tin hồ sơ'}
          </Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={handleRetry}
          >
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // No data state
  if (!loading && !host) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Không tìm thấy thông tin hồ sơ</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={handleRetry}
          >
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFA500" />
        </View>
      )}
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Host Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {host?.name ? host.name.charAt(0).toUpperCase() : host?.email?.charAt(0).toUpperCase() || 'H'}
              </Text>
            </View>
            {host?.superHost && (
              <View style={styles.superHostBadge}>
                <Text style={styles.superHostText}>SUPER</Text>
              </View>
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{host?.name || 'Chưa cập nhật tên'}</Text>
            <Text style={styles.profileEmail}>{host?.email}</Text>
            <Text style={styles.joinDate}>Tham gia từ {new Date(host?.joinedDate).toLocaleDateString('vi-VN')}</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Thống kê</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{host?.homeStay?.length || 0}</Text>
              <Text style={styles.statLabel}>Homestay</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{host?.averageHomestayRating?.toFixed(1) || '0.0'}</Text>
              <Text style={styles.statLabel}>Đánh giá TB</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{host?.status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}</Text>
              <Text style={styles.statLabel}>Trạng thái</Text>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
          <View style={styles.contactContainer}>
            <View style={styles.contactItem}>
              <View style={styles.contactRow}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{host?.email}</Text>
              </View>
            </View>
            <View style={styles.contactItem}>
              <View style={styles.contactRow}>
                <Text style={styles.contactLabel}>Số điện thoại</Text>
                <Text style={styles.contactValue}>{host?.phone || 'Chưa cập nhật'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Location Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Địa chỉ</Text>
          <View style={styles.locationContainer}>
            <View style={styles.locationItem}>
              <Text style={styles.locationLabel}>Địa chỉ:</Text>
              <Text style={styles.locationValue}>{host?.location?.address || 'Chưa cập nhật'}</Text>
            </View>
            <View style={styles.locationItem}>
              <Text style={styles.locationLabel}>Quận/Huyện:</Text>
              <Text style={styles.locationValue}>{host?.location?.district || 'Chưa cập nhật'}</Text>
            </View>
            <View style={styles.locationItem}>
              <Text style={styles.locationLabel}>Thành phố:</Text>
              <Text style={styles.locationValue}>{host?.location?.city || 'Chưa cập nhật'}</Text>
            </View>
            <View style={styles.locationItem}>
              <Text style={styles.locationLabel}>Tỉnh/Thành:</Text>
              <Text style={styles.locationValue}>{host?.location?.province || 'Chưa cập nhật'}</Text>
            </View>
          </View>
        </View>

        {/* Subscription Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gói đăng ký</Text>
          <View style={styles.subscriptionCard}>
            <View style={styles.subscriptionHeader}>
              <Text style={styles.subscriptionName}>{host?.subscription?.name}</Text>
              <View style={[styles.statusBadge, 
                host?.subscription?.status === 'ACTIVE' ? styles.statusActive : styles.statusInactive
              ]}>
                <Text style={[styles.statusText,
                  host?.subscription?.status === 'ACTIVE' ? styles.statusActiveText : styles.statusInactiveText
                ]}>{host?.subscription?.status}</Text>
              </View>
            </View>
            <View style={styles.subscriptionDates}>
              <Text style={styles.subscriptionDate}>
                Từ: {new Date(host?.subscription?.startDate).toLocaleDateString('vi-VN')}
              </Text>
              <Text style={styles.subscriptionDate}>
                Đến: {new Date(host?.subscription?.endDate).toLocaleDateString('vi-VN')}
              </Text>
            </View>
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giới thiệu</Text>
          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>{host?.bio || 'Chưa có thông tin giới thiệu'}</Text>
          </View>
        </View>

        {/* Homestay List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danh sách Homestay ({host?.homeStay?.length || 0})</Text>
          <View style={styles.homestayGrid}>
            {host?.homeStay?.slice(0, 6).map((homestayId, index) => (
              <View key={index} style={styles.homestayCard}>
                <Text style={styles.homestayId}>ID: {homestayId}</Text>
              </View>
            ))}
            {host?.homeStay?.length > 6 && (
              <View style={styles.homestayCard}>
                <Text style={styles.homestayMore}>+{host.homeStay.length - 6} khác</Text>
              </View>
            )}
          </View>
        </View>
        
        <ActionButtons 
          isEditing={isEditing}
          saveProfile={saveProfile}
          setEditedData={setEditedData}
          profileData={host}
          setIsEditing={setIsEditing}
          setShowLogoutConfirm={setShowLogoutConfirm}
        />

      </ScrollView>

      {/* COMMENT CÁC MODAL ĐỂ TEST */}
      
      <LogoutConfirmModal 
        visible={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1000,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Profile Header
  profileHeader: {
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFA500',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  superHostBadge: {
    position: 'absolute',
    bottom: -5,
    right: -10,
    backgroundColor: '#FFA500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  superHostText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    color: '#999999',
  },

  // Stats Section
  statsSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },

  // Section
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  // Contact
  contactContainer: {
    gap: 12,
  },
  contactItem: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  contactValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },

  // Location
  locationContainer: {
    gap: 8,
  },
  locationItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  locationLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    width: 100,
  },
  locationValue: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },

  // Subscription
  subscriptionCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 16,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subscriptionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: '#4CAF50',
  },
  statusInactive: {
    backgroundColor: '#F44336',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  statusActiveText: {
    color: '#FFFFFF',
  },
  statusInactiveText: {
    color: '#FFFFFF',
  },
  subscriptionDates: {
    gap: 4,
  },
  subscriptionDate: {
    fontSize: 12,
    color: '#666666',
  },

  // Bio
  bioContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 16,
  },
  bioText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },

  // Homestay
  homestayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  homestayCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  homestayId: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '500',
  },
  homestayMore: {
    fontSize: 12,
    color: '#FFA500',
    fontWeight: '600',
  },
});