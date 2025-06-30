// components/AddStaycationForm/shared/NavigationButtons.js

import React from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

const NavigationButtons = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onSubmit,
  loading,
}) => {
  return (
    <View style={styles.navigationButtons}>
      {currentStep > 0 && (
        <TouchableOpacity style={styles.prevButton} onPress={onPrev}>
          <Text style={styles.prevButtonText}>← Quay lại</Text>
        </TouchableOpacity>
      )}
      {currentStep < totalSteps - 1 ? (
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>Tiếp theo →</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={onSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>{loading ? "Đang tạo..." : "🏠 Tạo Homestay"}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default NavigationButtons