import React from 'react';
import { View, Text } from 'react-native';

const BookingPolicies = ({ homestayPolicies, policyData, styles }) => (
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
