// RegisterFormScreen.js - UPDATED VERSION
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
} from 'react-native';
import { useAuth } from '../../redux/hooks/useAuth';

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
    email: registration.email || '', // ✅ Thêm email vào form state
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
      
      // ✅ Request data theo đúng format JSON
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Hoàn tất đăng ký</Text>
        <Text style={styles.subtitle}>
          Điền thông tin và nhập mã OTP để hoàn tất đăng ký
        </Text>
      </View>

      <View style={styles.form}>
        {/* Email - Display only */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.emailDisplay}>
            <Text style={styles.emailText}>{formData.email}</Text>
            <Text style={styles.verifiedBadge}>✓ Đã xác thực</Text>
          </View>
        </View>

        {/* Username */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên đăng nhập *</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên đăng nhập"
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
            style={styles.input}
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
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
              styles.input,
              formData.confirmPassword && formData.password !== formData.confirmPassword && styles.inputError
            ]}
            placeholder="Nhập lại mật khẩu"
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            secureTextEntry
            editable={!registration.loading}
          />
          {formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <Text style={styles.errorText}>Mật khẩu không khớp</Text>
          )}
        </View>

        {/* Role */}
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
                  Còn lại: {formatTime(otpTimer)}
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResendOTP} disabled={registration.loading}>
                  <Text style={styles.resendText}>Gửi lại OTP</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <TextInput
            style={[
              styles.input,
              isOTPExpired && styles.inputError
            ]}
            placeholder="Nhập mã OTP (6 số)"
            value={formData.otp}
            onChangeText={(value) => handleInputChange('otp', value)}
            keyboardType="numeric"
            maxLength={6}
            editable={!registration.loading}
          />
          {isOTPExpired && (
            <Text style={styles.errorText}>Mã OTP đã hết hạn</Text>
          )}
          <Text style={styles.helperText}>
            OTP đã được gửi đến: {formData.email}
          </Text>
        </View>

        {/* Error Message */}
        {registration.error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{registration.error}</Text>
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!isFormValid || registration.loading) && styles.buttonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid || registration.loading}
        >
          {registration.loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Hoàn tất đăng ký</Text>
          )}
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={prevStep}
          disabled={registration.loading}
        >
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  form: {
    flex: 1,
    padding: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#ff4757',
  },
  errorText: {
    color: '#ff4757',
    fontSize: 12,
    marginTop: 4,
  },
  helperText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  roleButtonText: {
    fontSize: 16,
    color: '#666',
  },
  roleButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
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
    color: '#666',
  },
  resendText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
  },
  // Email display styles
  emailDisplay: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emailText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  verifiedBadge: {
    fontSize: 12,
    color: '#28a745',
    fontWeight: '600',
    backgroundColor: '#d4edda',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});