// src/navigation/UserStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserTab from './UserTab';
import SettingScreen from '../../screens/UserScreen/SettingScreen';
import EditProfileScreen from '../../screens/UserScreen/EditProfileScreen';
import NotificationScreen from '../../screens/UserScreen/NotificationScreen';
import DetailScreen from '../../screens/UserScreen/DetailScreen';
import BookingScreen from '../../screens/UserScreen/BookingScreen';

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
    </Stack.Navigator>
  );
}