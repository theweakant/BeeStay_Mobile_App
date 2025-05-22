"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native"
import { useNavigation } from "@react-navigation/native";


const LoginScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("")

  return (
    <SafeAreaView style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BeeStay xin chào!!!</Text>
        <Text style={styles.headerSubtitle}>
          Đăng nhập để đặt phòng với những ưu đãi độc quyền dành cho thành viên.
        </Text>
      </View>

      {/* Phone Input */}
      <View style={styles.phoneInputContainer}>
        <TouchableOpacity style={styles.countryCodeContainer}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg",
            }}
            style={styles.flagIcon}
          />
          <Text style={styles.countryCodeText}>+84</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Home")} // hoặc bất kỳ screen nào bạn đã đăng ký
      >
        <Text style={styles.loginButtonText}>Đăng nhập & đặt homestay ngay</Text>
      </TouchableOpacity>

      {/* Social Login */}
      <View style={styles.socialContainer}>
        <Text style={styles.socialLabel}>Hoặc đăng nhập bằng</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={[styles.socialIcon, { color: "#3b5998" }]}>f</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={[styles.socialIcon, { color: "#db4437" }]}>G</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>🍎</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  closeButton: {
    alignSelf: "flex-start",
    padding: 10,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "300",
  },
  header: {
    marginTop: 20,
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  phoneInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginBottom: 20,
    height: 50,
    alignItems: "center",
  },
  countryCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    height: "100%",
  },
  flagIcon: {
    width: 20,
    height: 14,
    marginRight: 6,
  },
  countryCodeText: {
    fontSize: 14,
  },
  textInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "#F5B041",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  socialContainer: {
    alignItems: "center",
  },
  socialLabel: {
    color: "#9CA3AF",
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  socialIcon: {
    fontSize: 24,
  },
})

export default LoginScreen
