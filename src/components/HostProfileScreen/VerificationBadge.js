// components/VerificationBadge.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const VerificationBadge = ({ isVerified }) => (
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

const styles = StyleSheet.create({
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