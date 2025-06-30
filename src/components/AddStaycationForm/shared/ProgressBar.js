// components/AddStaycationForm/shared/ProgressBar.js

import React from "react"
import { View, Text, StyleSheet } from "react-native"

const ProgressBar = ({ steps, currentStep }) => {
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
              <Text
                style={[
                  styles.progressDotText,
                  index <= currentStep && styles.progressDotTextActive,
                ]}
              >
                {step.icon}
              </Text>
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
})

export default ProgressBar