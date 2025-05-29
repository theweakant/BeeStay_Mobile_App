import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

// Import components
import SearchFilter from '../../../components/SearchFilter';
import ItemList from '../../../components/ItemList';

// Sample data
const sampleHomestays = [
  {
    id: 1,
    name: 'Villa Sunset Beach',
    location: 'Đà Nẵng',
    price: 1200000,
    rating: 4.8,
    reviews: 156,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300',
    promotion: { type: 'discount', value: 20, banner: 'Giảm 20%' },
    bookings: 45,
    revenue: 54000000,
  },
  {
    id: 2,
    name: 'Cozy Mountain House',
    location: 'Sapa',
    price: 800000,
    rating: 4.5,
    reviews: 89,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300',
    promotion: null,
    bookings: 32,
    revenue: 25600000,
  },
  {
    id: 3,
    name: 'Urban Apartment',
    location: 'Hồ Chí Minh',
    price: 600000,
    rating: 4.2,
    reviews: 67,
    status: 'inactive',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300',
    promotion: { type: 'banner', value: 0, banner: 'Mới mở!' },
    bookings: 18,
    revenue: 10800000,
  },
  {
    id: 4,
    name: 'Beachfront Bungalow',
    location: 'Phú Quốc',
    price: 1500000,
    rating: 4.9,
    reviews: 203,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300',
    promotion: { type: 'discount', value: 15, banner: 'Ưu đãi 15%' },
    bookings: 78,
    revenue: 117000000,
  },
  {
    id: 5,
    name: 'Lakeside Cabin',
    location: 'Đà Lạt',
    price: 900000,
    rating: 4.6,
    reviews: 124,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300',
    promotion: null,
    bookings: 38,
    revenue: 34200000,
  },
  {
    id: 6,
    name: 'City Center Loft',
    location: 'Hà Nội',
    price: 750000,
    rating: 4.3,
    reviews: 92,
    status: 'inactive',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300',
    promotion: { type: 'discount', value: 10, banner: 'Sale 10%' },
    bookings: 25,
    revenue: 18750000,
  },
];

export default function MyHomestayScreen() {
  // State management
  const [homestays, setHomestays] = useState(sampleHomestays);
  const [filteredHomestays, setFilteredHomestays] = useState(sampleHomestays);
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