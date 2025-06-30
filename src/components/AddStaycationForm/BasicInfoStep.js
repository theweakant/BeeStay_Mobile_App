// components/AddStaycationForm/BasicInfoStep.js

import React from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import FormInput from "./shared/FormInput"

const BasicInfoStep = ({ formData, onChange, errors }) => {
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    onChange("features", newFeatures)
  }

  const addFeature = () => {
    onChange("features", [...formData.features, ""])
  }

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    onChange("features", newFeatures.length > 0 ? newFeatures : [""])
  }

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#1F2937" }}>Thông tin cơ bản</Text>
      </View>

      <FormInput
        label="Tên homestay"
        name="name"
        value={formData.name}
        onChangeText={(value) => onChange("name", value)}
        placeholder="VD: Villa Sunset Paradise"
        required
        error={errors.name}
      />

      <FormInput
        label="Mô tả chi tiết"
        name="description"
        value={formData.description}
        onChangeText={(value) => onChange("description", value)}
        placeholder="Mô tả chi tiết về homestay của bạn..."
        multiline
        numberOfLines={4}
        required
        error={errors.description}
      />

      <FormInput
        label="Loại phòng"
        name="roomType"
        value={formData.roomType}
        onChangeText={(value) => onChange("roomType", value)}
        placeholder="VD: Phòng Deluxe, Studio, Villa..."
      />

      {/* Features */}
      <View style={{ marginTop: 24 }}>
        <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 8, color: "#374151" }}>
          Tính năng nổi bật
        </Text>
        {formData.features.map((feature, index) => (
          <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 12, gap: 12 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#D1D5DB",
                borderRadius: 12,
                padding: 16,
                fontSize: 16,
                backgroundColor: "#FFFFFF",
                color: "#1F2937",
                flex: 1,
              }}
              value={feature}
              onChangeText={(value) => handleFeatureChange(index, value)}
              placeholder={`Tính năng ${index + 1}`}
              placeholderTextColor="#9CA3AF"
            />
            {formData.features.length > 1 && (
              <TouchableOpacity
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "#FEE2E2",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => removeFeature(index)}
              >
                <Text style={{ color: "#DC2626", fontSize: 16, fontWeight: "600" }}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity
          style={{
            backgroundColor: "#F0FDF4",
            borderWidth: 1,
            borderColor: "#BBF7D0",
            borderRadius: 12,
            padding: 16,
            alignItems: "center",
            marginTop: 8,
          }}
          onPress={addFeature}
        >
          <Text style={{ color: "#059669", fontSize: 14, fontWeight: "600" }}>+ Thêm tính năng</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BasicInfoStep