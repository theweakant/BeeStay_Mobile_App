// src/components/Toast/toastConfig.js
import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold'
      }}
      text2Style={{
        fontSize: 14,
        color: '#333'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: 'red' }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold'
      }}
      text2Style={{
        fontSize: 14
      }}
    />
  ),
  // Bạn có thể thêm các loại toast khác nếu cần
};
