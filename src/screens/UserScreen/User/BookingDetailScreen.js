import React, { useState } from 'react';
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
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCancelBooking } from '../../../redux/slices/booking.slice';
import { selectUserBooking } from '../../../redux/slices/user.slice';
import {formatCurrency, formatDate} from '../../../utils/textUtils'

export default function BookingDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { bookingId } = route.params;
  const bookings = useSelector(selectUserBooking);
  const booking = bookings?.find(b => b.bookingId === bookingId);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelBooking = () => {
    Alert.alert(
      'Xác nhận hủy booking',
      'Bạn có chắc chắn muốn hủy booking này không? Hành động này không thể hoàn tác.',
      [
        { 
          text: 'Không', 
          style: 'cancel',
          onPress: () => console.log('Cancel pressed')
        },
        {
          text: 'Có, hủy booking',
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

  const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Homestay Information */}
        <View style={styles.homestayHeader}>
          <Text style={styles.homestayName}></Text>
        </View>

        {/* Combined Information Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Thông tin chi tiết</Text>
            <Text style={styles.bookingId}>#{booking.bookingId}</Text>
          </View>
          <InfoRow
            label="Tên homestay"
            value={booking.homestay}
          />
          {/* Guest Information */}
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
          />
          <InfoRow
            label="Ngày trả phòng"
            value={formatDate(booking.checkOut)}
          />
          
          {/* Payment Information */}
          <InfoRow
            label="Phương thức thanh toán"
            value={booking.paymentMethod}
          />
          
          {/* Total Price */}
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceLabel}>Tổng tiền</Text>
            <Text style={styles.totalPriceValue}>
              {formatCurrency(booking.totalPrice)}
            </Text>
          </View>
        </View>

        {/* Cancel Button */}
        <View style={styles.buttonContainer}>
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
            ) : null}
            <Text style={styles.cancelButtonText}>
              {isLoading ? 'Đang xử lý...' : 'Hủy Booking'}
            </Text>
          </TouchableOpacity>
        </View>
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
  
  // Header Styles
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 8,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },

  // Homestay Header
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

  // Section Styles
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

  // Info Row Styles - Updated for same-line layout
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
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },

  // Total Price
  totalPriceContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  totalPriceLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  totalPriceValue: {
    fontSize: 24,
    color: '#FFA500',
    fontWeight: 'bold',
  },

  // Buttons
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
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
  cancelButton: {
    backgroundColor: '#DC3545',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 44,
    shadowColor: '#DC3545',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cancelButtonDisabled: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0.1,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  // Error States
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
sectionTitleRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
  paddingBottom: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#F5F5F5',
},  
});