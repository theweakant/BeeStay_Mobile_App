import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SectionHeader = ({ title, rightComponent }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {rightComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
});

export default SectionHeader;