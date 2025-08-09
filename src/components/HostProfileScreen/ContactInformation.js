import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VerificationBadge } from '../../components/HostProfileScreen/VerificationBadge';
import { getFullLocation } from '../../utils/textUtils';

export const ContactInformation = ({ profileData, isEditing, editedData, setEditedData }) => {
  const contactItems = [
    { 
      icon: 'mail', 
      label: 'Email', 
      key: 'email', 
      type: 'email-address', 
      verified: profileData?.verificationStatus?.email || false 
    },
    { 
      icon: 'call', 
      label: 'Số điện thoại', 
      key: 'phone', 
      type: 'phone-pad', 
      verified: profileData?.verificationStatus?.phone || false 
    },
    { 
      icon: 'location', 
      label: 'Địa chỉ', 
      key: 'location', 
      type: 'default', 
      verified: profileData?.verificationStatus?.address || false 
    }
  ];

  // Helper function để get giá trị hiển thị
  const getDisplayValue = (key) => {
    const value = profileData?.[key];
    
    if (!value) return 'Chưa cập nhật';
    
    // Xử lý riêng cho location
    if (key === 'location') {
      return getFullLocation(value);
    }
    
    return value;
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
      
      <View style={styles.contactContainer}>
        {contactItems.map((item, index) => (
          <View key={index} style={styles.contactItem}>
            <View style={styles.contactHeader}>
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={item.icon} 
                  size={20} 
                  color="#FFA500" 
                />
              </View>
              <Text style={styles.contactLabel}>{item.label}</Text>
              <VerificationBadge isVerified={item.verified} />
            </View>
            
            {isEditing ? (
              <TextInput
                style={styles.contactInput}
                value={editedData?.[item.key] || ''}
                onChangeText={(text) => setEditedData({...editedData, [item.key]: text})}
                keyboardType={item.type}
                placeholder={`Nhập ${item.label.toLowerCase()}`}
                placeholderTextColor="#999999"
              />
            ) : (
              <Text style={styles.contactValue}>
                {getDisplayValue(item.key)}
              </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 20,
  },
  contactContainer: {
    gap: 16,
  },
  contactItem: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    flex: 1,
  },
  contactValue: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    lineHeight: 22,
    marginLeft: 44, // Align with icon + margin
  },
  contactInput: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFA500',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginLeft: 44, // Align with icon + margin
  },
});