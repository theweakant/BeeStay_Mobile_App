import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import ItemList from '../../components/User/SearchScreen/ItemList';
import SearchFilter from '../../components/User/SearchScreen/SearchFilter';

import { fetchAllHomestays } from '../../redux/slices/homestay.slice';
import { formatCurrency } from '../../utils/formatUtils';

export default function SearchScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { homestays, loading, error } = useSelector(state => state.homestay);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [priceRangeFilter, setPriceRangeFilter] = useState('');

  useEffect(() => {
    if (!homestays || homestays.length === 0) {
      dispatch(fetchAllHomestays());
    }
  }, [dispatch, homestays]);

  const getFilteredHomestays = () => {
    if (!homestays || homestays.length === 0) return [];

    let filtered = homestays.filter(item => 
      (item.recommended || item.available) &&
      item.available &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // City filter
    if (cityFilter) {
      filtered = filtered.filter(item => {
        const itemCity = item.city?.toLowerCase() || '';
        if (cityFilter === 'hanoi') {
          return itemCity.includes('hà nội') || itemCity.includes('hanoi');
        } else if (cityFilter === 'hcm') {
          return itemCity.includes('hồ chí minh') || itemCity.includes('ho chi minh') || itemCity.includes('hcm');
        }
        return true;
      });
    }

    // Price range filter
    if (priceRangeFilter) {
      const [minPrice, maxPrice] = priceRangeFilter.split('-').map(Number);
      filtered = filtered.filter(item => {
        const price = item.pricePerNight || 0;
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Sorting
    if (sortOption === 'rating-asc') {
      filtered.sort((a, b) => (a.averageRating || 0) - (b.averageRating || 0));
    } else if (sortOption === 'rating-desc') {
      filtered.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    } else if (sortOption === 'price-asc') {
      filtered.sort((a, b) => (a.pricePerNight || 0) - (b.pricePerNight || 0));
    } else if (sortOption === 'price-desc') {
      filtered.sort((a, b) => (b.pricePerNight || 0) - (a.pricePerNight || 0));
    }

    return filtered;
  };

  const toggleHomestayStatus = (id) => {
    console.log('Toggle homestay status for id:', id);
  };

  const viewDetails = (item) => {
    navigation.navigate('Booking', { 
      homestayId: item.id,
      homestayData: item
    });
  };

  const handleRefresh = () => {
    dispatch(fetchAllHomestays());
  };

  const filteredHomestays = getFilteredHomestays();

  if (loading && (!homestays || homestays.length === 0)) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text>Đang tải...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && (!homestays || homestays.length === 0)) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text>Có lỗi xảy ra: {error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleRefresh}
          >
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
        priceRangeFilter={priceRangeFilter}
        setPriceRangeFilter={setPriceRangeFilter}
      />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        {/* Nearby Section */}
        <View style={styles.nearbySection}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>
              Gần bạn nhất <Text style={styles.resultCount}>({filteredHomestays.length} kết quả)</Text>
            </Text>
          </View>
          
          {filteredHomestays.length > 0 ? (
            <ItemList
              homestays={filteredHomestays}
              toggleHomestayStatus={toggleHomestayStatus}
              viewDetails={viewDetails}
              formatCurrency={formatCurrency}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Không có homestay nào phù hợp</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={handleRefresh}
              >
                <Text style={styles.retryButtonText}>Tải lại</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  nearbySection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F5B041',
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  resultCount: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#666',
  },
  titleContainer: {
    flex: 1,
  },
});