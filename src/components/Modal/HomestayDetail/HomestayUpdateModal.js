import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateStaycationById, resetUpdateState } from '../../../redux/slices/homestay.slice';

export default function HomestayUpdateModal({ 
  visible, 
  onClose, 
  homestay,
  onUpdateSuccess 
}) {
  const dispatch = useDispatch();
  
  const {
    updating,
    updateError,
    updateSuccess
  } = useSelector(state => state.homestay);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    roomCount: '',
    maxGuests: '',
    amenities: '',
    location: {
      address: '',
      ward: '',
      district: '',
      province: ''
    }
  });

  // Form validation errors
  const [errors, setErrors] = useState({});

  // Initialize form data when homestay prop changes
  useEffect(() => {
    if (homestay && visible) {
      setFormData({
        name: homestay.name || '',
        description: homestay.description || '',
        price: homestay.price?.toString() || '',
        roomCount: homestay.roomCount?.toString() || '',
        maxGuests: homestay.maxGuests?.toString() || '',
        amenities: Array.isArray(homestay.amenities) ? homestay.amenities.join(', ') : '',
        location: {
          address: homestay.location?.address || '',
          ward: homestay.location?.ward || '',
          district: homestay.location?.district || '',
          province: homestay.location?.province || ''
        }
      });
      setErrors({});
    }
  }, [homestay, visible]);

  // Handle update success
  useEffect(() => {
    if (updateSuccess && visible) {
      Alert.alert(
        'Thành công',
        'Homestay đã được cập nhật thành công!',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(resetUpdateState());
              onUpdateSuccess && onUpdateSuccess();
              onClose();
            }
          }
        ]
      );
    }
  }, [updateSuccess, visible]);

  // Handle update error
  useEffect(() => {
    if (updateError && visible) {
      Alert.alert(
        'Lỗi',
        updateError || 'Có lỗi xảy ra khi cập nhật homestay. Vui lòng thử lại.',
        [
          {
            text: 'OK',
            onPress: () => dispatch(resetUpdateState())
          }
        ]
      );
    }
  }, [updateError, visible]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Tên homestay không được để trống';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Tên homestay phải có ít nhất 3 ký tự';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Mô tả không được để trống';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Mô tả phải có ít nhất 10 ký tự';
    }

    // Price validation
    if (!formData.price.trim()) {
      newErrors.price = 'Giá không được để trống';
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        newErrors.price = 'Giá phải là số dương';
      } else if (price < 50000) {
        newErrors.price = 'Giá phải lớn hơn 50,000 VND';
      }
    }

    // Room count validation
    if (!formData.roomCount.trim()) {
      newErrors.roomCount = 'Số phòng không được để trống';
    } else {
      const roomCount = parseInt(formData.roomCount);
      if (isNaN(roomCount) || roomCount <= 0) {
        newErrors.roomCount = 'Số phòng phải là số nguyên dương';
      }
    }

    // Max guests validation
    if (!formData.maxGuests.trim()) {
      newErrors.maxGuests = 'Số khách tối đa không được để trống';
    } else {
      const maxGuests = parseInt(formData.maxGuests);
      if (isNaN(maxGuests) || maxGuests <= 0) {
        newErrors.maxGuests = 'Số khách tối đa phải là số nguyên dương';
      }
    }

    // Location validation
    if (!formData.location.address.trim()) {
      newErrors.address = 'Địa chỉ không được để trống';
    }
    if (!formData.location.ward.trim()) {
      newErrors.ward = 'Phường/Xã không được để trống';
    }
    if (!formData.location.district.trim()) {
      newErrors.district = 'Quận/Huyện không được để trống';
    }
    if (!formData.location.province.trim()) {
      newErrors.province = 'Tỉnh/Thành phố không được để trống';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert('Lỗi', 'Vui lòng kiểm tra lại thông tin đã nhập');
      return;
    }

    // Prepare update data
    const updateData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      roomCount: parseInt(formData.roomCount),
      maxGuests: parseInt(formData.maxGuests),
      amenities: formData.amenities 
        ? formData.amenities.split(',').map(item => item.trim()).filter(item => item)
        : [],
      location: {
        address: formData.location.address.trim(),
        ward: formData.location.ward.trim(),
        district: formData.location.district.trim(),
        province: formData.location.province.trim()
      }
    };

    dispatch(updateStaycationById({
      homeStayId: homestay.id,
      staycationData: updateData
    }));
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
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
        [field]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[field] || errors[field.split('.')[1]]) {
      setErrors(prev => ({
        ...prev,
        [field]: null,
        [field.split('.')[1]]: null
      }));
    }
  };

  // Handle close
  const handleClose = () => {
    if (updating) return;
    
    // Check if form has changes
    const hasChanges = (
      formData.name !== (homestay?.name || '') ||
      formData.description !== (homestay?.description || '') ||
      formData.price !== (homestay?.price?.toString() || '') ||
      formData.roomCount !== (homestay?.roomCount?.toString() || '') ||
      formData.maxGuests !== (homestay?.maxGuests?.toString() || '') ||
      formData.amenities !== (homestay?.amenities ? homestay.amenities.join(', ') : '') ||
      formData.location.address !== (homestay?.location?.address || '') ||
      formData.location.ward !== (homestay?.location?.ward || '') ||
      formData.location.district !== (homestay?.location?.district || '') ||
      formData.location.province !== (homestay?.location?.province || '')
    );

    if (hasChanges) {
      Alert.alert(
        'Xác nhận',
        'Bạn có thay đổi chưa được lưu. Bạn có muốn thoát không?',
        [
          { text: 'Ở lại', style: 'cancel' },
          { 
            text: 'Thoát', 
            style: 'destructive',
            onPress: () => {
              dispatch(resetUpdateState());
              onClose();
            }
          }
        ]
      );
    } else {
      dispatch(resetUpdateState());
      onClose();
    }
  };

  const renderInput = (label, field, placeholder, options = {}) => {
    const error = errors[field] || errors[field.split('.')[1]];
    const value = field.includes('.') 
      ? formData[field.split('.')[0]][field.split('.')[1]]
      : formData[field];

    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
          style={[
            styles.textInput,
            error && styles.textInputError,
            options.multiline && styles.textInputMultiline
          ]}
          value={value}
          onChangeText={(text) => handleInputChange(field, text)}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          multiline={options.multiline}
          numberOfLines={options.numberOfLines}
          keyboardType={options.keyboardType || 'default'}
          editable={!updating}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  };

  if (!homestay) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleClose}
            disabled={updating}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chỉnh sửa Homestay</Text>
          <TouchableOpacity 
            style={[
              styles.saveButton,
              updating && styles.saveButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={updating}
          >
            {updating ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.saveButtonText}>Lưu</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
            
            {renderInput('Tên homestay *', 'name', 'Nhập tên homestay')}
            
            {renderInput('Mô tả *', 'description', 'Nhập mô tả về homestay', {
              multiline: true,
              numberOfLines: 4
            })}
            
            {renderInput('Giá (VND/đêm) *', 'price', 'Nhập giá', {
              keyboardType: 'numeric'
            })}
          </View>

          {/* Capacity Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin sức chứa</Text>
            
            {renderInput('Số phòng *', 'roomCount', 'Nhập số phòng', {
              keyboardType: 'numeric'
            })}
            
            {renderInput('Số khách tối đa *', 'maxGuests', 'Nhập số khách tối đa', {
              keyboardType: 'numeric'
            })}
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tiện nghi</Text>
            
            {renderInput('Tiện nghi', 'amenities', 'WiFi, Điều hòa, Bếp, ... (cách nhau bằng dấu phẩy)', {
              multiline: true,
              numberOfLines: 3
            })}
          </View>

          {/* Location Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin địa chỉ</Text>
            
            {renderInput('Địa chỉ *', 'location.address', 'Nhập địa chỉ cụ thể')}
            
            {renderInput('Phường/Xã *', 'location.ward', 'Nhập phường/xã')}
            
            {renderInput('Quận/Huyện *', 'location.district', 'Nhập quận/huyện')}
            
            {renderInput('Tỉnh/Thành phố *', 'location.province', 'Nhập tỉnh/thành phố')}
          </View>

          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
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
    paddingTop: 60,
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
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#6b7280',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  textInputError: {
    borderColor: '#ef4444',
  },
  textInputMultiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },
  bottomSpacing: {
    height: 20,
  },
});