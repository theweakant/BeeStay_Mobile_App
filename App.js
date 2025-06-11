import React, { useEffect } from 'react';
import "./global.css";
import AppNavigator from './src/navigation/AppNavigator'; 
import { Provider } from 'react-redux';
import store from './src/redux/store'; 
import { restoreAuthState } from './src/redux/slices/auth.slice';


export default function App() {
  // Sử dụng một trong hai tùy theo nhu cầu của bạn
    useEffect(() => {
    // Restore authentication state when app starts
    console.log('🚀 App starting - Restoring auth state...');
    store.dispatch(restoreAuthState());
  }, []);

  
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
  

}