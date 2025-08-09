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
      <TouchableOpacity 
        style={[styles.prevButton, currentStep === 0 && styles.buttonDisabled]} 
        onPress={onPrev}
        disabled={currentStep === 0}
      >
        <Text style={[styles.prevButtonText, currentStep === 0 && styles.disabledText]}>
          Quay lại
        </Text>
      </TouchableOpacity>
      
      {currentStep < totalSteps - 1 ? (
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={onSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>{loading ? "Đang tạo..." : "Tạo"}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  navigationButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  prevButton: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    flex: 1,
  },
  nextButton: {
    backgroundColor: "#FFA500",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: "#FFA500",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    flex: 1,
  },
  submitButton: {
    backgroundColor: "#FFA500",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: "#FFA500",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    flex: 1,
  },
  submitButtonDisabled: {
    backgroundColor: "#CCCCCC",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonDisabled: {
    backgroundColor: "#F0F0F0",
    borderColor: "#D0D0D0",
  },
  prevButtonText: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  disabledText: {
    color: "#999999",
  },
})

export default NavigationButtons