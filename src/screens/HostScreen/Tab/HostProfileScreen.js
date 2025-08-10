import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, StyleSheet, ActivityIndicator, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/auth.slice";
import { clearUserProfile } from "../../../redux/slices/user.slice";
import { fetchHostByAccount, clearHost, updateHostByAccount } from "../../../redux/slices/host.slice";

import { ActionButtons } from '../../../components/HostProfileScreen/ActionButtons';
import { LogoutConfirmModal } from '../../../components/HostProfileScreen/LogoutConfirmModal';

// Import the new components
import { Header } from '../../../components/Host/HostProfile/Header';
import { Bio } from '../../../components/Host/HostProfile/Bio';
import { Location } from '../../../components/Host/HostProfile/Location';
import { Subscription } from '../../../components/Host/HostProfile/Subscription';
import { Stats } from '../../../components/Host/HostProfile/Stats';
import { Information } from '../../../components/Host/HostProfile/Information';

export default function HostProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  // Get data from Redux store
  const { user } = useSelector(state => state.auth);
  const { host, loading, error, updateLoading } = useSelector(state => state.host);
  const accountId = user?.id || user?.accountId;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '' });
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch host data on component mount
  useEffect(() => {
    if (accountId) {
      dispatch(fetchHostByAccount(accountId));
    }
  }, [dispatch, accountId]);

  // Update editedData when host data changes
  useEffect(() => {
    if (host) {
      setEditedData({
        name: host.name || '',
        phone: host.phone || '',
        bio: host.bio || '',
        location: {
          address: host.location?.address || '',
          district: host.location?.district || '',
          city: host.location?.city || '',
          province: host.location?.province || '',
        },
        socialLinks: host.socialLinks || []
      });
    }
  }, [host]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserProfile());
    dispatch(clearHost());
  };

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    if (!editedData.name?.trim()) {
      errors.name = 'Tên là bắt buộc';
    }
    
    if (editedData.phone && !/^[0-9+\-\s()]{8,15}$/.test(editedData.phone.trim())) {
      errors.phone = 'Số điện thoại không hợp lệ';
    }
    
    // Validate social links
    if (editedData.socialLinks && editedData.socialLinks.length > 0) {
      editedData.socialLinks.forEach((link, index) => {
        if (!link.platform?.trim()) {
          errors[`socialLinks.${index}.platform`] = 'Tên platform không được để trống';
        }
        if (!link.url?.trim()) {
          errors[`socialLinks.${index}.url`] = 'URL không được để trống';
        } else if (!/^https?:\/\/.+\..+/.test(link.url.trim())) {
          errors[`socialLinks.${index}.url`] = 'URL không hợp lệ';
        }
      });
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveProfile = async () => {
    try {
      // Clear previous errors
      setValidationErrors({});
      
      // Validate form
      if (!validateForm()) {
        Alert.alert('Lỗi xác thực', 'Vui lòng kiểm tra lại thông tin đã nhập');
        return;
      }
      
      // Prepare payload - only send non-empty fields
      const payload = {};
      
      if (editedData.name?.trim()) {
        payload.name = editedData.name.trim();
      }
      
      if (editedData.phone?.trim()) {
        payload.phone = editedData.phone.trim();
      }
      
      if (editedData.bio?.trim()) {
        payload.bio = editedData.bio.trim();
      }
      
      // Location - only include if at least one field is filled
      const location = {};
      if (editedData.location?.address?.trim()) location.address = editedData.location.address.trim();
      if (editedData.location?.district?.trim()) location.district = editedData.location.district.trim();
      if (editedData.location?.city?.trim()) location.city = editedData.location.city.trim();
      if (editedData.location?.province?.trim()) location.province = editedData.location.province.trim();
      
      if (Object.keys(location).length > 0) {
        payload.location = location;
      }
      
      // Social links - filter out empty ones
      const validSocialLinks = editedData.socialLinks?.filter(link => 
        link.platform?.trim() && link.url?.trim()
      );
      if (validSocialLinks && validSocialLinks.length > 0) {
        payload.socialLinks = validSocialLinks.map(link => ({
          platform: link.platform.trim(),
          url: link.url.trim()
        }));
      }
      
      console.log('Updating profile with payload:', payload);
      
      // Dispatch update action
      const result = await dispatch(updateHostByAccount({ 
        accountId, 
        payload 
      }));
      
      if (updateHostByAccount.fulfilled.match(result)) {
        setIsEditing(false);
        Alert.alert(
          'Thành công', 
          'Thông tin hồ sơ đã được cập nhật!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Refresh host data
                dispatch(fetchHostByAccount(accountId));
              }
            }
          ]
        );
      } else {
        throw new Error(result.payload?.message || 'Cập nhật thất bại');
      }
      
    } catch (err) {
      console.error('Error updating profile:', err);
      
      let errorMessage = 'Không thể cập nhật hồ sơ. Vui lòng thử lại.';
      
      if (err.message) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      Alert.alert('Lỗi', errorMessage);
    }
  };

  const handleRetry = () => {
    if (accountId) {
      dispatch(fetchHostByAccount(accountId));
    }
  };

  const updateField = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const updateLocationField = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  const addSocialLink = () => {
    if (newSocialLink.platform.trim() && newSocialLink.url.trim()) {
      // Validate URL format
      if (!/^https?:\/\/.+\..+/.test(newSocialLink.url.trim())) {
        Alert.alert('Lỗi', 'URL không hợp lệ. Vui lòng nhập URL có định dạng: http://... hoặc https://...');
        return;
      }
      
      setEditedData(prev => ({
        ...prev,
        socialLinks: [...(prev.socialLinks || []), { 
          platform: newSocialLink.platform.trim(),
          url: newSocialLink.url.trim()
        }]
      }));
      setNewSocialLink({ platform: '', url: '' });
    } else {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ tên platform và URL');
    }
  };

  const removeSocialLink = (index) => {
    setEditedData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const cancelEdit = () => {
    // Reset edited data to original host data
    if (host) {
      setEditedData({
        name: host.name || '',
        phone: host.phone || '',
        bio: host.bio || '',
        location: {
          address: host.location?.address || '',
          district: host.location?.district || '',
          city: host.location?.city || '',
          province: host.location?.province || '',
        },
        socialLinks: host.socialLinks || []
      });
    }
    setValidationErrors({});
    setNewSocialLink({ platform: '', url: '' });
    setIsEditing(false);
  };

  // Loading state
  if (loading && !host) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
          <Text style={styles.loadingText}>Đang tải thông tin...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error && !host) {
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
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Update Loading Overlay */}
        {updateLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FFA500" />
            <Text style={styles.loadingText}>Đang cập nhật...</Text>
          </View>
        )}
        
        <ScrollView 
          style={styles.container} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header  */}
          <Header
            host={host}
            isEditing={isEditing}
            editedData={editedData}
            updateField={updateField}
            validationErrors={validationErrors}
          />

          {/* Bio  */}
          <Bio
            host={host}
            isEditing={isEditing}
            editedData={editedData}
            updateField={updateField}
            newSocialLink={newSocialLink}
            setNewSocialLink={setNewSocialLink}
            addSocialLink={addSocialLink}
            removeSocialLink={removeSocialLink}
          />

          {/* Location  */}
          <Location
            host={host}
            isEditing={isEditing}
            editedData={editedData}
            updateLocationField={updateLocationField}
          />

          {/* Read-only sections when editing */}
          {!isEditing && (
            <>
              {/* Subscription  */}
              <Subscription host={host} />

              {/* Stats  */}
              <Stats host={host} />

              {/* Information  */}
              <Information host={host} />
            </>
          )}

        <View style={styles.stickyButtonContainer}>
          <ActionButtons 
            isEditing={isEditing}
            saveProfile={saveProfile}
            cancelEdit={cancelEdit}
            setEditedData={setEditedData}
            profileData={host}
            setIsEditing={setIsEditing}
            setShowLogoutConfirm={setShowLogoutConfirm}
            updateLoading={updateLoading}
          />
        </View>

        </ScrollView>

        {/* Sticky Action Buttons */}


        <LogoutConfirmModal 
          visible={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogout}
        />
       
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  keyboardAvoid: {
    flex: 1,
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
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
  stickyButtonContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
});