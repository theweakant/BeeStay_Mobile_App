// SuccessScreen.js - Màn hình thành công
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useAuth } from '../../redux/hooks/useAuth';

export default function SuccessScreen({ navigation }) {
  const { resetRegistration, isAuthenticated } = useAuth();
  
  const handleContinue = () => {
    resetRegistration();
    
    if (isAuthenticated) {
      // Nếu đã tự động đăng nhập sau khi đăng ký
      navigation.replace('Home'); // hoặc MainTabs
    } else {
      // Nếu cần đăng nhập thủ công
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.checkIcon}>✓</Text>
        </View>
        
        <Text style={styles.title}>Đăng ký thành công!</Text>
        
        <Text style={styles.message}>
          {isAuthenticated 
            ? 'Chào mừng bạn đến với ứng dụng. Bạn đã được đăng nhập tự động.'
            : 'Tài khoản của bạn đã được tạo thành công. Vui lòng đăng nhập để tiếp tục.'
          }
        </Text>
        
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>
            {isAuthenticated ? 'Tiếp tục' : 'Đăng nhập ngay'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkIcon: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});