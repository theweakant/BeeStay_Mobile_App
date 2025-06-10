import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ItemList from '../../components/List/ItemList';
import { fetchAllHomestays } from '../../redux/slices/homestay.slice';

export default function SearchScreen() {
  const dispatch = useDispatch();
  const { homestays, loading, error } = useSelector(state => state.homestay);

  // Fetch homestays when component mounts
  useEffect(() => {
    dispatch(fetchAllHomestays());
  }, [dispatch]);

  // Filter homestays - only show recommended and available ones
  const getFilteredHomestays = () => {
    if (!homestays || homestays.length === 0) return [];
    
    return homestays.filter(item => 
      (item.recommended || item.available) && // Show recommended OR available
      item.available // But must be available
    );
  };

  // Handler functions
  const toggleHomestayStatus = (id) => {
    console.log('Toggle homestay status for id:', id);
    // Implement your toggle logic here
  };

  const viewDetails = (item) => {
    console.log('View details for:', item.name);
    // Implement navigation to details screen
  };

  const formatCurrency = (price) => {
    // Format price from API (assuming it's a number)
    if (typeof price === 'number') {
      return price.toLocaleString('vi-VN') + 'đ';
    }
    return price;
  };

  // Transform API data to match ItemList component format
  const transformHomestaysData = () => {
    const filteredHomestays = getFilteredHomestays();
    
    return filteredHomestays.map(item => ({
      id: item.id,
      name: item.name,
      rating: item.averageRating || 0,
      reviews: item.reviewCount || 0,
      price: formatCurrency(item.pricePerNight),
      discount: item.discountPercentage ? `${item.discountPercentage}%` : '0%',
      image: item.imageList && item.imageList.length > 0 
        ? (item.imageList.find(img => img.startsWith('http')) || item.imageList[0])
        : 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80',
      originalData: item // Keep original data for navigation
    }));
  };

  // Show loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text>Đang tải...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show error state
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text>Có lỗi xảy ra: {error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => dispatch(fetchAllHomestays())}
          >
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const transformedHomestays = transformHomestaysData();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Đề xuất</Text>
        <Text style={styles.headerSubtitle}>
          Đăng ký ngay để nhận nhiều ưu đãi hấp dẫn
        </Text>
        <TouchableOpacity>
          <Text style={styles.loginRegisterText}>Đăng nhập/ Đăng ký</Text>
        </TouchableOpacity>
      </View>
      
      {/* Nearby Section */}
      <View style={styles.nearbySection}>
        <Text style={styles.sectionTitle}>Gần bạn nhất</Text>
        <Text style={styles.sectionSubtitle}>
          Các homestay gần bạn có đánh giá tốt nhất ({transformedHomestays.length} kết quả)
        </Text>
        
        {transformedHomestays.length > 0 ? (
          <ItemList
            homestays={transformedHomestays}
            toggleHomestayStatus={toggleHomestayStatus}
            viewDetails={viewDetails}
            formatCurrency={formatCurrency}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có homestay nào phù hợp</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  loginRegisterText: {
    fontSize: 16,
    color: '#F5B041',
    fontWeight: '500',
  },
  nearbySection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
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
  },
});