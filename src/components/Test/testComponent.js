import React from 'react';
import { View, Button, Alert } from 'react-native';
import axios from 'axios';

const TestComponent = () => {
  const handleTestApi = async () => {
    try {
      const response = await axios.get(
        'https://beestay-azgcfsfpgbdkbmgv.southeastasia-01.azurewebsites.net/bee-stay/api/v1/stay-cation/get-by-host/14',
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob21lMTIzIiwicm9sZSI6IkhPU1QiLCJpYXQiOjE3NTMxNzYwMzgsImV4cCI6MTc1MzI2MjQzOH0.CfzCgjA6s7iD0EbOaTkl72Cb-vQt-FHW0VjHnAnphbc',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('✅ API success');
      console.log('Status:', response.status);
      console.log('Data:', response.data);

      Alert.alert('✅ API success', `Status: ${response.status}`);
    } catch (error) {
      const status = error.response?.status;
      const data = error.response?.data;
      const message = data?.message || error.message;

      console.error('❌ API error');
      console.error('Status:', status);
      console.error('Message:', message);

      Alert.alert('❌ API error', `Status: ${status || 'Unknown'}\nMessage: ${message}`);
    }
  };

  return (
    <View style={{ margin: 20 }}>
      <Button title="Test Beestay API" onPress={handleTestApi} color="#10B981" />
    </View>
  );
};

export default TestComponent;
