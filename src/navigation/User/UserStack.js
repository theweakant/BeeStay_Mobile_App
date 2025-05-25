// src/navigation/UserStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserTab from './UserTab';
import SettingScreen from '../../screens/UserScreen/SettingScreen';

//User
import EditProfileScreen from '../../screens/UserScreen/User/EditProfileScreen';
import NotificationScreen from '../../screens/UserScreen/User/NotificationScreen';
import ProfileScreen  from '../../screens/UserScreen/User/ProfileScreen';

import DetailScreen from '../../screens/UserScreen/DetailScreen';

//Booking
import BookingScreen from '../../screens/UserScreen/Booking/BookingScreen';
import PickTimeScreen from '../../screens/UserScreen/Booking/PickTimeScreen';

//Payment
import CheckOutScreen from '../../screens/UserScreen/Payment/CheckOutScreen';
import PaymentMethodScreen from '../../screens/UserScreen/Payment/PaymentMethodScreen';
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
    </Stack.Navigator>
  );
}