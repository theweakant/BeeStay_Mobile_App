import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Filter({ sortOption, setSortOption }) {
  const options = [
    { label: 'Rating ↑', value: 'rating-asc' },
    { label: 'Rating ↓', value: 'rating-desc' },
    { label: 'Giá ↑', value: 'price-asc' },
    { label: 'Giá ↓', value: 'price-desc' },
  ];

  return (
    <View style={styles.container}>
      {options.map(opt => (
        <TouchableOpacity
          key={opt.value}
          style={[
            styles.button,
            sortOption === opt.value && styles.selectedButton,
          ]}
          onPress={() => setSortOption(opt.value)}
        >
          <Text
            style={[
              styles.text,
              sortOption === opt.value && styles.selectedText,
            ]}
          >
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedButton: {
    backgroundColor: '#F5B041',
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
