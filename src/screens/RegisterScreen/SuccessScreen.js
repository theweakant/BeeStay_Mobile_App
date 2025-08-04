// SuccessScreen.js - BEESTAY UI UPDATED VERSION
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
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
    <SafeAreaView style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoName}>BeeStay</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.checkIcon}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        </View>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Đăng ký thành công!</Text>
          <Text style={styles.headerSubtitle}>
            {isAuthenticated 
              ? 'Chào mừng bạn đến với BeeStay. Bạn đã được đăng nhập tự động.'
              : 'Vui lòng đăng nhập để tiếp tục.'
            }
          </Text>
        </View>
        
        {/* Primary Button */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>
            {isAuthenticated ? 'Tiếp tục' : 'Đăng nhập ngay'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Cảm ơn bạn đã tin tưởng BeeStay
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: BeeStayColors.background,
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
  logoName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BeeStayColors.primary,
    letterSpacing: 1,
  },

  // Content
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  // Success Icon
  iconContainer: {
    marginBottom: 40,
  },
  checkIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: BeeStayColors.success,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BeeStayColors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  checkText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
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
    marginBottom: 20,
  },
  headerSubtitle: {
    fontSize: 16,
    color: BeeStayColors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },

  // Primary Button
  primaryButton: {
    backgroundColor: BeeStayColors.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    minWidth: 220,
    shadowColor: BeeStayColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
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
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: BeeStayColors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});