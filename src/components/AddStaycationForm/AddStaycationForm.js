// components/AddStaycationForm/AddStaycationForm.js

import React, { useState, useEffect } from "react"
import { 
  View, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Alert,
  Text,  
  ActivityIndicator,
  StyleSheet
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { createStaycation, resetCreateState } from "../../redux/slices/homestay.slice"

import ProgressBar from "./shared/ProgressBar"
import NavigationButtons from "./shared/NavigationButtons"

import BasicInfoStep from "./BasicInfoStep"
import PricingLocationStep from "./PricingLocationStep"
import RoomDetailsStep from "./RoomDetailsStep"
import AmenitiesPoliciesStep from "./AmenitiesPoliciesStep"

const AddStaycationForm = ({ accountId, onSuccess }) => {
  const dispatch = useDispatch()
  const { creating, createError, createSuccess } = useSelector((state) => state.homestay)

  const [formData, setFormData] = useState({
    name: "",
    pricePerNight: "",
    originalPricePerNight: "",
    discountPercentage: 0,
    image: "",
    videoTourUrl: "",
    description: "",
    features: [""],
    roomType: "",
    roomCount: 1,
    maxGuests: 1,
    bedCount: 1,
    bathroomCount: 1,
    availableDates: [],
    location: {
      address: "",
      district: "",
      city: "",
      province: "",
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
      securityCamera: false,
    },
    policies: {
      allowPet: false,
      allowSmoking: false,
      refundable: false,
    },
    available: true,
    recommended: false,
    instantBook: false,
    flashSale: false,
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [validationErrors, setValidationErrors] = useState({})

  const formSteps = [
    { title: "Thông tin", icon: "🏠" },
    { title: "Địa điểm", icon: "💰" },
    { title: "Chi tiết", icon: "🛏️" },
    { title: "Khác", icon: "✨" },
  ]

  // Reset form on success
  useEffect(() => {
    if (createSuccess) {
      setFormData({
        name: "",
        pricePerNight: "",
        originalPricePerNight: "",
        discountPercentage: 0,
        image: "",
        videoTourUrl: "",
        description: "",
        features: [""],
        roomType: "",
        roomCount: 0,
        maxGuests: 0,
        bedCount: 0,
        bathroomCount: 0,
        availableDates: [],
        location: {
          address: "",
          district: "",
          city: "",
          province: "",
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
          securityCamera: false,
        },
        policies: {
          allowPet: false,
          allowSmoking: false,
          refundable: false,
        },
        available: false,
        recommended: false,
        instantBook: false,
        flashSale: false,
      })
      setCurrentStep(0)
      setValidationErrors({})
      if (onSuccess) {
        setTimeout(() => {
          onSuccess()
        }, 2000)
      }
      setTimeout(() => {
        dispatch(resetCreateState())
      }, 3000)
    }
  }, [createSuccess, dispatch, onSuccess])

  const handleChange = (name, value) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const validateStep = (step) => {
    const errors = {}
    switch (step) {
      case 0:
        if (!formData.name.trim()) errors.name = "Tên homestay là bắt buộc"
        if (!formData.description.trim()) errors.description = "Mô tả là bắt buộc"
        break
      case 1:
        if (!formData.pricePerNight) errors.pricePerNight = "Giá/đêm là bắt buộc"
        if (!formData.location.address.trim()) errors["location.address"] = "Địa chỉ là bắt buộc"
        if (!formData.location.city.trim()) errors["location.city"] = "Thành phố là bắt buộc"
        break
      case 2:
        if (formData.maxGuests < 1) errors.maxGuests = "Số khách tối thiểu là 1"
        if (formData.roomCount < 1) errors.roomCount = "Số phòng tối thiểu là 1"
        break
    }
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async () => {
    let allValid = true
    for (let i = 0; i < formSteps.length; i++) {
      if (!validateStep(i)) {
        allValid = false
        setCurrentStep(i)
        break
      }
    }
    if (!allValid) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin bắt buộc")
      return
    }
    if (!accountId) {
      Alert.alert("Lỗi", "Không tìm thấy thông tin tài khoản")
      return
    }

    const submitData = {
      ...formData,
      pricePerNight: Number.parseInt(formData.pricePerNight),
      originalPricePerNight: Number.parseInt(formData.originalPricePerNight || formData.pricePerNight),
      discountPercentage: Number.parseInt(formData.discountPercentage || 0),
      roomCount: Number.parseInt(formData.roomCount),
      maxGuests: Number.parseInt(formData.maxGuests),
      bedCount: Number.parseInt(formData.bedCount),
      bathroomCount: Number.parseInt(formData.bathroomCount),
      distanceToCenter: Number.parseFloat(formData.distanceToCenter),
      features: formData.features.filter((f) => f.trim() !== ""),
      availableDates: [],
    }

    dispatch(createStaycation({ accountId, staycationData: submitData }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep formData={formData} onChange={handleChange} errors={validationErrors} />
      case 1:
        return <PricingLocationStep formData={formData} onChange={handleChange} errors={validationErrors} />
      case 2:
        return <RoomDetailsStep formData={formData} onChange={handleChange} errors={validationErrors} />
      case 3:
        return <AmenitiesPoliciesStep formData={formData} onChange={handleChange} />
      default:
        return null
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Messages */}
      {createError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            ⚠️ {typeof createError === "string" ? createError : "Có lỗi xảy ra"}
          </Text>
        </View>
      )}
      {createSuccess && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>
            Tạo homestay thành công!
          </Text>
        </View>
      )}

      {/* Progress Bar */}
      <ProgressBar steps={formSteps} currentStep={currentStep} />

      {/* Scrollable Form Content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.contentContainer}>
          {renderStepContent()}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={formSteps.length}
          onNext={nextStep}
          onPrev={prevStep}
          onSubmit={handleSubmit}
          loading={creating}
        />
      </View>

      {/* Loading Overlay */}
      {creating && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingModal}>
            <ActivityIndicator 
              size="large" 
              color="#eba016ff" 
              style={styles.loadingSpinner} 
            />
            <Text style={styles.loadingText}>
              Đang tạo homestay...
            </Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffdc',
  },
  
  // Message Styles
  errorContainer: {
    backgroundColor: '#FEF2F2',
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  successContainer: {
    backgroundColor: '#F0FDF4',
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  successText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  
  // Content Styles
  scrollView: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  
  // Navigation Styles
  navigationContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20, // Safe area bottom
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  
  // Loading Overlay Styles
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingModal: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
    minWidth: 200,
  },
  loadingSpinner: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 24,
  },
})

export default AddStaycationForm