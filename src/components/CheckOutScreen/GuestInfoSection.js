// components/CheckOutScreen/GuestInfoSection.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function GuestInfoSection({ 
  phoneNumber, 
  guestName, 
  onPhoneNumberChange, 
  onGuestNameChange 
}) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Khách đặt homestay</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Số điện thoại</Text>
        <TextInput
          style={styles.textInput}
          value={phoneNumber}
          onChangeText={onPhoneNumberChange}
          keyboardType="phone-pad"
          placeholder="Nhập số điện thoại"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Họ tên</Text>
        <TextInput
          style={styles.textInput}
          value={guestName}
          onChangeText={onGuestNameChange}
          placeholder="Nhập họ tên"
        />
      </View>
      
      {/* Padding để tạo khoảng cách với footer */}
      <View style={styles.bottomPadding} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 8,
    fontSize: 16,
  },
  bottomPadding: {
    height: 80,
  },
});