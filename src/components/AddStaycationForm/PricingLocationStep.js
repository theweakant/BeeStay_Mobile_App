// components/AddStaycationForm/PricingLocationStep.js

import React from "react"
import { View, Text, StyleSheet } from "react-native";
import FormInput from "./shared/FormInput"

const PricingLocationStep = ({ formData, onChange, errors }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
        <Text style={{ fontSize: 24, marginRight: 12 }}>💰</Text>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#1F2937" }}>Giá cả & Địa điểm</Text>
      </View>

      {/* Giá cả */}
      <View
        style={{
          backgroundColor: "#FEF3C7",
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 16, color: "#B45309" }}>
          Thông tin giá
        </Text>
        <View style={{ flexDirection: "row", gap: 16, marginBottom: 16 }}>
          <FormInput
            label="Giá/đêm"
            name="pricePerNight"
            value={formData.pricePerNight}
            onChangeText={(value) => onChange("pricePerNight", value)}
            keyboardType="numeric"
            required
            error={errors.pricePerNight}
            style={{ flex: 1 }}
          />
          <FormInput
            label="Giá gốc"
            name="originalPricePerNight"
            value={formData.originalPricePerNight}
            onChangeText={(value) => onChange("originalPricePerNight", value)}
            keyboardType="numeric"
            style={{ flex: 1 }}
          />
        </View>
        <FormInput
          label="Phần trăm giảm giá"
          name="discountPercentage"
          value={formData.discountPercentage.toString()}
          onChangeText={(value) => onChange("discountPercentage", Number.parseInt(value) || 0)}
          keyboardType="numeric"
        />
      </View>

      {/* Địa điểm */}
      <View
        style={{
          backgroundColor: "#F0F9FF",
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 16, color: "#026AA2" }}>
          Địa chỉ
        </Text>
        <FormInput
          label="Địa chỉ chi tiết"
          name="location.address"
          value={formData.location.address}
          onChangeText={(value) => onChange("location.address", value)}
          required
          error={errors["location.address"]}
        />
        <View style={{ flexDirection: "row", gap: 16, marginBottom: 16 }}>
          <FormInput
            label="Quận/Huyện"
            name="location.district"
            value={formData.location.district}
            onChangeText={(value) => onChange("location.district", value)}
            style={{ flex: 1 }}
          />
          <FormInput
            label="Thành phố"
            name="location.city"
            value={formData.location.city}
            onChangeText={(value) => onChange("location.city", value)}
            required
            error={errors["location.city"]}
            style={{ flex: 1 }}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <FormInput
            label="Tỉnh/Thành"
            name="location.province"
            value={formData.location.province}
            onChangeText={(value) => onChange("location.province", value)}
            style={{ flex: 1 }}
          />
          <FormInput
            label="Khoảng cách TT (km)"
            name="distanceToCenter"
            value={formData.distanceToCenter.toString()}
            onChangeText={(value) => onChange("distanceToCenter", Number.parseFloat(value) || 0)}
            keyboardType="numeric"
            style={{ flex: 1 }}
          />
        </View>
      </View>

      {/* Hình ảnh & Video */}
      <View
        style={{
          backgroundColor: "#F5F3FF",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 16, color: "#5B21B6" }}>
          Hình ảnh & Video
        </Text>
        <FormInput
          label="URL Hình ảnh chính"
          name="image"
          value={formData.image}
          onChangeText={(value) => onChange("image", value)}
          keyboardType="url"
        />
        <FormInput
          label="URL Video tour"
          name="videoTourUrl"
          value={formData.videoTourUrl}
          onChangeText={(value) => onChange("videoTourUrl", value)}
          keyboardType="url"
        />
      </View>
    </View>
  )
}

export default PricingLocationStep