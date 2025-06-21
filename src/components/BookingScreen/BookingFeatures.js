import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const BookingFeatures = ({ features, styles }) => (
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

export default BookingFeatures;
