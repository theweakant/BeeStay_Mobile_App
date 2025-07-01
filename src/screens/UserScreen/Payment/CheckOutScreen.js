import React, { useEffect, useState } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Alert, 
  Text, 
  View, 
  Image, 
  TextInput 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { fetchHomestayById } from '../../../redux/slices/homestay.slice';
import { fetchUserByAccount } from '../../../redux/slices/user.slice';
import { fetchCreateBooking } from '../../../redux/slices/booking.slice';
import { useAuth } from '../../../redux/hooks/useAuth';

import GuestInfoSection from '../../../components/CheckOutScreen/GuestInfoSection';
import CheckoutFooter from '../../../components/CheckOutScreen/CheckoutFooter';
import DateTimePickerField from '../../../components/CheckOutScreen/DateTimePickerField';

export default function CheckOutScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { user } = useAuth(); 

  const accountId = user?.accountId || route.params?.accountId;
  const homestayId = route.params?.homestayId;

  const { selectedHomestay, fetchingById } = useSelector(state => state.homestay);
  const { user: userProfile } = useSelector(state => state.user);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [guestName, setGuestName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());


  useEffect(() => {
    if (accountId) dispatch(fetchUserByAccount(accountId));
    if (homestayId) {
      dispatch(fetchHomestayById(homestayId));
    }
  }, [accountId, homestayId]);

  useEffect(() => {
    if (userProfile) {
      setPhoneNumber(userProfile.phone || '');
      setGuestName(userProfile.name || '');
    }
  }, [userProfile]);

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
      checkIn: checkInDate.toISOString().split('.')[0],
      checkOut: checkOutDate.toISOString().split('.')[0],
      paymentMethod,
      totalPrice: selectedHomestay?.pricePerNight || 0,
    };

    dispatch(fetchCreateBooking(bookingRequest))
      .unwrap()
      .then(() => {
        Alert.alert('Thành công', 'Đặt phòng thành công!');
        navigation.navigate('SuccessBooking');
      })
      .catch((error) => {
        Alert.alert('Lỗi', error || 'Đặt phòng thất bại!');
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {fetchingById ? (
          <Text>Đang tải thông tin homestay...</Text>
        ) : selectedHomestay ? (
          <View style={styles.homestayContainer}>
            <Image
              source={{ uri: selectedHomestay.imageList[0] }}
              style={styles.homestayImage}
            />
            <Text style={styles.homestayName}>{selectedHomestay.name}</Text>
            <Text>Chủ nhà: {selectedHomestay.host?.name}</Text>
            <Text>Giá/đêm: {selectedHomestay.pricePerNight.toLocaleString()} VND</Text>
            <Text>Địa chỉ: {selectedHomestay.location?.address}</Text>
          </View>
        ) : (
          <Text>Không tìm thấy thông tin homestay.</Text>
        )}

        <DateTimePickerField
          label="Check-in"
          value={checkInDate}
          onChange={setCheckInDate}
        />

        <DateTimePickerField
          label="Check-out"
          value={checkOutDate}
          onChange={setCheckOutDate}
        />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phương thức thanh toán</Text>
          <TextInput
            value={paymentMethod}
            onChangeText={setPaymentMethod}
            placeholder="Nhập phương thức thanh toán"
            style={styles.input}
          />
        </View>

        <GuestInfoSection
          phoneNumber={phoneNumber}
          guestName={guestName}
          onPhoneNumberChange={setPhoneNumber}
          onGuestNameChange={setGuestName}
          phonePlaceholder="Số điện thoại (tự động điền)"
          namePlaceholder="Họ tên (tự động điền)"
        />
      </ScrollView>

      <CheckoutFooter
        totalPrice={selectedHomestay?.pricePerNight || 0}
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
  inputContainer: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#fff',
  },
});
