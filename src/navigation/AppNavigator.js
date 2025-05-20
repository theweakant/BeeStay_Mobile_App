// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../redux/hooks/useAuth';
import AdminTabNavigator from './AdminTabNavigator';
import HostTabNavigator from './HostTabNavigator';
import UserTabNavigator from './UserTabNavigator';
import LoginScreen from '../screens/LoginScreen'; 

const AppNavigator = () => {
  const { user, role } = useAuth();

  if (!user) return <LoginScreen />;

  if (role === 'admin') return <AdminTabNavigator />;
  if (role === 'host') return <HostTabNavigator />;
  return <UserTabNavigator />;
};

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
