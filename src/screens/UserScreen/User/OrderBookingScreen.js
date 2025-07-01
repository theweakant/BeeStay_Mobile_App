import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../redux/hooks/useAuth';
import { fetchUserBooking, selectUserBooking, selectBookingLoading, selectBookingError } from '../../../redux/slices/user.slice';

export default function OrderBookingScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useAuth();
  const accountId = user?.accountId;

  const bookings = useSelector(selectUserBooking);
  const loading = useSelector(selectBookingLoading);
  const error = useSelector(selectBookingError);

  useEffect(() => {
    if (accountId) {
      dispatch(fetchUserBooking(accountId));
    }
  }, [accountId, dispatch]);

  const handleBookingPress = (bookingId) => {
    navigation.navigate('BookingDetail', { bookingId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleBookingPress(item.bookingId)} style={styles.bookingItem}>
      <Text style={styles.homestay}>{item.homestay}</Text>
      <Text>Khách: {item.fullName}</Text>
      <Text>Phone: {item.phoneNumber}</Text>
      <Text>Check-in: {item.checkIn}</Text>
      <Text>Check-out: {item.checkOut}</Text>
      <Text>Thanh toán: {item.paymentMethod}</Text>
      <Text>Tổng: {item.totalPrice.toLocaleString()} VND</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {bookings && bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.bookingId.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text>Không có booking nào.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  bookingItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  homestay: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
});
