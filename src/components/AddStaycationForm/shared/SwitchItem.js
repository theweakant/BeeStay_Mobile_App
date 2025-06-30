// components/AddStaycationForm/shared/SwitchItem.js

import React from "react"
import { View, Text, Switch } from "react-native"

const SwitchItem = ({ icon, label, value, onValueChange }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Text style={{ fontSize: 18, marginRight: 12 }}>{icon}</Text>
        <Text style={{ fontSize: 14, color: "#374151", fontWeight: "500" }}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
        thumbColor={value ? "#FFFFFF" : "#F9FAFB"}
        ios_backgroundColor="#E5E7EB"
      />
    </View>
  )
}

export default SwitchItem