// components/FilterButtons.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function FilterButtons({ filters, activeFilter, onFilterChange, horizontal = true }) {
  const Component = horizontal ? ScrollView : View;
  const componentProps = horizontal ? 
    { horizontal: true, showsHorizontalScrollIndicator: false, style: styles.filterScroll } : 
    {};

  return (
    <Component {...componentProps}>
      <View style={styles.filterButtons}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.key}
            style={[styles.filterButton, activeFilter === filter.key && styles.activeFilter]}
            onPress={() => onFilterChange(filter.key)}
          >
            <Text style={[styles.filterButtonText, activeFilter === filter.key && styles.activeFilterText]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Component>
  );
}

const styles = StyleSheet.create({
  filterScroll: {
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  activeFilter: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
});