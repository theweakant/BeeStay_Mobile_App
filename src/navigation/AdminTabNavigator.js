import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminDashboard from '../screens/AdminScreen/AdminDashboard'; 
import ManageUsers from '../screens/AdminScreen/ManageUsers';

const Tab = createBottomTabNavigator();

export default function AdminTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={AdminDashboard} />
      <Tab.Screen name="Users" component={ManageUsers} />
    </Tab.Navigator>
  );
}
