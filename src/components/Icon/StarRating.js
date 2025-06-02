// components/StarRating.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StarRating({ rating, size = 14, showNumber = false }) {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Text key={index} style={[styles.star, { 
        color: index < rating ? '#FFD700' : '#E0E0E0',
        fontSize: size 
      }]}>
        ⭐
      </Text>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>
      {showNumber && (
        <Text style={styles.ratingNumber}>{rating}/5</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 1,
  },
  ratingNumber: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
  },
});