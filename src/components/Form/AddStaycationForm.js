import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Switch,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStaycation, resetCreateState } from '../../redux/slices/homestay.slice';

const AddStaycationForm = () => {
  const dispatch = useDispatch();
  const { creating, createError, createSuccess } = useSelector(state => state.homestay);

  const [formData, setFormData] = useState({
    name: '',
    hostId: '',
    pricePerNight: '',
    originalPricePerNight: '',
    discountPercentage: 0,
    image: '',
    videoTourUrl: '',
    description: '',
    features: [''],
    roomType: '',
    roomCount: 1,
    maxGuests: 1,
    bedCount: 1,
    bathroomCount: 1,
    availableDates: [],
    location: {
      address: '',
      district: '',
      city: '',
      province: ''
    },
    distanceToCenter: 0,
    amenities: {
      wifi: false,
      airConditioner: false,
      kitchen: false,
      privateBathroom: false,
      pool: false,
      petAllowed: false,
      parking: false,
      balcony: false,
      bbqArea: false,
      roomService: false,
      securityCamera: false
    },
    policies: {
      allowPet: false,
      allowSmoking: false,
      refundable: false
    },
    available: true,
    recommended: false,
    instantBook: false,
    flashSale: false
  });

  // Amenities labels tiếng Việt
  const amenityLabels = {
    wifi: 'WiFi',
    airConditioner: 'Điều hòa',
    kitchen: 'Bếp',
    privateBathroom: 'Phòng tắm riêng',
    pool: 'Hồ bơi',
    petAllowed: 'Cho phép thú cưng',
    parking: 'Chỗ đậu xe',
    balcony: 'Ban công',
    bbqArea: 'Khu vực BBQ',
    roomService: 'Dịch vụ phòng',
    securityCamera: 'Camera an ninh'
  };

  useEffect(() => {
    if (createSuccess) {
      // Reset form
      setFormData({
        name: '',
        hostId: '',
        pricePerNight: '',
        originalPricePerNight: '',
        discountPercentage: 0,
        image: '',
        videoTourUrl: '',
        description: '',
        features: [''],
        roomType: '',
        roomCount: 1,
        maxGuests: 1,
        bedCount: 1,
        bathroomCount: 1,
        availableDates: [],
        location: {
          address: '',
          district: '',
          city: '',
          province: ''
        },
        distanceToCenter: 0,
        amenities: {
          wifi: false,
          airConditioner: false,
          kitchen: false,
          privateBathroom: false,
          pool: false,
          petAllowed: false,
          parking: false,
          balcony: false,
          bbqArea: false,
          roomService: false,
          securityCamera: false
        },
        policies: {
          allowPet: false,
          allowSmoking: false,
          refundable: false
        },
        available: true,
        recommended: false,
        instantBook: false,
        flashSale: false
      });
      
      // Reset state sau 3 giây
      setTimeout(() => {
        dispatch(resetCreateState());
      }, 3000);
    }
  }, [createSuccess, dispatch]);

  const handleInputChange = (name, value) => {
    if (name.includes('.')) {
      // Handle nested objects (location, amenities, policies)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle features array
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      features: newFeatures.length > 0 ? newFeatures : ['']
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.hostId || !formData.pricePerNight) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    // Prepare data for API
    const submitData = {
      ...formData,
      hostId: parseInt(formData.hostId),
      pricePerNight: parseInt(formData.pricePerNight),
      originalPricePerNight: parseInt(formData.originalPricePerNight || formData.pricePerNight),
      discountPercentage: parseInt(formData.discountPercentage || 0),
      roomCount: parseInt(formData.roomCount),
      maxGuests: parseInt(formData.maxGuests),
      bedCount: parseInt(formData.bedCount),
      bathroomCount: parseInt(formData.bathroomCount),
      distanceToCenter: parseFloat(formData.distanceToCenter),
      features: formData.features.filter(feature => feature.trim() !== ''), // Remove empty features
      availableDates: [] // You can implement date picker later
    };

    dispatch(createStaycation(submitData));
  };

  const renderSwitchRow = (items) => {
    return (
      <View style={styles.switchGrid}>
        {items.map((item, index) => (
          <View key={index} style={styles.switchItem}>
            <Text style={styles.switchLabel}>{item.label}</Text>
            <Switch
              value={item.value}
              onValueChange={item.onValueChange}
              trackColor={{ false: '#767577', true: '#3b82f6' }}
              thumbColor={item.value ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Error/Success Messages */}
          {createError && (
            <View style={styles.errorMessage}>
              <Text style={styles.errorText}>
                {typeof createError === 'string' ? createError : 'Có lỗi xảy ra khi tạo staycation'}
              </Text>
            </View>
          )}
          
          {createSuccess && (
            <View style={styles.successMessage}>
              <Text style={styles.successText}>
                Tạo staycation thành công!
              </Text>
            </View>
          )}

          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Tên staycation *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  placeholder="Nhập tên staycation"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Host ID *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.hostId}
                  onChangeText={(value) => handleInputChange('hostId', value)}
                  placeholder="Nhập Host ID"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mô tả</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(value) => handleInputChange('description', value)}
                placeholder="Mô tả chi tiết về staycation..."
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tính năng nổi bật</Text>
            {formData.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <TextInput
                  style={[styles.input, styles.featureInput]}
                  value={feature}
                  onChangeText={(value) => handleFeatureChange(index, value)}
                  placeholder={`Tính năng ${index + 1}`}
                />
                {formData.features.length > 1 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFeature(index)}
                  >
                    <Text style={styles.removeButtonText}>Xóa</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addFeature}>
              <Text style={styles.addButtonText}>+ Thêm tính năng</Text>
            </TouchableOpacity>
          </View>

          {/* Pricing */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Giá cả</Text>
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Giá/đêm *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.pricePerNight}
                  onChangeText={(value) => handleInputChange('pricePerNight', value)}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Giá gốc</Text>
                <TextInput
                  style={styles.input}
                  value={formData.originalPricePerNight}
                  onChangeText={(value) => handleInputChange('originalPricePerNight', value)}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>% Giảm giá</Text>
              <TextInput
                style={styles.input}
                value={formData.discountPercentage.toString()}
                onChangeText={(value) => handleInputChange('discountPercentage', parseInt(value) || 0)}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Địa chỉ</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Địa chỉ</Text>
              <TextInput
                style={styles.input}
                value={formData.location.address}
                onChangeText={(value) => handleInputChange('location.address', value)}
                placeholder="Số nhà, tên đường..."
              />
            </View>
            
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Quận/Huyện</Text>
                <TextInput
                  style={styles.input}
                  value={formData.location.district}
                  onChangeText={(value) => handleInputChange('location.district', value)}
                  placeholder="Quận/Huyện"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Thành phố</Text>
                <TextInput
                  style={styles.input}
                  value={formData.location.city}
                  onChangeText={(value) => handleInputChange('location.city', value)}
                  placeholder="Thành phố"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tỉnh/Thành</Text>
              <TextInput
                style={styles.input}
                value={formData.location.province}
                onChangeText={(value) => handleInputChange('location.province', value)}
                placeholder="Tỉnh/Thành"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Khoảng cách đến trung tâm (km)</Text>
              <TextInput
                style={styles.input}
                value={formData.distanceToCenter.toString()}
                onChangeText={(value) => handleInputChange('distanceToCenter', parseFloat(value) || 0)}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Room Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chi tiết phòng</Text>
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Số phòng</Text>
                <TextInput
                  style={styles.input}
                  value={formData.roomCount.toString()}
                  onChangeText={(value) => handleInputChange('roomCount', parseInt(value) || 1)}
                  placeholder="1"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Số khách tối đa</Text>
                <TextInput
                  style={styles.input}
                  value={formData.maxGuests.toString()}
                  onChangeText={(value) => handleInputChange('maxGuests', parseInt(value) || 1)}
                  placeholder="1"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Số giường</Text>
                <TextInput
                  style={styles.input}
                  value={formData.bedCount.toString()}
                  onChangeText={(value) => handleInputChange('bedCount', parseInt(value) || 1)}
                  placeholder="1"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Số phòng tắm</Text>
                <TextInput
                  style={styles.input}
                  value={formData.bathroomCount.toString()}
                  onChangeText={(value) => handleInputChange('bathroomCount', parseInt(value) || 1)}
                  placeholder="1"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Loại phòng</Text>
              <TextInput
                style={styles.input}
                value={formData.roomType}
                onChangeText={(value) => handleInputChange('roomType', value)}
                placeholder="VD: Phòng deluxe, Phòng standard..."
              />
            </View>
          </View>

          {/* Media */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hình ảnh & Video</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>URL Hình ảnh</Text>
              <TextInput
                style={styles.input}
                value={formData.image}
                onChangeText={(value) => handleInputChange('image', value)}
                placeholder="https://example.com/image.jpg"
                keyboardType="url"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>URL Video Tour</Text>
              <TextInput
                style={styles.input}
                value={formData.videoTourUrl}
                onChangeText={(value) => handleInputChange('videoTourUrl', value)}
                placeholder="https://example.com/video.mp4"
                keyboardType="url"
              />
            </View>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tiện nghi</Text>
            {renderSwitchRow(
              Object.entries(formData.amenities).map(([amenity, checked]) => ({
                label: amenityLabels[amenity] || amenity,
                value: checked,
                onValueChange: (value) => handleInputChange(`amenities.${amenity}`, value)
              }))
            )}
          </View>

          {/* Policies */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chính sách</Text>
            {renderSwitchRow([
              {
                label: 'Cho phép thú cưng',
                value: formData.policies.allowPet,
                onValueChange: (value) => handleInputChange('policies.allowPet', value)
              },
              {
                label: 'Cho phép hút thuốc',
                value: formData.policies.allowSmoking,
                onValueChange: (value) => handleInputChange('policies.allowSmoking', value)
              },
              {
                label: 'Có thể hoàn tiền',
                value: formData.policies.refundable,
                onValueChange: (value) => handleInputChange('policies.refundable', value)
              }
            ])}
          </View>

          {/* Status */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trạng thái</Text>
            {renderSwitchRow([
              {
                label: 'Khả dụng',
                value: formData.available,
                onValueChange: (value) => handleInputChange('available', value)
              },
              {
                label: 'Đề xuất',
                value: formData.recommended,
                onValueChange: (value) => handleInputChange('recommended', value)
              },
              {
                label: 'Đặt ngay',
                value: formData.instantBook,
                onValueChange: (value) => handleInputChange('instantBook', value)
              },
              {
                label: 'Flash Sale',
                value: formData.flashSale,
                onValueChange: (value) => handleInputChange('flashSale', value)
              }
            ])}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, creating && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={creating}
          >
            <Text style={styles.submitButtonText}>
              {creating ? 'Đang tạo...' : 'Tạo Staycation'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 16,
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  featureInput: {
    flex: 1,
  },
  removeButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  switchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  switchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '45%',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  errorMessage: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fca5a5',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
  },
  successMessage: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#86efac',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  successText: {
    color: '#16a34a',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AddStaycationForm;