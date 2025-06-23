// components/CheckOutScreen/index.js
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import RoomImageSection from '../../../components/CheckOutScreen/RoomImageSection';
import RoomDetailsSection from '../../../components/CheckOutScreen/RoomDetailsSection';
import QuantitySelector from '../../../components/CheckOutScreen/QuantitySelector';
import BookingDetailsSection from '../../../components/CheckOutScreen/BookingDetailsSection';
import GuestInfoSection from '../../../components/CheckOutScreen/GuestInfoSection';
import PaymentMethodSection from '../../../components/CheckOutScreen/PaymentMethodSection';
import CheckoutFooter from '../../../components/CheckOutScreen/CheckoutFooter';

export default function CheckOutScreen() {
  const navigation = useNavigation();
  
  // State management
  const [roomQuantity, setRoomQuantity] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('+84 123456789');
  const [guestName, setGuestName] = useState('Palm Thanh Toàn');
  
  // Room data - có thể được truyền từ API
  const roomData = {
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    type: 'PHÒNG CƠ BẢN',
    amenities: 'Giường đôi + cửa sổ + tivi + điều hòa + quạt trần',
    price: 129000
  };

  // Booking data - có thể được truyền từ API
  const bookingData = {
    type: 'Theo giờ | 03 giờ',
    checkIn: '14:00, 20/03',
    checkOut: '17:00, 20/03'
  };
  
  const totalPrice = roomData.price * roomQuantity;
  
  // Handlers
  const handleQuantityChange = (newQuantity) => {
    setRoomQuantity(newQuantity);
  };
  
  const handlePhoneNumberChange = (phone) => {
    setPhoneNumber(phone);
  };
  
  const handleGuestNameChange = (name) => {
    setGuestName(name);
  };
  
  const handleChangeBooking = () => {
    navigation.navigate('PickTime');
  };
  
  const handlePaymentMethod = () => {
    navigation.navigate('PaymentMethod');
  };
  
  const handleBooking = () => {
    // Call API để đặt phòng
    const bookingRequest = {
      roomQuantity,
      phoneNumber,
      guestName,
      totalPrice,
      ...bookingData
    };
    console.log('Booking request:', bookingRequest);
    // API call here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <RoomImageSection imageUrl={roomData.imageUrl} />
        
        <RoomDetailsSection 
          roomType={roomData.type}
          amenities={roomData.amenities}
        />
        
        <QuantitySelector
          quantity={roomQuantity}
          onQuantityChange={handleQuantityChange}
        />
        
        <BookingDetailsSection
          bookingType={bookingData.type}
          checkIn={bookingData.checkIn}
          checkOut={bookingData.checkOut}
          onChangeBooking={handleChangeBooking}
        />
        
        <GuestInfoSection
          phoneNumber={phoneNumber}
          guestName={guestName}
          onPhoneNumberChange={handlePhoneNumberChange}
          onGuestNameChange={handleGuestNameChange}
        />
        
        <PaymentMethodSection onPress={handlePaymentMethod} />
      </ScrollView>
      
      <CheckoutFooter
        totalPrice={totalPrice}
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
});