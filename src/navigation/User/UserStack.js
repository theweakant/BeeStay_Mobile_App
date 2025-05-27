// src/navigation/UserStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserTab from './UserTab';
import SettingScreen from '../../screens/UserScreen/SettingScreen';

//User
import EditProfileScreen from '../../screens/UserScreen/User/EditProfileScreen';
import NotificationScreen from '../../screens/UserScreen/User/NotificationScreen';
import ProfileScreen  from '../../screens/UserScreen/User/ProfileScreen';
import ReviewScreen from '../../screens/UserScreen/User/ReviewScreen';
import FavoriteScreen from '../../screens/UserScreen/User/FavoriteScreen';
import MyOrderScreen from '../../screens/UserScreen/User/MyOrderScreen';

import DetailScreen from '../../screens/UserScreen/DetailScreen';

//Booking
import BookingScreen from '../../screens/UserScreen/Booking/BookingScreen';
import PickTimeScreen from '../../screens/UserScreen/Booking/PickTimeScreen';

//Payment
import CheckOutScreen from '../../screens/UserScreen/Payment/CheckOutScreen';
import PaymentMethodScreen from '../../screens/UserScreen/Payment/PaymentMethodScreen';
import SuccessPaymentScreen from '../../screens/UserScreen/Payment/SuccessPaymentScreen';

//Information
import ContactScreen from '../../screens/UserScreen/Infomation/ContactScreen';
import PolicyScreen from '../../screens/UserScreen/Infomation/PolicyScreen';
import QAScreen from '../../screens/UserScreen/Infomation/QAScreen';
import { Check } from 'lucide-react-native';

const Stack = createNativeStackNavigator();

export default function UserStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true, 
      }}
    >

      <Stack.Screen
        name="MainTabs"
        component={UserTab}
        options={{ headerShown: false }} 
      />
      
      {/* Các màn hình phụ */}
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: 'Cài đặt',
          headerBackTitleVisible: false,
        }}
      />
      
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Chỉnh sửa hồ sơ',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Hồ sơ',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          title: 'Yêu thích',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        options={{
          title: 'Đánh giá của tôi',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="MyOrder"
        component={MyOrderScreen}
        options={{
          title: 'Đơn hàng của tôi',
          headerBackTitleVisible: false,
        }}
      />
        
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          title: 'Thông báo',
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: 'Chi tiết',
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          title: 'Đặt phòng',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="PickTime"
        component={PickTimeScreen}
        options={{
          title: 'Chọn thời gian',
          headerBackTitleVisible: false,
        }}
      />
      
      <Stack.Screen
        name="CheckOut"
        component={CheckOutScreen}
        options={{
          title: 'Thanh toán',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethodScreen}
        options={{
          title: 'Phương thức thanh toán',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="SuccessPayment"
        component={SuccessPaymentScreen}
        options={{
          title: 'Thanh toán thành công',
          headerBackTitleVisible: false,
        }}
      />


      <Stack.Screen
        name="QA"
        component={QAScreen}
        options={{
          title: 'Hỏi đáp',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Policy"
        component={PolicyScreen}
        options={{
          title: 'Chính sách',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: 'Liên hệ',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}