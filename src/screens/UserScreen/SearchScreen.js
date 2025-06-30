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
import ItemList from '../../components/User/SearchScreen/ItemList';
import SearchFilter from '../../components/User/SearchScreen/SearchFilter';

import { fetchAllHomestays } from '../../redux/slices/homestay.slice';
import { formatCurrency } from '../../utils/formatUtils';


export default function SearchScreen() {
  const dispatch = useDispatch();
  const { homestays, loading, error } = useSelector(state => state.homestay);


  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

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

  if (sortOption === 'rating-asc') {
    filtered.sort((a, b) => a.rating - b.rating);
  } else if (sortOption === 'rating-desc') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === 'price-asc') {
    filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (sortOption === 'price-desc') {
    filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
  }

  return filtered;
};

  const toggleHomestayStatus = (id) => {
    console.log('Toggle homestay status for id:', id);
  };

  const viewDetails = (item) => {
    console.log('View details for:', item.name);
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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        {/* Nearby Section */}
        <View style={styles.nearbySection}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Gần bạn nhất</Text>
              <Text style={styles.sectionSubtitle}>
                Các homestay gần bạn có đánh giá tốt nhất ({filteredHomestays.length} kết quả)
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.refreshButton}
              onPress={handleRefresh}
              disabled={loading}
            >
              <Text style={[styles.refreshText, loading && styles.refreshTextDisabled]}>
                {loading ? 'Đang tải...' : 'Làm mới'}
              </Text>
            </TouchableOpacity>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  refreshButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#F5B041',
  },
  refreshText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  refreshTextDisabled: {
    opacity: 0.6,
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
});
