// components/AddStaycationForm/shared/FormInput.js

import React from "react"
import { View, Text, TextInput } from "react-native"

const FormInput = ({
  label,
  name,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  required = false,
  error,
  focused,
}) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 8, color: "#374151" }}>
        {label}
        {required && <Text style={{ color: "#EF4444" }}> *</Text>}
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: error ? "#EF4444" : focused ? "#3B82F6" : "#D1D5DB",
          borderRadius: 12,
          padding: 16,
          fontSize: 16,
          backgroundColor: "#FFFFFF",
          color: "#1F2937",
          ...(multiline && { height: numberOfLines * 20 }),
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholderTextColor="#9CA3AF"
      />
      {error && <Text style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>{error}</Text>}
    </View>
  )
}

export default FormInput