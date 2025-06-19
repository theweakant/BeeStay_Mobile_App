"use client"

import { useState, useEffect } from "react"
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
  Platform,
  Dimensions,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { createStaycation, resetCreateState } from "../../redux/slices/homestay.slice"

const { width } = Dimensions.get("window")

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

  const [focusedInput, setFocusedInput] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [validationErrors, setValidationErrors] = useState({})

  // Form steps for better UX
  const formSteps = [
    { title: "Thông tin cơ bản", icon: "🏠" },
    { title: "Giá cả & Địa điểm", icon: "💰" },
    { title: "Chi tiết phòng", icon: "🛏️" },
    { title: "Tiện nghi & Chính sách", icon: "✨" },
  ]

  // Amenities labels tiếng Việt
  const amenityLabels = {
    wifi: "WiFi",
    airConditioner: "Điều hòa",
    kitchen: "Bếp",
    privateBathroom: "Phòng tắm riêng",
    pool: "Hồ bơi",
    petAllowed: "Cho phép thú cưng",
    parking: "Chỗ đậu xe",
    balcony: "Ban công",
    bbqArea: "Khu vực BBQ",
    roomService: "Dịch vụ phòng",
    securityCamera: "Camera an ninh",
  }

  const amenityIcons = {
    wifi: "📶",
    airConditioner: "❄️",
    kitchen: "🍳",
    privateBathroom: "🚿",
    pool: "🏊",
    petAllowed: "🐕",
    parking: "🚗",
    balcony: "🌅",
    bbqArea: "🔥",
    roomService: "🛎️",
    securityCamera: "📹",
  }

  useEffect(() => {
    if (createSuccess) {
      // Reset form
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

      // Call onSuccess callback to close modal
      if (onSuccess) {
        setTimeout(() => {
          onSuccess()
        }, 2000)
      }

      // Reset state sau 3 giây
      setTimeout(() => {
        dispatch(resetCreateState())
      }, 3000)
    }
  }, [createSuccess, dispatch, onSuccess])

  const handleInputChange = (name, value) => {
    if (name.includes(".")) {
      // Handle nested objects (location, amenities, policies)
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

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  // Handle features array
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData((prev) => ({
      ...prev,
      features: newFeatures,
    }))
  }

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      features: newFeatures.length > 0 ? newFeatures : [""],
    }))
  }

  const validateStep = (step) => {
    const errors = {}

    switch (step) {
      case 0: // Basic info
        if (!formData.name.trim()) errors.name = "Tên homestay là bắt buộc"
        if (!formData.description.trim()) errors.description = "Mô tả là bắt buộc"
        break
      case 1: // Pricing & Location
        if (!formData.pricePerNight) errors.pricePerNight = "Giá/đêm là bắt buộc"
        if (!formData.location.address.trim()) errors["location.address"] = "Địa chỉ là bắt buộc"
        if (!formData.location.city.trim()) errors["location.city"] = "Thành phố là bắt buộc"
        break
      case 2: // Room details
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
    // Validate all steps
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

    // Check if accountId is available
    if (!accountId) {
      Alert.alert("Lỗi", "Không tìm thấy thông tin tài khoản")
      return
    }

    // Prepare data for API
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
      features: formData.features.filter((feature) => feature.trim() !== ""),
      availableDates: [],
    }

    dispatch(createStaycation({ accountId, staycationData: submitData }))
  }

  const renderProgressBar = () => {
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          {formSteps.map((step, index) => (
            <View key={index} style={styles.progressStep}>
              <View
                style={[
                  styles.progressDot,
                  index <= currentStep ? styles.progressDotActive : styles.progressDotInactive,
                ]}
              >
                <Text style={[styles.progressDotText, index <= currentStep && styles.progressDotTextActive]}>
                  {step.icon}
                </Text>
              </View>
              <Text style={[styles.progressLabel, index === currentStep && styles.progressLabelActive]}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
    )
  }

  const renderInput = (props) => {
    const {
      label,
      name,
      value,
      onChangeText,
      placeholder,
      keyboardType = "default",
      multiline = false,
      numberOfLines = 1,
      required = false,
    } = props

    const hasError = validationErrors[name]
    const isFocused = focusedInput === name

    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.requiredIndicator}> *</Text>}
        </Text>
        <TextInput
          style={[
            styles.input,
            multiline && styles.textArea,
            isFocused && styles.inputFocused,
            hasError && styles.inputError,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setFocusedInput(name)}
          onBlur={() => setFocusedInput(null)}
          placeholderTextColor="#9CA3AF"
        />
        {hasError && <Text style={styles.errorText}>{hasError}</Text>}
      </View>
    )
  }

  const renderSwitchItem = (label, value, onValueChange, icon) => {
    return (
      <View style={styles.switchItem}>
        <View style={styles.switchLabelContainer}>
          <Text style={styles.switchIcon}>{icon}</Text>
          <Text style={styles.switchLabel}>{label}</Text>
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
          thumbColor={value ? "#FFFFFF" : "#F9FAFB"}
          ios_backgroundColor="#E5E7EB"
        />
      </View>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Information
        return (
          <View style={styles.stepContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🏠</Text>
              <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
            </View>

            {renderInput({
              label: "Tên homestay",
              name: "name",
              value: formData.name,
              onChangeText: (value) => handleInputChange("name", value),
              placeholder: "VD: Villa Sunset Paradise",
              required: true,
            })}

            {renderInput({
              label: "Mô tả chi tiết",
              name: "description",
              value: formData.description,
              onChangeText: (value) => handleInputChange("description", value),
              placeholder: "Mô tả chi tiết về homestay của bạn...",
              multiline: true,
              numberOfLines: 4,
              required: true,
            })}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Loại phòng</Text>
              <TextInput
                style={[styles.input, focusedInput === "roomType" && styles.inputFocused]}
                value={formData.roomType}
                onChangeText={(value) => handleInputChange("roomType", value)}
                placeholder="VD: Phòng Deluxe, Studio, Villa..."
                onFocus={() => setFocusedInput("roomType")}
                onBlur={() => setFocusedInput(null)}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Features */}
            <View style={styles.featuresContainer}>
              <Text style={styles.label}>Tính năng nổi bật</Text>
              {formData.features.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <TextInput
                    style={[styles.input, styles.featureInput]}
                    value={feature}
                    onChangeText={(value) => handleFeatureChange(index, value)}
                    placeholder={`Tính năng ${index + 1}`}
                    placeholderTextColor="#9CA3AF"
                  />
                  {formData.features.length > 1 && (
                    <TouchableOpacity style={styles.removeFeatureButton} onPress={() => removeFeature(index)}>
                      <Text style={styles.removeFeatureText}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <TouchableOpacity style={styles.addFeatureButton} onPress={addFeature}>
                <Text style={styles.addFeatureText}>+ Thêm tính năng</Text>
              </TouchableOpacity>
            </View>
          </View>
        )

      case 1: // Pricing & Location
        return (
          <View style={styles.stepContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>💰</Text>
              <Text style={styles.sectionTitle}>Giá cả & Địa điểm</Text>
            </View>

            {/* Pricing */}
            <View style={styles.pricingContainer}>
              <Text style={styles.subsectionTitle}>Thông tin giá</Text>
              <View style={styles.row}>
                <View style={styles.flex1}>
                  {renderInput({
                    label: "Giá/đêm",
                    name: "pricePerNight",
                    value: formData.pricePerNight,
                    onChangeText: (value) => handleInputChange("pricePerNight", value),
                    placeholder: "500000",
                    keyboardType: "numeric",
                    required: true,
                  })}
                </View>
                <View style={styles.flex1}>
                  {renderInput({
                    label: "Giá gốc",
                    name: "originalPricePerNight",
                    value: formData.originalPricePerNight,
                    onChangeText: (value) => handleInputChange("originalPricePerNight", value),
                    placeholder: "600000",
                    keyboardType: "numeric",
                  })}
                </View>
              </View>

              {renderInput({
                label: "Phần trăm giảm giá",
                name: "discountPercentage",
                value: formData.discountPercentage.toString(),
                onChangeText: (value) => handleInputChange("discountPercentage", Number.parseInt(value) || 0),
                placeholder: "10",
                keyboardType: "numeric",
              })}
            </View>

            {/* Location */}
            <View style={styles.locationContainer}>
              <Text style={styles.subsectionTitle}>Địa chỉ</Text>
              {renderInput({
                label: "Địa chỉ chi tiết",
                name: "location.address",
                value: formData.location.address,
                onChangeText: (value) => handleInputChange("location.address", value),
                placeholder: "123 Đường ABC, Phường XYZ",
                required: true,
              })}

              <View style={styles.row}>
                <View style={styles.flex1}>
                  {renderInput({
                    label: "Quận/Huyện",
                    name: "location.district",
                    value: formData.location.district,
                    onChangeText: (value) => handleInputChange("location.district", value),
                    placeholder: "Quận 1",
                  })}
                </View>
                <View style={styles.flex1}>
                  {renderInput({
                    label: "Thành phố",
                    name: "location.city",
                    value: formData.location.city,
                    onChangeText: (value) => handleInputChange("location.city", value),
                    placeholder: "TP. Hồ Chí Minh",
                    required: true,
                  })}
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.flex1}>
                  {renderInput({
                    label: "Tỉnh/Thành",
                    name: "location.province",
                    value: formData.location.province,
                    onChangeText: (value) => handleInputChange("location.province", value),
                    placeholder: "TP. Hồ Chí Minh",
                  })}
                </View>
                <View style={styles.flex1}>
                  {renderInput({
                    label: "Khoảng cách TT (km)",
                    name: "distanceToCenter",
                    value: formData.distanceToCenter.toString(),
                    onChangeText: (value) => handleInputChange("distanceToCenter", Number.parseFloat(value) || 0),
                    placeholder: "5.2",
                    keyboardType: "numeric",
                  })}
                </View>
              </View>
            </View>

            {/* Media */}
            <View style={styles.mediaContainer}>
              <Text style={styles.subsectionTitle}>Hình ảnh & Video</Text>
              {renderInput({
                label: "URL Hình ảnh chính",
                name: "image",
                value: formData.image,
                onChangeText: (value) => handleInputChange("image", value),
                placeholder: "https://example.com/image.jpg",
                keyboardType: "url",
              })}

              {renderInput({
                label: "URL Video tour",
                name: "videoTourUrl",
                value: formData.videoTourUrl,
                onChangeText: (value) => handleInputChange("videoTourUrl", value),
                placeholder: "https://example.com/video.mp4",
                keyboardType: "url",
              })}
            </View>
          </View>
        )

      case 2: // Room Details
        return (
          <View style={styles.stepContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🛏️</Text>
              <Text style={styles.sectionTitle}>Chi tiết phòng</Text>
            </View>

            <View style={styles.roomDetailsGrid}>
              <View style={styles.roomDetailCard}>
                <Text style={styles.roomDetailIcon}>🏠</Text>
                <Text style={styles.roomDetailLabel}>Số phòng</Text>
                <TextInput
                  style={styles.roomDetailInput}
                  value={formData.roomCount.toString()}
                  onChangeText={(value) => handleInputChange("roomCount", Number.parseInt(value) || 1)}
                  keyboardType="numeric"
                  textAlign="center"
                />
              </View>

              <View style={styles.roomDetailCard}>
                <Text style={styles.roomDetailIcon}>👥</Text>
                <Text style={styles.roomDetailLabel}>Số khách</Text>
                <TextInput
                  style={[styles.roomDetailInput, validationErrors.maxGuests && styles.inputError]}
                  value={formData.maxGuests.toString()}
                  onChangeText={(value) => handleInputChange("maxGuests", Number.parseInt(value) || 1)}
                  keyboardType="numeric"
                  textAlign="center"
                />
              </View>

              <View style={styles.roomDetailCard}>
                <Text style={styles.roomDetailIcon}>🛏️</Text>
                <Text style={styles.roomDetailLabel}>Số giường</Text>
                <TextInput
                  style={styles.roomDetailInput}
                  value={formData.bedCount.toString()}
                  onChangeText={(value) => handleInputChange("bedCount", Number.parseInt(value) || 1)}
                  keyboardType="numeric"
                  textAlign="center"
                />
              </View>

              <View style={styles.roomDetailCard}>
                <Text style={styles.roomDetailIcon}>🚿</Text>
                <Text style={styles.roomDetailLabel}>Phòng tắm</Text>
                <TextInput
                  style={styles.roomDetailInput}
                  value={formData.bathroomCount.toString()}
                  onChangeText={(value) => handleInputChange("bathroomCount", Number.parseInt(value) || 1)}
                  keyboardType="numeric"
                  textAlign="center"
                />
              </View>
            </View>

            {validationErrors.maxGuests && <Text style={styles.errorText}>{validationErrors.maxGuests}</Text>}
            {validationErrors.roomCount && <Text style={styles.errorText}>{validationErrors.roomCount}</Text>}
          </View>
        )

      case 3: // Amenities & Policies
        return (
          <View style={styles.stepContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>✨</Text>
              <Text style={styles.sectionTitle}>Tiện nghi & Chính sách</Text>
            </View>

            {/* Amenities */}
            <View style={styles.amenitiesContainer}>
              <Text style={styles.subsectionTitle}>Tiện nghi</Text>
              <View style={styles.amenitiesGrid}>
                {Object.entries(formData.amenities).map(([amenity, checked]) => (
                  <View key={amenity} style={styles.amenityCard}>
                    {renderSwitchItem(
                      amenityLabels[amenity] || amenity,
                      checked,
                      (value) => handleInputChange(`amenities.${amenity}`, value),
                      amenityIcons[amenity] || "🏠",
                    )}
                  </View>
                ))}
              </View>
            </View>

            {/* Policies */}
            <View style={styles.policiesContainer}>
              <Text style={styles.subsectionTitle}>Chính sách</Text>
              <View style={styles.policyCard}>
                {renderSwitchItem(
                  "Cho phép thú cưng",
                  formData.policies.allowPet,
                  (value) => handleInputChange("policies.allowPet", value),
                  "🐕",
                )}
              </View>
              <View style={styles.policyCard}>
                {renderSwitchItem(
                  "Cho phép hút thuốc",
                  formData.policies.allowSmoking,
                  (value) => handleInputChange("policies.allowSmoking", value),
                  "🚬",
                )}
              </View>
              <View style={styles.policyCard}>
                {renderSwitchItem(
                  "Có thể hoàn tiền",
                  formData.policies.refundable,
                  (value) => handleInputChange("policies.refundable", value),
                  "💰",
                )}
              </View>
            </View>

            {/* Status */}
            <View style={styles.statusContainer}>
              <Text style={styles.subsectionTitle}>Trạng thái</Text>
              <View style={styles.statusGrid}>
                <View style={styles.statusCard}>
                  {renderSwitchItem(
                    "Khả dụng",
                    formData.available,
                    (value) => handleInputChange("available", value),
                    "✅",
                  )}
                </View>
                <View style={styles.statusCard}>
                  {renderSwitchItem(
                    "Đề xuất",
                    formData.recommended,
                    (value) => handleInputChange("recommended", value),
                    "⭐",
                  )}
                </View>
                <View style={styles.statusCard}>
                  {renderSwitchItem(
                    "Đặt ngay",
                    formData.instantBook,
                    (value) => handleInputChange("instantBook", value),
                    "⚡",
                  )}
                </View>
                <View style={styles.statusCard}>
                  {renderSwitchItem(
                    "Flash Sale",
                    formData.flashSale,
                    (value) => handleInputChange("flashSale", value),
                    "🔥",
                  )}
                </View>
              </View>
            </View>
          </View>
        )

      default:
        return null
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {/* Messages */}
      {createError && (
        <View style={styles.errorMessage}>
          <Text style={styles.errorMessageIcon}>⚠️</Text>
          <Text style={styles.errorMessageText}>
            {typeof createError === "string" ? createError : "Có lỗi xảy ra khi tạo homestay"}
          </Text>
        </View>
      )}

      {createSuccess && (
        <View style={styles.successMessage}>
          <Text style={styles.successMessageIcon}>🎉</Text>
          <Text style={styles.successMessageText}>Tạo homestay thành công!</Text>
        </View>
      )}

      {/* Progress Bar */}
      {renderProgressBar()}

      {/* Form Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Account Info */}
          <View style={styles.accountInfoCard}>
            <Text style={styles.accountInfoIcon}>👤</Text>
            <Text style={styles.accountInfoText}>Account ID: {accountId}</Text>
          </View>

          {renderStepContent()}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <View style={styles.navigationButtons}>
          {currentStep > 0 && (
            <TouchableOpacity style={styles.prevButton} onPress={prevStep}>
              <Text style={styles.prevButtonText}>← Quay lại</Text>
            </TouchableOpacity>
          )}

          {currentStep < formSteps.length - 1 ? (
            <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
              <Text style={styles.nextButtonText}>Tiếp theo →</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.submitButton, creating && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={creating}
            >
              <Text style={styles.submitButtonText}>{creating ? "Đang tạo..." : "🏠 Tạo Homestay"}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Loading Overlay */}
      {creating && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <Text style={styles.loadingIcon}>🏠</Text>
            <Text style={styles.loadingText}>Đang tạo homestay...</Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
    paddingBottom: 100,
  },

  // Messages
  errorMessage: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 12,
    padding: 16,
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorMessageIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  errorMessageText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  successMessage: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: 12,
    padding: 16,
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  successMessageIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  successMessageText: {
    color: "#059669",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },

  // Progress Bar
  progressContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressStep: {
    alignItems: "center",
    flex: 1,
  },
  progressDot: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  progressDotActive: {
    backgroundColor: "#3B82F6",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  progressDotInactive: {
    backgroundColor: "#E5E7EB",
  },
  progressDotText: {
    fontSize: 20,
  },
  progressDotTextActive: {
    color: "#FFFFFF",
  },
  progressLabel: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    fontWeight: "500",
  },
  progressLabelActive: {
    color: "#3B82F6",
    fontWeight: "600",
  },

  // Account Info
  accountInfoCard: {
    backgroundColor: "#EBF4FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  accountInfoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  accountInfoText: {
    color: "#1E40AF",
    fontSize: 14,
    fontWeight: "600",
  },

  // Step Content
  stepContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },

  // Section Headers
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
    marginTop: 24,
  },

  // Input Styles
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },
  requiredIndicator: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
  },
  inputFocused: {
    borderColor: "#3B82F6",
    backgroundColor: "#FFFFFF",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },

  // Layout
  row: {
    flexDirection: "row",
    gap: 16,
  },
  flex1: {
    flex: 1,
  },

  // Features
  featuresContainer: {
    marginTop: 24,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  featureInput: {
    flex: 1,
  },
  removeFeatureButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  removeFeatureText: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "600",
  },
  addFeatureButton: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  addFeatureText: {
    color: "#059669",
    fontSize: 14,
    fontWeight: "600",
  },

  // Pricing
  pricingContainer: {
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  // Location
  locationContainer: {
    backgroundColor: "#F0F9FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  // Media
  mediaContainer: {
    backgroundColor: "#F5F3FF",
    borderRadius: 12,
    padding: 16,
  },

  // Room Details
  roomDetailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
  },
  roomDetailCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: (width - 72) / 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  roomDetailIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  roomDetailLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 8,
    textAlign: "center",
  },
  roomDetailInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "#FFFFFF",
    minWidth: 60,
    textAlign: "center",
  },

  // Amenities
  amenitiesContainer: {
    marginBottom: 24,
  },
  amenitiesGrid: {
    gap: 8,
  },
  amenityCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  // Switch Items
  switchItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  switchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  switchLabel: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
    flex: 1,
  },

  // Policies
  policiesContainer: {
    marginBottom: 24,
  },
  policyCard: {
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  // Status
  statusContainer: {
    marginBottom: 24,
  },
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statusCard: {
    backgroundColor: "#ECFDF5",
    borderRadius: 12,
    padding: 16,
    width: (width - 72) / 2,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },

  // Navigation
  navigationContainer: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  prevButton: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  prevButtonText: {
    color: "#6B7280",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#059669",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    backgroundColor: "#9CA3AF",
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  // Loading Overlay
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  loadingIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  loadingText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default AddStaycationForm
