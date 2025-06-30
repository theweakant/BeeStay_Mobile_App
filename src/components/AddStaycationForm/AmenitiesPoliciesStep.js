// components/AddStaycationForm/AmenitiesPoliciesStep.js

import React from "react"
import { View, Text } from "react-native"
import SwitchItem from "./shared/SwitchItem"

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

const AmenitiesPoliciesStep = ({ formData, onChange }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#1F2937" }}>Tiện nghi & Chính sách</Text>
      </View>

      {/* Tiện nghi */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 16, color: "#374151" }}>Tiện nghi</Text>
        {Object.keys(formData.amenities).map((amenity) => (
          <View key={amenity} style={{ marginBottom: 8 }}>
            <SwitchItem
              icon={amenityIcons[amenity] || "🏠"}
              label={amenityLabels[amenity] || amenity}
              value={formData.amenities[amenity]}
              onValueChange={(value) => onChange(`amenities.${amenity}`, value)}
            />
          </View>
        ))}
      </View>

      {/* Chính sách */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 16, color: "#374151" }}>Chính sách</Text>
        <View style={{ marginBottom: 8 }}>
          <SwitchItem
            icon="🐕"
            label="Cho phép thú cưng"
            value={formData.policies.allowPet}
            onValueChange={(value) => onChange("policies.allowPet", value)}
          />
        </View>
        <View style={{ marginBottom: 8 }}>
          <SwitchItem
            icon="🚬"
            label="Cho phép hút thuốc"
            value={formData.policies.allowSmoking}
            onValueChange={(value) => onChange("policies.allowSmoking", value)}
          />
        </View>
        <View style={{ marginBottom: 8 }}>
          <SwitchItem
            icon="💰"
            label="Có thể hoàn tiền"
            value={formData.policies.refundable}
            onValueChange={(value) => onChange("policies.refundable", value)}
          />
        </View>
      </View>

      {/* Trạng thái */}
      <View>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 16, color: "#374151" }}>Trạng thái</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          <View style={{ flex: 1, minWidth: 120 }}>
            <SwitchItem
              icon="✅"
              label="Khả dụng"
              value={formData.available}
              onValueChange={(value) => onChange("available", value)}
            />
          </View>
          <View style={{ flex: 1, minWidth: 120 }}>
            <SwitchItem
              icon="⭐"
              label="Đề xuất"
              value={formData.recommended}
              onValueChange={(value) => onChange("recommended", value)}
            />
          </View>
          <View style={{ flex: 1, minWidth: 120 }}>
            <SwitchItem
              icon="⚡"
              label="Đặt ngay"
              value={formData.instantBook}
              onValueChange={(value) => onChange("instantBook", value)}
            />
          </View>
          <View style={{ flex: 1, minWidth: 120 }}>
            <SwitchItem
              icon="🔥"
              label="Flash Sale"
              value={formData.flashSale}
              onValueChange={(value) => onChange("flashSale", value)}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default AmenitiesPoliciesStep