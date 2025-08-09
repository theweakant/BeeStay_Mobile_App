import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { formatCurrency } from '../../../utils/textUtils';

const Booking = ({ bookings, bookingsLoading, navigation }) => {
  // Hàm lọc và sắp xếp booking sắp tới
  const getUpcomingBookings = () => {
    if (!bookings || bookings.length === 0) return [];
    
    const currentDate = new Date();
    
    return bookings
      .filter(booking => {
        const checkInDate = new Date(booking.checkIn);
        return checkInDate >= currentDate;
      })
      .sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn))
      .slice(0, 3);
  };

  // Hàm format ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  // Hàm format thời gian
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Hàm lấy màu và text status dựa trên ngày check-in
  const getBookingStatus = (checkInDate) => {
    const now = new Date();
    const checkIn = new Date(checkInDate);
    const diffInDays = Math.ceil((checkIn - now) / (1000 * 60 * 60 * 24));
    
    if (diffInDays <= 1) return { color: '#EF4444', text: 'Hôm nay', bg: '#FEF2F2' };
    if (diffInDays <= 3) return { color: '#F59E0B', text: `${diffInDays} ngày`, bg: '#FFFBEB' };
    return { color: '#10B981', text: `${diffInDays} ngày`, bg: '#F0FDF4' };
  };

  const upcomingBookings = getUpcomingBookings();

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Booking Sắp Tới</Text>
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('HostBooking')}
        >
          <Text style={styles.viewAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.sectionContent}>
        {bookingsLoading && !bookings ? (
          <View style={styles.sectionLoading}>
            <ActivityIndicator size="small" color="#6366F1" />
            <Text style={styles.loadingText}>Đang tải booking...</Text>
          </View>
        ) : upcomingBookings.length > 0 ? (
          upcomingBookings.map((booking) => {
            const status = getBookingStatus(booking.checkIn);
            return (
              <View key={booking.bookingId} style={styles.bookingCard}>
                {/* Header Section */}
                <View style={styles.bookingHeader}>
                  <View style={styles.headerLeft}>
                    <Text style={styles.homestayName} numberOfLines={1}>
                      {booking.homestay}
                    </Text>
                    <Text style={styles.bookingId}>#{booking.bookingId}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                    <View style={[styles.statusDot, { backgroundColor: status.color }]} />
                    <Text style={[styles.statusText, { color: status.color }]}>
                      {status.text}
                    </Text>
                  </View>
                </View>

                {/* Guest Info */}
                <View style={styles.guestSection}>
                  <Text style={styles.guestName}>
                    {booking.fullName || 'Chưa cập nhật'}
                  </Text>
                </View>

                {/* Date & Time Section */}
                <View style={styles.dateTimeSection}>
                  <View style={styles.dateTimeItem}>
                    <Text style={styles.dateTimeLabel}>Check-in</Text>
                    <Text style={styles.dateValue}>{formatDate(booking.checkIn)}</Text>
                    <Text style={styles.timeValue}>{formatTime(booking.checkIn)}</Text>
                  </View>
                  
                  <View style={styles.dateSeparator} />
                  
                  <View style={styles.dateTimeItem}>
                    <Text style={styles.dateTimeLabel}>Check-out</Text>
                    <Text style={styles.dateValue}>{formatDate(booking.checkOut)}</Text>
                    <Text style={styles.timeValue}>{formatTime(booking.checkOut)}</Text>
                  </View>
                </View>

                {/* Payment & Price Section */}
                <View style={styles.paymentSection}>
                  <View style={styles.paymentInfo}>
                    <Text style={styles.paymentLabel}>Thanh toán</Text>
                    <View style={[
                      styles.paymentBadge,
                      { 
                        backgroundColor: booking.paymentMethod === 'TRANSFER' ? '#DCFCE7' : '#FEF3C7',
                      }
                    ]}>
                      <Text style={[
                        styles.paymentText,
                        { color: booking.paymentMethod === 'TRANSFER' ? '#166534' : '#92400E' }
                      ]}>
                        {booking.paymentMethod === 'TRANSFER' ? 'Chuyển khoản' : 'Tiền mặt'}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.priceSection}>
                    <Text style={styles.totalPrice}>
                      {formatCurrency(booking.totalPrice)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Không có booking sắp tới</Text>
            <Text style={styles.emptySubtext}>Các booking mới sẽ xuất hiện tại đây</Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  viewAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',

  },
  viewAllText: {
    fontSize: 14,
    color: '#8c8c8cff',
    fontWeight: '400',
  },
  sectionContent: {
    gap: 16,
  },
  bookingCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
    marginRight: 12,
  },
  homestayName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  bookingId: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  guestSection: {
    marginBottom: 16,
  },
  guestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  dateTimeSection: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  dateTimeItem: {
    flex: 1,
    alignItems: 'center',
  },
  dateTimeLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  timeValue: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  dateSeparator: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 16,
  },
  paymentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 6,
  },
  paymentBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  paymentText: {
    fontSize: 13,
    fontWeight: '600',
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#DC2626',
    letterSpacing: -0.3,
  },
  sectionLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
});

export default Booking;