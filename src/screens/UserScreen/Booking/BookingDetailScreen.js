import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCancelBooking } from '../../../redux/slices/booking.slice';
import { selectUserBooking } from '../../../redux/slices/user.slice'; 

export default function BookingDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { bookingId } = route.params;


  const bookings = useSelector(selectUserBooking);
  const booking = bookings?.find(b => b.bookingId === bookingId);

  const handleCancelBooking = () => {
    Alert.alert(
      'Xác nhận hủy',
      'Bạn có chắc muốn hủy booking này?',
      [
        { text: 'Hủy bỏ', style: 'cancel' },
        {
          text: 'Đồng ý',
          onPress: () => {
            dispatch(fetchCancelBooking(bookingId))
              .unwrap()
              .then(() => {
                Alert.alert('Thành công', 'Booking đã được hủy.');
                navigation.goBack();
              })
              .catch((error) => {
                Alert.alert('Lỗi', error || 'Hủy booking thất bại.');
              });
          },
        },
      ]
    );
  };

  if (!booking) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy booking.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{booking.homestay}</Text>
      <Text>Khách: {booking.fullName}</Text>
      <Text>Phone: {booking.phoneNumber}</Text>
      <Text>Check-in: {booking.checkIn}</Text>
      <Text>Check-out: {booking.checkOut}</Text>
      <Text>Thanh toán: {booking.paymentMethod}</Text>
      <Text>Tổng: {booking.totalPrice.toLocaleString()} VND</Text>

      <Button title="Hủy Booking" color="red" onPress={handleCancelBooking} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
