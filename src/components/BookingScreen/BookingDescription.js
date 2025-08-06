import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookingDescription = ({ description }) => (
  description && (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Mô tả</Text>
      <Text style={styles.policyText}>{description}</Text>
    </View>
  )
);

export default BookingDescription;

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
  policyText: {
    fontSize: 14,
    color: 'black',
    lineHeight: 20,
    marginBottom: 3,
  },
});

