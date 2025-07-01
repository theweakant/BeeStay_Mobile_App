import React from 'react';
import { View, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCheckInBooking } from '../../../redux/slices/booking.slice';

const CheckInButton = ({ bookingId, onSuccess }) => {
  const dispatch = useDispatch();

  // Lấy loading và error từ slice booking (tùy reducer của bạn)
  const { loading, error } = useSelector(state => state.booking);

  const handleCheckIn = () => {
    Alert.alert(
      'Xác nhận check-in',
      'Bạn có chắc chắn muốn check-in booking này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Check-in',
          style: 'default',
          onPress: async () => {
            try {
              const resultAction = await dispatch(fetchCheckInBooking(bookingId));

              if (fetchCheckInBooking.fulfilled.match(resultAction)) {
                // Nếu có callback thành công, gọi nó
                if (onSuccess) onSuccess(resultAction.payload);
              } else {
                // Có thể hiện toast error nếu muốn
                console.log('❌ Check-in failed:', resultAction.payload);
              }
            } catch (err) {
              console.error('❌ Check-in error:', err);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title={loading ? 'Đang check-in...' : 'Check-in'}
        onPress={handleCheckIn}
        disabled={loading}
      />
      {loading && <ActivityIndicator size="small" color="#0000ff" style={styles.loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  loading: {
    marginTop: 4,
  },
});

export default CheckInButton;
