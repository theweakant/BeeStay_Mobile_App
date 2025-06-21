// src/navigation/AppNavigator.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useAuth } from '../redux/hooks/useAuth';
import { restoreAuthState } from '../redux/slices/auth.slice';

import UserStack from './User/UserStack'; 
import HostStack from './Host/HostStack'; 
import AuthStack from './AuthStack';

const  AppNavigator = () => {
  const dispatch = useDispatch();
  const { user, role, isAuthenticated, loading } = useAuth();

  // Khôi phục auth state khi app khởi động
  useEffect(() => {
    dispatch(restoreAuthState());
  }, [dispatch]);

  // Hiển thị loading hoặc splash screen trong khi check auth state
  if (loading) {
    return null; // Hoặc return <LoadingScreen /> nếu bạn có
  }

  // Trường hợp chưa đăng nhập → hiển thị Auth Stack
  if (!isAuthenticated || !user) {
    return <AuthStack />;
  }

  // Đã đăng nhập - chuyển hướng theo role
  if (role === 'HOST' || role === 'host') {
    return <HostStack />;
  }
  
  if (role === 'USER' || role === 'user') {
    return <UserStack />;
  }

  // Fallback - nếu role không xác định được
  return <AuthStack />;
};

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}