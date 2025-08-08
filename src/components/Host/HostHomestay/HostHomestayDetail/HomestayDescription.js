import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomestayDescription({ description, features }) {
  const displayDescription = description?.trim()
    ? description
    : 'Chưa cập nhật';

  const displayFeatures =
    Array.isArray(features) && features.length > 0
      ? features
      : ['Chưa cập nhật'];

  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.sectionTitle}>Mô tả</Text>
      <Text style={styles.descriptionText}>{displayDescription}</Text>

      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Đặc điểm</Text>
        <View style={styles.featuresList}>
          {displayFeatures.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              {feature !== 'Chưa cập nhật' && (
                <View style={styles.checkIcon}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              )}
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#F5F5F5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 20,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  featureText: {
    fontSize: 14,
    color: '#333',
  },
});
