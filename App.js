import React from 'react';
import "./global.css";
import AppNavigator from './src/navigation/AppNavigator'; 
import { Provider } from 'react-redux';
import store from './src/redux/store'; 

export default function App() {
  // Sử dụng một trong hai tùy theo nhu cầu của bạn
  
  // Khi muốn sử dụng Redux và Navigation
  
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
  

}