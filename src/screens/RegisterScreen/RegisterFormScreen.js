// RegisterFormScreen.js - BEESTAY UI UPDATED VERSION
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Image
} from 'react-native';
import { useAuth } from '../../redux/hooks/useAuth';

// BeeStay Color Palette
const BeeStayColors = {
  primary: "#FFA500",        // Cam chủ đạo
  background: "#fff",        // Nền trắng
  inputBg: "#f8f9fa",       // Input background
  textPrimary: "#333",       // Text đậm
  textSecondary: "#666",     // Text nhẹ
  placeholder: "#999",       // Placeholder
  border: "#e9ecef",        // Border nhẹ
  error: "#ff4444",         // Error đỏ
  success: "#28a745",       // Success xanh
  successBg: "#d4edda",     // Success background
};

export default function RegisterFormScreen({ navigation }) {
  const { 
    registration, 
    verifyRegistration, 
    sendOTP, 
    prevStep, 
    clearError,
    isOTPExpired 
  } = useAuth();

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    email: registration.email || '', 
    role: 'USER', 
    otp: '',
  });

  const [otpTimer, setOtpTimer] = useState(0);
  const [canResendOTP, setCanResendOTP] = useState(false);

  // Sync email from registration state
  useEffect(() => {
    if (registration.email && registration.email !== formData.email) {
      setFormData(prev => ({
        ...prev,
        email: registration.email
      }));
    }
  }, [registration.email]);

  // OTP Timer
  useEffect(() => {
    if (registration.otpExpiry) {
      const updateTimer = () => {
        const remaining = Math.max(0, Math.floor((registration.otpExpiry - Date.now()) / 1000));
        setOtpTimer(remaining);
        setCanResendOTP(remaining === 0);
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [registration.otpExpiry]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleResendOTP = async () => {
    if (!canResendOTP) return;
    
    try {
      clearError();
      const result = await sendOTP(formData.email);
      
      if (result.type === 'auth/sendRegisterOTP/fulfilled') {
        Alert.alert('Thành công', 'OTP mới đã được gửi đến email của bạn');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.userName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên đăng nhập');
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }

    if (!formData.otp.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập mã OTP');
      return;
    }

    if (isOTPExpired) {
      Alert.alert('Lỗi', 'Mã OTP đã hết hạn. Vui lòng gửi lại mã mới');
      return;
    }

    try {
      clearError();
      
      const requestData = {
        userName: formData.userName.trim(),
        password: formData.password,
        email: formData.email.trim(),
        role: formData.role,
        otp: formData.otp.trim(),
      };
      
      console.log('🚀 Sending registration data:', requestData);
      
      const result = await verifyRegistration(requestData);

      if (result.type === 'auth/verifyAndRegister/fulfilled') {
        console.log('✅ Registration successful');
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isFormValid = 
    formData.userName.trim() &&
    formData.email.trim() &&
    formData.password.length >= 6 &&
    formData.password === formData.confirmPassword &&
    formData.otp.trim() &&
    !isOTPExpired;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/Logo/beestay-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Hoàn tất đăng ký</Text>
          <Text style={styles.headerSubtitle}>
            Điền thông tin và nhập mã OTP để hoàn tất đăng ký
          </Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Email - Display only */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.emailDisplay}>
              <Text style={styles.emailText}>{formData.email}</Text>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ Đã xác thực</Text>
              </View>
            </View>
          </View>

          {/* Username */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tên đăng nhập *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập tên đăng nhập"
              placeholderTextColor={BeeStayColors.placeholder}
              value={formData.userName}
              onChangeText={(value) => handleInputChange('userName', value)}
              autoCapitalize="none"
              editable={!registration.loading}
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mật khẩu *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              placeholderTextColor={BeeStayColors.placeholder}
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
              editable={!registration.loading}
            />
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Xác nhận mật khẩu *</Text>
            <TextInput
              style={[
                styles.textInput,
                formData.confirmPassword && formData.password !== formData.confirmPassword && styles.inputError
              ]}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor={BeeStayColors.placeholder}
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              secureTextEntry
              editable={!registration.loading}
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <Text style={styles.errorText}>Mật khẩu không khớp</Text>
            )}
          </View>

          {/* Role Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Vai trò</Text>
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  formData.role === 'USER' && styles.roleButtonActive
                ]}
                onPress={() => handleInputChange('role', 'USER')}
                disabled={registration.loading}
              >
                <Text style={[
                  styles.roleButtonText,
                  formData.role === 'USER' && styles.roleButtonTextActive
                ]}>
                  Người dùng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  formData.role === 'HOST' && styles.roleButtonActive
                ]}
                onPress={() => handleInputChange('role', 'HOST')}
                disabled={registration.loading}
              >
                <Text style={[
                  styles.roleButtonText,
                  formData.role === 'HOST' && styles.roleButtonTextActive
                ]}>
                  Chủ nhà
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* OTP */}
          <View style={styles.inputContainer}>
            <View style={styles.otpHeader}>
              <Text style={styles.label}>Mã OTP *</Text>
              <View style={styles.otpTimer}>
                {otpTimer > 0 ? (
                  <Text style={styles.timerText}>
                    {formatTime(otpTimer)}
                  </Text>
                ) : (
                  <TouchableOpacity 
                    onPress={handleResendOTP} 
                    disabled={registration.loading}
                    style={styles.resendButton}
                  >
                    <Text style={styles.resendText}>Gửi lại</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <TextInput
              style={[
                styles.textInput,
                styles.otpInput,
                isOTPExpired && styles.inputError
              ]}
              placeholder="Nhập mã OTP (6 số)"
              placeholderTextColor={BeeStayColors.placeholder}
              value={formData.otp}
              onChangeText={(value) => handleInputChange('otp', value)}
              keyboardType="numeric"
              maxLength={6}
              editable={!registration.loading}
            />
            {isOTPExpired && (
              <Text style={styles.errorText}>⚠️ Mã OTP đã hết hạn</Text>
            )}
            <Text style={styles.helperText}>
              OTP đã được gửi đến: {formData.email}
            </Text>
          </View>

          {/* Error Message */}
          {registration.error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>⚠️ {registration.error}</Text>
            </View>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.primaryButton,
              (!isFormValid || registration.loading) && styles.buttonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!isFormValid || registration.loading}
          >
            {registration.loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Đăng ký</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={prevStep}
            disabled={registration.loading}
          >
            <Text style={styles.backButtonText}>← Quay lại</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: BeeStayColors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },

  // Logo Section
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  logoPlaceholder: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    marginBottom: 8,
  },
  logoName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BeeStayColors.primary,
    letterSpacing: 1,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: BeeStayColors.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: BeeStayColors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },

  // Content
  content: {
    flex: 1,
  },

  // Input Container
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: BeeStayColors.textPrimary,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: BeeStayColors.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BeeStayColors.border,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: BeeStayColors.textPrimary,
    fontWeight: '500',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputError: {
    borderColor: BeeStayColors.error,
    borderWidth: 1.5,
  },

  // Email Display
  emailDisplay: {
    backgroundColor: BeeStayColors.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BeeStayColors.border,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  emailText: {
    fontSize: 16,
    color: BeeStayColors.textPrimary,
    fontWeight: '500',
    flex: 1,
  },
  verifiedBadge: {
    backgroundColor: BeeStayColors.successBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  verifiedText: {
    fontSize: 12,
    color: BeeStayColors.success,
    fontWeight: '600',
  },

  // Role Selection
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    backgroundColor: BeeStayColors.inputBg,
    borderWidth: 1,
    borderColor: BeeStayColors.border,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  roleButtonActive: {
    backgroundColor: BeeStayColors.primary,
    borderColor: BeeStayColors.primary,
    shadowColor: BeeStayColors.primary,
    shadowOpacity: 0.3,
  },
  roleButtonText: {
    fontSize: 16,
    color: BeeStayColors.textSecondary,
    fontWeight: '500',
  },
  roleButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // OTP Section
  otpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  otpTimer: {
    alignItems: 'flex-end',
  },
  timerText: {
    fontSize: 14,
    color: BeeStayColors.textSecondary,
    fontWeight: '500',
  },
  resendButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  resendText: {
    fontSize: 14,
    color: BeeStayColors.primary,
    fontWeight: 'bold',
  },
  otpInput: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  // Helper & Error Text
  helperText: {
    color: BeeStayColors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  errorText: {
    color: BeeStayColors.error,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },

  // Primary Button
  primaryButton: {
    backgroundColor: BeeStayColors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 30,
    marginHorizontal: 40,
    shadowColor: BeeStayColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  backButtonText: {
    color: BeeStayColors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
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
});