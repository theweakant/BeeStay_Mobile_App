import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Animated,
  Modal,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../../redux/hooks/useAuth';
import { fetchBookingByHost } from '../../../redux/slices/host.slice';
import { fetchDiscardBooking } from '../../../redux/slices/booking.slice';
import CheckInButton from '../../../components/Host/shared/CheckInButton';

const { width } = Dimensions.get('window');

export default function HostBookingScreen() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const accountId = user?.accountId;
  
  const { bookings, bookingLoading, bookingError } = useSelector((state) => state.host);
  const { loading: checkInLoading } = useSelector((state) => state.booking);
  
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (accountId) {
      dispatch(fetchBookingByHost(accountId));
    }
  }, [dispatch, accountId]);

  useEffect(() => {
    if (bookings && bookings.length > 0) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [bookings]);

  const onRefresh = async () => {
    setRefreshing(true);
    if (accountId) {
      await dispatch(fetchBookingByHost(accountId));
    }
    setRefreshing(false);
  };

  // Group and filter bookings by status and urgency
  const organizedBookings = useMemo(() => {
    if (!bookings) return { today: [], upcoming: [], past: [], needsAction: [] };
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const groups = {
      today: [],
      upcoming: [],
      past: [],
      needsAction: []
    };
    
    bookings.forEach(booking => {
      const checkInDate = new Date(booking.checkIn);
      const checkOutDate = new Date(booking.checkOut);
      const bookingDate = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate());
      
      // Determine booking status
      if (bookingDate.getTime() === today.getTime()) {
        groups.today.push({ ...booking, urgency: 'high', status: 'today' });
      } else if (checkInDate > now && checkInDate <= tomorrow) {
        groups.upcoming.push({ ...booking, urgency: 'medium', status: 'tomorrow' });
      } else if (checkInDate > tomorrow) {
        groups.upcoming.push({ ...booking, urgency: 'low', status: 'upcoming' });
      } else if (checkOutDate < now) {
        groups.past.push({ ...booking, urgency: 'none', status: 'completed' });
      }
      
      // Check if needs action (e.g., check-in time passed but not checked in)
      if (checkInDate < now && checkOutDate > now && !booking.checkedIn) {
        groups.needsAction.push({ ...booking, urgency: 'critical', status: 'overdue' });
      }
    });
    
    return groups;
  }, [bookings]);

  const getFilteredBookings = () => {
    switch (selectedFilter) {
      case 'today': return organizedBookings.today;
      case 'upcoming': return organizedBookings.upcoming;
      case 'past': return organizedBookings.past;
      case 'needsAction': return organizedBookings.needsAction;
      default: return [
        ...organizedBookings.needsAction,
        ...organizedBookings.today,
        ...organizedBookings.upcoming,
        ...organizedBookings.past
      ];
    }
  };

  const getStatusInfo = (booking) => {
    const now = new Date();
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    
    if (booking.status === 'overdue') {
      return { 
        color: '#dc3545', 
        icon: 'alert-circle', 
        text: 'Cần check-in', 
        bgColor: '#fff5f5' 
      };
    } else if (booking.status === 'today') {
      return { 
        color: '#28a745', 
        icon: 'today', 
        text: 'Hôm nay', 
        bgColor: '#f0fff4' 
      };
    } else if (booking.status === 'tomorrow') {
      return { 
        color: '#ffc107', 
        icon: 'tomorrow', 
        text: 'Ngày mai', 
        bgColor: '#fffbf0' 
      };
    } else if (booking.status === 'upcoming') {
      return { 
        color: '#17a2b8', 
        icon: 'calendar', 
        text: 'Sắp tới', 
        bgColor: '#f0fcff' 
      };
    } else {
      return { 
        color: '#6c757d', 
        icon: 'checkmark-done', 
        text: 'Hoàn thành', 
        bgColor: '#f8f9fa' 
      };
    }
  };

  const formatDateContextual = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const bookingDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    const diffTime = bookingDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Ngày mai';
    if (diffDays === -1) return 'Hôm qua';
    if (diffDays > 1 && diffDays <= 7) return `${diffDays} ngày nữa`;
    if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} ngày trước`;
    
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const handleDiscardBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowDiscardModal(true);
  };

  const confirmDiscardBooking = () => {
    if (!selectedBookingId) return;
    
    dispatch(fetchDiscardBooking(selectedBookingId))
      .unwrap()
      .then(() => {
        setShowDiscardModal(false);
        setSelectedBookingId(null);
        if (accountId) {
          dispatch(fetchBookingByHost(accountId));
        }
        // Show success feedback
        Alert.alert('Thành công', 'Booking đã được hủy thành công');
      })
      .catch((error) => {
        console.error('❌ DISCARD booking failed:', error);
        Alert.alert('Lỗi', error?.message || 'Không thể hủy booking. Vui lòng thử lại.');
      });
  };

  const FilterTabs = () => {
    const filters = [
      { key: 'all', label: 'Tất cả', count: bookings?.length || 0 },
      { key: 'today', label: 'Hôm nay', count: organizedBookings.today.length },
      { key: 'upcoming', label: 'Sắp tới', count: organizedBookings.upcoming.length },
    ];

    return (
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              selectedFilter === filter.key && styles.filterTabActive
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text style={[
              styles.filterTabText,
              selectedFilter === filter.key && styles.filterTabTextActive
            ]}>
              {filter.label}
            </Text>
            {filter.count > 0 && (
              <View style={[
                styles.filterBadge,
                selectedFilter === filter.key && styles.filterBadgeActive
              ]}>
                <Text style={[
                  styles.filterBadgeText,
                  selectedFilter === filter.key && styles.filterBadgeTextActive
                ]}>
                  {filter.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const BookingCard = ({ item, index }) => {
    const statusInfo = getStatusInfo(item);
    const cardAnimatedStyle = {
      opacity: animatedValue,
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        },
      ],
    };

    return (
      <Animated.View style={[cardAnimatedStyle, { delay: index * 100 }]}>
        <View style={[styles.bookingCard, { backgroundColor: statusInfo.bgColor }]}>
          {/* Status Header */}
          <View style={styles.cardHeader}>
            <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
              <Ionicons name={statusInfo.icon} size={14} color="#fff" />
              <Text style={styles.statusText}>{statusInfo.text}</Text>
            </View>
            <Text style={styles.bookingId}>#{item.bookingId}</Text>
          </View>

          {/* Main Info */}
          <View style={styles.mainInfo}>
            <View style={styles.homestaySection}>
              <Ionicons name="home" size={20} color="#4a90e2" />
              <Text style={styles.homestayName} numberOfLines={1}>
                {item.homestay}
              </Text>
            </View>
            
            <View style={styles.guestSection}>
              <Ionicons name="person" size={16} color="#6c757d" />
              <Text style={styles.guestName}>{item.fullName}</Text>
              <TouchableOpacity style={styles.phoneButton}>
                <Ionicons name="call" size={16} color="#28a745" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Date Info */}
          <View style={styles.dateInfo}>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>Nhận phòng</Text>
              <Text style={styles.dateValue}>
                {formatDateContextual(item.checkIn)}
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={16} color="#adb5bd" />
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>Trả phòng</Text>
              <Text style={styles.dateValue}>
                {formatDateContextual(item.checkOut)}
              </Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            {/* Primary Action - Check-in */}
            <View style={styles.primaryAction}>
              <CheckInButton
                bookingId={item.bookingId}
                onSuccess={() => {
                  if (accountId) {
                    dispatch(fetchBookingByHost(accountId));
                  }
                }}
                style={styles.checkInButton}
              />
            </View>

            {/* Secondary Actions */}
            <View style={styles.secondaryActions}>
              <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-horizontal" size={20} color="#6c757d" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.discardIconButton}
                onPress={() => handleDiscardBooking(item.bookingId)}
              >
                <Ionicons name="trash-outline" size={18} color="#dc3545" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  const DiscardConfirmationModal = () => (
    <Modal
      visible={showDiscardModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowDiscardModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Ionicons name="warning" size={48} color="#ff9500" />
            <Text style={styles.modalTitle}>Xác nhận hủy booking</Text>
          </View>
          
          <Text style={styles.modalMessage}>
            Bạn có chắc chắn muốn hủy booking này không?{'\n'}
            Hành động này không thể hoàn tác và có thể ảnh hưởng đến đánh giá của bạn.
          </Text>
          
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowDiscardModal(false)}
            >
              <Text style={styles.modalCancelText}>Giữ lại</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.modalConfirmButton}
              onPress={confirmDiscardBooking}
            >
              <Text style={styles.modalConfirmText}>Hủy booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="calendar-outline" size={80} color="#adb5bd" />
      <Text style={styles.emptyTitle}>
        {selectedFilter === 'needsAction' ? 'Tuyệt vời!' : 'Chưa có booking nào'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {selectedFilter === 'needsAction' 
          ? 'Tất cả booking đều đã được xử lý'
          : 'Booking mới sẽ xuất hiện ở đây khi khách đặt phòng'
        }
      </Text>
    </View>
  );

  if (bookingLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
        <Text style={styles.loadingText}>Đang tải danh sách booking...</Text>
      </View>
    );
  }

  const filteredBookings = getFilteredBookings();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Quản lý Booking</Text>
        <Text style={styles.subtitle}>
          {bookings?.length || 0} booking tổng cộng
        </Text>
      </View>

      {/* Filter Tabs */}
      <FilterTabs />

      {/* Error State */}
      {bookingError && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#dc3545" />
          <Text style={styles.errorText}>{bookingError}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => accountId && dispatch(fetchBookingByHost(accountId))}
          >
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      {!bookingError && (
        <>
          {filteredBookings.length > 0 ? (
            <FlatList
              data={filteredBookings}
              keyExtractor={(item) => item.bookingId.toString()}
              renderItem={({ item, index }) => <BookingCard item={item} index={index} />}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#4a90e2']}
                  tintColor="#4a90e2"
                />
              }
            />
          ) : (
            <EmptyState />
          )}
        </>
      )}

      {/* Discard Confirmation Modal */}
      <DiscardConfirmationModal />
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  filterTabActive: {
    backgroundColor: '#4a90e2',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6c757d',
  },
  filterTabTextActive: {
    color: '#fff',
  },
  filterBadge: {
    backgroundColor: '#dc3545',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  filterBadgeActive: {
    backgroundColor: '#fff',
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  filterBadgeTextActive: {
    color: '#4a90e2',
  },
  listContainer: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  bookingId: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  mainInfo: {
    marginBottom: 16,
  },
  homestaySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  homestayName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginLeft: 8,
    flex: 1,
  },
  guestSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestName: {
    fontSize: 16,
    color: '#6c757d',
    marginLeft: 6,
    flex: 1,
  },
  phoneButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#e8f5e8',
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  dateItem: {
    flex: 1,
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryAction: {
    flex: 1,
    marginRight: 12,
  },
  checkInButton: {
    backgroundColor: '#28a745',
    borderRadius: 12,
    paddingVertical: 12,
  },
  secondaryActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    marginRight: 8,
  },
  discardIconButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6c757d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginTop: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
    textAlign: 'center',
  },
  modalConfirmButton: {
    flex: 1,
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 8,
  },
  modalConfirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});