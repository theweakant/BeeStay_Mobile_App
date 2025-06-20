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
  Platform,
  Switch
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateStaycationById, resetUpdateState } from '../../../redux/slices/homestay.slice';
import { validateHomestayForm } from '../../../helper/validate';
import UploadImage from '../../../components/UploadImage'; 

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
    pricePerNight: '',
    originalPricePerNight: '',
    discountPercentage: '',
    image: '',
    videoTourUrl: '',
    description: '',
    features: '',
    roomType: '',
    roomCount: '',
    maxGuests: '',
    bedCount: '',
    bathroomCount: '',
    isFlashSale: false,
    isAvailable: true,
    isInstantBook: false,
    isRecommended: false,
    availableDates: '',
    location: {
      address: '',
      district: '',
      city: '',
      province: ''
    },
    distanceToCenter: '',
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
      refundable: true
    }
  });

  // Form validation errors
  const [errors, setErrors] = useState({});

  // Initialize form data when homestay prop changes
  useEffect(() => {
    if (homestay && visible) {
      setFormData({
        name: homestay.name || '',
        pricePerNight: homestay.pricePerNight?.toString() || homestay.price?.toString() || '',
        originalPricePerNight: homestay.originalPricePerNight?.toString() || homestay.price?.toString() || '',
        discountPercentage: homestay.discountPercentage?.toString() || '0',
        image: homestay.image || '',
        videoTourUrl: homestay.videoTourUrl || '',
        description: homestay.description || '',
        features: Array.isArray(homestay.features) ? homestay.features.join(', ') : 
                 Array.isArray(homestay.amenities) ? homestay.amenities.join(', ') : '',
        roomType: homestay.roomType || 'Standard',
        roomCount: homestay.roomCount?.toString() || '1',
        maxGuests: homestay.maxGuests?.toString() || '2',
        bedCount: homestay.bedCount?.toString() || '1',
        bathroomCount: homestay.bathroomCount?.toString() || '1',
        isFlashSale: homestay.isFlashSale || false,
        isAvailable: homestay.isAvailable !== undefined ? homestay.isAvailable : true,
        isInstantBook: homestay.isInstantBook || false,
        isRecommended: homestay.isRecommended || false,
        availableDates: Array.isArray(homestay.availableDates) ? homestay.availableDates.join(', ') : '',
        location: {
          address: homestay.location?.address || '',
          district: homestay.location?.district || '',
          city: homestay.location?.city || homestay.location?.ward || '',
          province: homestay.location?.province || ''
        },
        distanceToCenter: homestay.distanceToCenter?.toString() || '0',
        amenities: {
          wifi: homestay.amenities?.wifi || false,
          airConditioner: homestay.amenities?.airConditioner || false,
          kitchen: homestay.amenities?.kitchen || false,
          privateBathroom: homestay.amenities?.privateBathroom || false,
          pool: homestay.amenities?.pool || false,
          petAllowed: homestay.amenities?.petAllowed || false,
          parking: homestay.amenities?.parking || false,
          balcony: homestay.amenities?.balcony || false,
          bbqArea: homestay.amenities?.bbqArea || false,
          roomService: homestay.amenities?.roomService || false,
          securityCamera: homestay.amenities?.securityCamera || false
        },
        policies: {
          allowPet: homestay.policies?.allowPet || false,
          allowSmoking: homestay.policies?.allowSmoking || false,
          refundable: homestay.policies?.refundable !== undefined ? homestay.policies.refundable : true
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
  }, [updateSuccess, visible, dispatch, onUpdateSuccess, onClose]);

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
  }, [updateError, visible, dispatch]);

  // Handle form submission
  const handleSubmit = () => {
    const { errors: validationErrors, isValid } = validateHomestayForm(formData);
    
    if (!isValid) {
      setErrors(validationErrors);
      Alert.alert('Lỗi', 'Vui lòng kiểm tra lại thông tin đã nhập');
      return;
    }

    // Calculate discount percentage if not provided
    let discountPercentage = parseFloat(formData.discountPercentage) || 0;
    if (formData.originalPricePerNight && formData.pricePerNight) {
      const originalPrice = parseFloat(formData.originalPricePerNight);
      const currentPrice = parseFloat(formData.pricePerNight);
      if (originalPrice > currentPrice) {
        discountPercentage = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
      }
    }

    // Parse available dates
    const availableDates = formData.availableDates
      ? formData.availableDates.split(',').map(date => date.trim()).filter(date => date)
      : [];

    const updateData = {
      name: formData.name,
      pricePerNight: parseInt(formData.pricePerNight),
      originalPricePerNight: parseInt(formData.originalPricePerNight) || parseInt(formData.pricePerNight),
      discountPercentage: discountPercentage,
      image: formData.image,
      videoTourUrl: formData.videoTourUrl,
      description: formData.description,
      features: formData.features 
        ? formData.features.split(',').map(item => item.trim()).filter(item => item)
        : [],
      roomType: formData.roomType,
      roomCount: parseInt(formData.roomCount),
      maxGuests: parseInt(formData.maxGuests),
      bedCount: parseInt(formData.bedCount),
      bathroomCount: parseInt(formData.bathroomCount),
      isFlashSale: formData.isFlashSale,
      isAvailable: formData.isAvailable,
      isInstantBook: formData.isInstantBook,
      isRecommended: formData.isRecommended,
      availableDates: availableDates,
      location: {
        address: formData.location.address,
        district: formData.location.district,
        city: formData.location.city,
        province: formData.location.province
      },
      distanceToCenter: parseFloat(formData.distanceToCenter) || 0,
      amenities: formData.amenities,
      policies: formData.policies
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

  const renderSwitch = (label, field, description) => {
    const value = field.includes('.') 
      ? formData[field.split('.')[0]][field.split('.')[1]]
      : formData[field];

    return (
      <View style={styles.switchContainer}>
        <View style={styles.switchLabelContainer}>
          <Text style={styles.switchLabel}>{label}</Text>
          {description && <Text style={styles.switchDescription}>{description}</Text>}
        </View>
        <Switch
          value={value}
          onValueChange={(newValue) => handleInputChange(field, newValue)}
          trackColor={{ false: '#f3f4f6', true: '#3b82f6' }}
          thumbColor={value ? '#ffffff' : '#ffffff'}
          disabled={updating}
        />
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
      presentationStyle="fullScreen"
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
            
            {renderInput('Loại phòng', 'roomType', 'Standard, Deluxe, Suite, ...')}
            
            {/* Upload Image Component */}
            <View style={styles.uploadSection}>
              <Text style={styles.inputLabel}>Hình ảnh homestay</Text>
              <UploadImage homestayId={homestay.id} />
            </View>
            
            {renderInput('Hình ảnh URL (tùy chọn)', 'image', 'https://example.com/image.jpg')}
            
            {renderInput('Video tour URL', 'videoTourUrl', 'https://example.com/video.mp4')}
          </View>

          {/* Pricing */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin giá</Text>
            
            {renderInput('Giá hiện tại (VND/đêm) *', 'pricePerNight', 'Nhập giá hiện tại', {
              keyboardType: 'numeric'
            })}
            
            {renderInput('Giá gốc (VND/đêm)', 'originalPricePerNight', 'Nhập giá gốc (nếu có giảm giá)', {
              keyboardType: 'numeric'
            })}
            
            {renderInput('% Giảm giá', 'discountPercentage', 'Tự động tính nếu để trống', {
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
            
            {renderInput('Số giường *', 'bedCount', 'Nhập số giường', {
              keyboardType: 'numeric'
            })}
            
            {renderInput('Số phòng tắm *', 'bathroomCount', 'Nhập số phòng tắm', {
              keyboardType: 'numeric'
            })}
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Đặc điểm</Text>
            
            {renderInput('Tiện ích nổi bật', 'features', 'View đẹp, Gần biển, Yên tĩnh, ... (cách nhau bằng dấu phẩy)', {
              multiline: true,
              numberOfLines: 3
            })}
            
            {renderInput('Khoảng cách đến trung tâm (km)', 'distanceToCenter', 'Nhập khoảng cách', {
              keyboardType: 'numeric'
            })}
            
            {renderInput('Ngày có sẵn', 'availableDates', '2025-06-20, 2025-06-21, ... (định dạng YYYY-MM-DD)', {
              multiline: true,
              numberOfLines: 2
            })}
          </View>

          {/* Location Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin địa chỉ</Text>
            
            {renderInput('Địa chỉ *', 'location.address', 'Nhập địa chỉ cụ thể')}
            
            {renderInput('Quận/Huyện *', 'location.district', 'Nhập quận/huyện')}
            
            {renderInput('Thành phố *', 'location.city', 'Nhập thành phố')}
            
            {renderInput('Tỉnh/Thành phố *', 'location.province', 'Nhập tỉnh/thành phố')}
          </View>

          {/* Status Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cài đặt trạng thái</Text>
            
            {renderSwitch('Flash Sale', 'isFlashSale', 'Đánh dấu là sản phẩm flash sale')}
            {renderSwitch('Có sẵn', 'isAvailable', 'Homestay có sẵn để đặt')}
            {renderSwitch('Đặt ngay', 'isInstantBook', 'Cho phép đặt ngay không cần xác nhận')}
            {renderSwitch('Được đề xuất', 'isRecommended', 'Hiển thị trong danh sách đề xuất')}
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tiện nghi</Text>
            
            {renderSwitch('WiFi', 'amenities.wifi')}
            {renderSwitch('Điều hòa', 'amenities.airConditioner')}
            {renderSwitch('Bếp', 'amenities.kitchen')}
            {renderSwitch('Phòng tắm riêng', 'amenities.privateBathroom')}
            {renderSwitch('Hồ bơi', 'amenities.pool')}
            {renderSwitch('Cho phép thú cưng', 'amenities.petAllowed')}
            {renderSwitch('Bãi đậu xe', 'amenities.parking')}
            {renderSwitch('Ban công', 'amenities.balcony')}
            {renderSwitch('Khu vực BBQ', 'amenities.bbqArea')}
            {renderSwitch('Dịch vụ phòng', 'amenities.roomService')}
            {renderSwitch('Camera an ninh', 'amenities.securityCamera')}
          </View>

          {/* Policies */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chính sách</Text>
            
            {renderSwitch('Cho phép thú cưng', 'policies.allowPet', 'Khách có thể mang thú cưng')}
            {renderSwitch('Cho phép hút thuốc', 'policies.allowSmoking', 'Khách có thể hút thuốc')}
            {renderSwitch('Có thể hoàn tiền', 'policies.refundable', 'Cho phép hủy và hoàn tiền')}
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
  uploadSection: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  switchLabelContainer: {
    flex: 1,
    marginRight: 16,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  switchDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  bottomSpacing: {
    height: 20,
  },
});