import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/UserScreen/HomeScreen';
import ProfileScreen from '../screens/UserScreen/ProfileScreen'; 

const Tab = createBottomTabNavigator();

export default function UserTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
