import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Modal,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../redux/hooks/useAuth'; 
import {
  fetchUserByAccount,
  updateUserProfileByAccount, 
  selectUserProfile,
  selectUserLoading,
  selectUserError,
  selectUpdateLoading,
  selectUpdateError,
  clearError
} from '../../../redux/slices/user.slice';

const EditProfileScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { user } = useAuth(); 
  
  // Lấy accountId từ useAuth (ưu tiên) hoặc route params (fallback)
  const accountId = user?.accountId || route.params?.accountId;
  
  console.log('Current accountId:', accountId);
  console.log('User from auth:', user);

  // Redux selectors
  const profile = useSelector(selectUserProfile);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const updateLoading = useSelector(selectUpdateLoading);
  const updateError = useSelector(selectUpdateError);
  
  // Local state cho form
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    birthDate: '',
    addressResponse: {
      location: '',
      district: '',
      city: '',
      province: ''
    }
  });

  // Load user data khi component mount
  useEffect(() => {
    if (accountId) {
      dispatch(fetchUserByAccount(accountId));
    } else {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin tài khoản. Vui lòng đăng nhập lại.');
    }
  }, [dispatch, accountId]);

  // Update form data khi profile được load
  useEffect(() => {
    if (profile) {
      console.log('Loaded profile from Redux:', profile);
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
        gender: profile.gender || '',
        birthDate: profile.birthDate || '',
        addressResponse: {
          location: profile.addressResponse?.location || '',
          district: profile.addressResponse?.district || '',
          city: profile.addressResponse?.city || '',
          province: profile.addressResponse?.province || ''
        }
      });
    }
  }, [profile]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      addressResponse: {
        ...prev.addressResponse,
        [field]: value
      }
    }));
  };

  // Handle update profile
  const handleUpdateProfile = () => {
    if (!accountId) {
      Alert.alert('Lỗi', 'Không tìm thấy Account ID');
      return;
    }

    // Validate required fields
    if (!formData.name?.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên');
      return;
    }

    // Chuẩn bị data để update theo accountId
    const updateData = {
      accountId: accountId,
      userData: {
        ...formData,
        name: formData.name.trim(), // Trim whitespace
        phone: formData.phone?.trim() || '',
      }
    };
    
    console.log('Data to update by account:', updateData);

    dispatch(updateUserProfileByAccount(updateData))
      .unwrap()
      .then((result) => {
        console.log('Update success:', result);
        Alert.alert('Thành công', 'Cập nhật thông tin thành công!');
        // Refresh lại profile sau khi update
        dispatch(fetchUserByAccount(accountId));
      })
      .catch((error) => {
        console.error('Update failed:', error);
        Alert.alert('Lỗi', error?.message || error || 'Có lỗi xảy ra khi cập nhật');
      });
  };

  // Handle clear errors
  const handleClearError = () => {
    dispatch(clearError());
  };

  // Show error if no accountId
  if (!accountId) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorTitle}>Không tìm thấy thông tin tài khoản</Text>
          <Text style={styles.errorSubtitle}>Vui lòng đăng nhập lại</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show loading when fetching user data
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
          <Text style={styles.loadingText}>Đang tải thông tin...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show error if failed to load user data
  if (error && !profile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorTitle}>{error}</Text>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => {
              handleClearError();
              if (accountId) {
                dispatch(fetchUserByAccount(accountId)); // Fixed typo here
              }
            }}
          >
            <Text style={styles.primaryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chỉnh sửa thông tin</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Show update error if exists */}
        {updateError && (
          <View style={styles.errorBanner}>
            <View style={styles.errorBannerContent}>
              <Text style={styles.errorBannerText}>{updateError}</Text>
              <TouchableOpacity 
                onPress={handleClearError}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Họ và tên *</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              placeholder="Nhập họ và tên"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              keyboardType="phone-pad"
              placeholder="Nhập số điện thoại"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Giới tính</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity 
                style={[
                  styles.genderOption, 
                  formData.gender === 'male' && styles.genderOptionSelected
                ]}
                onPress={() => handleInputChange('gender', 'male')}
              >
                <Text style={[
                  styles.genderText, 
                  formData.gender === 'male' && styles.genderTextSelected
                ]}>
                  Nam
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.genderOption, 
                  formData.gender === 'female' && styles.genderOptionSelected
                ]}
                onPress={() => handleInputChange('gender', 'female')}
              >
                <Text style={[
                  styles.genderText, 
                  formData.gender === 'female' && styles.genderTextSelected
                ]}>
                  Nữ
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.genderOption, 
                  formData.gender === 'Other' && styles.genderOptionSelected
                ]}
                onPress={() => handleInputChange('gender', 'Other')}
              >
                <Text style={[
                  styles.genderText, 
                  formData.gender === 'Other' && styles.genderTextSelected
                ]}>
                  Khác
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Ngày sinh</Text>
            <TextInput
              style={styles.input}
              value={formData.birthDate}
              onChangeText={(text) => handleInputChange('birthDate', text)}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Địa chỉ</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Địa chỉ cụ thể</Text>
            <TextInput
              style={styles.input}
              value={formData.addressResponse.location}
              onChangeText={(text) => handleAddressChange('location', text)}
              placeholder="Số nhà, tên đường"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Quận/Huyện</Text>
            <TextInput
              style={styles.input}
              value={formData.addressResponse.district}
              onChangeText={(text) => handleAddressChange('district', text)}
              placeholder="Chọn quận/huyện"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Thành phố</Text>
            <TextInput
              style={styles.input}
              value={formData.addressResponse.city}
              onChangeText={(text) => handleAddressChange('city', text)}
              placeholder="Chọn thành phố"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tỉnh/Thành phố</Text>
            <TextInput
              style={styles.input}
              value={formData.addressResponse.province}
              onChangeText={(text) => handleAddressChange('province', text)}
              placeholder="Chọn tỉnh/thành phố"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer with Update Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.primaryButton,
            updateLoading && styles.primaryButtonDisabled
          ]}
          onPress={handleUpdateProfile}
          disabled={updateLoading}
        >
          {updateLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>Cập nhật thông tin</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Layout Structure
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  
  scrollView: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  
  scrollContent: {
    paddingBottom: 20,
  },
  
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },

  // Center Container for Loading/Error States
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Error Handling
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 8,
  },
  
  errorSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  
  errorBanner: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  
  errorBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  
  errorBannerText: {
    flex: 1,
    fontSize: 14,
    color: '#DC2626',
  },
  
  closeButton: {
    marginLeft: 12,
    padding: 4,
  },
  
  closeButtonText: {
    fontSize: 16,
    color: '#DC2626',
    fontWeight: '600',
  },

  // Section Styling
  section: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
  },

  // Input Components
  inputGroup: {
    marginBottom: 20,
  },
  
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 50,
  },

  // Gender Selection
  genderContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  
  genderOption: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  
  genderOptionSelected: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  
  genderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  
  genderTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Primary Button (BeeStay Design System)
  primaryButton: {
    backgroundColor: '#FFA500',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    shadowColor: '#FFA500',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  
  primaryButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
    elevation: 0,
  },
  
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default EditProfileScreen;