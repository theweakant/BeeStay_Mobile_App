import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


import SearchFilter from '../../../components/SearchFilter';
import ItemList from '../../../components/List/ItemList';
import { HomestayData } from '../../../data/MockData';


export default function MyHomestayScreen() {
  // State management
const [homestays, setHomestays] = useState(HomestayData);
const [filteredHomestays, setFilteredHomestays] = useState(HomestayData);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Filter logic
  const applyFilters = () => {
    let filtered = homestays;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(h => h.status === filterStatus);
    }

    if (filterRating !== 'all') {
      const minRating = parseFloat(filterRating);
      filtered = filtered.filter(h => h.rating >= minRating);
    }

    if (searchText) {
      filtered = filtered.filter(h => 
        h.name.toLowerCase().includes(searchText.toLowerCase()) ||
        h.location.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredHomestays(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filterStatus, filterRating, searchText, homestays]);

  // Check if filters are active
  const hasActiveFilters = filterStatus !== 'all' || filterRating !== 'all';

  // Toggle homestay status
  const toggleHomestayStatus = (id) => {
    setHomestays(prev => prev.map(h => 
      h.id === id ? { ...h, status: h.status === 'active' ? 'inactive' : 'active' } : h
    ));
  };

  // View details
  const viewDetails = (homestay) => {
    setSelectedHomestay(homestay);
    setDetailModalVisible(true);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  // Handle filter modal
  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleFilterClose = () => {
    setFilterModalVisible(false);
  };

  const handleDetailModalClose = () => {
    setDetailModalVisible(false);
    setSelectedHomestay(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Quản Lý Homestay</Text>
        <Text style={styles.subtitle}>{filteredHomestays.length} homestay</Text>
      </View>

      {/* Search and Filter */}
      <SearchFilter
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder="Tìm kiếm homestay..."
        filterVisible={filterModalVisible}
        onFilterClose={handleFilterClose}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterRating={filterRating}
        setFilterRating={setFilterRating}
        onFilterPress={handleFilterPress}
        hasActiveFilters={hasActiveFilters}
        showLogo={false}
      />

      {/* Homestay List */}
      <ItemList
        homestays={filteredHomestays}
        toggleHomestayStatus={toggleHomestayStatus}
        viewDetails={viewDetails}
        formatCurrency={formatCurrency}
      />

      {/* Detail Modal */}
      <ItemList
        visible={detailModalVisible}
        onClose={handleDetailModalClose}
        homestay={selectedHomestay}
        formatCurrency={formatCurrency}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});