import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PaymentMethod = ({ method }) => (
  <View style={styles.paymentMethod}>
    <View style={styles.paymentIconContainer}>
      <Text style={styles.paymentIcon}>
        {method.type === 'bank' ? '🏦' : '💳'}
      </Text>
    </View>
    <View style={styles.paymentInfo}>
      <Text style={styles.paymentName}>{method.name}</Text>
      <Text style={styles.paymentNumber}>{method.number}</Text>
    </View>
    {method.isDefault && (
      <View style={styles.defaultBadge}>
        <Text style={styles.defaultText}>Mặc định</Text>
      </View>
    )}
  </View>
);

const PaymentSection = ({ profileData, onAddPaymentMethod }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
      
      {profileData.paymentMethods.map((method) => (
        <PaymentMethod key={method.id} method={method} />
      ))}
      
      <TouchableOpacity 
        style={styles.addPaymentButton}
        onPress={onAddPaymentMethod}
      >
        <Text style={styles.addPaymentText}>+ Thêm phương thức thanh toán</Text>
      </TouchableOpacity>
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
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  paymentIcon: {
    fontSize: 18,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 2,
  },
  paymentNumber: {
    fontSize: 12,
    color: '#6c757d',
  },
  defaultBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  addPaymentButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  addPaymentText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
});

export default PaymentSection;