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
import { formatCurrency } from '../../utils/formatUtils';

export default function SearchScreen() {
  const dispatch = useDispatch();
  const { homestays, loading, error } = useSelector(state => state.homestay);

  // Chỉ fetch nếu chưa có dữ liệu hoặc dữ liệu rỗng
  useEffect(() => {
    if (!homestays || homestays.length === 0) {
      dispatch(fetchAllHomestays());
    }
  }, [dispatch, homestays]);

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



  // Refresh function for manual refresh
  const handleRefresh = () => {
    dispatch(fetchAllHomestays());
  };

  // Get filtered homestays directly
  const filteredHomestays = getFilteredHomestays();

  // Show loading state chỉ khi chưa có dữ liệu
  if (loading && (!homestays || homestays.length === 0)) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text>Đang tải...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show error state chỉ khi chưa có dữ liệu
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
      
      {/* Header Section */}
      {/* <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Đề xuất</Text>
        <Text style={styles.headerSubtitle}>
          Đăng ký ngay để nhận nhiều ưu đãi hấp dẫn
        </Text>
        <TouchableOpacity>
          <Text style={styles.loginRegisterText}>Đăng nhập/ Đăng ký</Text>
        </TouchableOpacity>
      </View> */}
      
      {/* Nearby Section */}
      <View style={styles.nearbySection}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Gần bạn nhất</Text>
            <Text style={styles.sectionSubtitle}>
              Các homestay gần bạn có đánh giá tốt nhất ({filteredHomestays.length} kết quả)
            </Text>
          </View>
          {/* Refresh button */}
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