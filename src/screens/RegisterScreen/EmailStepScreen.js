// EmailStepScreen.js - Bước 1: Nhập email và gửi OTP
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from 'react-native';
import { useAuth } from '../../redux/hooks/useAuth';

export default function EmailStepScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const { registration, sendOTP, setEmail: setRegistrationEmail, clearError } = useAuth();

  const handleSendOTP = async () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Lỗi', 'Vui lòng nhập email hợp lệ');
      return;
    }

    try {
      clearError();
      setRegistrationEmail(email);
      const result = await sendOTP(email);
      
      if (result.type === 'auth/sendRegisterOTP/fulfilled') {
        Alert.alert(
          'Thành công', 
          'OTP đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Send OTP error:', error);
    }
  };

  const handleBackToLogin = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const isValidEmail = email && email.includes('@');

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo Section - matching login theme */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/Logo/beestay-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Đăng ký tài khoản</Text>
        <Text style={styles.headerSubtitle}>
          Nhập email của bạn để nhận mã xác thực
        </Text>
      </View>

      {/* Input container matching login style */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            registration.error && styles.inputError
          ]}
          placeholder="Nhập email của bạn"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          editable={!registration.loading}
        />
      </View>

      {registration.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{registration.error}</Text>
        </View>
      )}

      {/* Button matching login theme */}
      <TouchableOpacity
        style={[
          styles.sendButton,
          (!isValidEmail || registration.loading) && styles.sendButtonDisabled
        ]}
        onPress={handleSendOTP}
        disabled={!isValidEmail || registration.loading}
      >
        {registration.loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#ffffff" size="small" />
            <Text style={[styles.sendButtonText, { marginLeft: 8 }]}>
              Đang gửi...
            </Text>
          </View>
        ) : (
          <Text style={styles.sendButtonText}>Gửi mã OTP</Text>
        )}
      </TouchableOpacity>

      <View style={styles.backToLoginContainer}>
        <Text style={styles.backToLoginText}>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={handleBackToLogin}>
          <Text style={styles.backToLoginLink}>Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 80,
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 16,
    color: "#333",
    fontWeight: "500",
  },
  inputError: {
    borderColor: "#ff4444",
    backgroundColor: "#fff5f5",
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    marginHorizontal: 40,
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  sendButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 30,
    marginHorizontal: 40,
    shadowColor: "#FFA500",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  sendButtonDisabled: {
    backgroundColor: "#ccc",
    shadowOpacity: 0.1,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backToLoginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  backToLoginText: {
    color: "#666",
    fontSize: 15,
  },
  backToLoginLink: {
    color: "#FFA500",
    fontWeight: "bold",
    fontSize: 15,
  },
});