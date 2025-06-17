import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import SearchFilter from '../../../components/SearchFilter';
import ItemList from '../../../components/List/ItemList';
import AddStaycationForm from '../../../components/Form/AddStaycationForm'; 
import HomestayDetailModal from '../../../components/Modal/HomestayDetail/HomestayDetailModal';
import { useAuth } from '../../../redux/hooks/useAuth'; 
import { 
  fetchHomestaysByHost, 
  clearHostHomestays,
  
} from '../../../redux/slices/homestay.slice';
import {  formatCurrency } from '../../../utils/textUtils'; 

export default function MyHomestayScreen() {
  
  const { user } = useAuth();
  const dispatch = useDispatch();
  const accountId = user?.accountId;

  // Redux state
  const {
    hostHomestays,
    fetchingByHost,
    fetchByHostError,
    hostHomestaysCount
  } = useSelector(state => state.homestay);

  // Local state management
  const [filteredHomestays, setFilteredHomestays] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  // Helper function to validate homestay data
  const validateHomestayData = (homestays) => {
    if (!Array.isArray(homestays)) return [];
    
    return homestays.map(homestay => ({
      ...homestay,
      name: homestay.name || 'Chưa có tên',
      location: homestay.location,
      status: homestay.status || 'inactive',
      rating: typeof homestay.rating === 'number' ? homestay.rating : 0,
      id: homestay.id || homestay._id || Math.random().toString(36).substr(2, 9)
    }));
  };

  // Fetch homestays when component mounts or accountId changes
  useEffect(() => {
    if (accountId) {
      dispatch(fetchHomestaysByHost(accountId));
    }

    // Cleanup when component unmounts
    return () => {
      dispatch(clearHostHomestays());
    };
  }, [dispatch, accountId]);

  // Filter logic
  const applyFilters = () => {
    let validatedHomestays = validateHomestayData(hostHomestays || []);
    let filtered = validatedHomestays;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(h => h.status === filterStatus);
    }

    if (filterRating !== 'all') {
      const minRating = parseFloat(filterRating);
      filtered = filtered.filter(h => h.rating >= minRating);
    }

    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(h => 
        (h.name && h.name.toLowerCase().includes(searchLower)) ||
        (h.location && h.location.toLowerCase().includes(searchLower))
      );
    }

    setFilteredHomestays(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filterStatus, filterRating, searchText, hostHomestays]);

  // Check if filters are active
  const hasActiveFilters = filterStatus !== 'all' || filterRating !== 'all';

  // Toggle homestay status
  const toggleHomestayStatus = (id) => {
    // You might want to call an API to update status on server
    // For now, we'll update local state
    const homestayToUpdate = hostHomestays.find(h => h.id === id);
    if (homestayToUpdate) {
      // Call API to update status
      // updateHomestayStatus(id, newStatus);
      
      // Refresh data after update
      dispatch(fetchHomestaysByHost(accountId));
    }
  };

  // View details
  const viewDetails = (homestay) => {
    setSelectedHomestay(homestay);
    setDetailModalVisible(true);
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

  // Handle add modal
  const handleAddPress = () => {
    if (!accountId) {
      Alert.alert('Thông báo', 'Vui lòng đăng nhập để thêm homestay');
      return;
    }
    setAddModalVisible(true);
  };

  const handleAddModalClose = () => {
    setAddModalVisible(false);
  };

  // Handle add success - refresh data
  const handleAddSuccess = () => {
    setAddModalVisible(false);
    // Refresh homestays list
    if (accountId) {
      dispatch(fetchHomestaysByHost(accountId));
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    if (accountId) {
      dispatch(fetchHomestaysByHost(accountId));
    }
  };

  // Handle error retry
  const handleRetry = () => {
    if (accountId) {
      dispatch(fetchHomestaysByHost(accountId));
    }
  };

  // Safe count calculations
  const validatedHomestays = validateHomestayData(hostHomestays || []);
  const activeCount = validatedHomestays.filter(h => h.status === 'active').length;
  const inactiveCount = validatedHomestays.filter(h => h.status === 'inactive').length;

  // Show loading state
  if (fetchingByHost) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Đang tải homestays...</Text>
      </View>
    );
  }

  // Show error state
  if (fetchByHostError && !hostHomestays?.length) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Có lỗi xảy ra</Text>
        <Text style={styles.errorDescription}>
          Không thể tải danh sách homestays. Vui lòng thử lại.
        </Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={handleRetry}
        >
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Show empty state
  if (!hostHomestays?.length && !fetchingByHost) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.title}>Quản Lý Homestay</Text>
              <Text style={styles.subtitle}>0 homestay</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddPress}
            >
              <Text style={styles.addButtonText}>+ Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Empty State */}
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>Chưa có homestay nào</Text>
          <Text style={styles.emptyStateDescription}>
            Bạn chưa có homestay nào. Hãy thêm homestay đầu tiên của bạn!
          </Text>
          <TouchableOpacity 
            style={styles.emptyStateButton}
            onPress={handleAddPress}
          >
            <Text style={styles.emptyStateButtonText}>Thêm Homestay</Text>
          </TouchableOpacity>
        </View>

        {/* Add Staycation Modal */}
        <Modal
          visible={addModalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={handleAddModalClose}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Thêm Homestay Mới</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={handleAddModalClose}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <AddStaycationForm 
              accountId={accountId}
              onSuccess={handleAddSuccess}
            />
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.title}>Quản Lý Homestay</Text>
            <Text style={styles.subtitle}>
              {filteredHomestays.length} / {hostHomestaysCount || validatedHomestays.length} homestay
            </Text>
            
            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <View style={[styles.statDot, styles.activeDot]} />
                <Text style={styles.statText}>
                  {activeCount} Hoạt động
                </Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.statDot, styles.inactiveDot]} />
                <Text style={styles.statText}>
                  {inactiveCount} Không hoạt động
                </Text>
              </View>
            </View>
          </View>
          
          {/* Add Button */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddPress}
          >
            <Text style={styles.addButtonText}>+ Thêm</Text>
          </TouchableOpacity>
        </View>
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
        loading={fetchingByHost}
        onRefresh={handleRefresh}
      />

      {/* Detail Modal - SỬA LẠI PHẦN NÀY */}
      <HomestayDetailModal
        visible={detailModalVisible}
        onClose={handleDetailModalClose}
        homestayId={selectedHomestay?.id}
        formatCurrency={formatCurrency}
      />

      {/* Add Staycation Modal */}
      <Modal
        visible={addModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleAddModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Thêm Homestay Mới</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleAddModalClose}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <AddStaycationForm 
            accountId={accountId}
            onSuccess={handleAddSuccess}
          />
        </View>
      </Modal>

      {/* Refresh Button */}
      <TouchableOpacity 
        style={styles.refreshButton}
        onPress={handleRefresh}
        disabled={fetchingByHost}
      >
        <Text style={styles.refreshButtonText}>
          {fetchingByHost ? '⟳' : '↻'}
        </Text>
      </TouchableOpacity>

      {/* Error notification */}
      {fetchByHostError && (
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>!</Text>
        </View>
      )}
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitleContainer: {
    flex: 1,
    marginRight: 16,
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
  statsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  activeDot: {
    backgroundColor: '#10b981',
  },
  inactiveDot: {
    backgroundColor: '#ef4444',
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 60,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#6b7280',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#f9fafb',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  refreshButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  refreshButtonText: {
    color: '#ffffff',
    fontSize: 24,
    transform: [{ rotate: '0deg' }],
  },
  notificationBadge: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});