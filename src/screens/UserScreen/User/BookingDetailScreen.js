import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { fetchCancelBooking } from '../../../redux/slices/booking.slice';
import { selectUserBooking } from '../../../redux/slices/user.slice';

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
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#ff6b6b" />
        <Text style={styles.errorText}>Không tìm thấy thông tin booking</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const InfoRow = ({ icon, label, value, iconColor = "#666" }) => (
    <View style={styles.infoRow}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  const SectionCard = ({ title, icon, children, iconColor = "#4a90e2" }) => (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon} size={24} color={iconColor} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="home" size={32} color="#4a90e2" />
        <Text style={styles.homestayName}>{booking.homestay}</Text>
      </View>

      {/* Guest Information */}
      <SectionCard title="Thông tin khách hàng" icon="person-outline">
        <InfoRow
          icon="person"
          label="Họ và tên"
          value={booking.fullName}
          iconColor="#4a90e2"
        />
        <InfoRow
          icon="call"
          label="Số điện thoại"
          value={booking.phoneNumber}
          iconColor="#4a90e2"
        />
      </SectionCard>

      {/* Booking Details */}
      <SectionCard title="Chi tiết đặt phòng" icon="calendar-outline" iconColor="#28a745">
        <InfoRow
          icon="log-in"
          label="Ngày nhận phòng"
          value={booking.checkIn}
          iconColor="#28a745"
        />
        <InfoRow
          icon="log-out"
          label="Ngày trả phòng"
          value={booking.checkOut}
          iconColor="#28a745"
        />
      </SectionCard>

      {/* Payment Information */}
      <SectionCard title="Thông tin thanh toán" icon="card-outline" iconColor="#ff9500">
        <InfoRow
          icon="wallet"
          label="Phương thức thanh toán"
          value={booking.paymentMethod}
          iconColor="#ff9500"
        />
        <View style={styles.totalPriceContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="attach-money" size={24} color="#28a745" />
          </View>
          <View style={styles.totalPriceContent}>
            <Text style={styles.totalPriceLabel}>Tổng tiền</Text>
            <Text style={styles.totalPriceValue}>
              {booking.totalPrice.toLocaleString()} VND
            </Text>
          </View>
        </View>
      </SectionCard>

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
          ) : (
            <Ionicons name="trash-outline" size={20} color="#fff" />
          )}
          <Text style={styles.cancelButtonText}>
            {isLoading ? 'Đang xử lý...' : 'Hủy Booking'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  homestayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginTop: 8,
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#212529',
    fontWeight: '500',
  },
  totalPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  totalPriceContent: {
    flex: 1,
    marginLeft: 12,
  },
  totalPriceLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 2,
  },
  totalPriceValue: {
    fontSize: 20,
    color: '#28a745',
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#dc3545',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cancelButtonDisabled: {
    backgroundColor: '#adb5bd',
    shadowOpacity: 0.1,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  errorText: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});