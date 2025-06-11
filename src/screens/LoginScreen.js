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
  Image,
  Platform,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError } from '../redux/slices/auth.slice'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'

// Logo
import Glogo from "../../assets/Logo/g_logo.png"

// Cấu hình Google OAuth
const webClientId = "75416150561-saind5u141gl29jjgrim2uro44filujt.apps.googleusercontent.com"
const iosClientId = "75416150561-t3ia9i1stka3ve3fki5l413gm1or82a1.apps.googleusercontent.com"
const androidClientId = "75416150561-6cpt55s1r5d8rmqceq9vf5gf18132sfg.apps.googleusercontent.com"

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  // Redux state
  const { loading, error, isAuthenticated } = useSelector(state => state.auth)

  // Local state
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  // Google OAuth configuration - Fixed URI generation
const createRedirectUri = () => {
  const uri = AuthSession.makeRedirectUri({
    useProxy: true, 
  })
  console.log('Generated redirectUri:', uri)
  return uri
}

  const redirectUri = createRedirectUri()

const config = {
  clientId: Platform.select({
    ios: iosClientId,
    android: androidClientId,
    web: webClientId,
    default: webClientId,
  }),
  redirectUri: createRedirectUri(),
  scopes: ['profile', 'email'],
}

  const [request, response, promptAsync] = Google.useAuthRequest(config)

  // Debug log - Kiểm tra cấu hình
  useEffect(() => {
    console.log('=== GOOGLE OAUTH DEBUG ===')
    console.log('Environment:', __DEV__ ? 'Development' : 'Production')
    console.log('Platform:', Platform.OS)
    console.log('App slug:', 'beestay-mobile')
    console.log('Expected owner:', 'theweakant')
    console.log('Generated redirectUri:', redirectUri)

    if (request) {
      console.log('Final request redirectUri:', request.redirectUri)
      console.log('Request clientId:', request.clientId)

      // Danh sách URI hợp lệ
      const validUris = [
        'http://localhost:8081',
        'https://auth.expo.io/@theweakant/beestay-mobile', 
        'https://auth.expo.io/@anonymous/beestay-mobile' 
      ]

      const isValidUri = validUris.some(uri =>
        request.redirectUri === uri || request.redirectUri.startsWith(uri)
      )
      console.log('URI valid:', isValidUri ? '✅' : '❌')
      console.log('Valid URIs:', validUris)
      console.log('Current URI:', request.redirectUri)

      // Kiểm tra có khớp với Google Console không
      const googleConsoleUris = [
        'http://localhost:8081',
        'https://auth.expo.io/@anonymous/beestay-mobile', 
        'https://auth.expo.io/@theweakant/beestay-mobile' 
      ]
      const matchesConsole = googleConsoleUris.includes(request.redirectUri)
      console.log('Matches Google Console:', matchesConsole ? '✅' : '❌')
    }
    console.log('===========================')
  }, [request, redirectUri])

  // Handle successful login
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Login successful - Navigation will be handled by AppNavigator')
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

  // Handle Google OAuth response
  const getUserProfile = async (token) => {
    if (!token) return
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me",  {
        headers: { Authorization: `Bearer ${token}` },
      })
      const user = await response.json()
      console.log("Google user data:", user)

      // TODO: Send user data to backend for authentication
      Alert.alert(
        "Đăng nhập Google thành công!",
        `Chào mừng ${user.name}!\nEmail: ${user.email}`,
        [{ text: "OK" }]
      )
    } catch (error) {
      console.log("Error fetching Google user profile:", error)
      Alert.alert("Lỗi", "Không thể lấy thông tin từ Google")
    }
  }

  const handleGoogleToken = () => {
    console.log('=== HANDLING GOOGLE RESPONSE ===')
    console.log('Response type:', response?.type)
    console.log('Response:', response)

    if (response?.type === "success") {
      const { authentication } = response
      const token = authentication?.accessToken
      console.log("Google access token received:", !!token)
      getUserProfile(token)
    } else if (response?.type === "error") {
      console.log("Google OAuth error:", response.error)
      Alert.alert(
        "Lỗi đăng nhập Google",
        response.error?.message || "Có lỗi xảy ra khi đăng nhập với Google"
      )
    }
    console.log('===============================')
  }

  useEffect(() => {
    if (response) {
      handleGoogleToken()
    }
  }, [response])

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

  const handleGoogleLogin = () => {
    console.log('=== INITIATING GOOGLE LOGIN ===')
    console.log('Request available:', !!request)
    console.log('Request redirectUri:', request?.redirectUri)
    console.log('Loading state:', loading)

    if (!request) {
      Alert.alert("Lỗi", "Google OAuth chưa sẵn sàng, vui lòng thử lại")
      return
    }

    promptAsync()
    console.log('Google login prompt initiated')
    console.log('================================')
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

      {/* Social Login */}
      <View style={styles.socialContainer}>
        <Text style={styles.socialLabel}>Hoặc đăng nhập bằng</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton} disabled={loading}>
            <Text style={[styles.socialIcon, { color: "#3b5998" }]}>f</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.socialButton, styles.googleButton]} 
            disabled={loading || !request}
            onPress={handleGoogleLogin}
          >
            <Image source={Glogo} style={styles.googleLogo} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} disabled={loading}>
            <Text style={styles.socialIcon}>🍎</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Debug Info */}
      <View style={styles.testContainer}>
        <TouchableOpacity 
          style={[
            styles.testButton, 
            (!request || loading) && styles.testButtonDisabled
          ]}
          onPress={handleGoogleLogin}
          disabled={loading || !request}
        >
          <Image source={Glogo} style={styles.testGoogleLogo} />
          <Text style={styles.testButtonText}>
            {!request ? 'Google OAuth Loading...' : 'Test Google Login'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.debugText}>
          URI: {request?.redirectUri || 'Loading...'}
        </Text>
        <Text style={styles.debugText}>
          Environment: {__DEV__ ? 'Dev' : 'Prod'}
        </Text>
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
  socialContainer: {
    alignItems: 'center',
  },
  socialLabel: {
    color: '#888',
    marginBottom: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 20,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 20,
  },
  googleButton: {
    borderColor: '#DB4437',
  },
  googleLogo: {
    width: 24,
    height: 24,
  },
  testContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  testButton: {
    flexDirection: 'row',
    backgroundColor: '#DB4437',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  testButtonDisabled: {
    opacity: 0.5,
  },
  testGoogleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  testButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  debugText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
})