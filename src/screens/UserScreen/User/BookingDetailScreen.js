import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../../../redux/hooks/useAuth';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCancelBooking } from '../../../redux/slices/booking.slice';
import { selectUserBooking } from '../../../redux/slices/user.slice';
import { fetchHomestayById } from '../../../redux/slices/homestay.slice';
import { formatCurrency, formatDate } from '../../../utils/textUtils';
import AddReviewSection from '../../../components/BookingScreen/ReviewSection/AddReviewSection';

export default function BookingDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const accountId = user?.accountId;
  const { bookingId } = route.params;
  const bookings = useSelector(selectUserBooking);
  const booking = bookings?.find(b => b.bookingId === bookingId);
  const { selectedHomestay: homestayData, fetchingById: homestayLoading, fetchByIdError: homestayError } = useSelector(state => state.homestay);
  const [isLoading, setIsLoading] = useState(false);
  const [showReviewSection, setShowReviewSection] = useState(false); // Thêm state cho collapsible review

  // Fetch homestayData bằng homestayId từ booking
  useEffect(() => {
    if (booking?.homestayId) {
      dispatch(fetchHomestayById(booking.homestayId));
    }
  }, [booking, dispatch]);

  const handleCancelBooking = () => {
    Alert.alert(
      'Xác nhận hủy booking',
      'Hành động này không thể hoàn tác.',
      [
        { 
          text: 'Không', 
          style: 'cancel',
          onPress: () => console.log('Cancel pressed')
        },
        {
          text: 'Xác nhận',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              await dispatch(fetchCancelBooking(bookingId)).unwrap();
              Alert.alert(
                'Thành công',
                'Booking đã được hủy thành công.',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.goBack()
                  }
                ]
              );
            } catch (error) {
              Alert.alert(
                'Lỗi',
                error?.message || 'Không thể hủy booking. Vui lòng thử lại sau.'
              );
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  if (!booking) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorTitle}>Không tìm thấy booking</Text>
          <Text style={styles.errorMessage}>
            Thông tin booking không tồn tại hoặc đã bị xóa
          </Text>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.primaryButtonText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Xử lý trạng thái loading hoặc lỗi khi fetch homestay
  if (homestayLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.errorMessage}>Đang tải thông tin homestay...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (homestayError) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorTitle}>Không thể tải thông tin homestay</Text>
          <Text style={styles.errorMessage}>{homestayError}</Text>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => dispatch(fetchHomestayById(booking.homestayId))}
          >
            <Text style={styles.primaryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const InfoRow = ({ label, value, valueStyle }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={[styles.infoValue, valueStyle]}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Homestay Information */}
        <View style={styles.homestayHeader}>
          <Text style={styles.homestayName}>{booking.homestay}</Text>
        </View>

        {/* Combined Information Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Thông tin chi tiết</Text>
            <Text style={styles.bookingId}>#{booking.bookingId}</Text>
          </View>
          <InfoRow
            label="Mã homestay"
            value={booking.homestayId}
          />
          <InfoRow
            label="Tên homestay"
            value={booking.homestay}
          />
          <InfoRow
            label="Họ và tên"
            value={booking.fullName}
          />
          <InfoRow
            label="Số điện thoại"
            value={booking.phoneNumber}
          />
          <InfoRow
            label="Ngày nhận phòng"
            value={formatDate(booking.checkIn)}
            valueStyle={styles.dateValue}
          />
          <InfoRow
            label="Ngày trả phòng"
            value={formatDate(booking.checkOut)}
            valueStyle={styles.dateValue}
          />
          <InfoRow
            label="Thanh toán"
            value={booking.paymentMethod}
            valueStyle={styles.paymentValue}
          />
          <InfoRow
            label="Tổng tiền"
            value={formatCurrency(booking.totalPrice)}
            valueStyle={styles.totalPriceValue}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.addReviewButton}
            onPress={() => setShowReviewSection(!showReviewSection)}
          >
            <Text style={styles.addReviewText}>
              {showReviewSection ? 'Ẩn đánh giá' : 'Thêm đánh giá'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.cancelButton,
              isLoading && styles.cancelButtonDisabled
            ]}
            onPress={handleCancelBooking}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.cancelButtonText}>Hủy</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Modal AddReviewSection */}
        {showReviewSection && accountId && homestayData && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowReviewSection(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
              <AddReviewSection
                accountId={accountId}
                stayCationId={homestayData.id}
                onReviewSubmitted={() => {
                  dispatch(fetchHomestayById(homestayData.id));
                  setShowReviewSection(false);
                }}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  homestayHeader: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  homestayName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  bookingId: {
    fontSize: 15,
    color: '#FFA500',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '400',
    flex: 1,
    textAlign: 'right',
  },
  dateValue: {
    color: '#28a745',
  },
  paymentValue: {
    color: '#DC3545',
  },
  totalPriceValue: {
    fontSize: 18,
    color: '#FFA500',
    fontWeight: 'bold',
  },
  // New styles for action buttons
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  addReviewButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#E9ECEF',
  },
  addReviewIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  addReviewText: {
    color: '#495057',
    fontSize: 14,
    fontWeight: '500',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#DC3545',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#DC3545',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cancelButtonDisabled: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0.1,
  },
  cancelIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  // New style for collapsible review section
  reviewSectionContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    overflow: 'hidden',
  },
  // Modal styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    maxHeight: '80%',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F3F4',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#5F6368',
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    shadowColor: '#FFA500',
    shadowOffset: {
      width: 0,
      height: 2,
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
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
});