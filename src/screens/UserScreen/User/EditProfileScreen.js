import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  StyleSheet 
} from 'react-native';
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
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Không tìm thấy thông tin tài khoản</Text>
        <Text style={styles.subErrorText}>Vui lòng đăng nhập lại</Text>
      </View>
    );
  }

  // Show loading when fetching user data
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text style={styles.loadingText}>Đang tải thông tin...</Text>
      </View>
    );
  }

  // Show error if failed to load user data
  if (error && !profile) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => {
          handleClearError();
          if (accountId) {
            dispatch(fetchUserByAccount(accountIFemaled));
          }
        }}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
 
      {/* Show update error if exists */}
      {updateError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{updateError}</Text>
          <TouchableOpacity onPress={handleClearError}>
            <Text style={styles.closeErrorText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Form Fields */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Tên *</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          placeholder="Nhập tên"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          value={formData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
          keyboardType="phone-pad"
          placeholder="Nhập số điện thoại"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Giới tính</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity 
            style={[styles.genderButton, formData.gender === 'male' && styles.selectedGender]}
            onPress={() => handleInputChange('gender', 'male')}
          >
            <Text style={[styles.genderText, formData.gender === 'male' && styles.selectedGenderText]}>Nam</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.genderButton, formData.gender === 'female' && styles.selectedGender]}
            onPress={() => handleInputChange('gender', 'female')}
          >
            <Text style={[styles.genderText, formData.gender === 'female' && styles.selectedGenderText]}>Nữ</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.genderButton, formData.gender === 'Other' && styles.selectedGender]}
            onPress={() => handleInputChange('gender', 'Other')}
          >
            <Text style={[styles.genderText, formData.gender === 'Other' && styles.selectedGenderText]}>Khác</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Ngày sinh</Text>
        <TextInput
          style={styles.input}
          value={formData.birthDate}
          onChangeText={(text) => handleInputChange('birthDate', text)}
          placeholder="YYYY-MM-DD"
        />
      </View>

      {/* Address Section */}
      <Text style={styles.sectionTitle}>Địa chỉ</Text>
      
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Đường</Text>
        <TextInput
          style={styles.input}
          value={formData.addressResponse.location}
          onChangeText={(text) => handleAddressChange('location', text)}
          placeholder="Nhập tên đường"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Quận/Huyện</Text>
        <TextInput
          style={styles.input}
          value={formData.addressResponse.district}
          onChangeText={(text) => handleAddressChange('district', text)}
          placeholder="Nhập quận/huyện"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Thành phố</Text>
        <TextInput
          style={styles.input}
          value={formData.addressResponse.city}
          onChangeText={(text) => handleAddressChange('city', text)}
          placeholder="Nhập thành phố"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Tỉnh/Thành phố</Text>
        <TextInput
          style={styles.input}
          value={formData.addressResponse.province}
          onChangeText={(text) => handleAddressChange('province', text)}
          placeholder="Nhập tỉnh/thành phố"
        />
      </View>

      {/* Update Button */}
      <TouchableOpacity
        style={[styles.updateButton, updateLoading && styles.disabledButton]}
        onPress={handleUpdateProfile}
        disabled={updateLoading}
      >
        {updateLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.updateButtonText}>Cập nhật thông tin</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  idContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  userIdText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    flex: 1,
  },
  subErrorText: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  closeErrorText: {
    color: '#c62828',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  retryButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedGender: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  genderText: {
    fontSize: 16,
    color: '#333',
  },
  selectedGenderText: {
    color: '#fff',
    fontWeight: '600',
  },
  updateButton: {
    backgroundColor: '#0066CC',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;