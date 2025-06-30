// components/AddStaycationForm/RoomDetailsStep.js

import React from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"

const RoomDetailsStep = ({ formData, onChange, errors }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#1F2937" }}>Chi tiết phòng</Text>
      </View>

      <View style={styles.roomDetailsGrid}>
        <View style={styles.roomDetailCard}>
          <Text style={styles.roomDetailIcon}>🏠</Text>
          <Text style={styles.roomDetailLabel}>Số phòng</Text>
          <TextInput
            style={styles.roomDetailInput}
            value={formData.roomCount.toString()}
            onChangeText={(value) => onChange("roomCount", Number.parseInt(value) || 1)}
            keyboardType="numeric"
            textAlign="center"
          />
        </View>
        <View style={styles.roomDetailCard}>
          <Text style={styles.roomDetailIcon}>👥</Text>
          <Text style={styles.roomDetailLabel}>Số khách</Text>
          <TextInput
            style={[styles.roomDetailInput, errors.maxGuests && styles.inputError]}
            value={formData.maxGuests.toString()}
            onChangeText={(value) => onChange("maxGuests", Number.parseInt(value) || 1)}
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
            onChangeText={(value) => onChange("bedCount", Number.parseInt(value) || 1)}
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
            onChangeText={(value) => onChange("bathroomCount", Number.parseInt(value) || 1)}
            keyboardType="numeric"
            textAlign="center"
          />
        </View>
      </View>

      {errors.maxGuests && <Text style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>{errors.maxGuests}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
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
    flex: 1,
    minWidth: 120,
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
    textAlign: "center",
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
})

export default RoomDetailsStep