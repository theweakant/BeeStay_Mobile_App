// components/FilterSection.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import FilterButtons from './Button/FilterButtons';

export default function FilterSection({
  searchText,
  onSearchChange,
  filterStatus,
  onStatusFilterChange,
  filterRating,
  onRatingFilterChange
}) {
  const statusFilters = [
    { key: 'all', label: 'Tất cả' },
    { key: 'needResponse', label: 'Cần phản hồi' },
    { key: 'pending', label: 'Chờ duyệt' },
    { key: 'published', label: 'Đã công khai' },
  ];

  const ratingFilters = [
    { key: 'all', label: 'Tất cả sao' },
    { key: 'high', label: '4-5 sao' },
    { key: 'low', label: '1-3 sao' },
    { key: '5', label: '5 sao' },
    { key: '1', label: '1 sao' },
  ];

  return (
    <View style={styles.filterContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm theo tên khách hoặc homestay ..."
        value={searchText}
        onChangeText={onSearchChange}
      />

      <FilterButtons
        filters={statusFilters}
        activeFilter={filterStatus}
        onFilterChange={onStatusFilterChange}
      />

      <FilterButtons
        filters={ratingFilters}
        activeFilter={filterRating}
        onFilterChange={onRatingFilterChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 10,
    fontSize: 12,
    marginBottom: 15,
  },
});