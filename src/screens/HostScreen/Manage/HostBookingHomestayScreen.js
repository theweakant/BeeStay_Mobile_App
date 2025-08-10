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
  Modal,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../redux/hooks/useAuth';
import { fetchBookingByHost } from '../../../redux/slices/host.slice';
import { fetchDiscardBooking } from '../../../redux/slices/booking.slice';
import CheckInButton from '../../../components/Host/shared/CheckInButton';
import { formatCurrency } from '../../../utils/textUtils';

const { width } = Dimensions.get('window');

export default function HostBookingScreen() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const accountId = user?.accountId;

  const { bookings, bookingLoading, bookingError } = useSelector((state) => state.host);
  const { loading: checkInLoading } = useSelector((state) => state.booking);

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    if (accountId) {
      dispatch(fetchBookingByHost(accountId));
    }
  }, [dispatch, accountId]);


  const onRefresh = async () => {
    setRefreshing(true);
    if (accountId) {
      await dispatch(fetchBookingByHost(accountId));
    }
    setRefreshing(false);
  };

  // Phân loại trạng thái như OrderBookingScreen
  const getBookingStatus = (checkIn, checkOut, checkedIn) => {
    const now = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkedIn && now >= checkInDate && now <= checkOutDate) {
      return { status: 'active', color: '#4CAF50', text: 'Đang diễn ra' };
    } else if (now < checkInDate) {
      return { status: 'upcoming', color: '#FFA500', text: 'Sắp tới' };
    } else {
      return { status: 'completed', color: '#9E9E9E', text: 'Hoàn thành' };
    }
  };

  // Lọc theo tab
  const getFilteredBookings = () => {
    if (!bookings || activeTab === 'Tất cả') return bookings;

    return bookings.filter((booking) => {
      const status = getBookingStatus(booking.checkIn, booking.checkOut, booking.checkedIn);
      if (activeTab === 'Đang diễn ra') return status.status === 'active';
      if (activeTab === 'Sắp tới') return status.status === 'upcoming';
      return false;
    });
  };

  const filteredBookings = getFilteredBookings();

  // Đếm số lượng theo tab
  const getTabCount = (tabName) => {
    if (!bookings) return 0;
    if (tabName === 'Tất cả') return bookings.length;

    return bookings.filter((booking) => {
      const status = getBookingStatus(booking.checkIn, booking.checkOut, booking.checkedIn);
      if (tabName === 'Đang diễn ra') return status.status === 'active';
      if (tabName === 'Sắp tới') return status.status === 'upcoming';
      return false;
    }).length;
  };

  const tabs = ['Tất cả', 'Đang diễn ra', 'Sắp tới'];

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
        Alert.alert('Thành công', 'Booking đã được hủy thành công');
      })
      .catch((error) => {
        Alert.alert('Lỗi', error?.message || 'Không thể hủy booking. Vui lòng thử lại.');
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Ngày mai';
    if (diffDays === -1) return 'Hôm qua';
    if (diffDays > 1 && diffDays <= 7) return `${diffDays} ngày nữa`;
    if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} ngày trước`;

    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const BookingCard = ({ item, index }) => {
    const statusInfo = getBookingStatus(item.checkIn, item.checkOut, item.checkedIn);

    return (
        <View style={styles.bookingCard}>
          {/* Status Badge */}
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
            <Text style={styles.statusText}>{statusInfo.text}</Text>
          </View>

          {/* Homestay Name */}
          <View style={styles.cardHeader}>
            <Text style={styles.homestayName} numberOfLines={2}>
              {item.homestay}
            </Text>
          </View>

          {/* Guest Info */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Khách:</Text>
              <Text style={styles.infoValue}>{item.fullName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>SĐT:</Text>
              <Text style={styles.infoValue}>{item.phoneNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>TT:</Text>
              <Text style={styles.infoValue}>{item.paymentMethod}</Text>
            </View>
          </View>

          {/* Dates */}
          <View style={styles.dateSection}>
            <View style={styles.dateColumn}>
              <Text style={styles.dateLabel}>Nhận phòng</Text>
              <Text style={styles.dateValue}>{formatDate(item.checkIn)}</Text>
            </View>
            <View style={styles.dateSeparator}>
              <Text style={styles.separatorText}>→</Text>
            </View>
            <View style={styles.dateColumn}>
              <Text style={styles.dateLabel}>Trả phòng</Text>
              <Text style={styles.dateValue}>{formatDate(item.checkOut)}</Text>
            </View>
          </View>

          {/* Bottom: Booking ID & Price */}
          <View style={styles.bottomSection}>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentLabel}>Mã đặt</Text>
              <Text style={styles.paymentMethod}>#{item.bookingId}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceValue}>{formatCurrency(item.totalPrice)}</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionButtons}>
            {/* Nút CHECK-IN */}
            <View style={styles.buttonWrapper}>
              <CheckInButton
                bookingId={item.bookingId}
                onSuccess={() => dispatch(fetchBookingByHost(accountId))}
                style={styles.checkInButton}
                textStyle={styles.actionButtonText}
              />
            </View>

            {/* Nút Hủy */}
            <TouchableOpacity
              style={[styles.actionButton, styles.discardButton]}
              onPress={() => handleDiscardBooking(item.bookingId)}
            >
              <Text style={styles.actionButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  };

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📅</Text>
      <Text style={styles.emptyTitle}>
        {activeTab === 'Tất cả' ? 'Chưa có booking nào' : `Chưa có booking ${activeTab.toLowerCase()}`}
      </Text>
      <Text style={styles.emptySubtitle}>
        Booking mới sẽ xuất hiện ở đây khi khách đặt phòng
      </Text>
    </View>
  );

  const ErrorState = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTitle}>Lỗi tải dữ liệu</Text>
      <Text style={styles.errorSubtitle}>{bookingError}</Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => accountId && dispatch(fetchBookingByHost(accountId))}
      >
        <Text style={styles.retryButtonText}>Thử lại</Text>
      </TouchableOpacity>
    </View>
  );

  if (bookingLoading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
          <Text style={styles.loadingText}>Đang tải booking...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (bookingError && !bookings) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorState />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
          contentContainerStyle={styles.tabScrollContent}
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab;
            const count = getTabCount(tab);

            const getTabColor = (tabName, isActive) => {
              if (!isActive) return '#F8F9FA';
              switch (tabName) {
                case 'Tất cả': return '#DDDDDD';
                case 'Đang diễn ra': return '#B1DD9E';
                case 'Sắp tới': return '#FAB972';
                default: return '#F8F9FA';
              }
            };

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tab,
                  isActive && styles.activeTab,
                  { backgroundColor: getTabColor(tab, isActive) },
                ]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab}</Text>
                {count > 0 && (
                  <View style={[styles.tabBadge, isActive && styles.activeTabBadge]}>
                    <Text style={[styles.tabBadgeText, isActive && styles.activeTabBadgeText]}>
                      {count}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Content */}
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
              colors={['#FFA500']}
              tintColor="#FFA500"
            />
          }
        />
      ) : (
        <EmptyState />
      )}

      {/* Discard Modal */}
      <Modal
        visible={showDiscardModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDiscardModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="warning" size={48} color="#ff9500" />
            <Text style={styles.modalTitle}>Xác nhận hủy booking</Text>
            <Text style={styles.modalMessage}>
              Bạn có chắc chắn muốn hủy booking này?{'\n'}
              Hành động này không thể hoàn tác.
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
    </SafeAreaView>
  );
}

// Reuse styles from OrderBookingScreen (clean, consistent)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  tabContainer: {
    marginHorizontal: -20,
  },
  tabScrollContent: {
    paddingHorizontal: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    minHeight: 44,
  },
  activeTab: {
    borderColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  activeTabText: {
    color: '#333333',
    fontWeight: '600',
  },
  tabBadge: {
    marginLeft: 8,
    backgroundColor: '#E9ECEF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 20,
    alignItems: 'center',
  },
  activeTabBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  activeTabBadgeText: {
    color: '#333333',
  },
  listContainer: {
    padding: 20,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    position: 'relative',
  },
  statusBadge: {
    position: 'absolute',
    top: 20,
    right: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 25,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
    marginRight: 80,
  },
  homestayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
    flex: 1,
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e1e1e1ff',
  },
  dateColumn: {
    flex: 1,
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  dateSeparator: {
    paddingHorizontal: 16,
  },
  separatorText: {
    fontSize: 16,
    color: '#FFA500',
    fontWeight: 'bold',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  paymentMethod: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  priceContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFA500',
  },
  actionButtons: {
    marginTop: 12,
    flexDirection: 'row', // Thay đổi từ column sang row
    width: '100%',
    gap: 8, 
  },
    buttonWrapper: {
    flex: 1, // Chiếm 50% width
  },
  actionButton: {
    flex: 1, // Chiếm 50% width
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkInButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%', 
  },
  discardButton: {
    backgroundColor: '#dc3545',
  },
  
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  retryButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    minHeight: 44,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
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
    marginVertical: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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