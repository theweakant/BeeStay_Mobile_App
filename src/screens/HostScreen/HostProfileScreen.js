import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, StyleSheet, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/auth.slice";
import { clearUserProfile } from "../../redux/slices/user.slice";
import { fetchHostByAccount, clearHost } from "../../redux/slices/host.slice";

// Import components
import { CoverPhoto } from '../../components/HostProfileScreen/CoverPhoto';
import { ProfileHeader } from '../../components/HostProfileScreen/ProfileHeader';
import { HostStats } from '../../components/HostProfileScreen/HostStats';
import { BioSection } from '../../components/HostProfileScreen/BioSection';
import { ContactInformation } from '../../components/HostProfileScreen/ContactInformation';
import { NotificationSettings } from '../../components/HostProfileScreen/NotificationSettings';
import { ActionButtons } from '../../components/HostProfileScreen/ActionButtons';

// Import modals
import { LogoutConfirmModal } from '../../components/HostProfileScreen/LogoutConfirmModal';

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
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
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

  const toggleNotification = (key) => {
    setEditedData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
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
          <ActivityIndicator size="large" color="#FF6B6B" />
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
          <ActivityIndicator size="large" color="#FF6B6B" />
        </View>
      )}
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* TEST 1: Chỉ hiển thị CoverPhoto và ProfileHeader */}
        <CoverPhoto coverPhoto={host?.coverPhoto || host?.avatar} />
        
        <ProfileHeader 
          profileData={host}
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
          formatDate={formatDate}
        />
        
        {/* COMMENT CÁC COMPONENT KHÁC ĐỂ TEST */}
        
        {/* <HostStats profileData={host} /> */}
        
        <BioSection 
          profileData={host}
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
        />
        
        <ContactInformation 
          profileData={host}
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
        />
        

        

        
        {/* <NotificationSettings 
          editedData={editedData}
          toggleNotification={toggleNotification}
        /> */}
        
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
    backgroundColor: '#fff',
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
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
