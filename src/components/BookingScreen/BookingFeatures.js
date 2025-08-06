import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const BookingFeatures = ({ features }) => (
  features && features.length > 0 && (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Đặc điểm</Text>
      {features.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
          <Text style={styles.featureText}>{feature}</Text>
        </View>
      ))}
    </View>
  )
);

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
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: 'black',
    marginLeft: 8,
  },
});

export default BookingFeatures;