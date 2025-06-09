import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { VerificationBadge } from '../../components/HostProfileScreen/VerificationBadge';
import { getFullLocation } from '../../utils/textUtils'; // ✅ Import hàm util

export const ContactInformation = ({ profileData, isEditing, editedData, setEditedData }) => {
  const contactItems = [
    { icon: '📧', label: 'Email', key: 'email', type: 'email-address', verified: profileData?.verificationStatus?.email || false },
    { icon: '📱', label: 'Số điện thoại', key: 'phone', type: 'phone-pad', verified: profileData?.verificationStatus?.phone || false },
    { icon: '🏠', label: 'Địa chỉ', key: 'location', type: 'default', verified: profileData?.verificationStatus?.address || false }
  ];

  // ✅ Helper function để get giá trị hiển thị
  const getDisplayValue = (key) => {
    const value = profileData?.[key];
    
    if (!value) return 'N/A';
    
    // ✅ Xử lý riêng cho location
    if (key === 'location') {
      return getFullLocation(value); // Sử dụng hàm util có sẵn
    }
    
    return value;
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
      
      {contactItems.map((item, index) => (
        <View key={index} style={styles.infoRow}>
          <View style={styles.infoIconContainer}>
            <Text style={styles.infoIcon}>{item.icon}</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={styles.infoInput}
              value={editedData?.[item.key] || ''}
              onChangeText={(text) => setEditedData({...editedData, [item.key]: text})}
              keyboardType={item.type}
              placeholder={`Nhập ${item.label.toLowerCase()}`}
            />
          ) : (
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              {/* ✅ SỬA DUY NHẤT: Dùng getDisplayValue thay vì render trực tiếp */}
              <Text style={styles.infoValue}>{getDisplayValue(item.key)}</Text>
            </View>
          )}
          <VerificationBadge isVerified={item.verified} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  infoIconContainer: {
    width: 30,
    alignItems: 'center',
    marginRight: 12,
  },
  infoIcon: {
    fontSize: 16,
  },
  infoContent: {
    flex: 1,
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#212529',
    fontWeight: '500',
  },
  infoInput: {
    flex: 1,
    fontSize: 14,
    color: '#212529',
    borderBottomWidth: 1,
    borderBottomColor: '#FF6B35',
    paddingVertical: 4,
    marginRight: 10,
  },
});