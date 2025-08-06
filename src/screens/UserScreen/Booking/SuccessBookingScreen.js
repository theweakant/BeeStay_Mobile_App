import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

export default function SuccessBooking() {
  const navigation = useNavigation();
  const route = useRoute();
  const booking = route.params?.booking;

  const handleNavigateToOrderBooking = () => {
    navigation.navigate('OrderBooking');
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  const formatDateTime = (iso) => moment(iso).format('HH:mm - DD/MM/YYYY');
  const formatDateOnly = (iso) => moment(iso).format('DD/MM/YYYY');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Success Content */}
        <View style={styles.content}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.successIcon}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          </View>

          {/* Success Message */}
          <Text style={styles.title}>Đặt lịch thành công!</Text>
          <Text style={styles.subtitle}>
            BeeStay cảm ơn bạn đã đặt lịch. BeeStayw sẽ liên hệ với bạn sớm nhất.
          </Text>

          {/* Booking Details Card */}
          <View style={styles.detailsCard}>
            {/* Card Title with Booking Date */}
            <View style={styles.cardTitleRow}>
              <Text style={styles.cardTitle}>Chi tiết đặt lịch</Text>
              <Text style={styles.bookingDate}>{formatDateOnly(booking?.createdAt)}</Text>
            </View>

            {/* Status below title */}
            <View style={styles.statusRow}>
              <Text style={[styles.statusText, styles.statusConfirmed]}>
                Đã xác nhận
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Họ tên:</Text>
              <Text style={styles.detailValue}>{booking?.fullName || '-'}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Số điện thoại:</Text>
              <Text style={styles.detailValue}>{booking?.phoneNumber || '-'}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Check-in:</Text>
              <Text style={styles.priceText}>{formatDateTime(booking?.checkIn)}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Check-out:</Text>
              <Text style={styles.priceText}>{formatDateTime(booking?.checkOut)}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Thanh toán:</Text>
              <Text style={styles.detailValue}>
                {booking?.paymentMethod === 'CASH' ? 'Tiền mặt' : 'Chuyển khoản'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tổng tiền:</Text>
              <Text style={[styles.detailValue, styles.priceText]}>
                {booking?.totalPrice?.toLocaleString()} VND
              </Text>
            </View>
          </View>

          {/* Action Buttons - Updated Layout */}
          <View style={styles.buttonContainer}>
            {/* Primary Button - Xem lịch đặt (Top) */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleNavigateToOrderBooking}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Xem lịch đặt</Text>
            </TouchableOpacity>

            {/* Secondary Button - Về trang chủ (Bottom with Home Icon) */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleBackToHome}
              activeOpacity={0.8}
            >
              <View style={styles.homeButtonContent}>
s                <Text style={styles.secondaryButtonText}>Về trang chủ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container & Layout
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },

  // Success Icon
  iconContainer: {
    marginBottom: 32,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#28A745',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  checkmark: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  // Typography
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },

  // Details Card
  detailsCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  bookingDate: {
    fontSize: 12,
    color: '#666666',
  },
  statusRow: {
    marginBottom: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
    textAlign: 'right',
  },
  priceText: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
  statusConfirmed: {
    color: '#28A745',
  },

  // Updated Button Styles - Vertical Layout
  buttonContainer: {
    width: '100%',
    flexDirection: 'column', // Changed from 'row' to 'column'
    gap: 12, // Increased gap between buttons
  },
  primaryButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%', // Full width instead of flex: 1
    shadowColor: '#FFA500',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%', // Full width instead of flex: 1
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  // New styles for home button with icon
  homeButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  secondaryButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '600',
  },
});