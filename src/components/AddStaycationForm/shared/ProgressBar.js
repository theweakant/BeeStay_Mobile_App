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
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressStep: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 4,
  },
  progressDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
    borderWidth: 2,
  },
  progressDotActive: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  progressDotInactive: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
  },
  progressDotText: {
    fontSize: 16,
    color: "#9CA3AF",
  },
  progressDotTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  progressLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 14,
    maxWidth: 80,
  },
  progressLabelActive: {
    color: "#3B82F6",
    fontWeight: "600",
  },
})

export default ProgressBar