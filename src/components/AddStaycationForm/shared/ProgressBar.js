import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { 
      icon: "information-circle", 
      title: "Thông tin",
      iconSize: 20
    },
    { 
      icon: "card", 
      title: "Giá cả",
      iconSize: 18
    },
    { 
      icon: "star", 
      title: "Đặc điểm",
      iconSize: 18
    },
    { 
      icon: "document-text", 
      title: "Chính sách",
      iconSize: 18
    },
  ]

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        {steps.map((step, index) => (
          <View key={index} style={styles.progressStep}>
            <View
              style={[
                styles.progressDot,
                index <= currentStep ? styles.progressDotActive : styles.progressDotInactive,
              ]}
            >
              <Ionicons
                name={step.icon}
                size={step.iconSize}
                color={index <= currentStep ? "#FFA500" : "#999999"}
              />
            </View>
            <Text
              style={[
                styles.progressLabel,
                index === currentStep && styles.progressLabelActive,
              ]}
            >
              {step.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  progressContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  progressStep: {
    alignItems: "center",
    flex: 1,
  },
  progressDot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  progressDotActive: {
    backgroundColor: "#FFF3E0",
    borderWidth: 2,
    borderColor: "#FFA500",
    shadowColor: "#FFA500",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  progressDotInactive: {
    backgroundColor: "#F5F5F5",
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  progressLabel: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  progressLabelActive: {
    color: "#FFA500",
    fontWeight: "600",
  },
})

export default ProgressBar