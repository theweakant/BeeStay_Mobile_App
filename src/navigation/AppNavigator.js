// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { useAuth } from '../redux/hooks/useAuth';
import AdminTabNavigator from './AdminTabNavigator';
import HostTabNavigator from './HostTabNavigator';
import UserStack  from './User/UserStack'; 

import AuthStack from './AuthStack';

const AppNavigator = () => {
  // const { user, role } = useAuth(); // Giả sử role là 'user', 'host', 'admin' hoặc null
  // // Trường hợp chưa đăng nhập → hiển thị Landing Screen
  // if (!user) {
  //   return <AuthStack />;
  // }
  // if (role === 'admin') {
  //   return <AdminTabNavigator />;
  // }
  // if (role === 'host') {
  //   return <HostTabNavigator />;
  // }
  // if (role === 'user') {
  //   return <UserTabNavigator />;
  // }
  // return <AuthStack />;

    // Tạm thời bỏ phân quyền để dễ design UI
  // return <AuthStack />; 
  return <UserStack />; 
  // return <HostTabNavigator />; 
  // return <AdminTabNavigator />; 
};

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
