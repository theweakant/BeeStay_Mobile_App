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
import {
  fetchUserByAccount,
  updateUserProfile,
  selectUserProfile,
  selectUserLoading,
  selectUserError,
  selectUpdateLoading,
  selectUpdateError,
  clearError
} from '../redux/slices/user.slice';

const EditProfileScreen = ({ route }) => {
  const dispatch = useDispatch();
  
  // Lấy userId từ route params hoặc từ auth state
  const { userId, accountId } = route.params || {};
  
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
      street: '',
      district: '',
      city: '',
      province: ''
    }
  });

  // Load user data khi component mount
  useEffect(() => {
    if (accountId) {
      dispatch(fetchUserByAccount(accountId));
    }
  }, [dispatch, accountId]);

  // Update form data khi profile được load
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
        gender: profile.gender || '',
        birthDate: profile.birthDate || '',
        addressResponse: {
          street: profile.addressResponse?.street || '',
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
    if (!profile?.userId) {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng');
      return;
    }

    const userData = {
      userId: profile.userId,
      ...formData
    };
    
    dispatch(updateUserProfile(userData))
      .unwrap()
      .then(() => {
        Alert.alert('Thành công', 'Cập nhật thông tin thành công!');
      })
      .catch((error) => {
        console.error('Update failed:', error);
        Alert.alert('Lỗi', error || 'Có lỗi xảy ra khi cập nhật');
      });
  };

  // Handle clear errors
  const handleClearError = () => {
    dispatch(clearError());
  };

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
            dispatch(fetchUserByAccount(accountId));
          }
        }}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Display User ID */}
      <Text style={styles.userIdText}>User ID: {profile?.userId || userId}</Text>
      
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
        <Text style={styles.label}>Tên</Text>
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
        <TextInput
          style={styles.input}
          value={formData.gender}
          onChangeText={(text) => handleInputChange('gender', text)}
          placeholder="Nam/Nữ"
        />
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
          value={formData.addressResponse.street}
          onChangeText={(text) => handleAddressChange('street', text)}
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
  userIdText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
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