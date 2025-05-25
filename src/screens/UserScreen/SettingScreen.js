"use client"

import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native"
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons"
import { useState } from "react"

const SettingScreen = () => {
  const [facebookLinked, setFacebookLinked] = useState(false)
  const [googleLinked, setGoogleLinked] = useState(false)
  const [appleLinked, setAppleLinked] = useState(false)

  return (
    <View style={styles.container}>

      {/* Linked Accounts Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tài khoản đã liên kết</Text>
        </View>

        {/* Facebook */}
        <View style={styles.accountRow}>
          <View style={styles.accountInfo}>
            <FontAwesome name="facebook-square" size={22} color="#3b5998" />
            <Text style={styles.accountText}>Facebook</Text>
          </View>
          <Switch
            value={facebookLinked}
            onValueChange={setFacebookLinked}
            trackColor={{ false: "#e0e0e0", true: "#e0e0e0" }}
            thumbColor={facebookLinked ? "#4CAF50" : "#f4f3f4"}
          />
        </View>

        {/* Google */}
        <View style={styles.accountRow}>
          <View style={styles.accountInfo}>
            <AntDesign name="google" size={22} color="#DB4437" />
            <Text style={styles.accountText}>Google</Text>
          </View>
          <Switch
            value={googleLinked}
            onValueChange={setGoogleLinked}
            trackColor={{ false: "#e0e0e0", true: "#e0e0e0" }}
            thumbColor={googleLinked ? "#4CAF50" : "#f4f3f4"}
          />
        </View>

        {/* Apple ID */}
        <View style={[styles.accountRow, { borderBottomWidth: 0 }]}>
          <View style={styles.accountInfo}>
            <AntDesign name="apple1" size={22} color="black" />
            <Text style={styles.accountText}>Apple ID</Text>
          </View>
          <Switch
            value={appleLinked}
            onValueChange={setAppleLinked}
            trackColor={{ false: "#e0e0e0", true: "#e0e0e0" }}
            thumbColor={appleLinked ? "#4CAF50" : "#f4f3f4"}
          />
        </View>
      </View>

      {/* Delete Account */}
      <TouchableOpacity style={styles.deleteAccount}>
        <Text style={styles.deleteText}>Xóa tài khoản của bạn</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // gray-100
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb", // gray-200
    backgroundColor: "#ffffff",
  },
  backButton: {
    paddingRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  section: {
    marginTop: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
  },
  sectionHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151", // gray-700
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6", // gray-100
  },
  accountInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountText: {
    marginLeft: 12,
    fontSize: 16,
  },
  deleteAccount: {
    marginTop: 24,
    alignItems: "center",
  },
  deleteText: {
    color: "#ef4444", // red-500
    fontWeight: "500",
  },
})

export default SettingScreen
