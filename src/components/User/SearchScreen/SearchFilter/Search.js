    import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function Search({ searchTerm, setSearchTerm }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tìm homestay theo tên..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    elevation: 1,
  },
});
