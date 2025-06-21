import React from 'react';
import { View, Text } from 'react-native';

const BookingDescription = ({ description, styles }) => (
  description && (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Mô tả</Text>
      <Text style={styles.policyText}>{description}</Text>
    </View>
  )
);

export default BookingDescription;
