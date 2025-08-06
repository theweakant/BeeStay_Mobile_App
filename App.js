import React, { useEffect } from 'react';
import "./global.css";
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/Toast/toastConfig';
import AppNavigator from './src/navigation/AppNavigator'; 
import { Provider } from 'react-redux';
import store from './src/redux/store'; 
import { restoreAuthState } from './src/redux/slices/auth.slice';


export default function App() {
    useEffect(() => {
    console.log('🚀 App starting - Restoring auth state...');
    store.dispatch(restoreAuthState());
  }, []);

  
  return (
    <Provider store={store}>
      <>
        <AppNavigator />
        <Toast config={toastConfig} />
      </>
    </Provider>
  );
  

}