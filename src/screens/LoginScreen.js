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
import TestComponent from "../components/Test/testComponent"

export default function LoginScreen() {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  // Redux state
  const { loading, error, isAuthenticated } = useSelector(state => state.auth)

  // Local state
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  // Handle successful login
  useEffect(() => {
    if (isAuthenticated) {
      // Navigation will be handled by AppNavigator
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
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleClose = () => {
    if (error) {
      dispatch(clearError())
    }
    navigation.goBack()
  }

  const handleNavigateToRegister = () => {
    if (error) {
      dispatch(clearError())
    }
    navigation.navigate('Register')
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

      {/* Register Link */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={handleNavigateToRegister}>
          <Text style={styles.registerLink}>Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>

<View style={{ marginTop: 20 }}>
  <TestComponent />
</View>

      
    </SafeAreaView>



  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 10,
  },
  loginButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#666',
  },
  registerLink: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
})