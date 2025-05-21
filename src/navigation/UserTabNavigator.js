import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/UserScreen/HomeScreen';
import ProfileScreen from '../screens/UserScreen/ProfileScreen'; 
import BookingScreen from '../screens/UserScreen/BookingScreen'
import DealScreen from '../screens/UserScreen/DealScreen';
import SearchScreen from '../screens/UserScreen/SearchScreen';

const Tab = createBottomTabNavigator();

export default function UserTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#F59E0B',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Trang chủ" 
        component={HomeScreen} 
        // options={{
        //   tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        // }}
      />
      <Tab.Screen 
        name="Tìm kiếm" 
        component={SearchScreen} 
        // options={{
        //   tabBarIcon: ({ color }) => <Search size={22} color={color} />,
        // }}
      />
      <Tab.Screen 
        name="Phòng đã đặt" 
        component={BookingScreen} 
        // options={{
        //   tabBarIcon: ({ color }) => <Calendar size={22} color={color} />,
        // }}
      />
      <Tab.Screen 
        name="Ưu đãi" 
        component={DealScreen} 
        // options={{
        //   tabBarIcon: ({ color }) => <Gift size={22} color={color} />,
        // }}
      />
      <Tab.Screen 
        name="Tài khoản" 
        component={ProfileScreen} 
        // options={{
        //   tabBarIcon: ({ color }) => <User size={22} color={color} />,
        // }}
      />
    </Tab.Navigator>



      //  <Tab.Navigator>    
      //     <Tab.Screen name="Home" component={HomeScreen} />
      // <Tab.Screen name="Profile" component={ProfileScreen} />
      // </Tab.Navigator>
  );
}
