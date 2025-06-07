// components/ContactInformation.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { VerificationBadge } from '../../components/HostProfileScreen/VerificationBadge';

export const ContactInformation = ({ profileData, isEditing, editedData, setEditedData }) => {
  const contactItems = [
    { icon: '📧', label: 'Email', key: 'email', type: 'email-address', verified: profileData.verificationStatus.email },
    { icon: '📱', label: 'Số điện thoại', key: 'phone', type: 'phone-pad', verified: profileData.verificationStatus.phone },
    { icon: '🏠', label: 'Địa chỉ', key: 'location', type: 'default', verified: profileData.verificationStatus.address }
  ];

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
              value={editedData[item.key]}
              onChangeText={(text) => setEditedData({...editedData, [item.key]: text})}
              keyboardType={item.type}
            />
          ) : (
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{profileData[item.key]}</Text>
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
  bioText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
  bioInput: {
    fontSize: 14,
    color: '#495057',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
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