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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <Text style={styles.subtitle}>
          Nhập email của bạn để nhận mã xác thực
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              registration.error && styles.inputError
            ]}
            placeholder="Nhập email của bạn"
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

        <TouchableOpacity
          style={[
            styles.button,
            (!isValidEmail || registration.loading) && styles.buttonDisabled
          ]}
          onPress={handleSendOTP}
          disabled={!isValidEmail || registration.loading}
        >
          {registration.loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Gửi mã OTP</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backToLogin} onPress={handleBackToLogin}>
        <Text style={styles.backToLoginText}>
          Đã có tài khoản? {' '}
          <Text style={styles.linkText}>Đăng nhập ngay</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  form: {
    padding: 20,
    flex: 1,
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
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: '#ff4444',
    backgroundColor: '#fff5f5',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  backToLogin: {
    padding: 20,
    alignItems: 'center',
  },
  backToLoginText: {
    fontSize: 16,
    color: '#666',
  },
  linkText: {
    color: '#007bff',
    fontWeight: '600',
  },
});