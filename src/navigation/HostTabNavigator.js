import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HostDashboard from '../screens/HostScreen/HostDashboard'; // tạo thêm
import MyHomestay from '../screens/HostScreen/MyHomestay';

const Tab = createBottomTabNavigator();

export default function HostTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={HostDashboard} />
      <Tab.Screen name="My Homestays" component={MyHomestay} />
    </Tab.Navigator>
  );
}
