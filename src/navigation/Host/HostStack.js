// HostStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HostTab from './HostTab';

import HostNotificationScreen from '../../screens/HostScreen/HostNotificationScreen';
import HostHomestayDetailScreen from '../../screens/HostScreen/Manage/HostHomestayDetailScreen';

import HostBookingScreen from '../../screens/HostScreen/Manage/HostBookingHomestayScreen';

const Stack = createNativeStackNavigator();

export default function HostStackNavigator() {
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
          title: 'Chi tiết homestay',
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Screen
        name="HostBooking"
        component={HostBookingScreen}
        options={{
          title: 'Các đặt phòng của tôi',
          headerBackTitleVisible: false,
        }}
      />
      

    </Stack.Navigator>
  );
}

