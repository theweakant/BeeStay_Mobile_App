import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
  Switch,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 45) / 2; // 45 = padding (15*2) + gap (15)

// Data mẫu cho homestay
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
  const [homestays, setHomestays] = useState(sampleHomestays);
  const [filteredHomestays, setFilteredHomestays] = useState(sampleHomestays);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Lọc homestay
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

  React.useEffect(() => {
    applyFilters();
  }, [filterStatus, filterRating, searchText, homestays]);

  // Toggle trạng thái homestay
  const toggleHomestayStatus = (id) => {
    setHomestays(prev => prev.map(h => 
      h.id === id ? { ...h, status: h.status === 'active' ? 'inactive' : 'active' } : h
    ));
  };

  // Xem chi tiết
  const viewDetails = (homestay) => {
    setSelectedHomestay(homestay);
    setModalVisible(true);
  };

  // Format tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  // Render item cho FlatList
  const renderHomestayItem = ({ item, index }) => (
    <View style={[styles.cardContainer, { marginRight: index % 2 === 0 ? 15 : 0 }]}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        
        {item.promotion && (
          <View style={[styles.promotionBadge, 
            { backgroundColor: item.promotion.type === 'discount' ? '#FF6B35' : '#4CAF50' }
          ]}>
            <Text style={styles.promotionText}>{item.promotion.banner}</Text>
          </View>
        )}

        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
            <Switch
              value={item.status === 'active'}
              onValueChange={() => toggleHomestayStatus(item.id)}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={item.status === 'active' ? '#fff' : '#f4f3f4'}
              style={styles.switch}
            />
          </View>

          <Text style={styles.cardLocation} numberOfLines={1}>📍 {item.location}</Text>
          <Text style={styles.cardPrice}>{formatCurrency(item.price)}/đêm</Text>
          
          <View style={styles.cardStats}>
            <Text style={styles.cardRating} numberOfLines={1}>⭐ {item.rating}</Text>
            <Text style={styles.cardBookings} numberOfLines={1}>📅 {item.bookings}</Text>
          </View>

          <View style={styles.cardActions}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.viewButton]}
              onPress={() => viewDetails(item)}
            >
              <Text style={styles.actionButtonText}>👁️</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]}
              onPress={() => Alert.alert('Sửa', `Sửa ${item.name}`)}
            >
              <Text style={styles.actionButtonText}>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.promotionButton]}
              onPress={() => Alert.alert('Khuyến mãi', `Thêm KM cho ${item.name}`)}
            >
              <Text style={styles.actionButtonText}>➕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  // Header component cho FlatList
  const ListHeaderComponent = () => (
    <View style={styles.filterContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm homestay..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.filterRow}>
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Trạng thái:</Text>
          <View style={styles.filterButtons}>
            {['all', 'active', 'inactive'].map(status => (
              <TouchableOpacity
                key={status}
                style={[styles.filterButton, filterStatus === status && styles.activeFilter]}
                onPress={() => setFilterStatus(status)}
              >
                <Text style={[styles.filterButtonText, filterStatus === status && styles.activeFilterText]}>
                  {status === 'all' ? 'Tất cả' : status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Đánh giá:</Text>
          <View style={styles.filterButtons}>
            {['all', '4.5', '4.0'].map(rating => (
              <TouchableOpacity
                key={rating}
                style={[styles.filterButton, filterRating === rating && styles.activeFilter]}
                onPress={() => setFilterRating(rating)}
              >
                <Text style={[styles.filterButtonText, filterRating === rating && styles.activeFilterText]}>
                  {rating === 'all' ? 'Tất cả' : `${rating}+ ⭐`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Quản Lý Homestay</Text>
        <Text style={styles.subtitle}>{filteredHomestays.length} homestay</Text>
      </View>

      {/* FlatList với 2 cột */}
      <FlatList
        data={filteredHomestays}
        renderItem={renderHomestayItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      />

      {/* Modal xem chi tiết */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedHomestay && (
              <>
                <Text style={styles.modalTitle}>{selectedHomestay.name}</Text>
                <Image source={{ uri: selectedHomestay.image }} style={styles.modalImage} />
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Địa điểm:</Text>
                  <Text style={styles.detailValue}>{selectedHomestay.location}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Giá:</Text>
                  <Text style={styles.detailValue}>{formatCurrency(selectedHomestay.price)}/đêm</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Đánh giá:</Text>
                  <Text style={styles.detailValue}>⭐ {selectedHomestay.rating} ({selectedHomestay.reviews} đánh giá)</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Lượt đặt:</Text>
                  <Text style={styles.detailValue}>{selectedHomestay.bookings} lượt</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Doanh thu:</Text>
                  <Text style={styles.detailValue}>{formatCurrency(selectedHomestay.revenue)}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Trạng thái:</Text>
                  <Text style={[styles.detailValue, 
                    { color: selectedHomestay.status === 'active' ? '#4CAF50' : '#FF5722' }
                  ]}>
                    {selectedHomestay.status === 'active' ? 'Đang hoạt động' : 'Tạm dừng'}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  flatListContent: {
    padding: 15,
  },
  row: {
    justifyContent: 'space-between',
  },
  filterContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  filterRow: {
    gap: 15,
  },
  filterGroup: {
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
  },
  cardContainer: {
    width: CARD_WIDTH,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  promotionBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  promotionText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  cardLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardRating: {
    fontSize: 11,
    color: '#666',
  },
  cardBookings: {
    fontSize: 11,
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 4,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#4CAF50',
  },
  editButton: {
    backgroundColor: '#FF9800',
  },
  promotionButton: {
    backgroundColor: '#9C27B0',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});