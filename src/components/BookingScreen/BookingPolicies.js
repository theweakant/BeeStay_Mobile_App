import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookingPolicies = ({ homestayPolicies, policyData }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>Quy định</Text>
    {homestayPolicies && (
      <View style={styles.policyItem}>
        <Text style={styles.policyTitle}>Chính sách homestay</Text>
        <Text style={styles.policyText}>
          • {homestayPolicies.allowPet ? 'Được phép' : 'Không được phép'} mang theo thú cưng
        </Text>
        <Text style={styles.policyText}>
          • {homestayPolicies.allowSmoking ? 'Được phép' : 'Không được phép'} hút thuốc
        </Text>
        <Text style={styles.policyText}>
          • {homestayPolicies.refundable ? 'Có thể' : 'Không thể'} hoàn tiền
        </Text>
      </View>
    )}
    {policyData.map((policy, index) => (
      <View key={index} style={styles.policyItem}>
        <Text style={styles.policyTitle}>{policy.policyHeader}</Text>
        {policy.policyContent.map((content, contentIndex) => (
          <Text key={contentIndex} style={styles.policyText}>• {content}</Text>
        ))}
      </View>
    ))}
  </View>
);

export default BookingPolicies;

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  policyItem: {
    marginBottom: 20,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  policyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 3,
  },
});

