import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

//Manage
import HostDashboardScreen from '../../screens/HostScreen/Manage/HostDashboardScreen';
import EarningScreen from '../../screens/HostScreen/Manage/EarningScreen';
import ManageReviewScreen from '../../screens/HostScreen/Manage/ManageReviewScreen';
import MyHomestayScreen from '../../screens/HostScreen/Manage/MyHomestayScreen';
import HostProfileScren from '../../screens/HostScreen/HostProfileScreen';

import { Home, Search, Calendar, Gift, User } from 'lucide-react-native'; 

const Tab = createBottomTabNavigator();

export default function HostTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#F59E0B',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: styles.tabBar,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HostDashboard"
        component={HostDashboardScreen}
        options={{
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Tab.Screen
        name="MyHomestay"
        component={MyHomestayScreen}
        options={{
          tabBarIcon: ({ color }) => <Search size={22} color={color} />,
        }}
      />
      <Tab.Screen
        name="Earning"
        component={EarningScreen}
        options={{
          tabBarIcon: ({ color }) => <Calendar size={22} color={color} />,
        }}
      />
      <Tab.Screen
        name="ManageReview"
        component={ManageReviewScreen}
        options={{
          tabBarIcon: ({ color }) => <Gift size={22} color={color} />,
        }}
      />
      <Tab.Screen
        name="HostProfile"
        component={HostProfileScren}
        options={{
          tabBarIcon: ({ color }) => <User size={22} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 10,
    paddingTop: 5,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderTopColor: '#e5e7eb',
  },
});
