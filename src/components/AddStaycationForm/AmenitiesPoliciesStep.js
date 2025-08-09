// components/AddStaycationForm/AmenitiesPoliciesStep.js

import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import SwitchItem from "./shared/SwitchItem"

const amenityConfig = {
  wifi: { icon: "wifi-outline" },
  airConditioner: { icon: "snow-outline" },
  kitchen: { icon: "restaurant-outline" },
  privateBathroom: { icon: "water-outline" },
  pool: { icon: "boat-outline" },
  petAllowed: { icon: "paw-outline" },
  parking: { icon: "car-outline" },
  balcony: { icon: "sunny-outline" },
  bbqArea: { icon: "flame-outline" },
  roomService: { icon: "call-outline" },
  securityCamera: { icon: "videocam-outline" },
}

const policyConfig = [
  { key: "allowPet", icon: "paw-outline" },
  { key: "allowSmoking", icon: "cloud-outline" },
  { key: "refundable", icon: "card-outline" },
]

const statusConfig = [
  { key: "available", icon: "checkmark-circle-outline" },
  { key: "recommended", icon: "star-outline" },
  { key: "instantBook", icon: "flash-outline" },
  { key: "flashSale", icon: "gift-outline" },
]

const AmenitiesPoliciesStep = ({ formData, onChange }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Tiện nghi & Chính sách</Text>
      </View>

      {/* Tiện nghi */}
      <View style={[styles.section, styles.sectionBordered]}>
        <Text style={styles.sectionTitle}>Tiện nghi</Text>
        <View style={styles.amenitiesGrid}>
          {Object.keys(formData.amenities).map((amenity) => {
            const config = amenityConfig[amenity]
            if (!config) return null
            
            return (
              <View key={amenity} style={styles.switchItemWrapper}>
                <SwitchItem
                  icon={<Ionicons name={config.icon} size={20} color="#6B7280" />}
                  label={config.label}
                  value={formData.amenities[amenity]}
                  onValueChange={(value) => onChange(`amenities.${amenity}`, value)}
                />
              </View>
            )
          })}
        </View>
      </View>

      {/* Chính sách */}
      <View style={[styles.section, styles.sectionBordered]}>
        <Text style={styles.sectionTitle}>Chính sách</Text>
        <View style={styles.policiesContainer}>
          {policyConfig.map((policy) => (
            <View key={policy.key} style={styles.switchItemWrapper}>
              <SwitchItem
                icon={<Ionicons name={policy.icon} size={20} color="#6B7280" />}
                value={formData.policies[policy.key]}
                onValueChange={(value) => onChange(`policies.${policy.key}`, value)}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Trạng thái */}
      <View style={[styles.section, styles.sectionBordered]}>
        <Text style={styles.sectionTitle}>Trạng thái</Text>
        <View style={styles.statusGrid}>
          {statusConfig.map((status) => (
            <View key={status.key} style={styles.statusItemWrapper}>
              <SwitchItem
                icon={<Ionicons name={status.icon} size={20} color="#6B7280" />}
                value={formData[status.key]}
                onValueChange={(value) => onChange(status.key, value)}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  headerContainer: {
    padding: 20,
    paddingBottom: 12,
  },
  
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#072a74ff",
    lineHeight: 28,
  },

  // Section styles
  section: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    marginHorizontal: 20,
  },
  
  sectionBordered: {
    backgroundColor: "transparent",
    borderColor: "#d5d5d5ff",
    borderWidth: 0.5,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    color: "#B45309",
  },

  // Amenities grid (2 columns)
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },

  // Policies container (2 items per row, then remainder)
  policiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },

  // Status grid (2x2)
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },

  switchItemWrapper: {
    width: "47%", // For 2-column layout
    minHeight: 50,
  },

  statusItemWrapper: {
    width: "47%", // For 2x2 grid
    minHeight: 50,
  },
})

export default AmenitiesPoliciesStep