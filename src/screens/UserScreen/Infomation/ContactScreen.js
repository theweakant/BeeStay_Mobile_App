import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Alert,
  Linking
} from 'react-native';
import { 
  Ionicons, 
  MaterialIcons, 
  AntDesign, 
  Feather 
} from '@expo/vector-icons';

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }
    Alert.alert('Thành công', 'Tin nhắn của bạn đã được gửi. Chúng tôi sẽ phản hồi sớm nhất có thể!');
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleCall = () => {
    Linking.openURL('tel:+84123456789');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@homestayapp.com');
  };

  const ContactMethod = ({ icon, iconFamily, title, subtitle, onPress, color = "#F5B041" }) => (
    <TouchableOpacity style={styles.contactMethod} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.contactIcon, { backgroundColor: `${color}15` }]}>
        {iconFamily === 'Ionicons' && <Ionicons name={icon} size={24} color={color} />}
        {iconFamily === 'MaterialIcons' && <MaterialIcons name={icon} size={24} color={color} />}
        {iconFamily === 'AntDesign' && <AntDesign name={icon} size={24} color={color} />}
        {iconFamily === 'Feather' && <Feather name={icon} size={24} color={color} />}
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>{title}</Text>
        <Text style={styles.contactSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    </TouchableOpacity>
  );

  const InputField = ({ 
    label, 
    placeholder, 
    value, 
    onChangeText, 
    multiline = false, 
    keyboardType = 'default',
    required = false,
    icon
  }) => {
    const fieldKey = label.toLowerCase().replace(/\s+/g, '');
    const isFocused = focusedField === fieldKey;
    
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
        <View style={[styles.inputWrapper, isFocused && styles.inputFocused]}>
          {icon && (
            <View style={styles.inputIcon}>
              <Ionicons name={icon} size={20} color={isFocused ? "#F5B041" : "#C7C7CC"} />
            </View>
          )}
          <TextInput
            style={[styles.input, multiline && styles.textArea, icon && styles.inputWithIcon]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
            keyboardType={keyboardType}
            onFocus={() => setFocusedField(fieldKey)}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor="#C7C7CC"
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerIcon}>
            <MaterialIcons name="support-agent" size={32} color="#F5B041" />
          </View>
          <Text style={styles.header}>Liên hệ hỗ trợ</Text>
          <Text style={styles.subHeader}>
            Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
          </Text>
        </View>

        {/* Quick Contact Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Liên hệ nhanh</Text>
          <View style={styles.contactMethodsContainer}>
            <ContactMethod
              icon="call"
              iconFamily="Ionicons"
              title="Hotline hỗ trợ"
              subtitle="+84 123 456 789"
              onPress={handleCall}
              color="#4CAF50"
            />
            <ContactMethod
              icon="mail"
              iconFamily="Ionicons"
              title="Email hỗ trợ"
              subtitle="support@homestayapp.com"
              onPress={handleEmail}
              color="#2196F3"
            />
            <ContactMethod
              icon="time"
              iconFamily="Ionicons"
              title="Thời gian hỗ trợ"
              subtitle="24/7 - Tất cả các ngày"
              color="#FF9800"
            />
          </View>
        </View>
        {/* FAQ Section */}
        <View style={styles.section}>
          <View style={styles.faqCard}>
            <View style={styles.faqIcon}>
              <Ionicons name="help-circle" size={32} color="#F5B041" />
            </View>
            <View style={styles.faqContent}>
              <Text style={styles.faqTitle}>Câu hỏi thường gặp</Text>
              <Text style={styles.faqDescription}>
                Tìm câu trả lời nhanh chóng cho những thắc mắc phổ biến
              </Text>
            </View>
            <TouchableOpacity style={styles.faqButton} activeOpacity={0.7}>
              <Text style={styles.faqButtonText}>Xem FAQ</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Social Media */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kết nối với chúng tôi</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <AntDesign name="facebook-square" size={24} color="#1877F2" />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <AntDesign name="instagram" size={24} color="#E4405F" />
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <AntDesign name="youtube" size={24} color="#FF0000" />
              <Text style={styles.socialText}>YouTube</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Header Section
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 22,
  },

  // Section
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },

  // Contact Methods
  contactMethodsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },

  // Form Container
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  // Input Fields
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  required: {
    color: '#FF6B6B',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
  },
  inputFocused: {
    borderColor: '#F5B041',
    backgroundColor: '#fff',
  },
  inputIcon: {
    padding: 12,
    paddingRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    padding: 12,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  // Submit Button
  submitButton: {
    backgroundColor: '#F5B041',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },

  // FAQ Card
  faqCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  faqIcon: {
    marginRight: 16,
  },
  faqContent: {
    flex: 1,
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  faqDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  faqButton: {
    backgroundColor: '#F5B041',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  faqButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },

  // Social Media
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  socialButton: {
    alignItems: 'center',
    flex: 1,
  },
  socialText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 8,
    fontWeight: '500',
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 32,
  },
});