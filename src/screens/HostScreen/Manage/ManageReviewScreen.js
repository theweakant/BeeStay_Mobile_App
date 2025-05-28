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
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// Data mẫu cho reviews
const sampleReviews = [
  {
    id: 1,
    guestName: 'Nguyễn Văn An',
    guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    homestayName: 'Villa Sunset Beach',
    homestayImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300',
    rating: 5,
    comment: 'Homestay tuyệt vời! View biển đẹp, phòng sạch sẽ, chủ nhà nhiệt tình. Chắc chắn sẽ quay lại lần sau.',
    date: '2024-01-15',
    status: 'published',
    hasResponse: false,
    helpful: 12,
    checkInDate: '2024-01-10',
    checkOutDate: '2024-01-14',
    verified: true,
  },
  {
    id: 2,
    guestName: 'Trần Thị Bình',
    guestAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    homestayName: 'Cozy Mountain House',
    homestayImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300',
    rating: 4,
    comment: 'Không gian yên tĩnh, phù hợp nghỉ dưỡng. Tuy nhiên wifi hơi yếu, hy vọng cải thiện.',
    date: '2024-01-12',
    status: 'published',
    hasResponse: true,
    response: 'Cảm ơn bạn đã đánh giá! Chúng tôi đã nâng cấp wifi và hy vọng lần tới sẽ tốt hơn.',
    responseDate: '2024-01-13',
    helpful: 8,
    checkInDate: '2024-01-08',
    checkOutDate: '2024-01-11',
    verified: true,
  },
  {
    id: 3,
    guestName: 'Lê Minh Cường',
    guestAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    homestayName: 'Urban Apartment',
    homestayImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300',
    rating: 2,
    comment: 'Phòng không giống hình, thiết bị cũ kỹ. Dịch vụ chưa tốt.',
    date: '2024-01-10',
    status: 'pending',
    hasResponse: false,
    helpful: 3,
    checkInDate: '2024-01-05',
    checkOutDate: '2024-01-09',
    verified: true,
  },
  {
    id: 4,
    guestName: 'Phạm Thu Hà',
    guestAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    homestayName: 'Beachfront Bungalow',
    homestayImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300',
    rating: 5,
    comment: 'Tuyệt vời! Bãi biển riêng, phòng rộng rãi, sạch sẽ. Staff rất thân thiện và hỗ trợ tốt.',
    date: '2024-01-08',
    status: 'published',
    hasResponse: true,
    response: 'Cảm ơn bạn rất nhiều! Chúng tôi rất vui khi bạn hài lòng với dịch vụ.',
    responseDate: '2024-01-09',
    helpful: 15,
    checkInDate: '2024-01-03',
    checkOutDate: '2024-01-07',
    verified: true,
  },
  {
    id: 5,
    guestName: 'Hoàng Văn Đức',
    guestAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    homestayName: 'Villa Sunset Beach',
    homestayImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300',
    rating: 3,
    comment: 'Vị trí tốt nhưng giá hơi cao so với chất lượng. Phòng ổn.',
    date: '2024-01-05',
    status: 'published',
    hasResponse: false,
    helpful: 5,
    checkInDate: '2024-01-01',
    checkOutDate: '2024-01-04',
    verified: true,
  },
];

export default function ManageReviewScreen() {
  const [reviews, setReviews] = useState(sampleReviews);
  const [filteredReviews, setFilteredReviews] = useState(sampleReviews);
  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [responseModalVisible, setResponseModalVisible] = useState(false);
  const [responseText, setResponseText] = useState('');

  // Tính toán thống kê
  const stats = {
    total: reviews.length,
    average: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    pending: reviews.filter(r => r.status === 'pending').length,
    needResponse: reviews.filter(r => !r.hasResponse && r.rating <= 3).length,
  };

  // Lọc reviews
  const applyFilters = () => {
    let filtered = reviews;

    if (filterRating !== 'all') {
      if (filterRating === 'high') {
        filtered = filtered.filter(r => r.rating >= 4);
      } else if (filterRating === 'low') {
        filtered = filtered.filter(r => r.rating <= 3);
      } else {
        filtered = filtered.filter(r => r.rating === parseInt(filterRating));
      }
    }

    if (filterStatus !== 'all') {
      if (filterStatus === 'needResponse') {
        filtered = filtered.filter(r => !r.hasResponse && r.rating <= 3);
      } else {
        filtered = filtered.filter(r => r.status === filterStatus);
      }
    }

    if (searchText) {
      filtered = filtered.filter(r => 
        r.guestName.toLowerCase().includes(searchText.toLowerCase()) ||
        r.homestayName.toLowerCase().includes(searchText.toLowerCase()) ||
        r.comment.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredReviews(filtered);
  };

  React.useEffect(() => {
    applyFilters();
  }, [filterRating, filterStatus, searchText, reviews]);

  // Render sao đánh giá
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Text key={index} style={[styles.star, { color: index < rating ? '#FFD700' : '#E0E0E0' }]}>
        ⭐
      </Text>
    ));
  };

  // Xem chi tiết review
  const viewReviewDetail = (review) => {
    setSelectedReview(review);
    setModalVisible(true);
  };

  // Trả lời review
  const respondToReview = (review) => {
    setSelectedReview(review);
    setResponseText(review.response || '');
    setResponseModalVisible(true);
  };

  // Lưu phản hồi
  const saveResponse = () => {
    if (responseText.trim()) {
      setReviews(prev => prev.map(r => 
        r.id === selectedReview.id 
          ? { 
              ...r, 
              hasResponse: true, 
              response: responseText,
              responseDate: new Date().toISOString().split('T')[0]
            }
          : r
      ));
      setResponseModalVisible(false);
      setResponseText('');
      Alert.alert('Thành công', 'Đã lưu phản hồi của bạn!');
    }
  };

  // Format ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Render review item
  const renderReviewItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.reviewCard}
      onPress={() => viewReviewDetail(item)}
    >
      <View style={styles.reviewHeader}>
        <View style={styles.guestInfo}>
          <Image source={{ uri: item.guestAvatar }} style={styles.guestAvatar} />
          <View style={styles.guestDetails}>
            <View style={styles.guestNameRow}>
              <Text style={styles.guestName}>{item.guestName}</Text>
              {item.verified && <Text style={styles.verifiedBadge}>✓</Text>}
            </View>
            <Text style={styles.reviewDate}>{formatDate(item.date)}</Text>
          </View>
        </View>
        
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {renderStars(item.rating)}
          </View>
          <Text style={styles.ratingNumber}>{item.rating}/5</Text>
        </View>
      </View>

      <View style={styles.homestayInfo}>
        <Image source={{ uri: item.homestayImage }} style={styles.homestayImage} />
        <Text style={styles.homestayName}>{item.homestayName}</Text>
      </View>

      <Text style={styles.reviewComment} numberOfLines={3}>
        {item.comment}
      </Text>

      <View style={styles.reviewFooter}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, 
            { backgroundColor: item.status === 'published' ? '#E8F5E8' : '#FFF3E0' }
          ]}>
            <Text style={[styles.statusText, 
              { color: item.status === 'published' ? '#2E7D32' : '#F57C00' }
            ]}>
              {item.status === 'published' ? 'Đã xuất bản' : 'Chờ duyệt'}
            </Text>
          </View>
          
          {!item.hasResponse && item.rating <= 3 && (
            <View style={styles.needResponseBadge}>
              <Text style={styles.needResponseText}>Cần phản hồi</Text>
            </View>
          )}
        </View>

        <View style={styles.actionButtons}>
          {!item.hasResponse || item.rating <= 3 ? (
            <TouchableOpacity 
              style={styles.responseButton}
              onPress={() => respondToReview(item)}
            >
              <Text style={styles.responseButtonText}>
                {item.hasResponse ? '✏️ Sửa phản hồi' : '💬 Trả lời'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.respondedIndicator}>
              <Text style={styles.respondedText}>✅ Đã trả lời</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Quản Lý Đánh Giá</Text>
        
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Tổng đánh giá</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.average}</Text>
            <Text style={styles.statLabel}>Điểm trung bình</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Chờ duyệt</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.needResponse}</Text>
            <Text style={styles.statLabel}>Cần phản hồi</Text>
          </View>
        </View>
      </View>

      {/* Search và Filters */}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo tên khách, homestay hoặc nội dung..."
          value={searchText}
          onChangeText={setSearchText}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <View style={styles.filterButtons}>
            {[
              { key: 'all', label: 'Tất cả' },
              { key: 'needResponse', label: 'Cần phản hồi' },
              { key: 'pending', label: 'Chờ duyệt' },
              { key: 'published', label: 'Đã xuất bản' },
            ].map(filter => (
              <TouchableOpacity
                key={filter.key}
                style={[styles.filterButton, filterStatus === filter.key && styles.activeFilter]}
                onPress={() => setFilterStatus(filter.key)}
              >
                <Text style={[styles.filterButtonText, filterStatus === filter.key && styles.activeFilterText]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <View style={styles.filterButtons}>
            {[
              { key: 'all', label: 'Tất cả sao' },
              { key: 'high', label: '4-5 sao' },
              { key: 'low', label: '1-3 sao' },
              { key: '5', label: '5 sao' },
              { key: '1', label: '1 sao' },
            ].map(filter => (
              <TouchableOpacity
                key={filter.key}
                style={[styles.filterButton, filterRating === filter.key && styles.activeFilter]}
                onPress={() => setFilterRating(filter.key)}
              >
                <Text style={[styles.filterButtonText, filterRating === filter.key && styles.activeFilterText]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Reviews List */}
      <FlatList
        data={filteredReviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      />

      {/* Modal chi tiết review */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedReview && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.modalTitle}>Chi tiết đánh giá</Text>
                
                <View style={styles.modalGuestInfo}>
                  <Image source={{ uri: selectedReview.guestAvatar }} style={styles.modalGuestAvatar} />
                  <View>
                    <Text style={styles.modalGuestName}>{selectedReview.guestName}</Text>
                    <Text style={styles.modalStayDates}>
                      {formatDate(selectedReview.checkInDate)} - {formatDate(selectedReview.checkOutDate)}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalRating}>
                  {renderStars(selectedReview.rating)}
                  <Text style={styles.modalRatingText}>{selectedReview.rating}/5</Text>
                </View>

                <Text style={styles.modalComment}>{selectedReview.comment}</Text>

                {selectedReview.hasResponse && (
                  <View style={styles.responseContainer}>
                    <Text style={styles.responseTitle}>Phản hồi của bạn:</Text>
                    <Text style={styles.responseText}>{selectedReview.response}</Text>
                    <Text style={styles.responseDate}>
                      {formatDate(selectedReview.responseDate)}
                    </Text>
                  </View>
                )}

                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={styles.modalButton}
                    onPress={() => {
                      setModalVisible(false);
                      respondToReview(selectedReview);
                    }}
                  >
                    <Text style={styles.modalButtonText}>
                      {selectedReview.hasResponse ? 'Sửa phản hồi' : 'Trả lời'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.closeButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={[styles.modalButtonText, styles.closeButtonText]}>Đóng</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal phản hồi */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={responseModalVisible}
        onRequestClose={() => setResponseModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.responseModalContent}>
            <Text style={styles.modalTitle}>
              {selectedReview?.hasResponse ? 'Sửa phản hồi' : 'Trả lời đánh giá'}
            </Text>
            
            {selectedReview && (
              <View style={styles.reviewPreview}>
                <Text style={styles.previewGuestName}>{selectedReview.guestName}</Text>
                <View style={styles.previewRating}>
                  {renderStars(selectedReview.rating)}
                </View>
                <Text style={styles.previewComment} numberOfLines={2}>
                  {selectedReview.comment}
                </Text>
              </View>
            )}

            <TextInput
              style={styles.responseInput}
              placeholder="Nhập phản hồi của bạn..."
              value={responseText}
              onChangeText={setResponseText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <View style={styles.responseActions}>
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={saveResponse}
              >
                <Text style={styles.saveButtonText}>Lưu phản hồi</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setResponseModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  filterScroll: {
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  activeFilter: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  listContent: {
    padding: 20,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  guestInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  guestAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  guestDetails: {
    flex: 1,
  },
  guestNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  verifiedBadge: {
    marginLeft: 6,
    color: '#28a745',
    fontSize: 14,
  },
  reviewDate: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 14,
    marginHorizontal: 1,
  },
  ratingNumber: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
  },
  homestayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  homestayImage: {
    width: 30,
    height: 30,
    borderRadius: 6,
    marginRight: 10,
  },
  homestayName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#495057',
  },
  reviewComment: {
    fontSize: 14,
    color: '#212529',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  needResponseBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  needResponseText: {
    fontSize: 12,
    color: '#F57C00',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  responseButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  responseButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  respondedIndicator: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  respondedText: {
    color: '#2E7D32',
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
    width: width - 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalGuestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalGuestAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  modalGuestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  modalStayDates: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 2,
  },
  modalRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalRatingText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  modalComment: {
    fontSize: 16,
    color: '#212529',
    lineHeight: 24,
    marginBottom: 20,
  },
  responseContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  responseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  responseText: {
    fontSize: 14,
    color: '#212529',
    lineHeight: 20,
    marginBottom: 8,
  },
  responseDate: {
    fontSize: 12,
    color: '#6c757d',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#6c757d',
  },
  closeButtonText: {
    color: '#fff',
  },
  responseModalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    width: width - 40,
  },
  reviewPreview: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  previewGuestName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 5,
  },
  previewRating: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  previewComment: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 18,
  },
  responseInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 20,
  },
  responseActions: {
    flexDirection: 'row',
    gap: 10,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});