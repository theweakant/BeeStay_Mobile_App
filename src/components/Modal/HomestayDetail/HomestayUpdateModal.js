import React, { useState, useEffect, useCallback } from 'react';
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

import InformationSection from '../../../components/Host/EditHomestay/InformationSection';
import UploadSection from '../../../components/Host/EditHomestay/UploadSection';
import PriceSection from '../../../components/Host/EditHomestay/PriceSection';
import CapacitySection from '../../../components/Host/EditHomestay/CapacitySection';
import LocationSection from '../../../components/Host/EditHomestay/LocationSection';
import FeatureSection from '../../../components/Host/EditHomestay/FeatureSection';
import StatusSection from '../../../components/Host/EditHomestay/StatusSection';
import AmenitySection from '../../../components/Host/EditHomestay/AmenitySection';

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

  const [errors, setErrors] = useState({});

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

  useEffect(() => {
    if (updateSuccess && visible) {
      Alert.alert(
        'Thành công',
        'Homestay đã được cập nhật thành công!',
        [{
          text: 'OK',
          onPress: () => {
            dispatch(resetUpdateState());
            onUpdateSuccess && onUpdateSuccess();
            onClose();
          }
        }]
      );
    }
  }, [updateSuccess, visible, dispatch, onUpdateSuccess, onClose]);

  useEffect(() => {
    if (updateError && visible) {
      Alert.alert(
        'Lỗi',
        updateError || 'Có lỗi xảy ra khi cập nhật homestay. Vui lòng thử lại.',
        [{
          text: 'OK',
          onPress: () => dispatch(resetUpdateState())
        }]
      );
    }
  }, [updateError, visible, dispatch]);

  const handleSubmit = useCallback(() => {
    const { errors: validationErrors, isValid } = validateHomestayForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      Alert.alert('Lỗi', 'Vui lòng kiểm tra lại thông tin đã nhập');
      return;
    }

    let discountPercentage = parseFloat(formData.discountPercentage) || 0;
    if (formData.originalPricePerNight && formData.pricePerNight) {
      const originalPrice = parseFloat(formData.originalPricePerNight);
      const currentPrice = parseFloat(formData.pricePerNight);
      if (originalPrice > currentPrice) {
        discountPercentage = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
      }
    }

    const availableDates = formData.availableDates
      ? formData.availableDates.split(',').map(date => date.trim()).filter(date => date)
      : [];

    const updateData = {
      name: formData.name,
      pricePerNight: parseInt(formData.pricePerNight),
      originalPricePerNight: parseInt(formData.originalPricePerNight) || parseInt(formData.pricePerNight),
      discountPercentage,
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
      availableDates,
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
  }, [formData, homestay?.id, dispatch]);

  const handleInputChange = useCallback((field, value) => {
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

    if (errors[field] || (field.includes('.') && errors[field.split('.')[1]])) {
      setErrors(prev => ({
        ...prev,
        [field]: null,
        [field.split('.')[1]]: null
      }));
    }
  }, [errors]);

  const renderInput = useCallback((label, field, placeholder, options = {}) => {
    const error = errors[field] || (field.includes('.') && errors[field.split('.')[1]]);
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
          placeholderTextColor="#9CA3AF"
          multiline={options.multiline}
          numberOfLines={options.numberOfLines}
          keyboardType={options.keyboardType || 'default'}
          editable={!updating}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }, [formData, errors, updating, handleInputChange]);

  const renderSwitch = useCallback((label, field) => (
    <View style={styles.switchItem}>
      <Text style={styles.switchLabel}>{label}</Text>
      <Switch
        value={formData[field]}
        onValueChange={(value) => setFormData(prev => ({ ...prev, [field]: value }))}
      />
    </View>
  ), [formData]);

  const handleClose = useCallback(() => {
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
  }, [updating, dispatch, onClose]);

  if (!homestay) return null;

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
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleClose} disabled={updating}>
            <Text style={styles.backButtonText}>Quay lại</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cập nhật</Text>
          <TouchableOpacity
            style={[styles.saveButton, updating && styles.saveButtonDisabled]}
            onPress={handleSubmit}
            disabled={updating}
          >
            {updating ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.saveButtonText}>Lưu</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <InformationSection
            formData={formData}
            errors={errors}
            renderInput={renderInput}
            handleInputChange={handleInputChange}
            homestay={homestay}
          />

          <UploadSection 
            homestay={homestay}
          />

          <PriceSection
            formData={formData}
            errors={errors}
            renderInput={renderInput}
            handleInputChange={handleInputChange}
          />

          <CapacitySection
            formData={formData}
            errors={errors}
            renderInput={renderInput}
            handleInputChange={handleInputChange}
          />

          <LocationSection
            formData={formData}
            errors={errors}
            renderInput={renderInput}
            handleInputChange={handleInputChange}
          />

          <FeatureSection
            formData={formData}
            errors={errors}
            renderInput={renderInput}
            handleInputChange={handleInputChange}
          />

          <StatusSection
            formData={formData}
            renderSwitch={renderSwitch}
            setFormData={setFormData}
          />

          <AmenitySection
            formData={formData}
            setFormData={setFormData}
          />

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6B7280',
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
    backgroundColor: '#eba016ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    minHeight: 50,
  },
  textInputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  textInputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 6,
    fontWeight: '500',
  },
  switchItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  bottomSpacing: {
    height: 40,
  },
});