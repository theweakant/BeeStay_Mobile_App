"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError } from '../redux/slices/auth.slice'

const LoginScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  
  // Redux state
  const { loading, error, isAuthenticated } = useSelector(state => state.auth)
  
  // Local state
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  // Handle successful login - navigate based on authentication status
  useEffect(() => {
    if (isAuthenticated) {
      // Don't navigate manually - let AppNavigator handle the navigation
      // The AppNavigator will automatically show the correct stack based on role
      console.log('Login successful - AppNavigator will handle navigation')
    }
  }, [isAuthenticated])

  // Show error alert
  useEffect(() => {
    if (error) {
      Alert.alert(
        "Đăng nhập thất bại",
        typeof error === 'string' ? error : "Có lỗi xảy ra, vui lòng thử lại",
        [
          {
            text: "OK",
            onPress: () => dispatch(clearError())
          }
        ]
      )
    }
  }, [error, dispatch])

  const handleLogin = async () => {
    // Validate input
    if (!userName.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên đăng nhập")
      return
    }
    
    if (!password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu")
      return
    }

    // Prepare credentials
    const credentials = {
      userName: userName.trim(),
      password: password.trim()
    }

    try {
      await dispatch(loginUser(credentials)).unwrap()
      // Login successful - useEffect will handle the flow
      // AppNavigator will automatically navigate to correct stack
    } catch (error) {
      // Error handled by useEffect
      console.error('Login failed:', error)
    }
  }

  const handleClose = () => {
    // Clear any errors when closing
    if (error) {
      dispatch(clearError())
    }
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BeeStay xin chào!!!</Text>
        <Text style={styles.headerSubtitle}>
          Đăng nhập để đặt phòng với những ưu đãi độc quyền dành cho thành viên.
        </Text>
      </View>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Tên đăng nhập"
          value={userName}
          onChangeText={setUserName}
          editable={!loading}
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#ffffff" size="small" />
            <Text style={[styles.loginButtonText, { marginLeft: 8 }]}>
              Đang đăng nhập...
            </Text>
          </View>
        ) : (
          <Text style={styles.loginButtonText}>Đăng nhập & đặt homestay ngay</Text>
        )}
      </TouchableOpacity>

      {/* Social Login */}
      <View style={styles.socialContainer}>
        <Text style={styles.socialLabel}>Hoặc đăng nhập bằng</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton} disabled={loading}>
            <Text style={[styles.socialIcon, { color: "#3b5998" }]}>f</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} disabled={loading}>
            <Text style={[styles.socialIcon, { color: "#db4437" }]}>G</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} disabled={loading}>
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
  inputContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginBottom: 16,
    height: 50,
  },
  textInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
  },
  loginButton: {
    backgroundColor: "#F5B041",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 4,
  },
  loginButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
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