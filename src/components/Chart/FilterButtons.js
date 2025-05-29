// components/FilterButtons.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FilterButtons = ({ onTimeFilter, onHomestayFilter }) => {
  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterButton} onPress={onTimeFilter}>
          <Text style={styles.filterButtonText}>📅 Tháng này ▼</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterButton} onPress={onHomestayFilter}>
          <Text style={styles.filterButtonText}>🏠 Tất cả homestay ▼</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#495057',
  },
});

export default FilterButtons;