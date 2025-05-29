// src/navigation/UserStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HostTab from './HostTab';

import HostNotificationScreen from '../../screens/HostScreen/HostNotificationScreen';

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
      

    </Stack.Navigator>
  );
}

