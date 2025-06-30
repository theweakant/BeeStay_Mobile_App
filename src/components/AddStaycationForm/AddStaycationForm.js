// components/AddStaycationForm/AddStaycationForm.js

import React, { useState, useEffect } from "react"
import { 
  View, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Alert,
  Text,  
  ActivityIndicator  
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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {/* Messages */}
      {createError && (
        <View style={{ backgroundColor: "#FEF2F2", padding: 16, margin: 20, borderRadius: 12 }}>
          <Text style={{ color: "#DC2626", fontSize: 14, fontWeight: "500" }}>
            ⚠️ {typeof createError === "string" ? createError : "Có lỗi xảy ra"}
          </Text>
        </View>
      )}
      {createSuccess && (
        <View style={{ backgroundColor: "#F0FDF4", padding: 16, margin: 20, borderRadius: 12 }}>
          <Text style={{ color: "#059669", fontSize: 14, fontWeight: "500" }}>
            🎉 Tạo homestay thành công!
          </Text>
        </View>
      )}

      {/* Progress Bar */}
      <ProgressBar steps={formSteps} currentStep={currentStep} />

      {/* Scrollable Form Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 20, paddingBottom: 100 }}>
          {renderStepContent()}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={{ padding: 20, backgroundColor: "#FFFFFF", borderTopWidth: 1, borderTopColor: "#E5E7EB" }}>
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
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ backgroundColor: "#FFF", padding: 32, borderRadius: 20, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#007AFF" style={{ marginBottom: 16 }} />
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#1E293B" }}>
              🏠 Đang tạo homestay...
            </Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  )
}

export default AddStaycationForm