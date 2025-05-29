import React from 'react';
import { View, StyleSheet } from 'react-native';
import Search from './Search';
import FilterIcon from './FilterIcon';

const SearchFilter = ({
  // Search props
  searchValue,
  onSearchChange,
  searchPlaceholder = "Tìm kiếm homestay...",
  showLogo = false,
  
  // FilterIcon props
  filterVisible,
  onFilterClose,
  filterStatus,
  setFilterStatus,
  filterRating,
  setFilterRating,
  onFilterPress,
  hasActiveFilters = false,
}) => {
  return (
    <View style={styles.container}>
      <Search
        placeholder={searchPlaceholder}
        value={searchValue}
        onChangeText={onSearchChange}
        onFilterPress={onFilterPress}
        hasActiveFilters={hasActiveFilters}
        showLogo={showLogo}
      />
      
      <FilterIcon
        visible={filterVisible}
        onClose={onFilterClose}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterRating={filterRating}
        setFilterRating={setFilterRating}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // No specific styles needed as components handle their own styling
  },
});

export default SearchFilter;