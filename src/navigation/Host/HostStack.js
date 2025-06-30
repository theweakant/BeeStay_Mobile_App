// src/navigation/UserStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HostTab from './HostTab';

import HostNotificationScreen from '../../screens/HostScreen/HostNotificationScreen';
import HostHomestayDetailScreen from '../../screens/HostScreen/Manage/HostHomestayDetailScreen';

import MyHostBookingScreen from '../../screens/HostScreen/Manage/MyBookingHomestayScreen';

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
        component={HostTab}
        options={{ headerShown: false }} 
      />

      <Stack.Screen
        name="HostNotification"
        component={HostNotificationScreen}
        options={{
          title: 'Thông báo',
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Screen
        name="HostHomestayDetail"
        component={HostHomestayDetailScreen}
        options={{
          title: 'Thông báo',
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Screen
        name="MyHostBooking"
        component={MyHostBookingScreen}
        options={{
          title: 'Các đặt phòng của tôi',
          headerBackTitleVisible: false,
        }}
      />
      

    </Stack.Navigator>
  );
}

