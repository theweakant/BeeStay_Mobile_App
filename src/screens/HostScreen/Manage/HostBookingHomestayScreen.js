import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../redux/hooks/useAuth';
import { fetchBookingByHost } from '../../../redux/slices/host.slice';
import { fetchDiscardBooking } from '../../../redux/slices/booking.slice';
import CheckInButton from '../../../components/Host/shared/CheckInButton'; // adjust path

export default function HostBookingScreen() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const accountId = user?.accountId;

  const { bookings, bookingLoading, bookingError } = useSelector((state) => state.host);
  const { loading: checkInLoading } = useSelector((state) => state.booking);

  useEffect(() => {
    if (accountId) {
      dispatch(fetchBookingByHost(accountId));
    }
  }, [dispatch, accountId]);

  const handleDiscardBooking = (bookingId) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn discard booking này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đồng ý',
          onPress: () => {
            dispatch(fetchDiscardBooking(bookingId))
              .unwrap()
              .then(() => {
                if (accountId) {
                  dispatch(fetchBookingByHost(accountId));
                }
              })
              .catch((error) => {
                console.error('❌ DISCARD booking failed:', error);
                Alert.alert('Lỗi', error?.message || 'Discard booking thất bại');
              });
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Booking ID: {item.bookingId}</Text>
      <Text>Homestay: {item.homestay}</Text>
      <Text>Guest: {item.fullName}</Text>
      <Text>Phone: {item.phoneNumber}</Text>
      <Text>Check-in: {new Date(item.checkIn).toLocaleDateString()}</Text>
      <Text>Check-out: {new Date(item.checkOut).toLocaleDateString()}</Text>
      <Text>Payment: {item.paymentMethod}</Text>
      <Text>Total: {item.totalPrice?.toLocaleString()} VND</Text>

      {/* Check-in Button */}
      <CheckInButton
        bookingId={item.bookingId}
        onSuccess={() => {
          if (accountId) {
            dispatch(fetchBookingByHost(accountId));
          }
        }}
      />

      {/* Discard Button */}
      <TouchableOpacity
        style={styles.discardButton}
        onPress={() => handleDiscardBooking(item.bookingId)}
        disabled={checkInLoading}
      >
        <Text style={styles.discardButtonText}>Discard Booking</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Booking Homestay</Text>

      {bookingLoading && <ActivityIndicator size="large" color="#0000ff" />}

      {bookingError && <Text style={styles.errorText}>{bookingError}</Text>}

      {!bookingLoading && !bookingError && bookings?.length === 0 && (
        <Text style={styles.emptyText}>Bạn chưa có booking nào.</Text>
      )}

      {!bookingLoading && !bookingError && (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.bookingId}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          refreshing={bookingLoading}
          onRefresh={() => {
            if (accountId) {
              dispatch(fetchBookingByHost(accountId));
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  discardButton: {
    marginTop: 10,
    backgroundColor: '#FF5C5C',
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  discardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
