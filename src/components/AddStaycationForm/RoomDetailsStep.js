// components/AddStaycationForm/RoomDetailsStep.js

import React from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const RoomDetailsStep = ({ formData, onChange, errors }) => {
  const roomDetails = [
    {
      key: "roomCount",
      label: "Số phòng",
      icon: "home-outline",
      value: formData.roomCount,
      error: errors.roomCount
    },
    {
      key: "maxGuests", 
      label: "Số khách",
      icon: "people-outline",
      value: formData.maxGuests,
      error: errors.maxGuests
    },
    {
      key: "bedCount",
      label: "Số giường", 
      icon: "bed-outline",
      value: formData.bedCount,
      error: errors.bedCount
    },
    {
      key: "bathroomCount",
      label: "Phòng tắm",
      icon: "water-outline", 
      value: formData.bathroomCount,
      error: errors.bathroomCount
    }
  ]

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Chi tiết</Text>
      </View>

      {/* Room Details Grid */}
      <View style={styles.gridContainer}>
        {roomDetails.map((detail, index) => (
          <View key={detail.key} style={styles.detailCard}>
            <View style={styles.iconContainer}>
              <Ionicons 
                name={detail.icon} 
                size={24} 
                color="#6B7280" 
              />
            </View>
            
            <Text style={styles.label}>{detail.label}</Text>
            
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  detail.error && styles.inputError
                ]}
                value={detail.value.toString()}
                onChangeText={(value) => onChange(detail.key, Number.parseInt(value) || 1)}
                keyboardType="numeric"
                textAlign="center"
                maxLength={2}
              />
            </View>
            
            {detail.error && (
              <Text style={styles.errorText}>{detail.error}</Text>
            )}
          </View>
        ))}
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

  gridContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },

  detailCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 20,
    alignItems: "center",
    width: "47%", // Để có 2 cột đều nhau
    minHeight: 140,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  icon: {
    fontSize: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 12,
    textAlign: "center",
  },

  inputWrapper: {
    width: 56,
    height: 40,
  },

  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 8,
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    width: "100%",
    height: "100%",
  },

  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },

  errorText: {
    color: "#EF4444",
    fontSize: 11,
    marginTop: 4,
    textAlign: "center",
  },
})

export default RoomDetailsStep