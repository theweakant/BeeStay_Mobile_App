import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Alert, Text, View, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { fetchHomestayById } from '../../../redux/slices/homestay.slice';
import { fetchUserByAccount } from '../../../redux/slices/user.slice';
import { fetchCreateBooking } from '../../../redux/slices/booking.slice';
import { useAuth } from '../../../redux/hooks/useAuth';

import GuestInfoSection from '../../../components/CheckOutScreen/GuestInfoSection';
import PaymentMethodSection from '../../../components/CheckOutScreen/PaymentMethodSection';
import CheckoutFooter from '../../../components/CheckOutScreen/CheckoutFooter';

export default function CheckOutScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { user: authUser } = useAuth();

  const homestayId = route.params?.homestayId;
  const accountId = authUser?.id;

  const { homestay, loading: homestayLoading } = useSelector(state => state.homestay);
  const { user } = useSelector(state => state.user);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [guestName, setGuestName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');

  useEffect(() => {
    if (accountId) dispatch(fetchUserByAccount(accountId));
    if (homestayId) dispatch(fetchHomestayById(homestayId));
  }, [accountId, homestayId]);

  useEffect(() => {
    if (user) {
      setPhoneNumber(user.phone || '');
      setGuestName(user.name || '');
    }
  }, [user]);

  const handleBooking = () => {
    if (!accountId || !homestayId) {
      Alert.alert('Lỗi', 'Thiếu thông tin người dùng hoặc homestay.');
      return;
    }

    const bookingRequest = {
      accountId,
      homestayId,
      phoneNumber,
      fullName: guestName,
      checkIn: '2025-06-25T14:00:00',
      checkOut: '2025-06-25T17:00:00',
      paymentMethod,
      totalPrice: homestay?.pricePerNight || 0,
    };

    dispatch(fetchCreateBooking(bookingRequest))
      .unwrap()
      .then(() => {
        Alert.alert('Thành công', 'Đặt phòng thành công!');
        navigation.navigate('SuccessScreen');
      })
      .catch((error) => {
        Alert.alert('Lỗi', error || 'Đặt phòng thất bại!');
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {homestayLoading ? (
          <Text>Đang tải thông tin homestay...</Text>
        ) : homestay ? (
          <View style={styles.homestayContainer}>
            <Image
              source={{ uri: homestay.imageList[0] }}
              style={styles.homestayImage}
            />
            <Text style={styles.homestayName}>{homestay.name}</Text>
            <Text>Chủ nhà: {homestay.host?.name}</Text>
            <Text>Giá/đêm: {homestay.pricePerNight.toLocaleString()} VND</Text>
            <Text>Địa chỉ: {homestay.location?.address}</Text>
            <Text>Đánh giá: {homestay.averageRating.toFixed(1)} ({homestay.reviewCount} đánh giá)</Text>
          </View>
        ) : (
          <Text>Không tìm thấy thông tin homestay.</Text>
        )}

        <GuestInfoSection
          phoneNumber={phoneNumber}
          guestName={guestName}
          onPhoneNumberChange={setPhoneNumber}
          onGuestNameChange={setGuestName}
          phonePlaceholder="Số điện thoại (tự động điền)"
          namePlaceholder="Họ tên (tự động điền)"
        />

        <PaymentMethodSection
          selectedMethod={paymentMethod}
          onSelectMethod={setPaymentMethod}
          onPress={() => navigation.navigate('PaymentMethod')}
        />
      </ScrollView>

      <CheckoutFooter
        totalPrice={homestay?.pricePerNight || 0}
        onBooking={handleBooking}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  homestayContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  homestayImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  homestayName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
