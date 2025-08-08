// CheckInButton.js
import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCheckInBooking } from '../../../redux/slices/booking.slice';

const CheckInButton = ({ bookingId, onSuccess, style, textStyle }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.booking);

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
                onSuccess?.(resultAction.payload);
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
      <TouchableOpacity
        style={[styles.button, style, loading && styles.buttonDisabled]}
        onPress={handleCheckIn}
        disabled={loading}
      >
        <Text style={[styles.buttonText, textStyle]}>{loading ? 'Đang xử lý...' : 'CHECK-IN'}</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="small" color="#FFA500" style={styles.loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  loading: {
    marginTop: 4,
  },
});

export default CheckInButton;