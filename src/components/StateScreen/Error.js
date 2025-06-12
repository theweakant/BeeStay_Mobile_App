// components/Error.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Error = ({ message = "Đã xảy ra lỗi. Vui lòng thử lại." }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Error;
