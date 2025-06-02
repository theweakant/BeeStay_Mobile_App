import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const VerificationBadge = ({ isVerified }) => (
  <View style={[styles.verificationBadge, 
    { backgroundColor: isVerified ? '#E8F5E8' : '#FFF3E0' }
  ]}>
    <Text style={[styles.verificationText, 
      { color: isVerified ? '#2E7D32' : '#F57C00' }
    ]}>
      {isVerified ? '✓ Đã xác thực' : '! Chưa xác thực'}
    </Text>
  </View>
);

const ContactInfoRow = ({ 
  icon, 
  label, 
  value, 
  isEditing, 
  onChangeText, 
  keyboardType = 'default',
  isVerified 
}) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIconContainer}>
      <Text style={styles.infoIcon}>{icon}</Text>
    </View>
    {isEditing ? (
      <TextInput
        style={styles.infoInput}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    ) : (
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    )}
    <VerificationBadge isVerified={isVerified} />
  </View>
);

const ContactSection = ({ 
  profileData, 
  isEditing, 
  editedData, 
  onEmailChange, 
  onPhoneChange, 
  onLocationChange 
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
      
      <ContactInfoRow
        icon="📧"
        label="Email"
        value={isEditing ? editedData.email : profileData.email}
        isEditing={isEditing}
        onChangeText={onEmailChange}
        keyboardType="email-address"
        isVerified={profileData.verificationStatus.email}
      />
      
      <ContactInfoRow
        icon="📱"
        label="Số điện thoại"
        value={isEditing ? editedData.phone : profileData.phone}
        isEditing={isEditing}
        onChangeText={onPhoneChange}
        keyboardType="phone-pad"
        isVerified={profileData.verificationStatus.phone}
      />
      
      <ContactInfoRow
        icon="🏠"
        label="Địa chỉ"
        value={isEditing ? editedData.location : profileData.location}
        isEditing={isEditing}
        onChangeText={onLocationChange}
        isVerified={profileData.verificationStatus.address}
      />
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
    marginBottom: 15,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoIcon: {
    fontSize: 18,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#212529',
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
  verificationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verificationText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ContactSection;